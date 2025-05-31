import React, {useEffect, useState} from "react";
import {Avatar, AvatarGroup, Box, Button, Flex, Image, Text} from "@chakra-ui/react";
import {BsFillPatchCheckFill, BsThreeDots} from "react-icons/bs";
import {Actions} from "../components/Actions.jsx";
import {Link} from "react-router-dom";
import useShowToast from "../hooks/useShowToast.js";
import {Toaster} from "./ui/toaster.jsx";
import {useRecoilState} from "recoil";
import userAtom from "../atoms/userAtom.js";
import {formatDistanceToNow} from "date-fns";

export const Post = ({postInfo, postedBy}) => {
    const [postedPostUser, setPostedPostUser] = useState();
    const showToast = useShowToast();
    const [user, setUser] = useRecoilState(userAtom);
    const [liked, setLiked] = useState(postInfo.likes.includes(user._id));
    const [countLikes, setCountLikes] = useState(postInfo.likes.length);
    const [countReplies, setCountReplies] = useState(postInfo.replies.length);

    useEffect(() => {
        const getPostedPostUser = async () => {
            try {
                const response = await fetch(`/api/users/profile/${postedBy}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                setPostedPostUser(data);

                if (response.error) {
                    showToast("Ошибка", "Не удалось получить данные о авторе поста");
                }
            } catch (error) {
                showToast("Ошибка", "Не удалось получить данные о авторе поста");
                setPostedPostUser(null);
            }
        };

        getPostedPostUser();
    }, []);

    if (!postedPostUser) return null;

    return (
        <Box>
            <Flex gap={3} my={5} mb={20} width={"full"}>
                <Flex
                    mr={5}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Toaster/>
                    <Link to={`/${postedPostUser.username}`}>
                        <Avatar.Root>
                            <Avatar.Fallback name={postedPostUser.name}/>
                            <Avatar.Image src={postedPostUser.profilePic}/>
                        </Avatar.Root>
                    </Link>
                    <Box h={"full"} w={"1px"} bg={"gray"}></Box>

                    {postInfo.replies.length === 0 && (
                        <Text textAlign={"center"}>👨‍🌾</Text>
                    )}

                    {/*{postInfo.replies[0] && (*/}
                    {/*    <AvatarGroup gap="0" spaceX="-3px" size="xs" position={"relative"}>*/}
                    {/*        <Avatar.Root position={"absolute"} left={"-13px"} top={"10px"}>*/}
                    {/*            <Avatar.Fallback name="Uchiha Sasuke"/>*/}
                    {/*            <Avatar.Image src={postInfo.replies[0]?.profilePic}/>*/}
                    {/*        </Avatar.Root>*/}
                    {/*    </AvatarGroup>*/}
                    {/*)}*/}

                    {/*{postInfo.replies[1] && (*/}
                    {/*    <AvatarGroup gap="0" spaceX="-3px" size="xs" position={"relative"}>*/}
                    {/*        <Avatar.Root position={"absolute"} left={"-13px"} top={"10px"}>*/}
                    {/*            <Avatar.Fallback name="Uchiha Sasuke"/>*/}
                    {/*            <Avatar.Image src={postInfo.replies[0]?.profilePic}/>*/}
                    {/*        </Avatar.Root>*/}
                    {/*        <Avatar.Root position={"absolute"} left={"-13px"} top={"10px"}>*/}
                    {/*            <Avatar.Fallback name="Uchiha Sasuke"/>*/}
                    {/*            <Avatar.Image src={postInfo.replies[1]?.profilePic}/>*/}
                    {/*        </Avatar.Root>*/}
                    {/*    </AvatarGroup>*/}
                    {/*)}*/}

                    {postInfo.replies[3] && (
                        <AvatarGroup gap="0" spaceX="-3px" size="xs" position={"relative"}>
                            <Avatar.Root position={"absolute"} left={"-13px"} top={"10px"}>
                                <Avatar.Fallback name="Uchiha Sasuke"/>
                                <Avatar.Image src={postInfo.replies[0]?.profilePic}/>
                            </Avatar.Root>
                            <Avatar.Root position={"absolute"} left={"10px"}>
                                <Avatar.Fallback name="Uchiha Sasuke"/>
                                <Avatar.Image src={postInfo.replies[1]?.profilePic}/>
                            </Avatar.Root>
                            <Avatar.Root position={"absolute"} right={"-5px"}>
                                <Avatar.Fallback name="Uchiha Sasuke"/>
                                <Avatar.Image src={postInfo.replies[2]?.profilePic}/>
                            </Avatar.Root>

                        </AvatarGroup>
                    )}
                </Flex>

                <Box flex={1}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Box mb={2}>
                            <Flex mb={2} alignItems={"center"} textAlign={"center"}>
                                <Link to={`/${postedPostUser.username}/post/${postInfo._id}`}>
                                    <Text fontWeight={"bold"} mr={2}>
                                        {postedPostUser.name}
                                    </Text>
                                </Link>
                                <BsFillPatchCheckFill color="#3D90D7"/>
                            </Flex>
                            <Text fontWeight={"light"} whiteSpace={"pre-wrap"}
                                  wordBreak="break-all">{postInfo.text}</Text>
                        </Box>

                        <Flex>
                            <Text color={"gray.light"} fontWeight={"light"} mr={2} fontSize={13}>
                                {formatDistanceToNow(new Date(postInfo.createdAt))} назад
                            </Text>
                            <Button variant={"plain"} height={"23px"}>
                                <BsThreeDots/>
                            </Button>
                        </Flex>
                    </Flex>

                    {postInfo.img && (
                        <Box
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
                            <Image w="full" h="full" objectFit="cover" src={postInfo.img}/>
                        </Box>
                    )}

                    <Actions liked={liked} setLiked={setLiked} postId={postInfo._id} countLikes={countLikes}
                             setCountLikes={setCountLikes}
                             setCountReplies={setCountReplies}/>

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
        </Box>
    );
};
