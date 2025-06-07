import {Avatar, Box, Button, Flex, Input, Separator, Text} from "@chakra-ui/react";
import {MdOutlineMessage} from "react-icons/md";
import {IoSend} from "react-icons/io5";
import {useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";

import {FormControl} from "@chakra-ui/form-control";
import {Toaster} from "../components/ui/toaster.jsx";
import useShowToast from "../hooks/useShowToast.js";
import {socket} from "../../socket.js";
import {useRecoilValue} from "recoil";
import userAtom from "../atoms/userAtom.js";
import {UsersListForCorrespondence} from "../components/UsersListForCorrespondence.jsx";
import {ref} from "process";

const ChatPage = () => {
    const showToaster = useShowToast();
    const mainUser = useRecoilValue(userAtom);
    const {recipientId} = useParams();
    const [messageValue, setMessageValue] = useState("");
    const [room, setRoom] = useState(null);
    const [recipient, setRecipience] = useState(null);
    const [messages, setMessages] = useState([]);
    const lastMessageRef = useRef(null);

    const fetchRoomAndMessages = async () => {
        try {
            const resUser = await fetch(`/api/users/profile/${recipientId}`)
            const dataUser = await resUser.json();

            if (dataUser.error) {
                showToaster("Ошибка", dataUser.error, "error");
                return;
            }

            setRecipience(dataUser)

            const resRoom = await fetch(`/api/rooms/${recipientId}`)
            const dataRoom = await resRoom.json();
            console.log("room", dataRoom)

            if (dataRoom.error) {
                showToaster("Ошибка", dataRoom.error, "error");
                return;
            }

            if (dataRoom?.data !== null) {
                setRoom(dataRoom)

                const resMessages = await fetch(`/api/rooms/messages/${dataRoom._id}`);
                const dataMessages = await resMessages.json();

                if (dataMessages.error) {
                    showToaster("Ошибка", dataMessages.error, "error");
                    return;
                }
                setMessages(dataMessages);
            } else {
                const resRoom = await fetch(`/api/rooms/createRoom`, {
                    method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({
                        recipientId,
                    })
                })

                const newRoom = await resRoom.json()

                if (newRoom.error) {
                    showToaster("Ошибка", newRoom.error, "error");
                    return;
                }

                setRoom(newRoom);
            }
        } catch (error) {
            showToaster("Ошибка", error.message, "error");
        }
    }

    const handleSendMessage = async () => {
        try {
            if (!messageValue.trim()) {
                showToaster("Ошибка", "Введите текст для сообщения", "error");
                return;
            }

            if (!room) {
                showToaster("Ошибка", "Комната не создана", "error");
                return;
            }

            const newMessage = {
                senderBy: mainUser._id, text: messageValue, img: "", roomId: room._id,
            }
            console.log('send message')

            const resMessage = await fetch(`/api/rooms/sendMessage`, {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(newMessage),
            })

            const dataMessage = await resMessage.json();

            if (dataMessage.error) {
                showToaster("Ошибка", dataMessage.error, "error");
                return;
            }
            socket.emit("send_message", newMessage);
            setMessages((prev) => {
                return [...prev, newMessage]
            })

            setMessageValue("")
        } catch (error) {
            showToaster("Ошибка", error.message, "error");
        }
    }

    useEffect(() => {
        let lastMessage = messages.at(-1);
        if (lastMessage) {
            lastMessage = {...lastMessage, isLast: true}
        }
        console.log(lastMessage)
    }, [messages])

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);

    useEffect(() => {
        if (recipientId) {
            fetchRoomAndMessages()
        }
    }, [recipientId])

    useEffect(() => {
        const handleMessageResponse = (message) => {
            if (message.senderBy !== mainUser._id) {
                setMessages((prev) => [...prev, message]);
            }
        }

        socket.on('message_from', handleMessageResponse);
        lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
        return () => {
            socket.off("message_from", handleMessageResponse);
        }
    }, [])

    return <Flex justifyContent={"space-between"}>
        <Toaster/>

        <UsersListForCorrespondence/>

        {!recipientId && (
            <Flex mt={"80px"} flexDirection={"column"} justifyContent={"center"} alignItems="center" gap={2}>
                <Text fontSize="20px">Можете кому-нибудь написать</Text>
                <MdOutlineMessage size={70}/>
            </Flex>)}

        {recipientId && (<Flex borderRadius={"10px"} p={"20px 10px"} flexDirection={"column"} flex="1 0 0"
                               background={"gray.500"}
                               w={"full"} h={"full"}>
            <Flex textAlign={"left"} alignItems={"center"}>
                <Avatar.Root mr={3}>
                    <Avatar.Fallback/>
                    <Avatar.Image src={recipient?.profilePic}/>
                </Avatar.Root>
                <Text color={"base.dark"} fontWeight={"bold"}>
                    {recipient?.username}
                </Text>
            </Flex>
            <Separator m={"15px 0"}/>
            <Flex h={"450px"} flexDirection={"column"}>
                <Flex h={"full"} flex={"1 1 auto"} flexDirection={"column"} overflow={"auto"}>
                    {messages.map((message, index) => {
                        if (messages.length === ++index) {
                            lastMessageRef.current?.scrollIntoView({behavior: 'smooth'})
                        }
                        return (
                            <Box key={message._id} p={"10px 10px"}
                                 css={{scrollBehavior: "smooth"}} // Плавная прокрутка через CSS
                                 ref={index === messages.length - 1 ? lastMessageRef : null}
                                 alignSelf={mainUser._id === message.senderBy ? "flex-end" : "flex-start"}
                                 mb={4}
                                 margin={mainUser._id === message.senderBy ? "0 0 15px 50px" : "0 50px 15px 0"}
                                 background={mainUser._id === message.senderBy ? "white" : "#ccc"}>
                                {message.text}
                            </Box>
                        )
                    })}
                </Flex>

                <FormControl mb={2} alignContent={"flex-end"} onSubmit={() => console.log('e')}>
                    <Flex>
                        <Input value={messageValue} onChange={(event) => setMessageValue(event.target.value)}
                               placeholder="Сообщение"/>
                        <Button onClick={handleSendMessage}>
                            <IoSend/>
                        </Button>
                    </Flex>
                </FormControl>
            </Flex>
        </Flex>)}
    </Flex>
}

export default ChatPage;