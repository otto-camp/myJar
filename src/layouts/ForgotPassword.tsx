import React, { useState } from 'react';
import { useAuth } from '../services/AuthContext';
import SEO from '../utils/SEO/SEO';
import {
  Alert,
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Notification,
  Paper,
  Text,
  TextInput,
  Title,
  createStyles
} from '@mantine/core';
import { IconAlertCircle, IconArrowLeft, IconCheck } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { EMAIL_REGEX } from '../global/Constants';

const useStyles = createStyles((theme) => ({
  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse'
    }
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center'
    }
  }
}));

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { classes } = useStyles();

  const fpForm = useForm({
    initialValues: {
      email: ''
    },
    validate: {
      email: (val) => (EMAIL_REGEX.test(val) ? null : 'Invalid Email')
    }
  });

  async function handleSubmit(val: { email: string }) {
    try {
      await forgotPassword(val.email);
      setIsSent(true);
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <>
      <SEO
        title="Forgot Password | myJar"
        url="https://myjar-8ff23.web.app/forgotpassword"
        description="Blog website users can create stories from various categories. Users can follow and message each other."
        type="website"
      />
      <Container size={460} my={30}>
        <Title size="1.75rem" fw={900} align="center">
          Forgot your password?
        </Title>
        <Text color="dimmed" size="sm" align="center">
          Enter your email to get a reset link
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

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <form onSubmit={fpForm.onSubmit((val) => handleSubmit(val))}>
            <TextInput {...fpForm.getInputProps('email')} label="Your email" placeholder="example@email.com" />
            <Group position="apart" mt="lg" className={classes.controls}>
              <Anchor color="dimmed" href="/login" size="sm" className={classes.control}>
                <Center inline>
                  <IconArrowLeft size={12} stroke={1.5} />
                  <Box ml={5}>Back to login page</Box>
                </Center>
              </Anchor>
              <Button
                type="submit"
                variant="gradient"
                gradient={{ from: 'blue', to: 'grape' }}
                className={classes.control}>
                Reset password
              </Button>
            </Group>
          </form>
        </Paper>
        {isSent && (
          <Notification mt="xl" icon={<IconCheck size={20} />} color="teal" title="Password Reset Link Sent">
            A password reset link has been sent to your email address. Please follow the instructions in the email to
            reset your password.
          </Notification>
        )}
      </Container>
    </>
  );
}
