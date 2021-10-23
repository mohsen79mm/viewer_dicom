import React, { Component } from 'react';
import { Button, Icon, Menu,Image } from "semantic-ui-react";
import PropTypes from 'prop-types';
import PluginsService from "../../services/PluginsService";
import './control.css';


class ControlPanel extends Component {
    constructor(props) {
        super(props);


        this.onHome = this.props.onHome || function () {
        };
        this.onNextInstance = this.props.onNextInstance || function () {
        };
        this.onPrevInstance = this.props.onPrevInstance || function () {
        };
        this.onPlay = this.props.onPlay || function () {
        };
        this.onStop = this.props.onStop || function () {
        };
        this.onSetColorScale = this.props.onSetColorScale || function () {
        };
        this.onSetViewMode = this.props.onSetViewMode || function () {
        };
        this.onRotateLeft = this.props.onRotateLeft || function () {
        };
        this.onRotateRight = this.props.onRotateRight || function () {
        };
        this.onApplyPlugin = this.props.onApplyPlugin || function () {
        };
        // this.scrollFunc = this.props.scrollFunc || function () {
        // };
        this.wwwcFunc = this.props.wwwcFunc || function () {
        };
        this.panFunc = this.props.panFunc || function () {
        };
        this.angleFunc = this.props.angleFunc || function () {
        };
        this.rectangleroiFunc = this.props.rectangleroiFunc || function () {
        };
        this.magnifyFunc = this.props.magnifyFunc || function () {
        };
        this.eraserFunc = this.props.eraserFunc || function () {
        };



        this.setState = this.setState.bind(this);
        this.state = {
            pluginOptions: [],
            pluginId: null
        }
    }

    componentDidMount = () => {
        PluginsService.findPlugins((plugins) => {
            // console.log(plugins);
            const pluginOptions = plugins.filter(plugin => plugin['is_installed'])
                .map(plugin => {
                    return { key: plugin.id, value: plugin.id, text: plugin['display_name'] };
                }
                );
            this.setState({ pluginOptions: pluginOptions })
        });
    }

    onSelectPlugin = (e, o) => {
        // this.setState({
        //     pluginId: o.value
        // });
    };

    onApplyPluginCallback = (e, o) => {
        const onApplyPlugin = this.onApplyPlugin;
        const pluginId = o.value;
        if (pluginId) {
            onApplyPlugin(pluginId);
        }
    };
// backgroundColor: '#ff6708'
    render = () => {
        

        return (
            <Menu inverted style={{  borderRadius: '0px', marginBottom: '0px',display:'flex' }}>
                <Menu inverted style={{ width:'90%' }}>

                    <Menu.Item   >
                        <Button size={'small'} icon inverted onClick={this.onHome}>
                            <Icon name={'home'} />
                            <p>Home</p>
                        </Button>
                    </Menu.Item>
                    {/* <Menu.Item>
                        <Button icon inverted onClick={this.scrollFunc}>
                            <Icon name={'bars'} />
                            <p>scroll</p>
                        </Button>
                    </Menu.Item> */}
                    <Menu.Item>
                        <Button icon inverted onClick={this.wwwcFunc}>
                            <Icon name={'adjust'} />
                            <p>Wwwc</p>
                        </Button>
                    </Menu.Item>
                    <Menu.Item >
                        <Button icon inverted onClick={this.panFunc}>
                            <Icon name={'expand arrows alternate'} />
                            <p>Pan</p>
                        </Button>
                    </Menu.Item>
                    <Menu.Item >
                        <Button icon inverted onClick={this.angleFunc}>
                            <Icon name={'angle left'} />
                            <p>angle</p>
                        </Button>
                    </Menu.Item>
                    <Menu.Item >
                        <Button icon inverted onClick={this.rectangleroiFunc}>
                            {/* <Icon name={'square outline'} /> */}
                            <Icon name={'square'} />
                            <p>rectangleroi</p>
                        </Button>
                    </Menu.Item>
                    <Menu.Item >
                        <Button icon inverted onClick={this.magnifyFunc}>
                            <Icon name={'search'} />
                            <p>magnify</p>
                        </Button>
                    </Menu.Item>
                    <Menu.Item >
                        <Button icon inverted onClick={this.eraserFunc}>
                            <Icon name={'eraser'} />
                            <p>eraser</p>
                        </Button>
                    </Menu.Item>
                </Menu>

                <Menu>
                    <Menu.Item position='right'>


                        <Image src='/images/logo.jpg' size='tiny' />

                    </Menu.Item>

                </Menu>

            </Menu>
        );
    }
}

ControlPanel.propTypes = {
    onHome: PropTypes.func,
    onPrevInstance: PropTypes.func,
    onNextInstance: PropTypes.func,
    onPlay: PropTypes.func,
    onStop: PropTypes.func,
    onSetColorScale: PropTypes.func,
    onSetViewMode: PropTypes.func,
    onRotateLeft: PropTypes.func,
    onRotateRight: PropTypes.func,
    onApplyPlugin: PropTypes.func
};

export default ControlPanel;


