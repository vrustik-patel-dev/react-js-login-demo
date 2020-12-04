import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { 
    Typography, 
    Input, 
    Form,
    Checkbox,
    Divider,
    Row,
    Col,
    Affix,
    Button,
    Image,
    Layout
} from 'antd';

import { 
    EyeInvisibleOutlined, 
    EyeTwoTone, 
    MailOutlined, 
    LockOutlined ,
    GithubFilled
} from '@ant-design/icons';

import 'antd/dist/antd.css';
import '../../Csss/login.css'

import {actions} from '../../Actions'

import loginart from '../../Images/loginart.png';


const { Text, Title, Link } = Typography;
const {Header,Content,Footer} = Layout;

const Login = ({disp,reduxstate, sending}) => {

    const [id,setId] = useState('');
    const [password,setPassword] = useState('');
    const [remember,setRemember] = useState(true);
    
    let uname = Cookies.get('username');
    let pwd = Cookies.get('password');

    const history = useHistory();

    function handleSubmit () {
        sending(actions.auth.trigger());
        var userdata = localStorage.getItem(id);
        userdata = JSON.parse(userdata);
        if(userdata){
            if (password===userdata.password){
                if(remember){
                    Cookies.set('username',id);
                    Cookies.set('password',password)
                }
                disp(actions.auth.success());
                history.replace("/");
            }
        }
    }


    return <>
    <Layout className="loginContainer">
    <Header style={{background: 'transparent'}}>
        <Affix  style={{ position: 'absolute', top: 10, left: 10 }}>
            <Button href="https://github.com/vrustik/react-js-login-demo">More About Demo</Button>
        </Affix>
        <Affix  style={{ position: 'absolute', top: 10, right: 10 }}>
            <Button href="https://github.com/vrustik/react-js-login-demo"><GithubFilled /></Button>
        </Affix>
    </Header>

    <Content>
        <Form 
            direction="vertical"
            className="loginForm"
            onFinish={()=>handleSubmit()}
            initialValues = {{
                username: uname,
                password: pwd,
                remember: remember,
            }}
        >
            <Row justify="center">
                <Col>
                    <Image
                        width={300}
                        src={loginart}
                    />
                </Col>

                <Col>
                    
                    <Title>LOG IN</Title>
                    
                    <Divider />
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your User ID!' }]}
                    >
                        <Input 
                            placeholder="User ID" 
                            prefix={<MailOutlined  />} 
                            onChange={e=>setId(e.target.value)}    
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password 
                            placeholder="Password" 
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} 
                            prefix={<LockOutlined />}
                            onChange={e=>setPassword(e.target.value)}
                            />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox onChange={()=>setRemember(!remember)}>
                                Remember me
                            </Checkbox>
                        </Form.Item>

                        <Link href="">
                            Forgot password?
                        </Link>
                    </Form.Item>
                    
                    <Form.Item>
                        <Button shape="round" type="primary" htmlType="submit" className="login-form-button">
                            LOG IN
                        </Button>
                    </Form.Item>
                    
                    <Row justify="center">
                        <Text>Don't have an Account?</Text>
                    </Row>
                    <Row justify="center">
                        <Link href="/register">Register</Link>
                    </Row>
                </Col>
            </Row>
        </Form>
    </Content>
        
        <Footer style={{ textAlign: 'center', background: 'transparent' }}><Divider />Copyright Recerved ©2020</Footer>
    </Layout>
    </>;
}


const mapDispatchToProps = dispatch => ({
    disp: something => dispatch(something)
})

const mapStateToProps = state => ({
    reduxstate:state
  })

export default connect(mapStateToProps,mapDispatchToProps)(Login);