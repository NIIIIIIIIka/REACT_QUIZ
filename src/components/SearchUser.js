// import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Button } from 'antd';
import React from 'react';
import { Modal } from 'antd';
import { useState } from 'react';
import AddUser from './AddUser';
const { Search } = Input;
// const suffix = (
//   <AudioOutlined
//     style={{
//       fontSize: 16,
//       color: '#1890ff',
//     }}
//   />
// );
const onSearch = (value) => console.log(value);

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
return(
  <Space orientation="horizontal" style={{ margin: '16px 0 16px 16px' }}>
    <Search
      placeholder="请输入用户名"
      allowClear
      enterButton="查询用户"
      size="large"
      onSearch={onSearch}
    />
    <Button type="primary" onClick={showModal}>
     添加用户
    </Button>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <AddUser />
      </Modal>

  </Space>
  )
};
export default App;