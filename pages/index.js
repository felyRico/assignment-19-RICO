import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Button } from 'antd';
import {
  HomeOutlined,
  MenuFoldOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import App from './_app';

const { Header, Sider, Content, Footer } = Layout;

export default function HomePage() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255,255,255,0.15)' }} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["home"]}>
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="tabs" icon={<AppstoreOutlined />}>
            <Link href="/advanced-interactive">Tabs</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ padding: '0 16px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Ai9efgu9euhfyesufjesyubfheudcvawu9fdfawuipdawtydgaew</div>
          <Button type="text" onClick={() => setCollapsed(!collapsed)} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
        </Header>

        <Content style={{ margin: 16 }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            <h2>Fio9eshgfuaehgfuesh7uewjfuiewgtewghgf7uvbrni3q rfno3crytuhjesphfdrthjdcvgui2ygttesysi9we8gwqio0rytew78jdew478hjq -0ury89q3w9ery4jede5788jkaew0984uiqew3-=ru</h2>
            <img src="https://media.tenor.com/XP6l2Pkg8zoAAAAm/zzz-zenless-zone-zero.webp" alt="chicken sandwich lady" style={{ maxWidth: '100%' }} />
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>se908fesfxeqw9grfegberjvrs90gnmewogvesuo9igfewjehewjeu7ew8rjv</Footer>
      </Layout>
    </Layout>
  );
}
