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
import React from 'react';
import Profile from './Users/profile';
const { Header, Content, Footer, Sider } = Layout;
const items = [];

items.push({        //key này là id nhé :))
  key: "0",
  icon: React.createElement(AppstoreOutlined),
  label: "home",
})

items.push({
  key: "1",
  icon: React.createElement(UserOutlined),
  label: "Profile",
});

items.push({
  key: "2",
  icon: React.createElement(BarChartOutlined),
  label: "Analysis",
});

items.push({
  key: "3",
  icon: React.createElement(CloudOutlined),
  label: "System bank",
});

items.push({
  key: "4",
  icon: React.createElement(TeamOutlined),
  label: "Account",
});

items.push({
  key: "5",
  icon: React.createElement(ShopOutlined),
  label: "Payment",
});

items.push({
  key: "6",
  icon: React.createElement(VideoCameraOutlined),
  label: "nav 2",
});

items.push({
  key: "7",
  icon: React.createElement(UploadOutlined),
  label: "nav 3",
});

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
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
            <Profile></Profile>
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
    </Layout >
  );
};
export default App;