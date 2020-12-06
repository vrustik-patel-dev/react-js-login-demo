import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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


import {actions} from '../../Actions'


import '../../Csss/register.css'


const { Text, Title } = Typography
const { Content, Sider } = Layout

const Register = ({callforlogin}) => {

    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [password,setPassword] = useState('');
    const [emailid,setEmailid] = useState('');
    const [phonenumber,setPhonenumber] = useState();
    const [bdate,setBdate] = useState();
    const [gender,setGender] = useState();

    
    const history = useHistory();



    const handleSubmit = () => {
        console.log("fname", fname);
        console.log("lname",lname);
        console.log("password",password);
        console.log("emailid",emailid);
        console.log("phonenumber",phonenumber);
        console.log("bdate",bdate);
        console.log("gender",gender);

        let regesteruser = {
            fname : fname,
            lname : lname,
            password : password,
            phonenumber : phonenumber,
            bdate : bdate,
            gender : gender
        }

        localStorage.setItem(emailid, JSON.stringify(regesteruser));
        callforlogin(actions.auth.trigger({id:emailid,password:password,remember:true,forauth:true}));
        history.replace("/");
    }


    const gotoLogin = () => {
        history.replace("/login");
    }



    return <>
    <Layout className="register">
        <Sider width={400} style={{background:'transparent'}}>
            
            <Title className="Registratinmsg">
                You are few clicks away to create your account.
            </Title>
            <Text className="loginfromsignup">
                <Row justify="center">
                    <Text>Already have an account?</Text>
                </Row>

                <Row justify="center">
                    <Button className="loginbtnreg" shape="round" onClick={()=>gotoLogin()}>
                        Log In
                    </Button>
                </Row>
            </Text>
        </Sider>
        <Content className="regstercontent">
            <Form 
                className="loginForm" 
                onFinish={()=>handleSubmit()}
            >
                <Row>
                    <Col offset={2}>
                        <Title className="registertitle">
                            Register
                        </Title>
                    </Col>
                </Row>

                <Row justify="center">
                    <Col span={10}>
                        <Row>
                            <Form.Item
                                className="inputregform"
                                name="fname"
                                rules={
                                    [
                                        { 
                                            required: true, message: 'Please enter Firstname!' 
                                        },
                                        {
                                            validator: (_, value) => {
                                                    if(/^[a-zA-Z]+$/.test(value)){
                                                        return Promise.resolve(setFname(value));
                                                    }
                                                    if(value.length===0){
                                                        return Promise.resolve(setFname(''));
                                                    }
                                                    return Promise.reject('Please Enter Alphabets only!');                                            
                                            }
                                        }
                                    ]
                                }
                            >
                                <Input 
                                    size="large" 
                                    className="inputreg" 
                                    placeholder="First Name"
                                    />
                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item
                                className="inputregform"
                                name="lname"
                                rules={
                                    [
                                        { 
                                            required: true, message: 'Please enter Lastname!' 
                                        },
                                        {
                                            validator: (_, value) => {
                                                    if(/^[a-zA-Z]+$/.test(value)){
                                                        return Promise.resolve(setLname(value));
                                                    }
                                                    return Promise.reject('Please Enter Alphabets only!');                                            
                                            }
                                        }
                                    ]
                                }
                            >
                                <Input 
                                    size="large"
                                    className="inputreg"
                                    placeholder="Last Name"

                                />
                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item
                                className="inputregform"
                                name="password"
                                rules={
                                    [
                                        { 
                                            required: true, message: 'Please enter Password!' 
                                        },
                                        {
                                            validator: (_, value) => {
                                                    if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_%*?&])[A-Za-z\d@$!_%*?&]{8,}$/.test(value)){
                                                        return Promise.resolve(setPassword(value));
                                                    }
                                                    return Promise.reject('Password Must contain Minimum eight characters, at least one [A-Z], one [a-z], one [0-9] and one special character!');                                            
                                            }
                                        }
                                    ]
                                }
                            >
                                <Input.Password 
                                    className="inputreg"
                                    size="large"
                                    placeholder="Password"
                                    />
                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item
                                className="inputregform"
                                name="confirmpassword"
                                rules={
                                    [
                                        { 
                                            required: true, message: 'Please Confirm Password!' 
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                    return Promise.reject('The two passwords that you entered do not match!');
                                            },
                                        })
                                    ]
                                }
                            >
                                <Input.Password 
                                    className="inputreg"
                                    size="large"
                                    placeholder="Confirm Password" 
                                />
                            </Form.Item>
                        </Row>
                    </Col>
                    <Col span={10}>
                        <Row>
                            <Form.Item
                                className="inputregform"
                                name="emailid"
                                rules={[{ required: true, type: "email", message: 'Please enter valid E-mail ID!' }]}
                            >
                                <Input value={emailid} className="inputreg" size="large" placeholder="Your Email" onChange={e=>setEmailid(e.target.value)} />
                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item
                                className="inputregform"
                                name="phonenumber"
                                rules={
                                    [
                                        { required: true,  len:10, message: 'Enter 10-Digit number!' },
                                        {
                                            validator: (_, value) => {
                                                    if(/^\d+$/.test(value)){
                                                        return Promise.resolve(setPhonenumber(value));
                                                    }
                                                    return Promise.reject('Enter Valid Phone Number');                                            
                                            }
                                        }
                                    ]
                                }
                            >
                                <Input size="large" className="inputreg" placeholder="Phone Number" />
                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item
                                className="inputregform"
                                name="bdate"
                                rules={[{ required: true,  message: 'Enter BirthDate!' }]}
                            >
                                <DatePicker size="large" className="inputreg" placeholder="Birth Date" onChange={e=>setBdate(e._d)}/>
                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item
                                className="inputregform"
                                name="gender"
                                rules={[{ required: true,  message: 'Enter BirthDate!' }]}
                            >
                                <Select size="large" className="genreg" placeholder="Select Gender" onSelect={e=>setGender(e)}>
                                    <Select.Option value="Male">Male</Select.Option>
                                    <Select.Option value="Female">Female</Select.Option>
                                    <Select.Option value="Other">Other</Select.Option>
                                </Select>
                            </Form.Item>
                        </Row>
                    </Col>
                </Row>
                <Row justify="center">
                    <Button type="primary" shape="round" className="registerbtn" htmlType="submit">
                        Register
                    </Button>
                </Row>

            </Form>
        </Content>
    </Layout>
    </>;
}

export default Register;