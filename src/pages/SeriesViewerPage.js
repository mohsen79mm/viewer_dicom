import React, { Component } from 'react';
// import React, { useState, useEffect } from "react";
// import {
//     Grid
// } from "semantic-ui-react";
import DicomService from "../services/DicomService";
import DicomViewer from "../components/common/DicomViewer";
import axios from 'axios';

import ControlPanel from "../components/seriesViewerPage/ControlPanel";
// import {facebook} from '../services/Dicom'
// import axios from 'axios';


class SeriesViewerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instances: [],
            // seriesId: props.match.params.id,
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
            // tools
            zoom: false,
            wwwc: false,
            pan: false,
            angle: false,
            rectangleroi: false,
            magnify: false,
            eraser: false,
            scroll: false,
            status: true,
            maxRequest: 0,
            images: JSON.parse(localStorage.getItem('images')),




        };
        this.setState = this.setState.bind(this);
    }

    // componentWillMount() {
    //     const seriesId = this.state.seriesId;
    //     if (!this.state.isLoaded) {
    //         DicomService.findInstancesBySeriesId(seriesId, instances => {
    //             this.setState({ instances: instances, isLoaded: true });
    //         });

    //     }
    // }

        // axios({
        //     method: 'get',
        //     url: `http://127.0.0.1:8080/api/instances`,
        //     withCredentials: false,

        //   }).then(function (response) {
        //     console.log(response.data);
        //   });



        //here get all images for better performance 


    // status = False -> stopped hammer time :) request nazan
    // status = True -> Request bezan
    // componentDidMount(){
    //     this.timer = setInterval(()=> this.getMovies(), 1000)
    // }   

    // async getMovies(){
    //     if(this.state.status){
    //         if(this.state.maxRequest < 10){

    //             axios({
    //                 method: 'get',
    //                 url: `http://127.0.0.1:8080/api/instances/1/image`,
    //                 withCredentials: false,
    //                 responseType:"blob"

    //               }).then(function (response) {
    //                 return response.data
    //               }).then((res) => {
    //                 console.log("response.blob() : ",res)
    //               })

    //             this.setState({maxRequest:this.state.maxRequest+1})
    //         }


    //     }

    // }


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
            })
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


    scrollfunc = () => {
        this.setState({ scroll: true, wwwc: false, pan: false, magnify: false, angle: false, rectangleroi: false, eraser: false });
        // console.log('state zoom : ',this.state.zoom)
        localStorage.setItem('scroll', this.state.scroll);
        localStorage.setItem('wwwc', this.state.wwwc);
        localStorage.setItem('pan', this.state.pan);
        localStorage.setItem('magnify', this.state.magnify);
        localStorage.setItem('angle', this.state.angle);
        localStorage.setItem('rectangleroi', this.state.rectangleroi);
        localStorage.setItem('eraser', this.state.eraser);
    };
    panfunc = () => {
        this.setState({ scroll: false, wwwc: false, pan: true, magnify: false, angle: false, rectangleroi: false, eraser: false });
        // console.log('state zoom : ',this.state.zoom)
        localStorage.setItem('scroll', this.state.scroll);
        localStorage.setItem('wwwc', this.state.wwwc);
        localStorage.setItem('pan', this.state.pan);
        localStorage.setItem('magnify', this.state.magnify);
        localStorage.setItem('angle', this.state.angle);
        localStorage.setItem('rectangleroi', this.state.rectangleroi);
        localStorage.setItem('eraser', this.state.eraser);
    };
    wwwcfunc = () => {
        this.setState({ scroll: false, wwwc: true, pan: false, magnify: false, angle: false, rectangleroi: false, eraser: false });
        // console.log('state zoom : ',this.state.zoom)
        localStorage.setItem('scroll', this.state.scroll);
        localStorage.setItem('wwwc', this.state.wwwc);
        localStorage.setItem('pan', this.state.pan);
        localStorage.setItem('magnify', this.state.magnify);
        localStorage.setItem('angle', this.state.angle);
        localStorage.setItem('rectangleroi', this.state.rectangleroi);
        localStorage.setItem('eraser', this.state.eraser);
    };
    anglefunc = () => {
        this.setState({ scroll: false, wwwc: false, pan: false, magnify: false, angle: true, rectangleroi: false, eraser: false });
        // console.log('state zoom : ',this.state.zoom)
        localStorage.setItem('scroll', this.state.scroll);
        localStorage.setItem('wwwc', this.state.wwwc);
        localStorage.setItem('pan', this.state.pan);
        localStorage.setItem('magnify', this.state.magnify);
        localStorage.setItem('angle', this.state.angle);
        localStorage.setItem('rectangleroi', this.state.rectangleroi);
        localStorage.setItem('eraser', this.state.eraser);
    };
    rectangleroifunc = () => {
        this.setState({ scroll: false, wwwc: false, pan: false, magnify: false, angle: false, rectangleroi: true, eraser: false });
        // console.log('state zoom : ',this.state.zoom)
        localStorage.setItem('scroll', this.state.scroll);
        localStorage.setItem('wwwc', this.state.wwwc);
        localStorage.setItem('pan', this.state.pan);
        localStorage.setItem('magnify', this.state.magnify);
        localStorage.setItem('angle', this.state.angle);
        localStorage.setItem('rectangleroi', this.state.rectangleroi);
        localStorage.setItem('eraser', this.state.eraser);
    };
    magnifyfunc = () => {
        this.setState({ scroll: false, wwwc: false, pan: false, magnify: true, angle: false, rectangleroi: false, eraser: false });
        // console.log('state zoom : ',this.state.zoom)
        localStorage.setItem('scroll', this.state.scroll);
        localStorage.setItem('wwwc', this.state.wwwc);
        localStorage.setItem('pan', this.state.pan);
        localStorage.setItem('magnify', this.state.magnify);
        localStorage.setItem('angle', this.state.angle);
        localStorage.setItem('rectangleroi', this.state.rectangleroi);
        localStorage.setItem('eraser', this.state.eraser);
    };
    eraserfunc = () => {
        // console.log('clicked eraser jusus')
        this.setState({ scroll: false, wwwc: false, pan: false, magnify: false, angle: false, rectangleroi: false, eraser: true });
        // console.log('state zoom : ',this.state.zoom)
        localStorage.setItem('scroll', this.state.scroll);
        localStorage.setItem('wwwc', this.state.wwwc);
        localStorage.setItem('pan', this.state.pan);
        localStorage.setItem('magnify', this.state.magnify);
        localStorage.setItem('angle', this.state.angle);
        localStorage.setItem('rectangleroi', this.state.rectangleroi);
        localStorage.setItem('eraser', this.state.eraser);
    };



    rotateLeft = () => {
        this.setState({ rotation: 'left', zoom: false });
        // this.setState({ zoom: false });
        localStorage.setItem('zoom', this.state.zoom);

        // console.log('hi')
    };

    rotateRight = () => {
        this.setState({ rotation: 'right', zoom: false });
        // this.setState({ zoom: false });
        localStorage.setItem('zoom', this.state.zoom);
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
    onMouse = (number,list_url_images) => {
        const stack = {
            imageIds: list_url_images,

            currentImageIdIndex: number
        };
        localStorage.setItem('stack', JSON.stringify(stack));
    };


    render() {

        if (this.state.images && this.state.images.length > 0) {

            const viewMode = this.state.viewMode;
            if (viewMode === 'one') {
                var list_url_images = []
                for (let i = 0; i < this.state.images.length; i++) {

                    list_url_images.push(`http://127.0.0.1:8000${this.state.images[i].path}`)
                    // axios.get(`http://127.0.0.1:8000${this.state.images[i].path}`, { responseType: 'arraybuffer' })
                    //     .then(response => {
                    //         let blob = new Blob(
                    //             [response.data],
                    //             { type: response.headers['content-type'] }
                    //         )
                    //         let image = URL.createObjectURL(blob)
                    //         list_url_images.push(image)
                    //         // return image
                    //     })

                }
                // console.log('list_url_images : ',list_url_images)
                const stack = {
                    imageIds: list_url_images,

                    currentImageIdIndex: 0
                };
                const stack1 = {
                    imageIds: [list_url_images[0]],

                    currentImageIdIndex: 0
                };
                const stack2 = {
                    imageIds: [list_url_images[1]],

                    currentImageIdIndex: 0
                };
                const stack3 = {
                    imageIds: [list_url_images[2]],

                    currentImageIdIndex: 0
                };
                const stack4 = {
                    imageIds: [list_url_images[3]],

                    currentImageIdIndex: 0
                };
                // localStorage.setItem('user', JSON.stringify(user));
                // localStorage.setItem('stack1', JSON.stringify(stack1));
                // localStorage.setItem('stack2', JSON.stringify(stack2));
                // localStorage.setItem('stack3', JSON.stringify(stack3));
                // const storedClicks = localStorage.getItem('index');
                // console.log('storedClicks : >>>>>>>>>>>>>>>>>>>>>', storedClicks)

                this.dicom = null
                if (this.state.images.length === 1) {
                    // localStorage.setItem('stack', JSON.stringify(stack1));

                    const viewerProps = {
                        h: '94vh',
                        style: {
                            height: window.innerHeight
                        },


                    };
                    this.dicom = <DicomViewer stack={{ ...stack }} port={{ ...viewerProps }} />
                }
                else if (this.state.images.length === 2) {
                    const viewerProps = {
                        h: '94vh',
                        style: {
                            height: window.innerHeight
                        },


                    };
                    this.dicom =
                        <div style={{ display: 'flex' }}>
                            <div onMouseEnter={ () => {this.onMouse(0,list_url_images)}} style={{ margin: '3px', width: '50%', border: ' 3px solid #20a5d6', }}>  <DicomViewer stack={{ ...stack1 }} port={{ ...viewerProps }} /> </div>
                            <div onMouseEnter={ () => {this.onMouse(1,list_url_images)}} style={{ margin: '3px', width: '50%', border: ' 3px solid #20a5d6', }}>  <DicomViewer stack={{ ...stack2 }} port={{ ...viewerProps }} /> </div>
                        </div>
                }
                else if (this.state.images.length === 3) {
                    const viewerProps = {
                        h: '94vh',
                        style: {
                            height: window.innerHeight
                        },


                    };
                    this.dicom =
                        <div style={{ display: 'flex' }}>
                            <div onMouseEnter={ () => {this.onMouse(0,list_url_images)}} style={{ margin: '3px', width: '33%', border: ' 3px solid #20a5d6', }}>  <DicomViewer stack={{ ...stack1 }} port={{ ...viewerProps }} /> </div>
                            <div onMouseEnter={ () => {this.onMouse(1,list_url_images)}} style={{ margin: '3px', width: '33%', border: ' 3px solid #20a5d6', }}>  <DicomViewer stack={{ ...stack2 }} port={{ ...viewerProps }} /> </div>
                            <div onMouseEnter={ () => {this.onMouse(2,list_url_images)}} style={{ margin: '3px', width: '33%', border: ' 3px solid #20a5d6', }}>  <DicomViewer stack={{ ...stack3 }} port={{ ...viewerProps }} /> </div>
                        </div>

                }
                else if (this.state.images.length === 4) {
                    const viewerProps = {
                        h: '43vh',
                        style: {
                            height: window.innerHeight
                        },

                    };

                    this.dicom = <div>

                        <div style={{ display: 'flex' }}>
                            <div onMouseEnter={ () => {this.onMouse(0,list_url_images)}} style={{ margin: '3px', width: '50%', border: ' 3px solid #20a5d6', }}>  <DicomViewer stack={{ ...stack1 }} port={{ ...viewerProps }} /> </div>
                            <div onMouseEnter={ () => {this.onMouse(1,list_url_images)}} style={{ margin: '3px', width: '50%', border: ' 3px solid #20a5d6', }}>  <DicomViewer stack={{ ...stack2 }} port={{ ...viewerProps }} /> </div>
                        </div>

                        <div style={{ display: 'flex' }}>
                            <div onMouseEnter={ () => {this.onMouse(2,list_url_images)}} style={{ margin: '3px', width: '50%', border: ' 3px solid #20a5d6', }}>  <DicomViewer stack={{ ...stack3 }} port={{ ...viewerProps }} /> </div>
                            <div onMouseEnter={ () => {this.onMouse(3,list_url_images)}} style={{ margin: '3px', width: '50%', border: ' 3px solid #20a5d6', }}>  <DicomViewer stack={{ ...stack4 }} port={{ ...viewerProps }} /> </div>
                        </div>

                    </div>
                }
                else {
                    console.log('heeyyyy :((')
                }



                return (


                    <div style={{
                        background: 'black'
                    }} tabIndex={'0'} onKeyDown={(event) => this.onKeyPress(event)}>

                        <ControlPanel onHome={() => {
                            this.props.history.push('/studies')
                        }} onNextInstance={this.nextInstance} onPrevInstance={this.prevInstance}
                            onSetColorScale={this.setColorScale} onRotateLeft={this.rotateLeft}
                            onRotateRight={this.rotateRight} onSetViewMode={this.setViewMode}
                            onApplyPlugin={this.onApplyPlugin} scrollFunc={this.scrollfunc}
                            panFunc={this.panfunc} wwwcFunc={this.wwwcfunc} angleFunc={this.anglefunc}
                            rectangleroiFunc={this.rectangleroifunc} magnifyFunc={this.magnifyfunc}
                            eraserFunc={this.eraserfunc}

                        />

                        {this.dicom}



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
                        onApplyPlugin={this.onApplyPlugin} scrollFunc={this.scrollfunc}
                        panFunc={this.panfunc} wwwcFunc={this.wwwcfunc} angleFunc={this.anglefunc}
                        rectangleroiFunc={this.rectangleroifunc} magnifyFunc={this.magnifyfunc}
                        eraserFunc={this.eraserfunc}
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

