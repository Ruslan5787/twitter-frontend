import {toaster} from "../components/ui/toaster";
import {Avatar} from "@chakra-ui/avatar";
import {Box, Button, Flex, Link, Menu, Portal, Text, VStack,} from "@chakra-ui/react";
import React, {useState} from "react";
import {CiCircleMore} from "react-icons/ci";
import useShowToast from "../hooks/useShowToast.js";
import {useRecoilValue} from "recoil";
import userAtom from "../atoms/userAtom.js";
import {Link as RouterLink} from "react-router-dom";

const UserHeader = ({user}) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const showToast = useShowToast();
    const currentUser = useRecoilValue(userAtom);
    const [isFollow, setFollow] = useState(
        user.followers?.includes(currentUser?._id)
    );
    const copyURL = () => {
        toaster.create({
            description: "Ссылка скопирована",
            type: "success",
        });
    };

    console.log("user data", user);

    const followAndFollowHandle = async () => {
        if (!currentUser) {
            showToast("Ошибка", "Please login to follow", "error")
        }

        try {
            setIsUpdating(true);

            const res = await fetch(`api/users/follow/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Tupe": "application/json",
                }
            })
            const data = await res.json();
            if (data.error) {
                showToast("Ошибка", data.error, "error")

            }

            if (isFollow) {
                showToast("Уведомление", `Вы отписались от ${user.name}`, "success")
                user.followers.pop(currentUser._id);
            } else {
                showToast("Уведомление", `Вы подписались на ${user.name}`, "success")
                user.followers.push(currentUser._id);
            }

            setFollow(!isFollow)
            setIsUpdating(false);
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    };

    return (
        <VStack gap={4} alignItems={"start"} mb={5}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} m="0 0 20px 0">
                        {user.name}
                    </Text>
                    <Flex gap={2} alignItems={"center"} margin="0 0 30px 0">
                        <Text fontSize={"sm"}>{user.username}</Text>
                    </Flex>
                    <Text fontSize={"lg"}>{user.bio}</Text>

                    {currentUser?._id === user._id && (
                        <Link as={RouterLink} to="/update">
                            <Button size={"sm"}>Обновить профиль</Button>
                        </Link>
                    )}

                    {currentUser?._id !== user._id && isFollow && (
                        <Button onClick={followAndFollowHandle} size={"sm"} loading={isUpdating}>
                            Отписаться
                        </Button>
                    )}

                    {currentUser?._id !== user._id && !isFollow && (
                        <Button onClick={followAndFollowHandle} size={"sm"} isLoading={isUpdating}>
                            Подписаться
                        </Button>
                    )}
                </Box>
                <Box>
                    {user.profilePic && (
                        <Avatar
                            size={"xs"}
                            name={user.name}
                            src={user.profilePic}
                            w={140}
                            h={140}
                            borderRadius="100%"
                        />
                    )}

                    {!user.profilePic && (
                        <Avatar
                            border={"1px solid #ccc"}
                            name={user.name}
                            src="https://bit.ly/broken-link"
                            w={140}
                            h={140}
                            borderRadius="50%"
                        />
                    )}
                </Box>
            </Flex>

            <Flex justifyContent={"space-between"} w={"full"} mb={10}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>{user.followers?.length} подписчиков</Text>
                </Flex>
                <Flex>
                    <Menu.Root>
                        <Menu.Trigger asChild ml={3}>
                            <Box className="icon-container">
                                <CiCircleMore size={24} cursor={"pointer"}/>
                            </Box>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content>
                                    <Menu.Item value="copy-link" onClick={copyURL}>
                                        Скопировать ссылку на профиль
                                    </Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </Flex>
            </Flex>

            <Flex w={"full"}>
                <Flex
                    flex={1}
                    borderBottom={"1.5px solid white"}
                    justifyContent={"center"}
                    pb={"3"}
                    cursor={"pointer"}
                >
                    <Text fontWeight={"bold"}>Посты</Text>
                </Flex>
            </Flex>
        </VStack>
    );
};

export default UserHeader;
