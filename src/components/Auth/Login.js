import React from 'react';
import { Form, Input, Button, notification, Checkbox } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { login } from '../../api/authService';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await login(values.email, values.password);

      api.open({
        message: 'Login bem-sucedido',
        description: 'Você foi logado com sucesso no sistema.',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        duration: 5,
      });

      setTimeout(() => {
        navigate('/home');
      }, 2000); 

    } catch (err) {
      api.open({
        message: 'Falha no Login',
        description: 'Verifique suas credenciais e tente novamente.',
        icon: <FrownOutlined style={{ color: '#ff4d4f' }} />,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className={styles.loginFormContainer}>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="on"
          className={styles.loginForm}
        >
          <Form.Item
            label="e-mail"
            name="email"
            rules={[
              {
                required: true,
                message: 'Por favor insira seu e-mail!',
              },
            ]}
          >
            <Input  autoComplete="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Por favor insira sua senha!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            className={styles.rememberMe}

          >
            <Checkbox>Lembrar</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.submitButton}>
              Entrar
            </Button>
          </Form.Item>
          <div className={styles.createAccountButtonContainer}>
            <button type="button" className={styles.createAccountButton} onClick={() => navigate('/create-user')}>
              Criar uma conta
            </button>
          </div>
        </Form>
      </div>
    </>
  )
};

export default Login;
