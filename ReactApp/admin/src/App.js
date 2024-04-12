import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserAddOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccessManagement from './components/UI/Features/AccessManagement';
import AccountManagement from './components/UI/Features/AccountManagement';
import Home from './components/UI/Features/AdminHome';
import AdminSection from './components/UI/Features/AdminSection';
import Analysis from './components/UI/Features/Analysis';
import Payment from './components/UI/Features/Payment';
import AdminRepository from './components/UI/Features/Repository';
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
    label: 'System Repo',
    link: '/system_bank/:bankId/system_repo'
  },
  {
    key: '7',
    icon: <UploadOutlined />,
    label: 'System Section',
    link: '/system_bank/:bankId/system_repo/:repoId/system_setion'
  },
  {
    key: '8',
    icon: <UserAddOutlined />,
    label: 'Access Management',
    link: '/system_bank/:bankId/access_management'
  }
];

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedMenu, setSelectedMenu] = useState();
  const location = useLocation()

  // useEffect(() => {
  //   const currentPath = location.pathname;
  //   const selectedItem = items.find(item => {
  //     const linkParts = item.link.split('/').filter(part => part !== ''); // Lọc bỏ các phần tử rỗng
  //     const pathParts = currentPath.split('/').filter(part => part !== ''); // Lọc bỏ các phần tử rỗng
  //     if (linkParts.length !== pathParts.length) return false; // Kiểm tra độ dài của hai mảng
  //     return linkParts.every((part, index) => {
  //       if (part.startsWith(':')) return true; // Nếu phần tử bắt đầu bằng ':' thì bỏ qua kiểm tra
  //       return part === pathParts[index]; // Kiểm tra xem mỗi phần tử của link có trùng khớp với mỗi phần tử của pathname không
  //     });
  //   });
  //   if (selectedItem) {
  //     setSelectedMenu(selectedItem.key);
  //   }
  // }, [location]);
  useEffect(() => {
    const currentPath = location.pathname;
    const [mainLink] = currentPath.split('/').slice(1);
    const selectedItem = items.find(item => currentPath.startsWith(item.link));
    if (selectedItem) {
      setSelectedMenu(selectedItem.key);
    }
  }, [location]);


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
            (item.key < 6) && (
              <Menu.Item key={item.key} icon={item.icon}>
                <NavLink to={item.link}>{item.label}</NavLink>
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
            {/* {selectedMenu === '0' && <Home />}
              {selectedMenu === '1' && <Profile />}
              {selectedMenu === '2' && <Analysis />}
              {selectedMenu === '3' && <SystemBank />}
              {selectedMenu === '4' && <AccountManagement />}
              {selectedMenu === '5' && <Payment />}
              {selectedMenu === '6' && null}
              {selectedMenu === '7' && null} */}
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/system_bank" element={<SystemBank />} />
              <Route path="/account_management" element={<AccountManagement />} />
              <Route path="/payment_management" element={<Payment />} />
              <Route path="/system_bank/:bankId/system_repo" element={<AdminRepository />} />
              <Route path="/system_bank/:bankId/system_repo/:repoId/system_section" element={<AdminSection />} />
              <Route path="/system_bank/:bankId/access_management" element={<AccessManagement />} />
            </Routes>
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
