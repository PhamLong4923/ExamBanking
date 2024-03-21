import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountManagement from './components/UI/Features/AccountManagement';
import Home from './components/UI/Features/AdminHome';
import Analysis from './components/UI/Features/Analysis';
import Payment from './components/UI/Features/Payment';
import SystemBank from './components/UI/Features/SystemBank';
import Profile from './components/UI/Users/profile';

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: '0',
    icon: <AppstoreOutlined />,
    label: 'Home',
    link: '/home',
  },
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Profile',
    link: '/profile',
  },
  {
    key: '2',
    icon: <BarChartOutlined />,
    label: 'Analysis',
    link: '/analysis',
  },
  {
    key: '3',
    icon: <CloudOutlined />,
    label: 'System Bank',
    link: '/system_bank',
  },
  {
    key: '4',
    icon: <TeamOutlined />,
    label: 'Account',
    link: '/account_management',
  },
  {
    key: '5',
    icon: <ShopOutlined />,
    label: 'Payment',
    link: '/payment_management',
  },
  {
    key: '6',
    icon: <VideoCameraOutlined />,
    label: 'SystemRepo'
  },
  {
    key: '7',
    icon: <UploadOutlined />,
    label: 'SystemSection',
  },
];

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedMenu, setSelectedMenu] = useState('0'); // Initialize selectedMenu state

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['0']}
          selectedKeys={[selectedMenu]} // Pass selectedMenu state as selectedKeys
          onClick={handleMenuClick}
        >
          {items.map((item) => (
            // Check if the key is not '6' or '7' before rendering
            (item.key !== '6' && item.key !== '7') && (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            )
          ))}
        </Menu>
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {selectedMenu === '0' && <Home />}
            {selectedMenu === '1' && <Profile />}
            {selectedMenu === '2' && <Analysis />}
            {selectedMenu === '3' && <SystemBank />}
            {selectedMenu === '4' && <AccountManagement />}
            {selectedMenu === '5' && <Payment />}
            {selectedMenu === '6' && null}
            {selectedMenu === '7' && null}
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
            />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
