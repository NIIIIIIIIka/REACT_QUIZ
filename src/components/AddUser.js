import { Form, Input, Button, message } from 'antd';
import React, { useState } from 'react';

// 自定义表单容器样式
const FormContainer = {
  padding: '20px',
  borderRadius: '8px',
  background: '#fff',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
};

// 表单布局
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 18 } },
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 18, offset: 6 } },
};

const AddUser = ({ onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    
    setTimeout(() => {
      console.log('提交的用户数据:', values);
      message.success(`已添加用户：${values.username}`);
      form.resetFields();
      if (onSuccess) {
        onSuccess();
      }
      setLoading(false);
    }, 500); 
  };

  return (
    <div style={FormContainer}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        size="middle"
        style={{ marginTop: '10px' }}
      >
      
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            { min: 2, message: '用户名至少2个字符!' },
            { max: 20, message: '用户名最多20个字符!' },
            { pattern: /^[a-zA-Z0-9]+$/, message: '用户名只能包含字母和数字!' }
          ]}
          style={{ marginBottom: '16px' }}
        >
          <Input 
            placeholder="请输入用户名（字母/数字）" 
            style={{ borderRadius: '6px', borderColor: '#e8e8e8' }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[{ min: 6, message: '密码至少6个字符!' }]}
          hasFeedback
          style={{ marginBottom: '16px' }}
        >
          <Input.Password 
            placeholder="请输入密码（至少6位）" 
            style={{ borderRadius: '6px', borderColor: '#e8e8e8' }}
          />
        </Form.Item>

  
        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致!'));
              },
            }),
          ]}
          style={{ marginBottom: '20px' }}
        >
          <Input.Password 
            placeholder="请再次输入密码" 
            style={{ borderRadius: '6px', borderColor: '#e8e8e8' }}
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button 
              onClick={onCancel}
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
              htmlType="submit" 
              loading={loading}
              style={{ 
                padding: '0 24px',
                borderRadius: '6px',
                backgroundColor: '#1890ff',
                borderColor: '#1890ff',
              }}
            >
              提交
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddUser;