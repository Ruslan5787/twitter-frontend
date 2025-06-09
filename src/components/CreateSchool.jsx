import {FormControl, FormLabel} from "@chakra-ui/form-control";
import {Button, CloseButton, Dialog, Input, Portal, Stack, useDialog,} from "@chakra-ui/react";
import React, {useState} from "react";
import {useColorMode} from "./ui/color-mode.jsx";
import {IoMdAddCircleOutline} from "react-icons/io";
import useShowToast from "../hooks/useShowToast.js";

const MAX_CHAR = 500;

export const CreateSchool = ({setSchools}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dialog = useDialog({open: isOpen, setOpenChange: setIsOpen});

    const showToast = useShowToast();

    const [inputs, setInputs] = useState({
        title: "ruslan", email: "ruslan@gmail.com", inn: 123456789,
    });

    const handleCreateSchool = async () => {
        try {
            const res = await fetch("/api/school/", {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify(inputs),
            });

            const data = await res.json();

            if (data.error) {
                showToast("Ошибка", data.error, "error");

                return;
            }

            setSchools(data);
            setIsOpen(false)
            setInputs({
                title: "", email: "", inn: "",
            })
        } catch (error) {
            showToast("Ошибка", error, "error");
        }
    };

    return (<Dialog.RootProvider size="sm" placement="center" motionPreset="slide-in-bottom" value={dialog}>
        <Dialog.Trigger asChild>
            <Button
                onClick={() => setIsOpen(true)}
                variant="outline"
                size="xl"
                bg={useColorMode("gray.300", "gray.dark")}
                isLoading={isLoading}
            >
                <IoMdAddCircleOutline/> Создать учебную организацию
            </Button>
        </Dialog.Trigger>
        <Portal>
            <Dialog.Backdrop/>
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Создание учебной организации</Dialog.Title>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton onClick={() => setIsOpen(false)} size="xl"/>
                        </Dialog.CloseTrigger>
                    </Dialog.Header>
                    <Dialog.Body>
                        <>
                            <Stack spacing={4}>
                                <FormControl>
                                    <FormLabel m={"0 0 10px 0"}>Название</FormLabel>
                                    <Input
                                        value={inputs.title}
                                        onChange={(e) => setInputs({...inputs, title: e.target.value})}
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
                                        onChange={(e) => setInputs({...inputs, inn: e.target.value})}
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
                                        onChange={(e) => setInputs({...inputs, email: e.target.value})}
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
                                        onClick={handleCreateSchool}
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
    </Dialog.RootProvider>)
}