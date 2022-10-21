import React, { Suspense, lazy } from 'react';
import { Container, Row } from 'react-bootstrap';
import './layout-styles.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../services/AuthContext';

const CreatePost = lazy(() => import('../pages/Posts/CreatePost'));
const Post = lazy(() => import('../pages/Posts/Post'));
const Home = lazy(() => import('../pages/Home/Home'));
const Login = lazy(() => import('./Login'));
const SignUp = lazy(() => import('./SignUp'));
const ForgotPassword = lazy(() => import('./ForgotPassword'));
const Footer = lazy(() => import('./Footer'));
const Messages = lazy(() => import('../pages/Messages/Messages'));
const Settings = lazy(() => import('../pages/Settings/Settings'));
const CreateProfile = lazy(() => import('./CreateProfile'));
const Profile = lazy(() => import('../pages/Profile/Profile'));

export default function Mainpage() {
  return (
    <Container fluid>
      <Row>
        <AuthProvider>
          <Suspense fallback={<div>Loading</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/create-profile" element={<CreateProfile />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/post/">
                <Route path=":id" element={<Post />} />
              </Route>
              <Route path="/profile/">
                <Route path=":id" element={<Profile />} />
              </Route>
              <Route path="/messages/:id" element={<Messages />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </Row>
      <Footer />
    </Container>
  );
}
