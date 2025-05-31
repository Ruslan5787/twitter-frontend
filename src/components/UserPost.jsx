import {
    Avatar, Box, Button, Flex, Text, Image, AvatarGroup,
} from "@chakra-ui/react";
import {BsFillPatchCheckFill} from "react-icons/bs";
import {BsThreeDots} from "react-icons/bs";

import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Actions} from "./Actions";
import {useRecoilValue} from "recoil";
import userAtom from "../atoms/userAtom.js";
import {formatDistanceToNow} from "date-fns";
import {AvatarsCommentedUsers} from "./AvatarsCommentedUsers.jsx";
import useShowToast from "../hooks/useShowToast.js";


export const UserPost = ({ postId, userAvatar}) => {
    const user = useRecoilValue(userAtom);
    const [post, setPost] = useState(null)
    const [liked, setLiked] = useState(null);
    const [countLikes, setCountLikes] = useState(0);
    const [countReplies, setCountReplies] = useState(0);
    const showToast = useShowToast();

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await fetch(`/api/posts/${postId}`)
                const data = await res.json();

                if(data.error) {
                    showToast("Ошибка", data.error, "error");
                    return;
                }

                setPost(data);

                if (data.likes.includes(user._id)) {
                    setLiked(true)
                }

                setCountLikes(data.likes.length);
                setCountReplies(data.replies.length);
            }catch (e) {
                showToast("Ошибка", e.message, "error");
            }
        }

        getPost();
    }, [countReplies]);

    if (!post?.text) return null;

    return (
        <Flex gap={3} mb={4} my={5} width={"full"}>
            <Flex
                position="relative"
                mr={5}
                flexDirection={"column"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Avatar.Root>
                    <Avatar.Fallback name="Segun Adebayo"/>
                    <Avatar.Image src={userAvatar}/>
                </Avatar.Root>
                <Box h={"full"} w={"1px"} bg={"gray"}></Box>
                {<AvatarsCommentedUsers replies={post.replies} countCommentedUsers={countReplies}/>}
            </Flex>

            <Box flex={1}>
                <Flex justifyContent={"space-between"} w={"full"}>
                    <Box mb={2}>
                        <Link to={`/${user?.username}/post/${post?._id}`}>
                            <Flex mb={2} alignItems={"center"} textAlign={"center"}>
                                <Text fonWeight={"bold"} mr={2}>{user?.username}</Text>
                                <BsFillPatchCheckFill color="#3D90D7"/>
                            </Flex>
                        </Link>

                        <Text fontWeight={"light"} whiteSpace={"pre-wrap"} wordBreak="break-all">{post?.text}</Text>
                    </Box>

                    <Flex>
                        <Text color={"gray.light"} fontWeight={"light"} mr={2}>
                            {formatDistanceToNow(new Date(post?.createdAt))} назад
                        </Text>
                        <Button variant={"plain"} height={"23px"}>
                            <BsThreeDots/>
                        </Button>
                    </Flex>
                </Flex>

                {post?.img && (<Box
                    maxW={570}
                    maxH={320}
                    w="full"
                    h="full"
                    mb={5}
                    borderRadius={6}
                    overflow={"hidden"}
                    border={"1px solid"}
                    borderColor={"gray.dark"}
                >
                    <Image
                        w="full"
                        h="full"
                        objectFit="cover"
                        src={post?.img}
                    />
                </Box>)}

                <Actions postId={post._id} liked={liked}
                         setLiked={setLiked} countLikes={countLikes}
                         setCountLikes={setCountLikes} setCountReplies={setCountReplies}/>

                <Flex gap={3} mt={3} alignItems={"center"}>
                    <Text color={"gray.light"} fontSize={"sm"} fontWeight={"light"}>
                        {countReplies} комментариев
                    </Text>
                    <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
                    <Text color={"gray.light"} fontSize={"sm"} fontWeight={"light"}>
                        {countLikes} лайков
                    </Text>
                </Flex>
            </Box>
        </Flex>
    );
};
