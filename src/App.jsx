import { Container, Button } from "@chakra-ui/react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { UserPage } from "./pages/UserPage";
import { PostPage } from "./pages/PostPage";
import Header from "./components/Header";
import UserHeader from "./pages/UserHeader";
import React from "react";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Container maxW="620px" margin={"0 auto"} textStyle="body">
      <Header />
      <Routes>
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>
      <Toaster />
    </Container>
  );
}

export default App;
