import React, {Component} from 'react';
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
            zoom: false,

        };
        this.setState = this.setState.bind(this);
    }

    componentWillMount() {
        const seriesId = this.state.seriesId;
        if (!this.state.isLoaded) {
            // DicomService.findInstancesBySeriesId(seriesId, instances => {
            //     this.setState({instances: instances, isLoaded: true});
            // });
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
            this.setState({index: instancesCount - 1, rotation: null});
        }
        else {
            this.setState({index: currentInstanceId - 1, rotation: null});
        }
    };

    nextInstance = () => {
        const currentInstanceId = this.state.index;
        const instancesCount = (this.state.instances || []).length;
        if (instancesCount === 0)
            return;
        if (currentInstanceId + 1 === instancesCount)
            this.setState({index: 0, rotation: null});
        else
            this.setState({index: currentInstanceId + 1, rotation: null});
    };

    showTags = () => {
        const instances = this.state.instances;
        if (instances) {
            const instanceId = instances[this.state.index]['id'];
            // DicomService.findTagsByInstanceId(instanceId, tags => {
            //     this.setState({instanceTags: tags});
            // });
        }
    };


    zoomfunc  = () => {
        this.setState({zoom: true});
        // console.log('state zoom : ',this.state.zoom)
    };



    rotateLeft = () => {
        this.setState({rotation: 'left'});
        // console.log('hi')
    };

    rotateRight = () => {
        this.setState({rotation: 'right'});
    };

    setColorScale = (e, d) => {
        this.setState({colorScale: d.value})
    };

    setViewMode = (e, d) => {
        this.setState({viewMode: d.value})
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
        const me = true;
        
        // if (instances && instances.length > 0) {
        if (me) {
            const index = this.state.index;
            const viewMode = this.state.viewMode;
            if (viewMode === 'one') {
                // console.log('viewmode one')
                const imageId = "https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg";
                const imageId1 = "http://127.0.0.1:8080/api/instances/1/image";
                const stack = {
                    imageIds: [imageId1],
                    currentImageIdIndex: 0
                  };
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
                        <div>
                            slm
                        </div>
                        <DicomViewer stack={{ ...stack }}/>
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
                                    <DicomViewer instance={instance1} {...viewerProps}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <DicomViewer instance={instance2} {...viewerProps}/>
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