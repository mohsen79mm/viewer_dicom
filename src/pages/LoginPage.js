import React, {Component} from 'react';
import {Form, Header} from "semantic-ui-react";

class LoginPage extends Component {
    render() {
        return (
            <div>
                <div style={{marginTop: '15%', marginLeft: '30%', marginRight: '30%'}}>
                    <Header as={'h3'}>
                        Вход
                    </Header>
                    <Form stacked>
                        <Form.Input
                            label='Email'
                            icon='user'
                            iconPosition='left'
                            placeholder='Email'
                        />
                        <Form.Input
                            type='password'
                            label='Password'
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                        />
                        <Form.Button primary fluid>Login</Form.Button>
                        <b>Forgot your password? </b><a href={'/api/reset_password'}>You can restore it</a>
                    </Form>
                </div>
            </div>
        )
    }
}

export default LoginPage;