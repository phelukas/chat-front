import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { createUser } from '../../api/userService';
import styles from './CreateUserForm.module.css'; 
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';

const CreateUserForm = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    try {
      await createUser(values);
      api.open({
        message: 'Usuário Criado',
        description: 'O usuário foi criado com sucesso.',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      });
      form.resetFields();
    } catch (err) {
      api.open({
        message: 'Erro ao Criar Usuário',
        description: err.response.data.detail,
        icon: <FrownOutlined style={{ color: '#ff4d4f' }} />,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className={styles.createUserFormContainer}>
        <Form
          form={form}
          name="createUser"
          onFinish={onFinish}
          autoComplete="off"
          className={styles.createUserForm}
        >
          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Nome Completo"
            name="username"
            rules={[{ required: true, message: 'Por favor, insira seu nome completo!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.submitButton}>
              Criar Usuário
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreateUserForm;
