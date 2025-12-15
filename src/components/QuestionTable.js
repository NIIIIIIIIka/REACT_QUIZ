import { Space, Table, message, Modal, Form, Input, Button, Select } from 'antd';
import React, { useState, useEffect } from 'react';

const { TextArea } = Input;
const { Option } = Select;

const FormContainer = {
  padding: '20px',
  borderRadius: '8px',
  background: '#fff',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
};


const mockQuestionData = [
  {
    key: '1',
    id: '1',
    question: '什么是React？',
    options: ['A. 一个库', 'B. 一个框架', 'C. 一个语言','D. 一个组件'],
    answer: 'A',
  },
  {
    key: '2',
    id: '2',
    question: 'React的生命周期函数有哪些？',
    options: ['A. componentDidMount', ' B. componentDidUpdate', ' C. componentWillUnmount','D.unkown'],
    answer: 'A',
  },
  {
    key: '3',
    id: '3',
    question: 'React的状态管理有哪些方式？',
    options: ['A. Redux', ' B. MobX', ' C. Context API','D.unkown'],
    answer: 'A',
  },
  {
    key: '4',
    id: '4',
    question: 'React的性能优化手段有哪些？',
    options: ['A. 代码分割', ' B. 懒加载', 'C. 服务器端渲染','D.unkown'],
    answer: 'A',
  },
  {
    key: '5',
    id: '5',
    question: 'React的路由管理有哪些方式？',
    options: ['A. React Router', 'B. Next.js', 'C. Reach Router','D.unkown'],
    answer: 'A',
  },
    {
    key: '6',
    id: '6',
    question: 'React的路由管理有哪些方式？',
    options: ['A. React Router', 'B. Next.js', 'C. Reach Router','D.unkown'],
    answer: 'A',
  },
];

const QuestionTab = ({ searchKeyword, refreshFlag }) => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: mockQuestionData.length,
        showSizeChanger: false,
        placement: 'bottomLeft',
    });
    const [loading, setLoading] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [form] = Form.useForm();

    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '题目',
            dataIndex: 'question',
            key: 'question',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '选项',
            dataIndex: 'options',
            key: 'options',
            render: (options) => options.join(', ')
        },
        {
            title: '答案',
            dataIndex: 'answer',
            key: 'answer',
        },
        {
            title: '操作',
            key: 'action',
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
            let filteredData = [...mockQuestionData];
            if (keyword && keyword.trim() !== '') {
                filteredData = mockQuestionData.filter(question => 
                    question.question.toLowerCase().includes(keyword.toLowerCase())
                );
            }
    
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            const paginatedData = filteredData.slice(start, end);
            
            setData(paginatedData);
            setPagination({
                ...pagination,
                current: page,
                pageSize: pageSize,
                total: filteredData.length,
            });
            setLoading(false);
        }, 300); 
    };

    const handleEdit = (record) => {
        console.log('编辑题目:', record);
        setEditingQuestion(record);
        // 解析所有四个选项（A/B/C/D）
        form.setFieldsValue({
            question: record.question,
            optionA: record.options[0]?.replace('A. ', '') || '',
            optionB: record.options[1]?.replace('B. ', '') || '',
            optionC: record.options[2]?.replace('C. ', '') || '',
            optionD: record.options[3]?.replace('D. ', '') || '',
            answer: record.answer
        });
        setEditModalVisible(true);
    };

    const handleEditSave = async () => {
        try {
            const values = await form.validateFields();
            console.log('编辑表单值:', values);
            
            message.success(`已更新题目：${values.question}`);
            setEditModalVisible(false);
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            console.error('表单验证失败:', error);
        }
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除题目 "${record.question}" `,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                message.success(`已删除题目：${record.question}`);
            }
        });
    };

    const handleTableChange = (pag) => {
        console.log('页码变化:', pag);
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
                title="编辑题目"
                open={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                okText="保存"
                cancelText="取消"
                width={600}
                footer={null}
                onOk={handleEditSave}
            >
                <div style={FormContainer}>
                    <Form
                        form={form}
                        layout="vertical"
                        size="middle"
                        style={{ marginTop: '10px' }}
                    >
                        <Form.Item
                            name="question"
                            label="题目内容"
                            rules={[{ message: '请输入题目内容' }]}
                            style={{ marginBottom: '16px' }}
                        >
                            <TextArea 
                                rows={3} 
                                placeholder="请输入题目内容" 
                                style={{ 
                                    borderRadius: '6px', 
                                    borderColor: '#e8e8e8',
                                    resize: 'none',
                                    minHeight: '84px',
                                    maxHeight: '84px',
                                    width: '100%'
                                }} 
                            />
                        </Form.Item>

                        <Form.Item
                            name="optionA"
                            label="选项A"
                            style={{ marginBottom: '16px' }} 
                        >
                            <Input 
                                placeholder="选项A" 
                                style={{ borderRadius: '6px', borderColor: '#e8e8e8', width: '100%' }}
                            />
                        </Form.Item>
                        
                        <Form.Item
                            name="optionB"
                            label="选项B"
                            style={{ marginBottom: '16px' }}
                        >
                            <Input 
                                placeholder="选项B" 
                                style={{ borderRadius: '6px', borderColor: '#e8e8e8', width: '100%' }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="optionC"
                            label="选项C"
                            style={{ marginBottom: '16px' }}
                        >
                            <Input 
                                placeholder="选项C" 
                                style={{ borderRadius: '6px', borderColor: '#e8e8e8', width: '100%' }}
                            />
                        </Form.Item>
                        
                        <Form.Item
                            name="optionD"
                            label="选项D"
                            style={{ marginBottom: '20px' }}
                        >
                            <Input 
                                placeholder="选项D" 
                                style={{ borderRadius: '6px', borderColor: '#e8e8e8', width: '100%' }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="answer"
                            label="正确答案"
                            rules={[{ message: '请输入正确答案' }]}
                            style={{ marginBottom: '20px' }}
                        >
                            <Input 
                                placeholder="请输入正确答案（如：A/B/C/D）" 
                                style={{ borderRadius: '6px', borderColor: '#e8e8e8', width: '100%' }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'center',
                                gap: '12px',
                                marginTop: '10px'
                            }}>
                                <Button 
                                    onClick={() => setEditModalVisible(false)}
                                    type="default" 
                                    ghost
                                    style={{ 
                                        padding: '0 20px',
                                        borderRadius: '6px',
                                    }}
                                >
                                    取消
                                </Button>
                                <Button 
                                    type="primary" 
                                    onClick={handleEditSave}
                                    style={{ 
                                        padding: '0 24px',
                                        borderRadius: '6px',
                                        backgroundColor: '#1890ff',
                                        borderColor: '#1890ff',
                                    }}
                                >
                                    保存
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default QuestionTab;