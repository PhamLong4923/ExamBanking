import React from 'react';
import { Layout, Menu } from 'antd';
import { NavLink, BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginAndRegister from './pages/Login';
import { Provider } from 'react-redux';
import store from './redux-setup/store';
import BankPage from './pages/Bank';
import Account from './components/ui/account';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Services from './pages/Services';
import ExamPage from './pages/Exam';
import TicketPaymentModal from './components/ui/ticketpaymentui';

const { Sider, Content } = Layout;

const App = () => {
  // Hàm ánh xạ path thành số
  const mapPathToKey = (path) => {
    switch (path) {
      case '/':
        return '1';
      case '/services':
        return '2';
      case '/bank':
        return '3';
      case '/exam-creator':
        return '4';
      default:
        return '1'; // Mặc định là '1' cho trường hợp không khớp
    }
  };

  return (
    <GoogleOAuthProvider clientId="961165515652-b6pd4d1492do15fspi8ssa268o4h1ce6.apps.googleusercontent.com">
      <Provider store={store}>
        <BrowserRouter>
          <Layout style={{ minHeight: '100vh' }}>
            <Sider style={{ position: 'relative' }}>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[mapPathToKey(window.location.pathname)]} // Sử dụng window.location.pathname để lấy đường dẫn hiện tại
                style={{ height: '100%', borderRight: 0 }}
              >
                <Menu.Item key="1">
                  <NavLink to="/" exact>Trang chủ</NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                  <NavLink to="/services">Dịch vụ</NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                  <NavLink to="/bank">Ngân hàng</NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                  <NavLink to="/exam-creator">Tạo đề</NavLink>
                </Menu.Item>
              </Menu>
              <Account></Account>
            </Sider>
            <Layout>
              <Content style={{ margin: '16px' }}>
                {/* Trang chính */}
                <div style={{ background: '#fff', padding: 24, height: '95vh' }}>
                  <Routes>
                    <Route path="/login" element={<LoginAndRegister />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/bank" element={<BankPage />} />
                    <Route path="/exam-creator" element={<ExamPage />} />
                    <Route path="/ck" element={<TicketPaymentModal start={true} />} />
                  </Routes>
                </div>
              </Content>
            </Layout>
          </Layout>
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
