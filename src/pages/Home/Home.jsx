import React from "react";
import "./home.css";
import { Container, Row } from "react-bootstrap";
import Navi from "../../layouts/Navi";

export default function Home() {
  return (
    <>
    <Navi/>
    <Container className="p-0 m-0" fluid>
      <Row>
        {/* POSTS HERE*/}
      </Row>
    </Container>
    </>
  );
}
