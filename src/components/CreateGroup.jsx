import React, { useState } from "react";
import { useColorMode } from "./ui/color-mode.jsx";
import { Box, Button, CloseButton, Dialog, HStack, Input, Portal, Stack, useDialog } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast.js";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/modal";

export default function CreateGroup({ schoolId, setGroups, setActiveTab }) {
    const showToast = useShowToast();
    const [groupTitle, setGroupTitle] = useState("")
        const [isOpen, setIsOpen] = useState(false);
        const dialog = useDialog({ open: isOpen, setOpenChange: setIsOpen });
    

    const handleCreateGroup = async () => {
        try {
            const res = await fetch("/api/schools/group", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: groupTitle, schoolId }),
            });
            const data = await res.json();
            if (data.error) {
                showToast("Ошибка", data.error, "error");
                return;
            }
            setGroups((prev) => [...prev, data]);
            setActiveTab(data.title); // Устанавливаем новую группу активной
            showToast("Успех", "Группа создана", "success");
            setGroupTitle("");
            onClose();
        } catch (error) {
            showToast("Ошибка", "Не удалось создать группу", "error");
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
                >
                    <IoMdAddCircleOutline /> Создать группу
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Создание группы</Dialog.Title>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton onClick={() => setIsOpen(false)} size="xl" />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>
                        <Dialog.Body>
                            <HStack>
                                <Box>
                                    <FormControl>
                                        <FormLabel m={"0 0 10px 0"}>Название</FormLabel>
                                        <Input
                                            value={groupTitle}
                                            onChange={(e) => setGroupTitle(e.target.value)}
                                            bg={"gray.light"}
                                            borderWidth={"1px"}
                                            borderStyle={"solid"}
                                            borderRadius={"5"}
                                            w={"100%"}
                                            h={"35px"}
                                            type="text"
                                        />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    onClick={handleCreateGroup}
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                >
                                    Создать
                                </Button>
                            </Stack>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.RootProvider>
    );
}