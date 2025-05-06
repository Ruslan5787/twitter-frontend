import React from "react";
import { UserPost, Box } from "../components/UserPost";

export const PostPage = () => {
  return <Box divideY="2px">
    <UserPost userAvatar="../../public/zuck-avatar.png" postImg="./../../public/post1.png" postTitle="Let's talk about Threads." replies="238" likes="801" />


  </Box>;
};
