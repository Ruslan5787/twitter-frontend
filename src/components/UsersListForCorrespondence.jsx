import {Avatar, Box, Button, Flex, Input, List, Text} from "@chakra-ui/react";
import {FormControl} from "@chakra-ui/form-control";
import {FaSearch} from "react-icons/fa";
import {Link} from "react-router-dom";
import {IoCheckmarkDone} from "react-icons/io5";
import React, {useEffect, useState} from "react";
import useShowToast from "../hooks/useShowToast.js";

export const UsersListForCorrespondence = () => {
        const showToast = useShowToast();
        const [recipients, setRecipients] = useState([]);
        const [searchQuery, setSearchQuery] = useState("");

        useEffect(() => {
                const fetchRecipients = async () => {
                    try {
                        const res1 = await fetch('http://localhost:3000/api/rooms/recipients5252', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                        })

                        console.log("resulst: ", res1)

                        const res = await fetch('/api/users/recipients5252', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include', // Включаем куки
                        });
                        if (!res.ok) {
                            throw new Error(`HTTP error! Status: ${res.status}`);
                        }

                        const data = await res.json();

                        if (data.error) {
                            showToast("Ошибка", data.error, "error");
                            return;
                        }

                        setRecipients(data);
                    } catch
                        (error) {
                        showToast("Ошибка", "Не удалось загрузить список контактов", "error");
                        console.error(error);
                    }
                };

                fetchRecipients();
            }, [showToast]
        );

// Фильтрация пользователей по поисковому запросу
        const filteredRecipients = recipients.filter(recipient =>
            recipient.username.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <Box p={4} w="300px" borderRight="1px solid" borderColor="gray.200">
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Ваши контакты
                </Text>

                <FormControl mb={4}>
                    <Flex>
                        <Input
                            placeholder="Введите имя пользователя"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button type="submit" ml={2}>
                            <FaSearch/>
                        </Button>
                    </Flex>
                </FormControl>

                <List.Root>
                    {filteredRecipients.length === 0 ? (
                        <Text color="gray.500">Нет контактов</Text>
                    ) : (
                        filteredRecipients.map((recipient) => (
                            <List.Item key={recipient._id} listStyle="none" mb={2}>
                                <Button
                                    as={Link}
                                    to={`/chat/${recipient._id}`}
                                    variant="plain"
                                    background="none"
                                    p={0}
                                    w="full"
                                    _hover={{bg: "gray.100"}}
                                >
                                    <Flex alignItems="center">
                                        <Avatar.Root mr={3}>
                                            <Avatar.Fallback/>
                                            <Avatar.Image src={recipient.profilePic}/>
                                        </Avatar.Root>
                                        <Box textAlign="left">
                                            <Text color="base.dark" fontWeight="bold">
                                                {recipient.username}
                                            </Text>
                                            {recipient.lastMessage && (
                                                <Flex alignItems="center">
                                                    <IoCheckmarkDone color="blue"/>
                                                    <Text fontWeight="bold" ml={2} noOfLines={1}>
                                                        {recipient.lastMessage.sender}: {recipient.lastMessage.text}
                                                    </Text>
                                                </Flex>
                                            )}
                                        </Box>
                                    </Flex>
                                </Button>
                            </List.Item>
                        ))
                    )}
                </List.Root>
            </Box>
        );
    }
;