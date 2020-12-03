import React from 'react';

import {
    Layout,
    Typography,
    Button,
    Row,
    Col,
    Form,
    Input,
    DatePicker,
    Select
} from 'antd';


import '../../Csss/register.css'


const {Text,Title} = Typography
const {Header,Content,Sider,Footer} = Layout

const Register = () => {
    return <>
    <Layout className="register">
        <Sider width={400} style={{background:'transparent'}}>
            
            <Title className="Registratinmsg">
                You are few clicks away to create your account.
            </Title>
            <div className="loginfromsignup">
                <Row justify="center">
                    <Text>Already have an account?</Text>
                </Row>

                <Row justify="center">
                    <Button>
                        Log In
                    </Button>
                </Row>
            </div>
        </Sider>
        <Content>
            <Form className="loginForm">
                <Row>
                    <Col offset={2}>
                        <Title>
                            Register
                        </Title>
                    </Col>
                </Row>

                <Row justify="center">
                    <Col span={10}>
                        <Row>
                            <Input className="inputreg" placeholder="First Name" />
                        </Row>
                        <Row>
                            <Input className="inputreg" placeholder="Last Name" />
                        </Row>
                        <Row>
                            <Input className="inputreg" placeholder="Password" />
                        </Row>
                        <Row>
                            <Input className="inputreg" placeholder="Confirm Password" />
                        </Row>
                    </Col>
                    <Col span={10}>
                        <Row>
                            <Input className="inputreg" placeholder="Your Email" />
                        </Row>
                        <Row>
                            <Input className="inputreg" placeholder="Phone Number" />
                        </Row>
                        <Row>
                            <DatePicker className="inputreg" placeholder="Birth Date" />
                        </Row>
                        <Row>
                            <Select className="inputreg" placeholder="Select Gender" >
                                <Select.Option value="Male">Male</Select.Option>
                                <Select.Option value="Female">Female</Select.Option>
                                <Select.Option value="Other">Other</Select.Option>
                            </Select>
                        </Row>
                    </Col>
                </Row>
                <Row justify="center">
                    <Button>
                        Register
                    </Button>
                </Row>

            </Form>
        </Content>
    </Layout>
    </>;
}

export default Register;