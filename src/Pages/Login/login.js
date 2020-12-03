import React, { useState } from 'react';
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

import loginart from '../../Images/loginart.png';


const { Text, Title, Link } = Typography;
const {Header,Content,Footer} = Layout;

const Login = () => {

    const [id,setId] = useState('');
    const [password,setPassword] = useState('');
    const [remember,setRemember] = useState(true)


    return <>
    <Layout className="loginContainer">
    <Header style={{background: 'transparent'}}>
        <Affix  style={{ position: 'absolute', top: 10, left: 10 }}>
            <Button>More About Demo</Button>
        </Affix>
        <Affix  style={{ position: 'absolute', top: 10, right: 10 }}>
            <Button><GithubFilled /></Button>
        </Affix>
    </Header>

    <Content>
        <Form direction="vertical" className="loginForm">
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
                            value={id}
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
                            value={password}
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
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            LOG IN
                        </Button>
                    </Form.Item>
                    
                    <Row justify="center">
                        <Text>Don't have an Account?</Text>
                    </Row>
                    <Row justify="center">
                        <Link>Register</Link>
                    </Row>
                </Col>
            </Row>
        </Form>
    </Content>
        
        <Footer style={{ textAlign: 'center', background: 'transparent' }}><Divider />Copyright Recerved ©2020</Footer>
    </Layout>
    </>;
}

export default Login;