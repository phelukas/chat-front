import React, { useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { getUser, updateUser } from '../../../api/userService'; 
import styles from './UpdateUserForm.module.css';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';

const UpdateUserForm = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await getUser();
        console.log(userData)
        form.setFieldsValue(userData); 
      } catch (err) {
        notification.error({
          message: 'Falha ao Carregar Dados do Usuário',
          description: 'Não foi possível carregar os dados do usuário.',
        });
      }
    };

    loadUserData(); 
  }, [ form]); 

  const onFinish = async (values) => {
    try {
      await updateUser(values);
      api.open({
        message: 'Usuário Atualizado',
        description: 'Os dados do usuário foram atualizados com sucesso.',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      });
      form.resetFields();
    } catch (err) {
      api.open({
        message: 'Erro ao Atualizar Usuário',
        description: err.response && err.response.data && err.response.data.detail ? err.response.data.detail : 'Erro desconhecido',
        icon: <FrownOutlined style={{ color: '#ff4d4f' }} />,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className={styles.updateUserFormContainer}>
        <Form
          form={form}
          name="updateUser"
          onFinish={onFinish}
          autoComplete="off"
          className={styles.updateUserForm}
        >
          <Form.Item
            label="Senha"
            name="password"
            rules={[{ message: 'Deixe em branco se não quiser alterar a senha' }]}
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
              Atualizar Usuário
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UpdateUserForm;
