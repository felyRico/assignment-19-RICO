import React, { useState, useEffect } from 'react';
import 'antd/dist/reset.css';
import {
  Typography,
  Button,
  Modal,
  Tabs,
  List,
  Collapse,
  notification,
  message,
  Form,
  Input,
  Popconfirm,
  Switch,
  ConfigProvider,
  theme
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function AdvancedInteractive() {
  const [visible, setVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [hasShownMessage, setHasShownMessage] = useState(false);
  const [user, setUser] = useState({
    name: 'name',
    email: 'mail@mail.com',
    role: 'role'
  });
  const [form] = Form.useForm();
  const [activities, setActivities] = useState(['Logged in from Web']);

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user, form, visible]);

  useEffect(() => {
    if (!hasShownMessage) {
      message.info('Welcome to the User Dashboard! This message will disappear in 3 seconds.', 3);
      setHasShownMessage(true);
    }
  }, [hasShownMessage]);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setUser(values);
      setActivities(prev => ['Profile updated', ...prev]);
      closeModal();
      notification.success({ message: 'User info saved successfully', duration: 2 });
    } catch (error) {
      message.error('Please check your input');
    }
  };

  const handleCancel = () => {
    closeModal();
    message.warning('Changes were not saved');
  };

  const handleDelete = (index) => {
    setActivities(prev => prev.filter((_, i) => i !== index));
    message.success('Activity deleted successfully');
  };

  const tabItems = [
    {
      key: '1',
      label: 'Profile',
      children: (
        <Form form={form} layout="vertical" initialValues={user}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please input your role!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      )
    },
    {
      key: '2',
      label: 'Activity',
      children: (
        <List
          dataSource={activities}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              extra={
                <Popconfirm
                  title="Delete this activity?"
                  onConfirm={() => handleDelete(index)}
                  okText="Delete"
                  cancelText="Cancel"
                >
                  <Button type="text" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              }
            >
              {item}
            </List.Item>
          )}
        />
      )
    }
  ];

  const faqItems = [
    { key: 'faq1', label: 'Who made this site?', children: 'I HAVE NO IDEA!' },
    { key: 'faq2', label: 'What is this site for?', children: 'I HAVE NO IDEA!' },
    { key: 'faq3', label: 'How do I', children: 'I HAVE NO IDEA!' }
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div className="dashboard-container">
        <style jsx>{`
          .dashboard-container {
            padding: 1.5rem;
            max-width: 48rem;
            margin: 0 auto;
            background-color: ${darkMode ? '#141414' : 'white'};
            color: ${darkMode ? '#ffffff' : '#000000'};
            min-height: 100vh;
            transition: background-color 0.3s, color 0.3s;
          }
          .dashboard-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
          }
          .dashboard-title {
            color: ${darkMode ? '#ffffff' : 'var(--foreground)'};
            margin: 0;
          }
          .faq-section {
            margin-bottom: 1.5rem;
          }
        `}</style>

        <div className="dashboard-header">
          <Title level={3} className="dashboard-title">
            User Dashboard
          </Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Dark Mode</span>
            <Switch checked={darkMode} onChange={setDarkMode} />
            <Button type="primary" onClick={openModal}>
              Open User Info
            </Button>
          </div>
        </div>

        <div className="faq-section">
          <Collapse items={faqItems} accordion />
        </div>

        <Modal
          open={visible}
          onOk={handleSave}
          onCancel={handleCancel}
          okText="Save"
          cancelText="Cancel"
          style={{
            transition: 'all 0.3s ease-in-out',
            transform: visible ? 'scale(1)' : 'scale(0.9)',
            opacity: visible ? 1 : 0
          }}
        >
          <Tabs defaultActiveKey="1" items={tabItems} />
        </Modal>
      </div>
    </ConfigProvider>
  );
}
