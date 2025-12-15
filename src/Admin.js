import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import SearchUser from './components/SearchUser';
import UserTab from './components/UserTable';
import SearchQuestion from './components/SearchQuestion';
import QuestionTab from './components/QuestionTable';

const { Header, Footer, Sider, Content } = Layout;

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getSelectedKey = () => {
    if (location.pathname === '/question') return '2';
    return '1'; 
  };
  
  const [selectedKey, setSelectedKey] = useState(getSelectedKey());
  const [userSearchKeyword, setUserSearchKeyword] = useState('');
  const [userRefreshFlag, setUserRefreshFlag] = useState(0);
  const [questionSearchKeyword, setQuestionSearchKeyword] = useState('');
  const [questionRefreshFlag, setQuestionRefreshFlag] = useState(0);

  useEffect(() => {
    setSelectedKey(getSelectedKey());
  }, [location]);

 
  const handleUserSearch = (keyword) => {
    console.log('用户搜索:', keyword);
    setUserSearchKeyword(keyword);
  };

  
  const handleUserAddSuccess = () => {
    console.log('用户添加成功，刷新用户列表');
    setUserRefreshFlag(prev => prev + 1);
  };


  const handleQuestionSearch = (keyword) => {
    console.log('题目搜索:', keyword);
    setQuestionSearchKeyword(keyword);
  };


  const handleQuestionAddSuccess = () => {
    console.log('题目添加成功，刷新题目列表');
    setQuestionRefreshFlag(prev => prev + 1);
  };


  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    if (key === '1') {
      navigate('/user');
    } else if (key === '2') {
      navigate('/question');
    }
  };

  return (
    <Layout>
      <Header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: '#001529'
      }}>
        <h1 style={{color:'#ffffff', margin: 0}}>Quiz管理系统</h1>
      </Header>
      <Layout>
        <Sider>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            items={[
              { key: '1', icon: <UserOutlined />, label: '用户管理' },
              { key: '2', icon: <VideoCameraOutlined />, label: '题目管理' }
            ]}
          />
        </Sider>
        <Content style={{ padding: '20px', minHeight: 'calc(100vh - 134px)' }}>
       <Routes>
     
          <Route path="/" element={<Navigate to="/user" replace />} />
          
          <Route path="/user" element={
            <>
              <SearchUser 
                onSearch={handleUserSearch}
                onAddSuccess={handleUserAddSuccess}
              />
              <UserTab 
                searchKeyword={userSearchKeyword}
                refreshFlag={userRefreshFlag}
              />
            </>
          } />
          <Route path="/question" element={
            <>
              <SearchQuestion 
                onSearch={handleQuestionSearch}
                onAddSuccess={handleQuestionAddSuccess}
              />
              <QuestionTab 
                searchKeyword={questionSearchKeyword}
                refreshFlag={questionRefreshFlag}
              />
            </>
          } />
        </Routes>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        Quiz管理系统 ©2025 Created by qingliul
      </Footer>
    </Layout>
  );
};

export default Admin;