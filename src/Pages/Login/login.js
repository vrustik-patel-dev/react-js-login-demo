import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
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
    Layout,
    Spin,
    message
} from 'antd';
import { 
    EyeInvisibleOutlined, 
    EyeTwoTone, 
    MailOutlined, 
    LockOutlined ,
    GithubFilled, 
} from '@ant-design/icons';

import 'antd/dist/antd.css';
import '../../Csss/login.css'
import {actions} from '../../Actions';
import loginart from '../../Images/loginart.png';

const { Text, Title, Link } = Typography;
const {Header,Content,Footer} = Layout;

const Login = ({ callforlogin }) => {
    let uname = Cookies.get('username');
    let pwd = Cookies.get('password');
    const [id,setId] = useState(uname);
    const [password,setPassword] = useState(pwd);
    const [remember,setRemember] = useState(true);
    const [loading,setLoading] = useState(false);
    const [initial,setInitial] = useState(true);
    
    const history = useHistory();

    let checksessionauth = sessionStorage.getItem("auth");

    useEffect(()=>{
        console.log("from login page");
        if(initial){
            setInitial(false);
            if(checksessionauth){
                let userdata = localStorage.getItem(id);
                userdata = JSON.parse(userdata);
                if(userdata){
                    callforlogin(actions.auth.trigger({forauth:true,uname:userdata,id:id}));
                    history.replace("/");
                }else{
                    callforlogin(actions.auth.trigger({forauth:false}))
                }
            }
        }
    },[initial,callforlogin,history,id,checksessionauth])

    const delay = (ms) => new Promise(res => setTimeout(res, ms))

    async function checkauth(){
        setLoading(true);
        try{
            var userdata = localStorage.getItem(id);
            userdata = JSON.parse(userdata);
            if(userdata){
                if (password===userdata.password){
                    if(remember){
                        Cookies.set('username',id);
                        Cookies.set('password',password);
                        sessionStorage.setItem("auth", true);
                    }
                    await delay(4000);
                    setLoading(false);
                    callforlogin(actions.auth.trigger({forauth:true,uname:userdata,id:id}));

                    history.replace("/");
                }else{
                    setLoading(false);
                    message.error('Wrong Password!')
                    callforlogin(actions.auth.trigger({forauth:false}))
                }
            }else{
                setLoading(false);
                message.error('Wrong User Id!')
            }
        }catch(err){
            console.log("Error :",err);
            setLoading(false);
        }
    }

    return <>
    <Layout className="loginContainer" style={{ minHeight: '100vh' }}>
        <Header style={{background: 'transparent'}}>
            <Affix  style={{ position: 'absolute', top: 10, left: 10 }}>
                <Button href="https://github.com/vrustik/react-js-login-demo"  shape="round">More About Demo</Button>
            </Affix>
            <Affix  style={{ position: 'absolute', top: 10, right: 10 }}>
                <Button href="https://github.com/vrustik/react-js-login-demo"  shape="round"><GithubFilled /></Button>
            </Affix>
        </Header>

        <Content>
            <Form 
                direction="vertical"
                className="loginForm"
                onFinish={()=>checkauth()}
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
                            preview={false}
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
                            <Spin spinning={loading}>
                                <Button shape="round" type="primary" htmlType="submit" className="login-form-button">
                                    LOG IN
                                </Button>
                            </Spin>
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
        
        <Footer style={{ textAlign: 'center', background: 'transparent' }}>
            <Divider />
            Copyright Recerved ©2020
        </Footer>
    </Layout>
    </>;
}

export default Login;