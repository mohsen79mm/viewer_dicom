import React, { Component, useState } from 'react';
// import React, { useState, useEffect } from "react";
import {
    Grid
} from "semantic-ui-react";
import DicomService from "../services/DicomService";
import DicomViewer from "../components/common/DicomViewer";
import ControlPanel from "../components/seriesViewerPage/ControlPanel";
// import { useSelector, useDispatch } from "react-redux";
import { getimage } from '../redux/actions/image';
// import middleware from './reduxCall/middleware';
import { connect } from 'react-redux';


class SeriesViewerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instances: [],
            seriesId: props.match.params.id,
            instanceTags: {},
            index: 0,
            instance: {},
            showTags: false,
            playTimerId: null,
            isLoaded: false,
            rotation: null,
            colorScale: 'main',
            animation: false,
            viewMode: 'one',
            animationId: undefined,
            zoom: false,

        };
        this.setState = this.setState.bind(this);
    }

    componentWillMount() {
        const seriesId = this.state.seriesId;
        if (!this.state.isLoaded) {
            DicomService.findInstancesBySeriesId(seriesId, instances => {
                this.setState({ instances: instances, isLoaded: true });
            });
        }
    }


    play = () => {
        if (!this.state.animationId) {
            const nextInstance = this.nextInstance;
            const state = this.state;
            const animate = (function () {
                if (!state.animation) {
                    console.log('ATOP');
                    return;
                }
                setTimeout(function () {
                    nextInstance();
                    state.animationId = requestAnimationFrame(animate);
                }, 1000 / 4)
            }).bind(this);
            state.animation = true;
            state.animationId = requestAnimationFrame(animate);
        }
    };

    stop = () => {
        if (this.state.animationId) {
            const state = this.state;
            state.animation = false;
            cancelAnimationFrame(state.animationId);
            state.animationId = undefined;
        }
    };


    prevInstance = () => {
        const currentInstanceId = this.state.index;
        const instancesCount = (this.state.instances || []).length;
        if (instancesCount === 0)
            return;
        if (currentInstanceId === 0) {
            this.setState({ index: instancesCount - 1, rotation: null });
            localStorage.setItem('index', this.state.index);

        }
        else {
            this.setState({ index: currentInstanceId - 1, rotation: null });
            localStorage.setItem('index', this.state.index);

        }
    };

    nextInstance = () => {
        const currentInstanceId = this.state.index;
        const instancesCount = (this.state.instances || []).length;
        if (instancesCount === 0)
            return;
        if (currentInstanceId + 1 === instancesCount) {
            this.setState({ index: 0, rotation: null });
            localStorage.setItem('index', this.state.index);
        }

        else {
            this.setState({ index: currentInstanceId + 1, rotation: null });
            localStorage.setItem('index', this.state.index);

        }
    };

    showTags = () => {
        const instances = this.state.instances;
        if (instances) {
            const instanceId = instances[this.state.index]['id'];
            DicomService.findTagsByInstanceId(instanceId, tags => {
                this.setState({ instanceTags: tags });
            });
        }
    };


    zoomfunc = () => {
        this.setState({ zoom: true });
        // console.log('state zoom : ',this.state.zoom)
    };



    rotateLeft = () => {
        this.setState({ rotation: 'left' });
        // console.log('hi')
    };

    rotateRight = () => {
        this.setState({ rotation: 'right' });
    };

    setColorScale = (e, d) => {
        this.setState({ colorScale: d.value })
    };

    setViewMode = (e, d) => {
        this.setState({ viewMode: d.value })
    }

    onApplyPlugin = (pluginId) => {
        if (pluginId) {
            const instance = this.state.instances[this.state.index];
            console.log(instance);
            this.props.history.push(`/instances/${instance['id']}/process/${pluginId}`);
        }
    };


    render() {
        const instances = this.state.instances;


        if (instances && instances.length > 0) {
            // if (me) {
            const index = this.state.index;
            // middleware(index);
            const viewMode = this.state.viewMode;
            if (viewMode === 'one') {
                var list_url_images = []
                for (let i = 0; i < instances.length; i++) {
                    // list_url_images.push(instances[i].id)
                    list_url_images.push(`http://127.0.0.1:8080/api/instances/${instances[i].id}/image`)
                    // more statements
                }

                const stack = {
                    imageIds: list_url_images,

                    currentImageIdIndex: 0
                };
                // const storedClicks = localStorage.getItem('index');
                // console.log('storedClicks : >>>>>>>>>>>>>>>>>>>>>', storedClicks)
                const viewerProps = {
                    style: {
                        height: window.innerHeight
                    },
                    instance: instances[index],
                    rotation: this.state.rotation,
                    colorScale: this.state.colorScale,
                };
                return (


                    <div style={{
                        background: 'black'
                    }} tabIndex={'0'} onKeyDown={(event) => this.onKeyPress(event)}>
                        <ControlPanel onHome={() => {
                            this.props.history.push('/studies')
                        }} onNextInstance={this.nextInstance} onPrevInstance={this.prevInstance}
                            onSetColorScale={this.setColorScale} onRotateLeft={this.rotateLeft}
                            onRotateRight={this.rotateRight} onSetViewMode={this.setViewMode}
                            onApplyPlugin={this.onApplyPlugin} zoomFunc={this.zoomfunc}
                        />

                        <DicomViewer stack={{ ...stack }} {...viewerProps} />
                    </div>

                );
            }
            else if (viewMode === 'two') {
                // console.log('viewmode two')
                const viewerProps = {
                    style: {
                        height: window.innerHeight
                    },
                    rotation: this.state.rotation,
                    colorScale: this.state.colorScale,
                };
                const instance1 = instances[index];
                const instance2 = instances[(index + 1) % instances.length];
                // console.log('ins 1',instance1)
                // console.log('ins 2',instance2)

                return (
                    <div style={{
                        background: 'black'
                    }} tabIndex={'0'} onKeyDown={(event) => this.onKeyPress(event)}>
                        <ControlPanel onHome={() => {
                            this.props.history.push('/studies')
                        }} onNextInstance={this.nextInstance} onPrevInstance={this.prevInstance}
                            onSetColorScale={this.setColorScale} onRotateLeft={this.rotateLeft}
                            onRotateRight={this.rotateRight} onSetViewMode={this.setViewMode}
                            onApplyPlugin={this.onApplyPlugin} zoomFunc={this.zoomfunc}
                        />
                        <Grid columns={'equal'}>
                            <Grid.Row>
                                <Grid.Column>
                                    <DicomViewer instance={instance1} {...viewerProps} />
                                </Grid.Column>
                                <Grid.Column>
                                    <DicomViewer instance={instance2} {...viewerProps} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                );
            }
        }
        else {
            return (
                <div style={{
                    background: 'black'
                }} tabIndex={'0'} onKeyDown={(event) => this.onKeyPress(event)}>
                    <ControlPanel onHome={() => {
                        this.props.history.push('/studies')
                    }} onNextInstance={this.nextInstance} onPrevInstance={this.prevInstance}
                        onSetColorScale={this.setColorScale} onRotateLeft={this.rotateLeft}
                        onRotateRight={this.rotateRight} onSetViewMode={this.setViewMode}
                        onApplyPlugin={this.onApplyPlugin} zoomFunc={this.zoomfunc}
                    />
                </div>
            );
        }
    }

    onKeyPress = (event) => {
        if (event.key === 'ArrowLeft') {
            this.prevInstance();
        }
        else if (event.key === 'ArrowRight') {
            this.nextInstance();
        }
    };
}


export default SeriesViewerPage;







// export default function SeriesViewerPage(props) {
//     const [instances, setinstances] = useState([]);
//     const [seriesId, setseriesId] = useState(props.match.params.id);
//     const [instanceTags, setinstanceTags] = useState({});
//     const [index, setindex] = useState(0);
//     const [instance, setinstance] = useState({});
//     const [showTags, setshowTags] = useState(false);
//     const [playTimerId, setplayTimerId] = useState(null);
//     const [isLoaded, setisLoaded] = useState(false);
//     const [rotation, setrotation] = useState(null);
//     const [colorScale, setcolorScale] = useState('main');
//     const [animation, setanimation] = useState(false);
//     const [viewMode, setviewMode] = useState('one');
//     const [animationId, setanimationId] = useState(undefined);
//     const [zoom, setzoom] = useState(false);

//     // const [iii, set] = useState();
//     const [mounted, setMounted] = useState(false)
//     // const [iii, set] = useState();

//     const list_instances = []
//     const handleinstances = async () => {
//         const response = await fetch(
//             `http://127.0.0.1:8080/api/series/${seriesId}/instances`
//         )
//         const data = await response.json()
//         // console.log('data : ',data)
//         if (data) {
//             // for (var i = 0; i < data.length; i++) {
//             list_instances.push(data)
//             console.log(data)


//             // }
//             // console.log(list_instances)
//             // setinstances(list_instances);
//             // console.log('instances : ',instances)
//         }
//         // console.log(instances)
//     }

//     // Code for componentWillMount here
//     // This code is called only one time before intial render

//     useEffect(() => {
//         // console.log(props.match.params.id)
//         if (!isLoaded) {
//             handleinstances();

//             // fetch(
//             //     `http://127.0.0.1:8080/api/series/${seriesId}/instances`
//             // ).then(function (response) {
//             //     if (response.status >= 200 && response.status < 300) {
//             //         return response;
//             //     }
//             //     console.log(response.status);
//             //     const error = new Error(`HTTP Error ${response.statusText}`);
//             //     error.status = response.statusText;
//             //     error.response = response;
//             //     throw error;
//             // }).then(response => {
//             //     return response.json();
//             // }).then(
//             //     (result)=>{
//             //         console.log('result : ',result)
//             //         // const array_result = [result]
//             //         // const array_result = result
//             //         setinstances(result.items);
//             //         console.log('after instances : ',instances)
//             //     }
//             // );
//         }


//         // const seriesId = seriesId;
//         // setMounted(true)
//         console.log('1')


//     }, [])


//     const prevInstance = () => {
//         const currentInstanceId = index;
//         const instancesCount = (instances || []).length;
//         if (instancesCount === 0)
//             return;
//         if (currentInstanceId === 0) {
//             setindex(instancesCount - 1);
//             setrotation(null);
//             // this.setState({index: instancesCount - 1, rotation: null});
//         }
//         else {
//             setindex(currentInstanceId - 1);
//             setrotation(null);
//             // this.setState({index: currentInstanceId - 1, rotation: null});
//         }
//     };

//     const nextInstance = () => {
//         const currentInstanceId = index;
//         const instancesCount = (instances || []).length;
//         if (instancesCount === 0)
//             return;
//         if (currentInstanceId + 1 === instancesCount) {
//             setrotation(null);
//             setindex(0);
//             // this.setState({index: 0, rotation: null});
//         }

//         else {
//             setindex(currentInstanceId + 1);
//             setrotation(null);
//             // this.setState({index: currentInstanceId + 1, rotation: null});
//         }
//     };

//     // const showTags = () => {
//     //     const instances = instances;
//     //     if (instances) {
//     //         const instanceId = instances[index]['id'];
//     //         DicomService.findTagsByInstanceId(instanceId, tags => {
//     //             setinstanceTags(tags);
//     //             // this.setState({instanceTags: tags});

//     //         });
//     //     }
//     // };


//     const zoomfunc = () => {
//         // this.setState({zoom: true});
//         setzoom(true);
//         // console.log('state zoom : ',this.state.zoom)
//     };



//     const rotateLeft = () => {
//         // this.setState({rotation: 'left'});
//         setrotation('left');
//         // console.log('hi')
//     };

//     const rotateRight = () => {
//         setrotation('right');
//         // this.setState({rotation: 'right'});
//     };

//     const setColorScale = (e, d) => {
//         setcolorScale(d.value);
//         // this.setState({colorScale: d.value})
//     };

//     const setViewMode = (e, d) => {
//         setviewMode(d.value);
//         // this.setState({viewMode: d.value})
//     }

//     const onApplyPlugin = (pluginId) => {
//         if (pluginId) {
//             const instance = instances[index];

//             // const instance = this.state.instances[this.state.index];
//             // console.log(instance);
//             props.history.push(`/instances/${instance['id']}/process/${pluginId}`);
//         }
//     };

//     const onKeyPress = (event) => {
//         if (event.key === 'ArrowLeft') {
//             prevInstance();
//         }
//         else if (event.key === 'ArrowRight') {
//             nextInstance();
//         }
//     };


//     /////////////////////////////





//     if (true) {
//         // if (me) {
//         // const index = index;
//         // middleware(index);
//         // const viewMode = viewMode;
//         if (viewMode === 'one') {

//             let list_url_images = []
//             // let stack;
//             const images = list_instances;
//             console.log('images : ', images[0])
//             // console.log('images.lengh : ', images[0].length)
//             // console.log('images part 4 : ', images)
//             images.forEach(myFunction);
//             function myFunction(item) {
//                 console.log('item : ',item)
//               }


//             for (let i = 0; i < images.length; i++) {
//                 // list_url_images.push(instances[i].id)
//                 list_url_images.push(`http://127.0.0.1:8080/api/instances/${images[i].id}/image`)
//                 // more statements
//             }
//             console.log('list_url_images', list_url_images)
//             const stack = {
//                 imageIds: list_url_images,

//                 currentImageIdIndex: index
//             };
//             console.log('stack : ', stack)

//             // createstack();
//             console.log('3')

//             // const images = instances;
//             const viewerProps = {
//                 style: {
//                     height: window.innerHeight
//                 },
//                 instance: images[index],
//                 rotation: rotation,
//                 colorScale: colorScale,
//             };



//             return (


//                 <div style={{
//                     background: 'black'
//                 }} tabIndex={'0'} onKeyDown={(event) => onKeyPress(event)}>
//                     <ControlPanel onHome={() => {
//                         props.history.push('/studies')
//                     }} onNextInstance={nextInstance} onPrevInstance={prevInstance}
//                         onSetColorScale={setColorScale} onRotateLeft={rotateLeft}
//                         onRotateRight={rotateRight} onSetViewMode={setViewMode}
//                         onApplyPlugin={onApplyPlugin} zoomFunc={zoomfunc}
//                     />

//                     <DicomViewer stack={{ ...stack }} {...viewerProps} />
//                 </div>

//             );
//         }

//     }

// }
