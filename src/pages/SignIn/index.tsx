import React, { useCallback, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';

import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';
import Input from '../../components/Input';
import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          email: yup
            .string()
            .required('E-mail obrigatório')
            .email('Digite um email válido'),
          password: yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        // history.push('/dashboard');
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        Alert.alert(
          'Erro na autenticação',
          'Houve um erro nas credenciais. Cheque novamente.',
        );
      }
    },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Faça seu login</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                name="email"
                icon="mail"
                placeholder="E-Mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordRef.current?.focus();
                }}
              />
              <Input
                ref={passwordRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>
            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccount onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountText>Criar conta</CreateAccountText>
      </CreateAccount>
    </>
  );
};

export default SignIn;
