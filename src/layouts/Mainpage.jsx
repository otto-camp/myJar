import React from "react";
import { Container, Row } from "react-bootstrap";
import "./layout-styles.css";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import { AuthProvider } from "../services/AuthContext";
import Footer from "./Footer";
import Messages from "../pages/Messages/Messages";
import Settings from "../pages/Settings/Settings";
import CreateProfile from "./CreateProfile";
import Profile from "../pages/Profile/Profile";

export default function Mainpage() {
  return (
    <Container>
      <Row className="min-h">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/messages/:id" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AuthProvider>
      </Row>
      <Footer />
    </Container>
  );
}
