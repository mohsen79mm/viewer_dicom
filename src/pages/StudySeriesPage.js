import React, { Component } from 'react';
import {
    Button, Dropdown, Form, Grid, Header, Message, Segment, Select,

} from "semantic-ui-react";
import StudiesService from "../services/DicomService";
import MenuContainer from "../components/common/MenuContainer";
import { Link } from "react-router-dom";
// import {Translate} from "react-localize-redux";
import axios from 'axios';
const options = [
    { key: 'DX', text: 'DX', value: 'DX' },
    { key: 'MR', text: 'MR', value: 'MR' },
    { key: 'CT', text: 'CT', value: 'CT' },
    { key: 'US', text: 'US', value: 'US' },
    { key: 'ECG', text: 'ECG', value: 'ECG' },
    { key: 'XA', text: 'XA', value: 'XA' },
    { key: 'OT', text: 'OT', value: 'OT' },
];

const patientMatcherOptions = [
    { key: 'EXACT', text: 'Exact search', value: 'EXACT' },
    { key: 'STARTS_WITH', text: 'Begin with...', value: 'STARTS_WITH' },
    { key: 'ENDS_WITH', text: 'Ends ...', value: 'ENDS_WITH' },
    { key: 'FUZZY', text: 'Fuzzy search', value: 'FUZZY' },
];

export default class StudySeriesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            study: {},
            studyId: props.match.params.id,
            taskId: '',
            status: true,
            maxRequest: 20,
            images: {},
            show: null,
        };
        this.setState.bind(this);
        this.button_status = 3
    }

    componentWillMount() {
        StudiesService.findStudyById(this.state.studyId, study => {
            this.setState({ study: study })
        });
    }



    async check_status(taskk_id) {
        let status = true

        for (let i = 0; i < this.state.maxRequest; i++) {
            if (i === 0) {
                await new Promise(resolve => setTimeout(resolve, 3000));
            }

            if (status) {
                axios.post('http://127.0.0.1:9000/api/check-status', { task_id: taskk_id })
                    .then(response => {

                        if (String(response.data.result.task_status) === 'Ready') {

                            this.setState({ show: true })

                            status = false
                            const images = response.data.result.images
                            localStorage.setItem('images', JSON.stringify(images));
                            this.button_status = '1'

                        }

                    })
                    .catch(err => {

                    })
                await new Promise(resolve => setTimeout(resolve, 10000));

                ///
            }
            else {
                break
            }

        }


    }





    seriesUID(study_instance_uid) {

        this.setState({ show: false })

        axios.post('http://127.0.0.1:9000/api/analysis-request', { token: localStorage.getItem('token'), study_uid: study_instance_uid })
            .then(response => {


                this.check_status(response.data.task_id)

            })
            .catch(err => {

            })



    }


    func2(seriesId, study_instance_uid) {
        // console.log('vared func 2 shod ')
        // console.log('series_instance_uid',series_instance_uid)
        // this.index = index;
        // console.log('fun2')
        if (this.state.show === null) {
            // console.log('fun2 (if)')

            this.seriesUID(study_instance_uid)
        }

        this.id = seriesId
        // this.index_series = index

    }

    render() {


        if (this.state.show === true) {
            this.button = <Button key={this.index} floated positive as={Link} to={`/series`} >{'Show'}</Button>


            // const images = JSON.parse(localStorage.getItem('images'))
            // var list_url_images = []
            // for (let i = 0; i < images.length; i++) {



                // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
                // axios.defaults.xsrfCookieName = "csrftoken";
                // url: `http://127.0.0.1:8000${images[i].path}`,



                // axios.get(`http://127.0.0.1:8000${images[i].path}`, {headers: { 'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin': '*' }, crossdomain: true }).then(response => {
                //     let blob = new Blob(
                //         [response.data],
                //         { type: response.headers['content-type'] }
                //     )
                //     let image = URL.createObjectURL(blob)
                //     list_url_images.push(image)
                //     // return image
                // })



                //

                // axios.get(`http://127.0.0.1:8000${images[i].path}`, { responseType: 'arraybuffer' })
                //     .then(response => {
                //         let blob = new Blob(
                //             [response.data],
                //             { type: response.headers['content-type'] }
                //         )
                //         let image = URL.createObjectURL(blob)
                //         list_url_images.push(image)
                //         // return image
                //     })

            // }
            // console.log('list_url_images : ', list_url_images)
            // this.button = <Button floated positive as={Link} to={`/series/${this.id}`} >{'Show'}</Button> 

        }
        else if (this.state.show === false) {
            this.button = <text style={{color:'white'}} key={this.index}>Processing ... ( take a few seconds )</text>
            // this.button = <Button floated positive >{'Processing ...'}</Button> 

        }
        else {
            this.button = <Button key={this.index} color='red' floated  >{'Check'}</Button>

        }

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
                                    <br />
                                    {'Patient Gender'}: <b>{study['patient']['patient_sex']}</b>
                                    <br />
                                    {'Patient Age'}: <b>{study['patient']['patient_age']}</b>
                                </Segment>
                                <Header as='h3' inverted color='blue'
                                    attached>{'Study'}</Header>
                                <Segment inverted attached>
                                    <h4>{study['study_description']}</h4>
                                    {'Study Date'}: <b>{study['study_date'] || '––'}</b>
                                    <br />
                                    {'Referring Physician'}: <b>{study['referring_physician'] || '––'}</b>
                                </Segment>
                                <Header as='h3' inverted color='blue'
                                    attached>{'Process Images'}</Header>
                                <Segment inverted attached>

                                    
                                    <div onClick={ () => {this.func2(series[0].id,study['study_instance_uid'])} }>
                                        {this.button}
                                    </div>
                                    
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Form>
                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            label={'Study ID'}
                                            action={<Dropdown button basic floating
                                                options={patientMatcherOptions}
                                                defaultValue='EXACT' />}
                                            icon='search'
                                            iconPosition='left'
                                            placeholder={'Study ID'}
                                        />
                                        <Form.Field control={Select} label={'Modality'}
                                            options={options}
                                            placeholder={'Modality'} />
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
                                                    <br />
                                                    <b>{'Modality'}: </b>{seriesItem['modality']}
                                                    <br />
                                                    <b>{'Body Part Examined'}: </b>{seriesItem['body_part_examined'] || '––'}
                                                    <br />
                                                    <b>{'Patient Position'}: </b>{seriesItem['patient_position']}
                                                    <br />
                                                    <b>{'Series Number'}: </b>{seriesItem['series_number']}
                                                    <br />
                                                    <b>{'Images Count'}: </b>{seriesItem['images_count']}
                                                </Segment>
                                                {/* <div onClick={() => { this.func2(seriesItem['id'], study['study_instance_uid']); }} className={'ui attached right aligned header'}> */}
                                                    {/* {this.button} */}
                                                    {/* to={`/series/${seriesItem['id']}`}>{'Check'}</Button> */}
                                                {/* </div> */}
                                                <br />
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
                    <Message warning header='Not series!' content='Not series found for study' />
                </MenuContainer>
            );
        }
    }
}