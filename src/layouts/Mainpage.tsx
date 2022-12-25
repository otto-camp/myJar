import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../services/AuthContext';
import loadable from '@loadable/component';
import { HelmetProvider } from 'react-helmet-async';
import { ColorScheme, ColorSchemeProvider, MantineProvider, createEmotionCache } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

const Error = loadable(() => import('./Error'));
const Navi = loadable(() => import('./Navi'));
const CreatePost = loadable(() => import('../pages/CreatePost'));
const Post = loadable(() => import('../pages/Post'));
const Home = loadable(() => import('../pages/Home'));
const About = loadable(() => import('../pages/About'));
const Contact = loadable(() => import('../pages/Contact'));
const Login = loadable(() => import('./Login'));
const SignUp = loadable(() => import('./SignUp'));
const ForgotPassword = loadable(() => import('./ForgotPassword'));
const Footer = loadable(() => import('./Footer'));
const Settings = loadable(() => import('../pages/Settings'));
const CreateProfile = loadable(() => import('./CreateProfile'));
const Profile = loadable(() => import('../pages/Profile'));
const Category = loadable(() => import('../pages/Category'));
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
  
  const myCache = createEmotionCache({ key: 'mantine' });
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider emotionCache={myCache} theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
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
