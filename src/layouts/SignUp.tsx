import React, { useState } from 'react';
import { useAuth } from '../services/AuthContext';
import SEO from '../utils/SEO/SEO';
import {
  Alert,
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  SimpleGrid,
  Text,
  TextInput,
  Textarea,
  Title
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { EMAIL_REGEX, exampleAbout, PROFILE_IMAGE } from '../global/Constants';
import { IconAlertCircle } from '@tabler/icons';
import { db } from '../services/firebase';
import { setDoc, doc } from 'firebase/firestore/lite';

export default function SignUp() {
  const { signup } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const signupForm = useForm({
    initialValues: {
      email: '',
      password: '',
      birthDate: new Date(),
      fname: '',
      lname: '',
      about: ''
    },
    validate: {
      email: (v) => (EMAIL_REGEX.test(v) ? null : 'Invalid email'),
      password: (v) => (v.length < 6 ? 'Password must be at least 6 characters' : null),
      birthDate: (v) => (v === null ? 'You need to choose a date' : null),
      fname: (v) => (v === '' || v === null ? 'You need to enter your name' : null),
      lname: (v) => (v === '' || v === null ? 'You need to enter your name' : null),
      about: (v) => (v === '' || v === null ? 'You need to describe your self' : null)
    }
  });

  function handleAuth(val: any) {
    return new Promise((resolve, reject) => {
      signup(val.email, val.password)
        .then(resolve)
        .catch((error: any) => {
          setError(error.message);
          reject(error);
        });
    });
  }

  function handleSignUp(val: {
    email: string;
    password: string;
    birthDate: Date;
    fname: string;
    lname: string;
    about: string;
  }) {
    handleAuth(val).then(async (res: any) => {
      const d = val.birthDate;

      await setDoc(doc(db, 'profile', res.user.uid), {
        id: res.user.uid,
        fname: val.fname,
        lname: val.lname,
        email: val.email,
        birthDate: d.getFullYear().toString() + '/' + (d.getMonth() + 1).toString() + '/' + d.getDate().toString(),
        about: val.about,
        facebook: '',
        github: '',
        instagram: '',
        twitter: '',
        website: '',
        likedPosts: [],
        createdPosts: [],
        follows: [],
        followers: [],
        photoURL: PROFILE_IMAGE
      });
    });
  }

  return (
    <>
      <SEO
        title="Sign up | myJar"
        url="https://myjar-8ff23.web.app/signup"
        description="Blog website users can create stories from various categories. Users can follow and message each other."
        type="website"
      />
      <Container maw={600}>
        <Title align="center" fw={900}>
          Create an Account
        </Title>

        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do you have an account?{' '}
          <Anchor<'a'> href="/login" size="sm">
            Login
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

        <Paper withBorder shadow="md" p={30} mt="xl">
          <form onSubmit={signupForm.onSubmit((val) => handleSignUp(val))}>
            <TextInput
              label="Email"
              placeholder="example@email.com"
              my="md"
              withAsterisk
              {...signupForm.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="******"
              withAsterisk
              {...signupForm.getInputProps('password')}
            />
            <DatePicker
              dropdownType="modal"
              label="Birth Date"
              {...signupForm.getInputProps('birthDate')}
              my="md"
              withAsterisk
            />
            <SimpleGrid cols={1} breakpoints={[{ minWidth: 600, cols: 2 }]} my="md">
              <TextInput
                label="First Name"
                placeholder="First name"
                withAsterisk
                {...signupForm.getInputProps('fname')}
              />
              <TextInput
                label="Last Name"
                placeholder="Last name"
                withAsterisk
                {...signupForm.getInputProps('lname')}
              />
            </SimpleGrid>
            <div style={{ position: 'relative' }}>
              <Textarea
                label="About yourself"
                autosize
                minRows={2}
                maxLength={255}
                placeholder="Enter a brief description of yourself here"
                my="md"
                {...signupForm.getInputProps('about')}
              />
              <Button
                compact
                variant="default"
                onClick={() => signupForm.setValues({ about: exampleAbout })}
                pos="absolute"
                style={{ bottom: 0, right: 0 }}>
                Give me a text
              </Button>
            </div>
            <Button fullWidth variant="filled" size="md" type="submit">
              Submit
            </Button>
          </form>
        </Paper>

        {/* SECOND SECTION
          <Paper withBorder shadow="md" p={30}>
            <Text>
              <IconInfoCircle /> This section is optional
            </Text>
            <TextInput label="Website link" my="sm" />
            <TextInput label="GitHub link" my="sm" />
            <TextInput label="Twitter link" my="sm" />
            <TextInput label="Facebook link" my="sm" />
            <TextInput label="Instagram link" my="sm" />
            <Group grow>
              <Button variant="default" size="md" >
                Back
              </Button>
              <Button variant="filled" size="md" >
                Next
              </Button>
            </Group>
          </Paper> */}
      </Container>
    </>
  );
}
