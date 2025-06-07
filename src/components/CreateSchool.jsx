import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { InputGroup, InputRightElement, } from "@chakra-ui/input";
import { Toaster } from "./ui/toaster.jsx";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

import { Box, Button, Flex, Heading, HStack, Input, Link, Stack, Text, } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode.jsx";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom.js";
import userAtom from "../atoms/userAtom.js";
import React, { useRef, useState } from "react";
import { useColorMode } from "./ui/color-mode.jsx";
import { CloseButton, Dialog, Image, Portal, Textarea, useDialog } from "@chakra-ui/react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useChangeUserAvatar } from "../hooks/useChangeUserAvatar.js";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import useShowToast from "../hooks/useShowToast.js";

const MAX_CHAR = 500;

export const CreateSchool = () => {
    const [postText, setPostText] = useState("");
    const fileRef = useRef(null);
    const { handleImageChange, urlAvatar, setUrlImage } = useChangeUserAvatar();
    const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
    const user = useRecoilValue(userAtom);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dialog = useDialog({ open: isOpen, setOpenChange: setIsOpen });

    const [showPassword, setShowPassword] = useState(false);
    const setAuthScreenState = useSetRecoilState(authScreenAtom);
    const showToast = useShowToast();
    const setUser = useSetRecoilState(userAtom);

    const [inputs, setInputs] = useState({
        title: "ruslan",
        email: "ruslan@gmail.com",
        inn: 123456789,
    });

    const handleSignup = async () => {
        try {
            const res = await fetch("/api/school/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();

            if (data.error) {
                showToast("Ошибка", data.error, "error");

                return;
            }

            setInputs({
        title: "",
        email: "",
        inn: 0,
    })
        } catch (error) {
            showToast("Ошибка", error, "error");
        }
    };

    return (
        <Dialog.RootProvider size="sm" placement="center" motionPreset="slide-in-bottom" value={dialog}>
            <Dialog.Trigger asChild>
                <Button
                    onClick={() => setIsOpen(true)}
                    variant="outline"
                    size="xl"
                    bg={useColorMode("gray.300", "gray.dark")}
                    isLoading={isLoading}
                >
                    <IoMdAddCircleOutline /> Создать учебную организацию
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Создание учебной организации</Dialog.Title>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton onClick={() => setIsOpen(false)} size="xl" />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>
                        <Dialog.Body>
                            <>
                                <Stack spacing={4}>
                                    <FormControl>
                                        <FormLabel m={"0 0 10px 0"}>Название</FormLabel>
                                        <Input
                                            value={inputs.title}
                                            onChange={(e) =>
                                                setInputs({ ...inputs, title: e.target.value })
                                            }
                                            bg={"gray.light"}
                                            borderWidth={"1px"}
                                            borderStyle={"solid"}
                                            borderRadius={"5"}
                                            w={"100%"}
                                            h={"35px"}
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormControl id="lastName">
                                        <FormLabel m={"0 0 10px 0"}>Инн</FormLabel>
                                        <Input
                                            value={inputs.inn}
                                            onChange={(e) =>
                                                setInputs({ ...inputs, inn: e.target.value })
                                            }
                                            bg={"gray.light"}
                                            borderWidth={"1px"}
                                            borderStyle={"solid"}
                                            borderRadius={"5"}
                                            w={"100%"}
                                            h={"35px"}
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormControl id="email" isRequired>
                                        <FormLabel m={"0 0 10px 0"}>Почта</FormLabel>
                                        <Input
                                            value={inputs.email}
                                            onChange={(e) =>
                                                setInputs({ ...inputs, email: e.target.value })
                                            }
                                            bg={"gray.light"}
                                            borderWidth={"1px"}
                                            borderStyle={"solid"}
                                            borderRadius={"5"}
                                            w={"100%"}
                                            h={"35px"}
                                            type="email"
                                        />
                                    </FormControl>
                                    <Stack spacing={10} pt={2}>
                                        <Button
                                            onClick={() => handleSignup()}
                                            loadingText="Submitting"
                                            size="lg"
                                            bg={"blue.400"}
                                            color={"white"}
                                            _hover={{
                                                bg: "blue.500",
                                            }}
                                        >
                                            Зарегистрировать
                                        </Button>
                                    </Stack>
                                </Stack>
                            </>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.RootProvider>
    )
}