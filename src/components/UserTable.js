import { Space, Table, message, Modal, Form, Input, Button } from 'antd';
import React, { useState, useEffect } from 'react';




const mockUserData = [
    { key: '1', id: '1', userName: 'test1', date: '2025-11-29' },
    { key: '2', id: '2', userName: 'test2', date: '2025-11-29' },
    { key: '3', id: '3', userName: 'test3', date: '2025-11-29' },
    { key: '4', id: '4', userName: 'test4', date: '2025-11-29' },
    { key: '5', id: '5', userName: 'test5', date: '2025-11-29' },
    { key: '6', id: '6', userName: 'test6', date: '2025-11-29' },
    { key: '7', id: '7', userName: 'test7', date: '2025-11-29' },
];

const UserTable = ({ searchKeyword, refreshFlag }) => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: mockUserData.length,
        showSizeChanger: false,
        placement: 'bottomLeft',
    });
    const [loading, setLoading] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [form] = Form.useForm();

    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
            render: (text) => <a>{text}</a>,
            width: 180,
        },
        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
            width: 150,
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleEdit(record)}>编辑</Button>
                    <Button type="primary" danger onClick={() => handleDelete(record)}>删除</Button>
                </Space>
            ),
        },
    ];

    const fetchData = (page = 1, pageSize = 5, keyword = '') => {
        setLoading(true);
  
        setTimeout(() => {
            let filteredData = [...mockUserData];
     
            if (keyword && keyword.trim() !== '') {
                filteredData = mockUserData.filter(user => 
                    user.userName.toLowerCase().includes(keyword.toLowerCase())
                );
            }
    
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            const paginatedData = filteredData.slice(start, end);
            
            setData(paginatedData);
            setPagination({
                current: page,
                pageSize: pageSize,
                total: filteredData.length,
                showSizeChanger: false,
                placement: 'bottomLeft',
            });
            setLoading(false);
        }, 300); 
    };

    const handleEdit = (record) => {
        setEditingUser(record);
        form.setFieldsValue({
            username: record.userName,
            password: '',
            confirm: ''
        });
        setEditModalVisible(true);
    };

  
    const handleEditSave = async () => {
        try {
            const values = await form.validateFields();
            
         
            message.success(`已更新用户信息：${values.username}`);
            setEditModalVisible(false);
  
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            console.error('表单验证失败:', error);
        }
    };

  
    const handleDelete = (record) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除用户 "${record.userName}" 吗？`,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
               
                message.success(`已删除用户：${record.userName}`);
            }
        });
    };

 
    const handleTableChange = (pag) => {
        fetchData(pag.current, pag.pageSize, searchKeyword);
    };

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [searchKeyword, refreshFlag]);

    return (
        <>
            <style>{`
                .ant-pagination-item {
                    margin-right: 3px !important;
                    margin-left: 3px !important;
                }
                .ant-pagination-prev,
                .ant-pagination-next {
                    margin-right: 3px !important;
                    margin-left: 3px !important;
                }
                .ant-table-wrapper .ant-table-pagination.ant-pagination {
                    justify-content: flex-start !important;
                }
            `}</style>
            
            <Table
                columns={columns}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                rowKey="id"
                bordered
                size="middle"
            />

            
            <Modal
                title="编辑用户"
                open={editModalVisible}
                onOk={handleEditSave}
                onCancel={() => setEditModalVisible(false)}
                okText="保存"
                cancelText="取消"
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[
                            { required: true, message: '请输入用户名!' },
                            { min: 2, message: '用户名至少2个字符!' },
                            { max: 20, message: '用户名最多20个字符!' },
                        ]}
                    >
                        <Input placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="新密码"
                        rules={[
                            { min: 6, message: '密码至少6个字符!' }
                        ]}
                    >
                        <Input.Password placeholder/>
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || !getFieldValue('password') || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="确认新密码" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UserTable;