import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const { TextArea } = Input;

// 统一表单容器样式
const FormContainer = {
  padding: '20px',
  borderRadius: '8px',
  background: '#fff',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
};

const AddQuestion = ({ onSuccess, onCancel }) => { 
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    
    setTimeout(() => {
      console.log('提交的题目数据:', values);
      message.success(`已添加题目：${values.question}`);
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
        form={form}
        layout="vertical"
        onFinish={onFinish}
        size="middle"
        style={{ marginTop: '10px' }}
      >
        {/* 题目内容 */}
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
              maxHeight: '84px'
            }} 
          />
        </Form.Item>

        {/* 选项A */}
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
        
        {/* 选项B */}
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

        {/* 选项C */}
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
        
        {/* 选项D */}
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

        {/* 正确答案：宽度和其他选项一致 */}
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

        {/* 提交按钮居中 */}
        <Form.Item>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', // 按钮居中
            gap: '12px',
            marginTop: '10px'
          }}>
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

export default AddQuestion;