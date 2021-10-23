import React, { Component } from 'react';
import { Link } from "react-router-dom";

import {  Menu, Segment, Image } from "semantic-ui-react";
// import {Translate, setActiveLanguage} from "react-localize-redux";



class MenuContainer extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        // this.changeLanguage = this.props.changeLanguage;
    }

    // onChangeLanguage = (e) => {
    //     this.changeLanguage(languagesOptions[e.target.innerHTML]);
    // };

    render() {
        return (


            <div>
                <Segment inverted style={{ borderRadius: '0px', display: 'flex', backgroundColor: 'white' }}>
                    <Menu inverted style={{ width: '100%',backgroundColor:'#ff6708' }}>
                        <Menu.Item as={Link} to='/patients' name={'patients'}
                            active={this.props.activeItem === 'patients'} />
                        <Menu.Item as={Link} to='/studies' name={'studies'}
                            active={this.props.activeItem === 'studies'} />
                        {/* <Menu.Item as={Link} to='/plugins' name={translate('plugin.plugins')}
                                                   active={this.props.activeItem === 'plugins'}/> */}
                        {/* <Menu.Item as={Link} to='/dicom_nodes' name={translate('dicomNode.dicomNodes')}
                                                   active={this.props.activeItem === 'DICOM nodes'}/> */}

                        {/* <Menu.Item position='right'>
                                            <Button as={Link} to={'/dicom/upload'}
                                                    primary>{translate('uploadDicom.uploadDicom')}</Button>
                                        </Menu.Item> */}
                        <Menu.Item position='right'>


                            <Image src='/images/logo.jpg' size='tiny' />

                        </Menu.Item>
                    </Menu>
                </Segment>
                <div style={{ margin: '15px' }}>
                    {this.props.children}
                </div>
            </div>




        )
    }
}

MenuContainer.defaultProps = {
    activeItem: ''
};

// const mapStateToProps = (state) => (
//     {}
// );

// const mapDispatchToProps = (dispatch) => (
//     {
//         changeLanguage(languageCode) {
//             console.log(languageCode);
//             dispatch(setActiveLanguage(languageCode));
//         }
//     }
// );

export default (MenuContainer);