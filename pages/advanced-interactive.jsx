import React, { useState } from 'react';
import 'antd/dist/reset.css';
import { Typography, Button, Modal, Tabs, List, Collapse, notification, message, Form, Input } from 'antd';
import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

export default function AdvancedInteractive() {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({
    name: 'DUMBASS',
    email: 'DUMBASS@DUMBASS.com',
    role: 'DUMBASS'
  });
  const [form] = Form.useForm();
  const [activities, setActivities] = useState([
    'Logged in from Web',
  ]);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setUser(values);
      // Record the profile update in the activity log
      setActivities((prev) => ['Profile updated', ...prev]);
      closeModal();
      notification.success({
        message: 'User info saved successfully',
        duration: 2
      });
    } catch (error) {
      message.error('Please check your input');
    }
  };

  const handleCancel = () => {
    closeModal();
    message.warning('Changes were not saved');
  };

  const confirmDelete = (index) => {
    Modal.confirm({
      title: 'Delete activity',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this activity?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        setActivities((prev) => prev.filter((_, i) => i !== index));
        notification.open({
          message: 'Activity deleted',
          duration: 1.8
        });
      }
    });
  };

  return (
    <div className="dashboard-container">
      <style jsx>{`
        .dashboard-container {
          padding: 1.5rem;
          max-width: 48rem;
          margin: 0 auto;
          background-color: white;
          min-height: 100vh;
        }
        .dashboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .dashboard-title {
          color: var(--foreground);
          margin: 0;
        }
        .faq-section {
          margin-bottom: 1.5rem;
        }
        /* Modal animation classes */
        :global(.modal-enter .ant-modal-content) {
          transform: translateY(0);
          opacity: 1;
          transition: all 220ms ease-out;
        }
        :global(.modal-leave .ant-modal-content) {
          transform: translateY(-8px);
          opacity: 0;
          transition: all 180ms ease-in;
        }
      `}</style>

      <div className="dashboard-header">
        <Title level={3} className="dashboard-title">
          User Dashboard
        </Title>
        <Button type="primary" onClick={openModal}>
          Open User Info
        </Button>
      </div>

      <div className="faq-section">
        <Collapse accordion>
          <Panel header="Frequently Asked Questions (FAQ)" key="faq-root">
            <Collapse>
              <Panel header="Who made this site?" key="faq1">
                <p>I HAVE NO IDEA!</p>
              </Panel>
              <Panel header="What is this site for?" key="faq2">
                <p>I HAVE NO IDEA!</p>
              </Panel>
              <Panel header="How do I" key="faq3">
                <p>I HAVE NO IDEA!</p>
              </Panel>
            </Collapse>
          </Panel>
        </Collapse>
      </div>

      <Modal
        open={visible}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
        className={visible ? 'modal-enter' : 'modal-leave'}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Profile" key="1">
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
          </TabPane>
          <TabPane tab="Activity" key="2">
            <List
              dataSource={activities}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <Button
                      key="d"
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => confirmDelete(index)}
                    />
                  ]}
                >
                  <List.Item.Meta description={item} />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
}