import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CarOutlined,
  FileDoneOutlined,
  DollarCircleOutlined,
  UsergroupAddOutlined,
  LineChartOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Input, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); 
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Handle menu item click to navigate
  const handleMenuClick = (e) => {
    switch (e.key) {
      case '1':
        navigate('tasks');
        break;
      case '2':
        navigate('friends'); 
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      {/* Sidebar */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" style={{ padding: '16px', textAlign: 'center' }}>
          <h3 style={{ color: '#fff' }}>Car Rental</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={handleMenuClick}
          items={[
            {
              key: '1',
              icon: <CarOutlined />,
              label: 'Tasks',
            },
            {
              key: '2',
              icon: <UsergroupAddOutlined />,
              label: 'Friends',
            },
          ]}
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Toggle Sidebar Button */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />

          {/* Search Input */}
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search"
            style={{ width: 400, marginRight: 30 }}
          />

        </Header>

        {/* Content Section */}
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Placeholder Content */}
          <div>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
