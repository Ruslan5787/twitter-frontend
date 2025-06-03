import {Button, Container} from "@chakra-ui/react";
import "./App.css";
import {Navigate, Route, Routes} from "react-router-dom";
import {UserPage} from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import React, {useState} from "react";
import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import {useRecoilValue} from "recoil";
import userAtom from "./atoms/userAtom.js"
import LogoutButton from "./components/LogoutButton.jsx";
import UpdateProfilePage from "./pages/UpdateProfilePage.jsx";
import CreatePost from "./components/CreatePost.jsx";
import socketIOClient from "socket.io-client";

function App() {
    const user = useRecoilValue(userAtom);
    const [isPostCreated, setIsPostCreated] = useState(0)

    const socket = socketIOClient("http://localhost:27017");
    const handleClick = () => {
        socket.emit("connect1", "bbstay hard");
    }

    return (
        <Container maxW="620px" margin={"0 auto"} textStyle="body">
            <Button onClick={handleClick}>Отправить сообщение</Button>
            <Header/>
            <Routes>
                <Route path="/f" element={user ? <HomePage/> : <Navigate to="/auth"/>}/>
                <Route path="/" element={!user ? <AuthPage/> : <Navigate to="/"/>}/>
                <Route path="/update" element={user ? <UpdateProfilePage/> : <Navigate to="/"/>}/>

                <Route path="/:username" element={<UserPage isPostCreated={isPostCreated}/>}/>
                <Route path="/:username/post/:pid" element={<PostPage/>}/>
            </Routes>

            {user && <LogoutButton/>}
            {user && <CreatePost setIsPostCreated={setIsPostCreated}/>}
        </Container>
    );
}

export default App;
