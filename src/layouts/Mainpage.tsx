import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../services/AuthContext';
import loadable from '@loadable/component';
import { HelmetProvider } from 'react-helmet-async';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

const Error = loadable(() => import('./Error'));
const Navi = loadable(() => import('./Navi'));
const CreatePost = loadable(() => import('../pages/Post/CreatePost'));
const Post = loadable(() => import('../pages/Post/Post'));
const Home = loadable(() => import('../pages/Home/Home'));
const About = loadable(() => import('../pages/common/About'));
const Contact = loadable(() => import('../pages/common/Contact'));
const Login = loadable(() => import('./Login'));
const SignUp = loadable(() => import('./SignUp'));
const ForgotPassword = loadable(() => import('./ForgotPassword'));
const Footer = loadable(() => import('./Footer'));
const Messages = loadable(() => import('../pages/Message/Messages'));
const Settings = loadable(() => import('../pages/Settings/Settings'));
const CreateProfile = loadable(() => import('./CreateProfile'));
const Profile = loadable(() => import('../pages/Profile/Profile'));
const Category = loadable(() => import('../pages/Category/Category'));
const Search = loadable(() => import('../pages/Search/Search'));

export default function Mainpage() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <HelmetProvider>
          <AuthProvider>
            <Navi />
            <Routes>
              <Route index element={<Home />} />
              <Route path="*" element={<Error />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/create-profile" element={<CreateProfile />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/post">
                <Route path=":id" element={<Post />} />
                <Route path="create-post" element={<CreatePost />} />
              </Route>
              <Route path="/profile">
                <Route path=":id" element={<Profile />} />
              </Route>
              <Route path="/messages/:id" element={<Messages />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/search" element={<Search />} />
            </Routes>
            <Footer />
          </AuthProvider>
        </HelmetProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
