import React, { useState } from 'react';
import { PieChartOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import DadosPessoais from '../DadosPessoais/DadosPessoais';
import Contatos from '../Contatos/Contatos';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
  getItem('Dados Pessoais', '1', <PieChartOutlined />),
  getItem('Contatos', '2', <PieChartOutlined />),
];

const HomeUser = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1'); 

  const onMenuSelect = ({ key }) => {
    setSelectedMenuItem(key); 
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case '1':
        return <DadosPessoais />;
      case '2':
        return <Contatos />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onSelect={onMenuSelect} />
      </Sider>
      <Layout>
        <Header />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedMenuItem === '1' ? 'Dados Pessoais' : 'Contatos'}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360 }}>{renderContent()}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomeUser;
