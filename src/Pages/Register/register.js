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
    Select,
    Result,
    AutoComplete,
} from 'antd';
import {actions} from '../../Actions';
import '../../Csss/register.css';

const { Text, Title } = Typography;
const { Content, Sider } = Layout;
const { Option } = AutoComplete;

const Register = ({callforlogin}) => {
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [password,setPassword] = useState('');
    const [emailid,setEmailid] = useState('');
    const [phonenumber,setPhonenumber] = useState();
    const [bdate,setBdate] = useState();
    const [gender,setGender] = useState();

    // To display Registered message
    const [registered,setRegistered] = useState(false);

    // For suggesting Autocomplete's results
    const [autoresult,setAutoresult] = useState([]);

    const history = useHistory();

    async function handleSubmit() {
        let regesteruser = {
            fname : fname,
            lname : lname,
            password : password,
            phonenumber : phonenumber,
            bdate : bdate,
            gender : gender
        }

        // Storing data to localStorage
        localStorage.setItem(emailid, JSON.stringify(regesteruser));

        // dispatching auth trigger action 
        callforlogin(actions.auth.trigger({forauth:true,uname:fname}));

        //setting registered value to diplay message
        setRegistered(true);
    }

    const handleautosearch = (value) => {
        let autores = [];
        if (!value || value.indexOf('@')>=0) {
            autores = [];
        } else {
            autores = ['gmail.com','yahoo.com','yahoo.in','hotmail.com','example.com'].map((domain)=>`${value}@${domain}`);
        }
        setAutoresult(autores);
    }

    if(registered){
        let msg = `Hello ${fname} ${lname}, Welcome to our Web-World....!!!!!`
        return <Layout style={{ minHeight: '100vh' }} className="centerresult">

            {/* Displaying Registration succesful message */}
            <Result
                status="success"
                title="Account Created Successfully!"
                subTitle={msg}
                extra={[
                    <Button shape="round" type="primary" key="console" onClick={()=>history.replace("/")}>
                        Login
                    </Button>,
                    <Button shape="round" key="buy" onClick={()=>setRegistered(false)}>Create another account</Button>,
                ]}
            />
        </Layout>
    }


    return <>
    <Layout className="register" style={{ minHeight: '100vh' }}>
        <Sider width={400} style={{background:'transparent'}}>
            <Title className="Registratinmsg">
                You are few clicks away to create your account.
            </Title>
            <Text className="loginfromsignup">
                <Row justify="center">
                    <Text>Already have an account?</Text>
                </Row>
                {/* Go to login page option */}
                <Row justify="center">
                    <Button className="loginbtnreg" shape="round" onClick={()=>history.replace("/login")}>
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
                                validateTrigger="onBlur"
                                rules={
                                    [
                                        { 
                                            required: true, message: 'Please enter Firstname!' 
                                        },
                                        {
                                            validator: (_, value) => {
                                                    //Validate if only alphabets are entered or not
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
                                validateTrigger="onBlur"
                                rules={
                                    [
                                        { 
                                            required: true, message: 'Please enter Lastname!' 
                                        },
                                        {
                                            validator: (_, value) => {
                                                    //Validate if only alphabets are entered or not
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
                                validateTrigger="onBlur"
                                rules={
                                    [
                                        { 
                                            required: true, message: 'Please enter Password!' 
                                        },
                                        {
                                            validator: (_, value) => {
                                                    //Check for one small alphabet, one capital alphabet, one digit, one special character and minimum length
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
                                validateTrigger="onBlur"
                                rules={
                                    [
                                        { 
                                            required: true, message: 'Please Confirm Password!' 
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                                //Comparing with "Password's" value
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
                                validateTrigger="onBlur"
                                rules={[{ required: true, type: "email", message: 'Please enter valid E-mail ID!' }]}
                            >
                                {/* AutoComplete used to suggest email-Ids as soon as user start entering it */}
                                <AutoComplete
                                    onSearch={handleautosearch}
                                    className="inputreg"
                                    size="large" 
                                    placeholder="Email-ID"
                                    onChange={e=>setEmailid(e)}
                                >
                                    {autoresult.map((email) => (
                                        <Option key={email} value={email}>
                                            {email}
                                        </Option>
                                    ))}
                                </AutoComplete>
                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item
                                className="inputregform"
                                name="phonenumber"
                                validateTrigger="onBlur"
                                rules={
                                    [
                                        { required: true,  len:10, message: 'Enter 10-Digit number!' },
                                        {
                                            validator: (_, value) => {
                                                    //Validate if only digits are entered or not
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
                            {/* Used Datepicker to select birthdate */}
                            <Form.Item
                                className="inputregform"
                                name="bdate"
                                validateTrigger="onBlur"
                                rules={[{ required: true,  message: 'Enter BirthDate!' }]}
                            >
                                <DatePicker 
                                    size="large" 
                                    className="inputreg" 
                                    placeholder="Birth Date" 
                                    onChange={(date,datestring)=>setBdate(datestring)}
                                />
                            </Form.Item>
                        </Row>
                        <Row>
                            {/* Select option used for gender option */}
                            <Form.Item
                                className="inputregform"
                                name="gender"
                                validateTrigger="onBlur"
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