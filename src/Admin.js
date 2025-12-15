import { UserOutlined, FormOutlined } from '@ant-design/icons'; 
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import UserTable      from './components/UserTable';
import SearchQuestion from './components/SearchQuestion';
import QuestionTable  from './components/QuestionTable';

const { Header, Footer, Sider, Content } = Layout;

const Admin = () => {
  const [selectedKey, setSelectedKey] = useState('1');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <h1 style={{ color: '#fff', margin: 0, fontSize: 20 }}>Quiz管理系统</h1>
      </Header>
      <Layout>
        <Sider>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => setSelectedKey(key)}
            items={[
              { key: '1', icon: <UserOutlined />, label: '用户管理' },
              { key: '2', icon: <FormOutlined />, label: '题目管理' }, 
            ]}
          />
        </Sider>
        <Content style={{ padding: 16 }}>
          {selectedKey === '1' && <UserTable />}
          {selectedKey === '2' && (
            <>
              <SearchQuestion />
              <QuestionTable />
            </>
          )}
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        Quiz管理系统 ©2025 Created by yqzhou
      </Footer>
    </Layout>
  );
};

export default Admin;