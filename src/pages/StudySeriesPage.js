import React, {Component} from 'react';
import {
    Button, Checkbox, Divider, Dropdown, Form, Grid, Header, Input, Message, Radio, Segment, Select, Table,
    TextArea
} from "semantic-ui-react";
import StudiesService from "../services/DicomService";
import MenuContainer from "../components/common/MenuContainer";
import {Link} from "react-router-dom";
// import {Translate} from "react-localize-redux";

const options = [
    {key: 'DX', text: 'DX', value: 'DX'},
    {key: 'MR', text: 'MR', value: 'MR'},
    {key: 'CT', text: 'CT', value: 'CT'},
    {key: 'US', text: 'US', value: 'US'},
    {key: 'ECG', text: 'ECG', value: 'ECG'},
    {key: 'XA', text: 'XA', value: 'XA'},
    {key: 'OT', text: 'OT', value: 'OT'},
];

const patientMatcherOptions = [
    {key: 'EXACT', text: 'Exact search', value: 'EXACT'},
    {key: 'STARTS_WITH', text: 'Begin with...', value: 'STARTS_WITH'},
    {key: 'ENDS_WITH', text: 'Ends ...', value: 'ENDS_WITH'},
    {key: 'FUZZY', text: 'Fuzzy search', value: 'FUZZY'},
];

export default class StudySeriesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            study: {},
            studyId: props.match.params.id
        };
        this.setState.bind(this);
    }

    componentWillMount() {
        StudiesService.findStudyById(this.state.studyId, study => {
            this.setState({study: study})
        });
    }

    render() {
        const study = this.state.study;
        const series = this.state.study['series'];
        if (series && series.length > 0) {
            return (
                <MenuContainer activeItem=''>
                    
                                <Grid columns='equal'>
                                    <Grid.Row>
                                        <Grid.Column width={5}>
                                            <Header as='h3' inverted color='blue'
                                                    attached>{'Patient'}</Header>
                                            <Segment inverted attached>
                                                <h4>{study['patient']['patient_name'] || 'Anonymized'}</h4>
                                                {'Patient ID'}: <b>{study['patient']['patient_id']}</b>
                                                <br/>
                                                {'Patient Gender'}: <b>{study['patient']['patient_sex']}</b>
                                                <br/>
                                                {'Patient Age'}: <b>{study['patient']['patient_age']}</b>
                                            </Segment>
                                            <Header as='h3' inverted color='blue'
                                                    attached>{'Study'}</Header>
                                            <Segment inverted attached>
                                                <h4>{study['study_description']}</h4>
                                                {'Study Date'}: <b>{study['study_date'] || '––'}</b>
                                                <br/>
                                                {'Referring Physician'}: <b>{study['referring_physician'] || '––'}</b>
                                            </Segment>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Form>
                                                <Form.Group widths='equal'>
                                                    <Form.Input
                                                        label={'Study ID'}
                                                        action={<Dropdown button basic floating
                                                                          options={patientMatcherOptions}
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
                                            {
                                                series.map((seriesItem, index) => {
                                                    return (
                                                        <div>
                                                            <Header as='h4' inverted color='white'
                                                                    attached textAlign={'left'}>
                                                                {seriesItem['protocol_name'] || `${'Series'} ${index + 1}`}
                                                            </Header>
                                                            <Segment attached>
                                                                <b>{'Description'}: </b> {seriesItem['series_description'] || '––'}
                                                                <br/>
                                                                <b>{'Modality'}: </b>{seriesItem['modality']}
                                                                <br/>
                                                                <b>{'Body Part Examined'}: </b>{seriesItem['body_part_examined'] || '––'}
                                                                <br/>
                                                                <b>{'Patient Position'}: </b>{seriesItem['patient_position']}
                                                                <br/>
                                                                <b>{'Series Number'}: </b>{seriesItem['series_number']}
                                                                <br/>
                                                                <b>{'Images Count'}: </b>{seriesItem['images_count']}
                                                            </Segment>
                                                            <div className={'ui attached right aligned header'}>
                                                                <Button floated positive as={Link}
                                                                        to={`/series/${seriesItem['id']}`}>{'Open'}</Button>
                                                            </div>
                                                            <br/>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            
                </MenuContainer>
            );
        }
        else {
            return (
                <MenuContainer>
                    <Message warning header='Not series!' content='Not series found for study'/>
                </MenuContainer>
            );
        }
    }
}