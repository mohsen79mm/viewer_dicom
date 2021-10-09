import React, { Component } from 'react';
// import React, { useState, useEffect } from "react";
import {
    Grid
} from "semantic-ui-react";
import DicomService from "../services/DicomService";
import DicomViewer from "../components/common/DicomViewer";
import ControlPanel from "../components/seriesViewerPage/ControlPanel";



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
            // tools
            zoom: false,
            wwwc:false,
            pan:false,
            angle:false,
            rectangleroi:false,
            magnify:false,
            eraser:false,
            scroll:false,
            



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
        //here get all images for better performance 


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
        this.setState({ scroll: true ,wwwc:false,pan:false, magnify:false,angle:false,rectangleroi:false,eraser:false});
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
        this.setState({ scroll: false ,wwwc:false,pan:true, magnify:false,angle:false,rectangleroi:false,eraser:false});
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
        this.setState({ scroll: false ,wwwc:true,pan:false, magnify:false,angle:false,rectangleroi:false,eraser:false});
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
        this.setState({ scroll: false ,wwwc:false,pan:false , magnify:false,angle:true,rectangleroi:false,eraser:false});
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
        this.setState({ scroll: false ,wwwc:false,pan:false, magnify:false,angle:false,rectangleroi:true,eraser:false});
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
        this.setState({ scroll: false ,wwwc:false,pan:false, magnify:true,angle:false,rectangleroi:false,eraser:false});
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
        this.setState({ scroll: false ,wwwc:false,pan:false, magnify:false,angle:false,rectangleroi:false,eraser:true});
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
        this.setState({ rotation: 'left',zoom:false });
        // this.setState({ zoom: false });
        localStorage.setItem('zoom', this.state.zoom);
        
        // console.log('hi')
    };
    
    rotateRight = () => {
        this.setState({ rotation: 'right',zoom:false });
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


    render() {
        // console.log('list : ',this.state.list_image)
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
                // localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('stack',JSON.stringify(stack));
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
                            onApplyPlugin={this.onApplyPlugin} scrollFunc={this.scrollfunc}
                            panFunc={this.panfunc} wwwcFunc={this.wwwcfunc} angleFunc={this.anglefunc}
                            rectangleroiFunc={this.rectangleroifunc} magnifyFunc={this.magnifyfunc} 
                            eraserFunc={this.eraserfunc} 
                            
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
                            onApplyPlugin={this.onApplyPlugin} scrollFunc={this.scrollfunc}
                            panFunc={this.panfunc} wwwcFunc={this.wwwcfunc} angleFunc={this.anglefunc}
                            rectangleroiFunc={this.rectangleroifunc} magnifyFunc={this.magnifyfunc} 
                            eraserFunc={this.eraserfunc} 
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

