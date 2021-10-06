// import React from "react";
import React, { Component, createContext, useContext } from "react";

import { render } from "react-dom";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";
import './DicomViewer.css';
import UserContext from '../../pages/SeriesViewerPage';

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;

const divStyle = {
    width: "512px",
    height: "512px",
    position: "relative",
    color: "white"
};

const bottomLeftStyle = {
    bottom: "5px",
    left: "5px",
    position: "absolute",
    color: "white"
};

const bottomRightStyle = {
    bottom: "5px",
    right: "5px",
    position: "absolute",
    color: "white"
};

class DicomViewer extends React.Component {
    static contextType = UserContext
    constructor(props) {
        super(props);

        this.state = {
            zoom:localStorage.getItem('zoom'),
            stack: props.stack,
            viewport: cornerstone.getDefaultViewport(null, undefined),
            imageId: props.stack.imageIds[0],
            // index_image: props.stack.currentImageIdIndex,
        };
        // const storedClicks = localStorage.getItem('index');
        // console.log('storedClicks : >>>>>>>>>>>>>>>>>>>>>', storedClicks)
        this.onImageRendered = this.onImageRendered.bind(this);
        this.onNewImage = this.onNewImage.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.updateTools = this.updateTools.bind(this);
    }

    render() {
        // const storedClicks = localStorage.getItem('index');
        // console.log('storedClicks : >>>>>>>>>>>>>>>>>>>>>', storedClicks)
        return (
            <div>
                <div
                    className="viewportElement"
                    style={{ height: '95vh' }}
                    ref={input => {
                        this.element = input;
                    }}
                >
                    {/* <canvas className="cornerstone-canvas" /> */}
                    <div style={bottomLeftStyle}>Zoom: {this.state.viewport.scale}</div>
                    <div style={bottomRightStyle}>
                        WW/WC: {this.state.viewport.voi.windowWidth} /{" "}
                        {this.state.viewport.voi.windowCenter}
                    </div>
                </div>
            </div>
        );
    }

    onWindowResize() {
        // console.log("onWindowResize");
        cornerstone.resize(this.element);
    }

    onImageRendered() {
        const viewport = cornerstone.getViewport(this.element);
        // console.log(viewport);

        this.setState({
            viewport
        });

        // console.log(this.state.viewport);
    }

    onNewImage() {
        const enabledElement = cornerstone.getEnabledElement(this.element);
        // console.log('enabledElement : ', enabledElement)
        this.setState({
            imageId: enabledElement.image.imageId
        });
    }

    updateTools(){
        const PanTool = cornerstoneTools.PanTool;
        const ZoomTool = cornerstoneTools.ZoomTool;
        const WwwcTool = cornerstoneTools.WwwcTool;
        
        
        
        let value_zoom  = localStorage.getItem('zoom')
        let value_wwwc = localStorage.getItem('wwwc')
        let value_pan  = localStorage.getItem('pan')
        
        if(value_zoom == 'true'){
            // console.log('zoom_state : ',zoom_state)
            cornerstoneTools.addTool(ZoomTool, {
                // Optional configuration
                configuration: {
                    invert: false,
                    preventZoomOutsideImage: false,
                    minScale: .1,
                    maxScale: 20.0,
                }
            });

            cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 })
        }else if(value_pan == 'true') {
            cornerstoneTools.addTool(PanTool)
            cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 })
        }else if(value_wwwc == 'true'){

            cornerstoneTools.addTool(WwwcTool)
            cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 })
        } else {
            console.log('srry !!!!')
        }

    


    }

    componentDidMount() {
        cornerstoneTools.init()
        const element = this.element;
        const stack = this.props.stack;

        //tools
        const StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool
        const PanTool = cornerstoneTools.PanTool;
        const ZoomTool = cornerstoneTools.ZoomTool;
        const WwwcTool = cornerstoneTools.WwwcTool;

        // Enable the DOM Element for use with Cornerstone
        cornerstone.enable(element);

        // Load the first image in the stack
        cornerstone.loadImage(this.state.imageId).then(image => {
            // Display the first image
            cornerstone.displayImage(element, image);
            cornerstoneTools.addStackStateManager(element, ['stack'])
            cornerstoneTools.addToolState(element, 'stack', stack)

        });


        element.addEventListener(
            "cornerstoneimagerendered",
            this.onImageRendered
        );
        element.addEventListener("cornerstonenewimage", this.onNewImage);
        window.addEventListener("resize", this.onWindowResize);

        // adding tools

        //first tool - need scroll mouse

        cornerstoneTools.addTool(StackScrollMouseWheelTool)
        cornerstoneTools.setToolActive('StackScrollMouseWheel', {})
        
    }

    componentWillUnmount() {
        const element = this.element;
        element.removeEventListener(
            "cornerstoneimagerendered",
            this.onImageRendered
        );

        element.removeEventListener("cornerstonenewimage", this.onNewImage);

        window.removeEventListener("resize", this.onWindowResize);

        cornerstone.disable(element);
    }

    componentDidUpdate(prevProps, prevState) {
        

        this.updateTools();
        
    }
}



export default DicomViewer;