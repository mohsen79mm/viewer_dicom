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
            maxRequest: 15,
            images:{},
            show:null,
        };
        this.setState.bind(this);
        this.button_status = 3
    }

    componentWillMount() {
        StudiesService.findStudyById(this.state.studyId, study => {
            this.setState({ study: study })
        });
    }
    // start_check(task_id) {
    //     console.log('start')
    //     this.timer = setInterval(() => this.check_status(task_id), 5000)
    //     console.log('end ....')

    // }

    // delay(ms) { new Promise(res => setTimeout(res, ms)) };
    async check_status(taskk_id) {
        let status = true
        // const delay = this.delay
        for (let i = 0; i < this.state.maxRequest; i++) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            if (status) {
                axios.post('http://127.0.0.1:9000/api/check-status', { task_id: taskk_id })
                    .then(response => {
                        // console.log(response.data.result.task_status)
                        if(String(response.data.result.task_status) === 'Ready'){
                            console.log('Ready !!!!')
                            this.setState({show:true})

                            status = false
                            const images = response.data.result.images
                            localStorage.setItem('images',JSON.stringify(images));
                            this.button_status = '1'
                            // console.log(response.data.result.images)
                            
                            // this.setState({ images: response.data.result.images,status:false })
                            // console.log(this.state.images)
                        }
                        // console.log('check status  : ', response.data.result)
                        // this.setState({ maxRequest: this.state.maxRequest+1  })
                        // localStorage.setItem('token', response.data.token)
                        // updateStuff();
                    })
                    .catch(err => {
                        // console.log('Login error', err.response)
                    })
            }
            else{
                break
            }

        }
        // if(this.button_status === '1'){

        //     this.setState({show:true})
        // }


        // console.log('check')
        // console.log('maxRequest : ',this.state.maxRequest)
        // if (this.state.status) {
        //     if (this.state.maxRequest < 5) {
        //         // let maxreq = this.state.maxRequest + 1 
        //         // console.log('max : ',maxreq)
        //         // this.setState({ maxRequest: maxreq  })

        //         axios.post('http://127.0.0.1:9000/api/check-status', { task_id: task_id })
        //         .then(response => {

        //             console.log('info  : ', response.data)
        //             // this.setState({ taskId: response.data.task_id })
        //             this.setState({ maxRequest: this.state.maxRequest+1  })
        //                 // localStorage.setItem('token', response.data.token)
        //                 // updateStuff();
        //             })
        //             .catch(err => {
        //                 // console.log('Login error', err.response)
        //             })

        //     }


    }





    seriesUID(series_u_id) {
        console.log('slm vared shodm ')
        this.setState({show : false})
        // console.log('series uid onclick : ', series_u_id)
        axios.post('http://127.0.0.1:9000/api/analysis-request', { token: localStorage.getItem('token'), series_uid: series_u_id })
            .then(response => {
                
                // console.log('info  : ', response.data.task_id)
                this.check_status(response.data.task_id)
                // console.log('analysis : ',response.data.task_id)
                // this.setState({ taskId: response.data.task_id })
                // localStorage.setItem('token', response.data.token)
                // updateStuff();
            })
            .catch(err => {
                // console.log('Login error', err.response)
            })



    }

    
    func2(seriesId){
        this.id = seriesId
        
    }
    
    render() {

        console.log('tell me : ',this.state.show)
        if(this.state.show === true){
            this.button = <Button floated positive as={Link} to={`/series/${this.id}`} >{'Show'}</Button> 
            
        }
        else if(this.state.show === false){
            this.button = <text>Processing ... ( take a few seconds )</text> 
            // this.button = <Button floated positive >{'Processing ...'}</Button> 
            
        }
        else{
            this.button = <Button color='red' floated  >{'Check'}</Button> 

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
                                                <div onClick={() => { this.seriesUID(seriesItem['series_instance_uid']) ; this.func2(seriesItem['id']);}} className={'ui attached right aligned header'}>
                                                    {this.button}
                                                    {/* to={`/series/${seriesItem['id']}`}>{'Check'}</Button> */}
                                                </div>
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