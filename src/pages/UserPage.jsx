import React, {useEffect, useState} from "react";
import UserHeader from "./UserHeader";
import {UserPost} from "../components/UserPost";
import {Flex, Spinner} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import useShowToast from "../hooks/useShowToast.js";
import {Toaster} from "../components/ui/toaster.jsx";

export const UserPage = ({ isPostCreated }) => {
    const [user, setUser] = useState(null);
    const {username} = useParams();
    const showToast = useShowToast();
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([])
    const [postsCount, setPostsCount] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await fetch(`/api/users/profile/${username}`);
                const userData = await userResponse.json();

                if (userData.error) {
                    showToast("Error", userData.error, "error");
                }

                setUser(userData);

                const postsResponse = await fetch(`/api/posts/user_all/${userData._id}`);
                const postsData = await postsResponse.json();

                if (postsData.error) {
                    showToast("Error", postsData.error, "error");
                }
                setPosts(postsData);
                setPostsCount(postsData.length);
            } catch (error) {
                showToast("Error", error, "error");
            }
            setIsLoading(false)
        }

        fetchData()
    }, [username, postsCount, isPostCreated, showToast]);

    if (!user && isLoading) {
        return <Flex m={"20px 0 0 0"} justifyContent={"center"}>
            <Spinner></Spinner>
        </Flex>
    }

    if (user.error && !isLoading) {
        return <h1>Пользователь не найден</h1>
    }

    return (
        <Flex flexDirection={"column"} gap={5}>
            <Toaster/>
            <UserHeader user={user}/>

            {posts.length > 0 && posts.map((post) => (
                <UserPost key={post._id} postId={post._id} userAvatar={user?.profilePic} setPostsCount={setPostsCount}/>
            ))}
        </Flex>
    )
}
