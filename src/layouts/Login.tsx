import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { Alert, Anchor, Button, Container, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import SEO from '../utils/SEO/SEO';
import { EMAIL_REGEX } from '../global/Constants';
import { IconAlertCircle } from '@tabler/icons';

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loginForm = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: (val) => (EMAIL_REGEX.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length < 6 ? 'Invalid password' : null)
    }
  });

  async function handleLogin(val: { email: string; password: string }) {
    try {
      await login(val.email, val.password);
      navigate('/');
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <>
      <SEO
        title="Login | myJar"
        url="https://myjar-8ff23.web.app/login"
        description="Blog website users can create stories from various categories. Users can follow and message each other."
        type="website"
      />
      <Container size={460} my={120}>
        <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor<'a'> href="/signup" size="sm">
            Create account
          </Anchor>
        </Text>

        {error && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Bummer!"
            color="red"
            withCloseButton
            closeButtonLabel="Close alert"
            variant="filled">
            {error}
          </Alert>
        )}

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={loginForm.onSubmit((val) => handleLogin(val))}>
            <TextInput {...loginForm.getInputProps('email')} label="Email" placeholder="example@email.com" data-cy="login-email"/>
            <PasswordInput
              {...loginForm.getInputProps('password')}
              label="Password"
              placeholder="Your password"
              mt="md"
              data-cy="login-password"
            />
            <Anchor<'a'> href="/forgotpassword" size="sm" mt="lg">
              Forgot password?
            </Anchor>
            <Button variant="gradient" gradient={{ from: 'blue', to: 'grape' }} type="submit" fullWidth mt="xl" data-cy="login-button">
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}
