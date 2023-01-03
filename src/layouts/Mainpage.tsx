import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../services/AuthContext';
import loadable from '@loadable/component';
import { HelmetProvider } from 'react-helmet-async';
import { ColorScheme, ColorSchemeProvider, MantineProvider, Skeleton, createEmotionCache } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

const Error = loadable(() => import('./Error'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const Navi = loadable(() => import('./Navi'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const CreatePost = loadable(() => import('../pages/CreatePost'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const Post = loadable(() => import('../pages/Post'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const Home = loadable(() => import('../pages/Home'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const About = loadable(() => import('../pages/About'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const Contact = loadable(() => import('../pages/Contact'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const Login = loadable(() => import('./Login'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const SignUp = loadable(() => import('./SignUp'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const ForgotPassword = loadable(() => import('./ForgotPassword'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const Footer = loadable(() => import('./Footer'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const Settings = loadable(() => import('../pages/Settings'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const Profile = loadable(() => import('../pages/Profile'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const Category = loadable(() => import('../pages/Category'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const Search = loadable(() => import('../pages/Search/Search'), {
  fallback: <Skeleton height="100%" width="100%" />
});

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
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
