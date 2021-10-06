import React, {Component} from 'react';

import {
    Button, Checkbox, Container, Dropdown, Form, Icon, Input, Menu, Radio, Segment, Select, Sidebar, Table,
    TextArea, TransitionablePortal as visible
} from "semantic-ui-react";
import StudiesService from "../services/DicomService";
import {Link} from "react-router-dom";
import MenuContainer from "../components/common/MenuContainer";

const patientMatcherOptions = [
    {key: 'EXACT', text: 'Exact search', value: 'EXACT'},
    {key: 'STARTS_WITH', text: 'Begin with...', value: 'STARTS_WITH'},
    {key: 'ENDS_WITH', text: 'Ends ...', value: 'ENDS_WITH'},
    {key: 'FUZZY', text: 'Fuzzy search', value: 'FUZZY'},
];
const options = [
    {key: 'DX', text: 'DX', value: 'DX'},
    {key: 'MR', text: 'MR', value: 'MR'},
    {key: 'CT', text: 'CT', value: 'CT'},
    {key: 'US', text: 'US', value: 'US'},
    {key: 'ECG', text: 'ECG', value: 'ECG'},
    {key: 'XA', text: 'XA', value: 'XA'},
    {key: 'OT', text: 'OT', value: 'OT'},
];

class StudiesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studies: []
        };
        this.setState.bind(this);
    }

    componentWillMount() {
        StudiesService.findStudies(studyList => {
            // console.log(studyList);
            this.setState({studies: studyList})
        });
    }

    render() {
        const {activeItem} = this.state;
        return (
            <MenuContainer activeItem='studies'>
                
                            <div>
                                <Form>
                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            label={'Patient Name'}
                                            action={<Dropdown button basic floating options={patientMatcherOptions}
                                                              defaultValue='EXACT'/>}
                                            icon='search'
                                            iconPosition='left'
                                            placeholder={'Patient Name'}
                                        />
                                        <Form.Input
                                            label={'Study ID'}
                                            action={<Dropdown button basic floating options={patientMatcherOptions}
                                                              defaultValue='EXACT'/>}
                                            icon='search'
                                            iconPosition='left'
                                            placeholder={'Study ID'}
                                        />
                                        <Form.Field control={Select} label={'Modality'}
                                                    options={options}
                                                    placeholder={'Modality'}/>
                                    </Form.Group>
                                </Form>
                                <Table>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>{'Patient Name'}</Table.HeaderCell>
                                            <Table.HeaderCell>{'Study ID'}</Table.HeaderCell>
                                            <Table.HeaderCell>{'Study Date'}</Table.HeaderCell>
                                            <Table.HeaderCell>{'Study Description'}</Table.HeaderCell>
                                            <Table.HeaderCell>{'Modality'}</Table.HeaderCell>
                                            <Table.HeaderCell>{'Images Count'}</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            this.state.studies.map(study => {
                                                return (
                                                    <Table.Row>
                                                        <Table.Cell>
                                                            {study['patient']['patient_name']}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Link to={`/studies/${study['id']}`}>
                                                                {study['study_instance_uid']}
                                                            </Link>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {study['study_date']}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {study['study_description']}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {study['modalities'].join(', ')}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {study['images_count']}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                );
                                            })
                                        }
                                    </Table.Body>
                                </Table>
                            </div>
                        
            </MenuContainer>
        )
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default (StudiesPage);