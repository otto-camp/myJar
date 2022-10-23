import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './layout-styles.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../services/AuthContext';
import loadable from '@loadable/component';

const CreatePost = loadable(() => import('../pages/Posts/CreatePost'));
const Post = loadable(() => import('../pages/Posts/Post'));
const Home = loadable(() => import('../pages/Home/Home'));
const Login = loadable(() => import('./Login'));
const SignUp = loadable(() => import('./SignUp'));
const ForgotPassword = loadable(() => import('./ForgotPassword'));
const Footer = loadable(() => import('./Footer'));
const Messages = loadable(() => import('../pages/Messages/Messages'));
const Settings = loadable(() => import('../pages/Settings/Settings'));
const CreateProfile = loadable(() => import('./CreateProfile'));
const Profile = loadable(() => import('../pages/Profile/Profile'));

export default function Mainpage() {
  return (
    <Container fluid>
      <Row>
        <AuthProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="profile/">
              <Route path=":id" element={<Profile />} />
            </Route>
            <Route path="/messages/:id" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AuthProvider>
      </Row>
      <Footer />
    </Container>
  );
}
