import React from "react";
import UserHeader from "./UserHeader";
import { UserPost } from "../components/UserPost";
import { Flex } from "@chakra-ui/react";

export const UserPage = () => {
  return (
    <Flex flexDirection={"column"} gap={5}>
      <UserHeader />
      <UserPost
        likes={1200}
        replies={481}
        userAvatar="../public/zuck-avatar.png"
        postImg={"../public/post1.png"}
        postTitle={"Let's talk about Threads."}
      />
      <UserPost
        likes={1580}
        replies={300}
        postImg={"../public/post2.png"}
        postTitle={"Let's talk about Threads."}
      />
      <UserPost
        likes={1200}
        replies={481}
        postImg={"../public/post3.png"}
        postTitle={"Let's talk about Threads."}
      />

      <UserPost
        likes={1200}
        replies={481}
        postImg={""}
        postTitle={"Let's talk about Threads."}
      />
    </Flex>
  );
};
