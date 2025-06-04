import {Avatar, Box, Button, Flex, Input, List, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {FaSearch} from "react-icons/fa";
import React from "react";
import {IoCheckmarkDone} from "react-icons/io5";

import {FormControl} from "@chakra-ui/form-control";


const ChatPage = () => {
    return <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Box>
            <Text>
                Ваши контакты
            </Text>

            <FormControl mb={2}>
                <Flex>
                    <Input placeholder="Введите имя пользователя"/>
                    <Button type="submit">
                        <FaSearch/>
                    </Button>
                </Flex>
            </FormControl>

            <List.Root>
                <List.Item listStyle="none" mb={2}>
                    <Button variant={"plain"} background={"none"} p={0}>
                        <Flex>
                            <Avatar.Root mr={3}>
                                <Avatar.Fallback/>
                                <Avatar.Image/>
                            </Avatar.Root>

                            <Box textAlign={"left"}>
                                <Link to={`/{}/post/`}>
                                    <Text color={"base.dark"} fontWeight={"bold"}>
                                        elonmusk
                                    </Text>
                                </Link>
                                <Flex alignItems={"center"}>
                                    <IoCheckmarkDone color="blue"/>
                                    <Text fontWeight={"bold"} ml={2}>I'm learning git</Text>
                                </Flex>
                            </Box>
                        </Flex>
                    </Button>
                </List.Item>
                <List.Item listStyle="none" mb={2}>
                    <Flex alignItems={"center"}>
                        <Link to={`/`}>
                            <Avatar.Root mr={3}>
                                <Avatar.Fallback/>
                                <Avatar.Image/>
                            </Avatar.Root>
                        </Link>

                        <Box>
                            <Link to={`/{}/post/`}>
                                <Text fontWeight={"bold"}>
                                    jack
                                </Text>
                            </Link>
                            <Flex alignItems={"center"}>
                                <IoCheckmarkDone color="blue"/>
                                <Text fontWeight={"bold"} ml={2}>Let's learn some J...</Text>
                            </Flex>

                        </Box>
                    </Flex>
                </List.Item>
            </List.Root>
        </Box>
        <Flex p={"20px 10px"} flexDirection={"column"} flex="1 0 0" alignItems={"stretch"} background={"blue"}
              w={"full"} h={"full"}>
            <Flex textAlign={"left"} alignItems={"center"}>
                <Avatar.Root mr={3}>
                    <Avatar.Fallback/>
                    <Avatar.Image/>
                </Avatar.Root>
                <Text color={"base.dark"} fontWeight={"bold"}>
                    elonmusk
                </Text>

            </Flex>

            <Box>
                <FormControl mb={2}>
                    <Flex>
                        <Input placeholder="Введите имя пользователя"/>
                        <Button type="submit">
                            <FaSearch/>
                        </Button>
                    </Flex>
                </FormControl>
            </Box>
        </Flex>
    </Flex>
}

export default ChatPage;