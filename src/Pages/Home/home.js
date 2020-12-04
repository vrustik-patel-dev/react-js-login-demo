import React from 'react';
import { useHistory } from 'react-router-dom';

import {
    Layout,
    Empty,
    Avatar,
    Row,
    List,
    Typography,
    Affix,
    Button,
    Image
} from 'antd';


import Logo from '../../Images/home.png';


import '../../Csss/home.css';


const {Header, Content, Sider} = Layout;
const { Paragraph, Title} =Typography;

const Home = () => {

    const history = useHistory();

    const handleLogout = () => {
        history.replace("/login");
    }

    return <Layout className="homepage">
        <Sider className="sidehome" width={300}>
            <Image className="homelogo" src={Logo} />

                <List
                    itemLayout="horizontal"
                    dataSource={Object.entries(localStorage)}
                    renderItem={item => (
                      <List.Item className="listofuser">
                            <List.Item.Meta
                                avatar={<Avatar>{JSON.parse(item[1]).fname.charAt(0)}</Avatar>}
                                title={<Title level={3}>{JSON.parse(item[1]).fname} {JSON.parse(item[1]).lname}</Title>}
                                description={<Paragraph>{item[0]}</Paragraph>}
                            />
                        </List.Item>
                    )}
                />
            </Sider>
       

        <Layout>
            <Header className="headerhome">
                <Row justify="center">
                    <Title>DEMO</Title>
                </Row>
             
                <Affix  style={{ position: 'absolute', top: 0, right: 10 }}>
                    <Button shape="round" onClick={()=>handleLogout()} >Log Out</Button>
                </Affix>
            </Header>

            <Content>
                <Empty className="nodata" />
            </Content>
        </Layout>
    </Layout>;
}


export default Home;