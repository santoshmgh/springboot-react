
import './App.css';
import {
    FileOutlined,
    PieChartOutlined,
    DesktopOutlined,
    TeamOutlined,
    UserOutlined,
    PlusOutlined
} from '@ant-design/icons';
import {
    Badge,
    Button,
    Divider, Empty,
    Layout,
    Menu, Spin,
    Table, Tag,
    theme
} from 'antd';
import { useState, useEffect } from "react";
import {getAllStudents} from "./service/fetchStudent";
import StudentDrawerForm from "./StudentDrawerForm";
import {errorNotification} from "./Notification";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
];

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const {token: { colorBgContainer },} = theme.useToken();

    const [students, setStudents] = useState([]);
    const [fetching, setFetching] = useState( true);
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchStudent = () => {
        getAllStudents()
            .then(response => response.json())
            .then(data => {
                            setStudents(data);
            }).catch(err => err.response.json()
                .then(res => {
                  errorNotification("Something went wrong ", `[${res.message}]`);
            })).finally(() => {
                setFetching( false);
            })
        }

    useEffect(() => {
        fetchStudent();
    }, []);

    const renderStudent = () => {
        if(fetching){
            return <Divider >
                        <Spin tip="Loading" size="large" />
                    </Divider>
        }
        if(students.length < 0){
            return <Empty description={false} />;
        }else{
            return  <div>
                        <Divider>Students</Divider>
                        <br/>
                        <Tag>Number of Students</Tag>
                        <Badge count={students.length} className="site-badge-count-4"/>
                        <br/>
                        <br/>
                        <Button onClick={() => setShowDrawer(!showDrawer)} type="primary" shape="round" icon={<PlusOutlined />}>
                            Download
                        </Button>
                        <br/>
                        <StudentDrawerForm
                            showDrawer={showDrawer}
                            setShowDrawer={setShowDrawer}
                            fetchStudent = {fetchStudent}
                        />
                        <Table dataSource={students}
                               columns={columns}
                               pagination={{ pageSize: 50 }}
                               scroll={{ y: 500 }}/>
            </div>

        }
    }

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: 'rgba(255, 255, 255, 0.2)',
                    }}
                />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        {renderStudent()}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2025 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
}

export default App;
