// import React from "react";
import React from "react";
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


// i change line  13681 with 13682 in cornerstoneTools.js



// const divStyle = {
//     width: "512px",
//     height: "512px",
//     position: "relative",
//     color: "white"
// };


class DicomViewer extends React.Component {
    static contextType = UserContext
    constructor(props) {
        super(props);
        const stackData = props.stack;
        // localStorage.getItem('stack')
        this.state = {
            zoom: localStorage.getItem('zoom'),
            stack: stackData,
            viewport: cornerstone.getDefaultViewport(null, undefined),
            imageId: stackData.imageIds[0],
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
                    // style={{ height: '95vh' }}
                    style={{ height: '43vh' }}
                    ref={input => {
                        this.element = input;
                    }}
                >
                </div>
                <div style={{display:'flex'}}>
                    <div style={{width:'65%',color:'white'}} >Zoom: {this.state.viewport.scale}</div>
                    <div style={{width:'35%',color:'white'}}  >
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

    updateTools() {

        







        let value_magnify = localStorage.getItem('magnify')
        // let value_zoom = localStorage.getItem('zoom')
        let value_wwwc = localStorage.getItem('wwwc')
        let value_pan = localStorage.getItem('pan')
        let value_rectangleroi = localStorage.getItem('rectangleroi')
        let value_angle = localStorage.getItem('angle')
        let value_eraser = localStorage.getItem('eraser')
        // let value_scroll = localStorage.getItem('scroll')


        if (value_pan === 'true') {

            cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 })


        } else if (value_wwwc === 'true') {

            cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 })

        } else if (value_rectangleroi === 'true') {

            cornerstoneTools.setToolActive('RectangleRoi', { mouseButtonMask: 1 })

        } else if (value_angle === 'true') {
            // const AngleTool = cornerstoneTools.AngleTool;
            // cornerstoneTools.addTool(AngleTool)
            // cornerstoneTools.setToolActive('CobbAngle', { mouseButtonMask: 1 })
            cornerstoneTools.setToolActive('Angle', { mouseButtonMask: 1 })

        } else if (value_magnify === 'true') {

            cornerstoneTools.setToolActive('Magnify', { mouseButtonMask: 1 })

        } else if (value_eraser === 'true') {

            cornerstoneTools.setToolActive('Eraser', { mouseButtonMask: 1 })

        }






    }

    componentDidMount() {



        cornerstoneTools.init();
        const element = this.element;
        const stack = this.props.stack;

        //tools
        // const StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool
        // const MagnifyTool = cornerstoneTools.MagnifyTool;
        const ZoomMouseWheelTool = cornerstoneTools.ZoomMouseWheelTool;


        // Enable the DOM Element for use with Cornerstone
        cornerstone.enable(element);
        // console.log('element : ',element)
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

        // console.log('stackdata : ', stackData)
        // const stack = ;
        //first tool - need scroll mouse

        // cornerstoneTools.addTool(StackScrollMouseWheelTool)
        // cornerstoneTools.setToolActive('StackScrollMouseWheel', {})
        cornerstoneTools.addTool(ZoomMouseWheelTool)
        cornerstoneTools.setToolActive('ZoomMouseWheel', { mouseButtonMask: 1 })

        // toooolllllllsssss
        // const ZoomTool = cornerstoneTools.ZoomTool;
        const PanTool = cornerstoneTools.PanTool;
        const WwwcTool = cornerstoneTools.WwwcTool;
        const MagnifyTool = cornerstoneTools.MagnifyTool;
        const RectangleRoiTool = cornerstoneTools.RectangleRoiTool;
        // const CobbAngleTool = cornerstoneTools.CobbAngleTool;
        const AngleTool = cornerstoneTools.AngleTool;
        const EraserTool = cornerstoneTools.EraserTool;
        // const StackScrollTool = cornerstoneTools.StackScrollTool


        cornerstoneTools.addTool(PanTool)
        // cornerstoneTools.addTool(StackScrollTool)
        cornerstoneTools.addTool(MagnifyTool);
        cornerstoneTools.addTool(AngleTool)
        cornerstoneTools.addTool(WwwcTool)
        cornerstoneTools.addTool(RectangleRoiTool)
        // cornerstoneTools.addTool(MagnifyTool)
        cornerstoneTools.addTool(EraserTool)


    }

    componentWillUnmount() {
        // console.log('willunmount .........')
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