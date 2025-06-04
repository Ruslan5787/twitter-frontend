import {Container} from "@chakra-ui/react";
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
import ChatPage from "./pages/ChatPage.jsx";

function App() {
    const user = useRecoilValue(userAtom);
    const [isPostCreated, setIsPostCreated] = useState(0)

    // const socket = socketIOClient("http://localhost:27017");
    // const handleClick = () => {
    //     socket.emit("connect1", "bbstay hard");
    // }

    return (
        <Container maxW="620px" margin={"0 auto"} textStyle="body">
            <Header/>
            <Routes>
                <Route path="/" element={user ? <HomePage/> : <Navigate to="/auth"/>}/>
                <Route path="/auth" element={!user ? <AuthPage/> : <Navigate to="/"/>}/>
                <Route path="/update" element={user ? <UpdateProfilePage/> : <Navigate to="/"/>}/>

                <Route path="/:username"
                       element={<UserPage setIsPostCreated={setIsPostCreated} isPostCreated={isPostCreated}/>}/>
                <Route path="/:username/post/:pid" element={<PostPage/>}/>
                <Route path="/chat" element={<ChatPage/>}/>
            </Routes>

            {user && <LogoutButton/>}
            {user && <CreatePost setIsPostCreated={setIsPostCreated}/>}
        </Container>
    );
}

export default App;
