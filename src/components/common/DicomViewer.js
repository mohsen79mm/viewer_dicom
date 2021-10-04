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
        console.log('enabledElement : ', enabledElement)
        this.setState({
            imageId: enabledElement.image.imageId
        });
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

            // Add the stack tool state to the enabled element

            //   cornerstoneTools.init();
            // cornerstoneTools.addStackStateManager(element, ["stack"]);
            // cornerstoneTools.addToolState(element, "stack", stack);



            // cornerstoneTools.mouseInput.enable(element);
            // cornerstoneTools.mouseWheelInput.enable(element);
            // cornerstoneTools.wwwc.activate(element, 1);
            // cornerstoneTools.pan.activate(element, 2);
            // cornerstoneTools.zoom.activate(element, 4);
            // cornerstoneTools.zoomWheel.activate(element);
            // cornerstoneTools.touchInput.enable(element);
            // cornerstoneTools.panTouchDrag.activate(element);
            // cornerstoneTools.zoomTouchPinch.activate(element);

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
        //second tool -need click mouse
        cornerstoneTools.addTool(PanTool)
        cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 })
        //third tool -need click mouse
        cornerstoneTools.addTool(cornerstoneTools.ZoomTool, {
            // Optional configuration
            configuration: {
                invert: false,
                preventZoomOutsideImage: false,
                minScale: .1,
                maxScale: 20.0,
            }
        });

        cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 })
        //forth tool -need click mouse
        cornerstoneTools.addTool(WwwcTool)
        cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 })


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

        // const stackData = cornerstoneTools.getToolState(this.element, "stack");
        // console.log('stackdata : ', stackData)
        // const stack = ;
        // const stack = stackData.data[0];

        // console.log('stack : ', stack)
        // stack.currentImageIdIndex = stack.currentImageIdIndex;
        // console.log('currentImageIdIndex : ',stack.currentImageIdIndex)
        // console.log('stack.currentImageIdIndex ',stack.currentImageIdIndex)
        // console.log('addad ',localStorage.getItem('index'))
        // console.log('update ',this.state.stack.imageIds)
        // stack.imageIds = this.state.stack.imageIds;
        // cornerstoneTools.addToolState(this.element, "stack", stack);
        // console.log('stack : ', stack)
        // const imageId = stack.imageIds[localStorage.getItem('index')];
        // cornerstoneTools.scrollToIndex(this.element, localStorage.getItem('index'));
    }
}



export default DicomViewer;