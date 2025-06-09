import React, {useEffect, useState} from "react";
import useShowToast from "../hooks/useShowToast.js";
import {Post} from "../components/Post.jsx";
import {Toaster} from "../components/ui/toaster.jsx";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const showToast = useShowToast();

    useEffect(() => {
        try {
            const getPosts = async () => {
                const res = await fetch("/api/posts/feed");
                const data = await res.json();

                if (data.error) {
                    showToast("Ошибка", data.error, "error");
                }

                setPosts(data);
            };

            getPosts();
        } catch (error) {
            showToast("Ошибка", "Не удалось загрузить посты", "error");
        }
    }, [showToast]);

    return (
        <div>
            <Toaster/>
            {posts.length > 0 &&
            posts?.map((post) => (
                <Post key={post._id} postInfo={post} postedBy={post.postedBy}/>
            ))}
        </div>
    );
};

HomePage.propTypes = {};

export default HomePage;
