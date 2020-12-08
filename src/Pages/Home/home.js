import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
    Layout,
    Row,
    List,
    Typography,
    Affix,
    Button,
    Image,
    Spin,
    Drawer,
    Card,
    Descriptions,
    Popover,
    BackTop,
    Carousel,
    Tooltip,
} from 'antd';

import { useAuth0 } from "@auth0/auth0-react";

import { actions } from '../../Actions';

import Logo from '../../Images/home.png';

import Funny1 from '../../Images/funny1.jpg';
import Funny2 from '../../Images/funny2.jpg';
import Funny3 from '../../Images/funny3.jpg';
import Funny4 from '../../Images/funny4.jpg';

import '../../Csss/home.css';


const {Header, Content, Sider} = Layout;
const { Title} =Typography;
const { Meta } = Card;

const Home = ({ data, callforlogin }) => {

    const [loading,setLoading] = useState(false);
    const [drawervisible, setDrawerVisible] = useState(false);
    
    const { logout } = useAuth0();

    const history = useHistory();


    const showDrawer = () => {
        setDrawerVisible(true);
    }

    const closeDrawer = () => {
        setDrawerVisible(false);
    }

    const delay = (ms) => new Promise(res => setTimeout(res, ms))

    async function handleLogout(){
        
        setLoading(true);

        try{
            await delay(2000);
            setLoading(false);

            callforlogin(actions.auth.trigger({forauth:false}));

            history.replace("/login");
        }catch(err){
            console.log("Error :",err);
            setLoading(false);
        }
    }
    

    return <Spin spinning={loading} size="large">

        <BackTop />

        <Layout style={{ minHeight: '100vh' }}>
            <Sider className="sidehome" width={300}>
                <Image className="homelogo" src={Logo} preview={false}/>

                    {/* List of users saved in local storage */}

                    <List
                        itemLayout="horizontal"
                        dataSource={Object.entries(localStorage)}
                        renderItem={item => (
                            <List.Item>
                                <Popover 
                                    content={`${item[0]}`} 
                                    title={`${JSON.parse(item[1]).fname} ${JSON.parse(item[1]).lname}`}
                                    placement="right" >

                                    <Card hoverable className="listofuser" bordered={false}>
                                        <Meta
                                            title={`${JSON.parse(item[1]).fname} ${JSON.parse(item[1]).lname}`}
                                        />
                                    </Card>


                                </Popover>
                            </List.Item>
                        )}
                    />
            </Sider>
       

            <Layout>

                <Header className="headerhome">

                    {/* Fetching username and Displaying */}

                    <Row justify="center">
                        <Title>Hello ,</Title>
                    </Row>
             
                    <Affix className="home-logout-btn">
                        <Button 
                            shape="round" 
                            onClick={()=>{
                                sessionStorage.removeItem("auth");
                                handleLogout();
                                logout({returnTo: window.location.origin});
                            }} >Log Out</Button>
                    </Affix>

                </Header>

                <Content className="home-content">

                    {/* Randome pictures to display on Carousel */}
                    <Carousel autoplay style={{textAlign:"center"}}>
                        <Image className="carousel-image" src={Funny1} preview={false}/>
                        <Image className="carousel-image" src={Funny2} preview={false}/>
                        <Image className="carousel-image" src={Funny3} preview={false}/>
                        <Image className="carousel-image" src={Funny4} preview={false}/>
                    </Carousel>

                    {/* A Button to display User's Profile through Drawer */}

                    <Tooltip title="Click Here to open User's Profile!">
                        <Button className="home-content-btn" shape="round" onClick={()=>showDrawer()}>
                            View Profile
                        </Button>
                    </Tooltip>

                    <Drawer
                        placement="right"
                        width={"25%"}
                        onClose={closeDrawer}
                        visible={drawervisible} >

                        {/* User's Profile using Desctiption layout */}
                
                        {console.log(data)/* <Descriptions
                            title="User Profile"
                            size={40}
                            column={1} >

                            <Descriptions.Item label="Name">{data.userdata.fname} {data.userdata.lname}</Descriptions.Item>
                            <Descriptions.Item label="Email">{data.id}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{data.userdata.gender}</Descriptions.Item>
                            <Descriptions.Item label="Phone No">{data.userdata.phonenumber}</Descriptions.Item>
                            <Descriptions.Item label="Birth-date">{data.userdata.bdate}</Descriptions.Item>

                        </Descriptions> */}

                    </Drawer>
                </Content>
            </Layout>
        </Layout>
    </Spin>
}


export default Home;