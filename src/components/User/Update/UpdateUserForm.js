import React, { useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { getUser, updateUser } from '../../../api/userService'; // Certifique-se de que getUser está sendo importado corretamente
import styles from './UpdateUserForm.module.css';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';

const UpdateUserForm = () => { // Supondo que você tenha o userId disponível como prop
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await getUser(); // Chama a função getUser com o userId
        form.setFieldsValue(userData); // Define os valores iniciais com os dados do usuário
      } catch (err) {
        notification.error({
          message: 'Falha ao Carregar Dados do Usuário',
          description: 'Não foi possível carregar os dados do usuário.',
        });
      }
    };

    loadUserData(); // Chama a função loadUserData quando o componente é montado
  }, [ form]); // Dependências do useEffect

  const onFinish = async (values) => {
    try {
      await updateUser(values); // Certifique-se de que updateUser aceita userId
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
