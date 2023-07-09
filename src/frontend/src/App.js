
import './App.css';
import {
    UserOutlined,
    PlusOutlined
} from '@ant-design/icons';
import {
    Avatar,
    Badge,
    Button,
    Divider, Empty,
    Layout,
    Menu, Popconfirm, Popover, Space, Spin,
    Table, Tag,
    theme
} from 'antd';
import { useState, useEffect } from "react";
import { deleteStudent as removeStudent, getAllStudents} from "./service/StudentService";
import StudentDrawerForm from "./StudentDrawerForm";
import {errorNotification, successNotification} from "./Notification";
import * as PropTypes from "prop-types";

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
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Customer', '1'),
    ]),
];

function Fragment(props) {
    return null;
}

Fragment.propTypes = {children: PropTypes.node};


function App() {
    const [collapsed, setCollapsed] = useState(false);
    const {token: { colorBgContainer },} = theme.useToken();

    const [students, setStudents] = useState([]);
    const [fetching, setFetching] = useState( true);
    const [showDrawer, setShowDrawer] = useState(false);
    const [showEditStudentDrawer, setEditStudentDrawer] = useState(false);

    const columns = [
        {
            title: '',
            key: 'avatar',
            render: (text, record) => (
                <Avatar size='large'>
                    {`${record.name.charAt(0).toUpperCase()}`}
                </Avatar>
            )
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
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <Space wrap>
                    <Popconfirm
                        placement='topRight'
                        title={`Are you sure to delete ${record.name}`}
                        onConfirm={() => deleteStudent(record)} okText='Yes' cancelText='No'
                        onCancel={e => e.stopPropagation()}>
                        <Button onClick={(e) => e.stopPropagation()}>Delete</Button>
                    </Popconfirm>
                    <Popover title="Still working...">
                        <Button style={{marginLeft: '5px'}} type='primary'>Edit</Button>
                    </Popover>
                </Space>
            ),
        },
    ];

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

    const deleteStudent = student => {
        removeStudent(student).then(() => {
            successNotification('success', `${student.name} was deleted`);
            fetchStudent();
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
                            Add new Student
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
                    ©2023 Created by sghanti
                </Footer>
            </Layout>
        </Layout>
    );
}

export default App;
