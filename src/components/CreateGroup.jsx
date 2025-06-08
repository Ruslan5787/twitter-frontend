import React, {useEffect, useRef, useState} from "react";
import {useColorMode} from "./ui/color-mode.jsx";
import {
    Portal, Select, createListCollection,
    Button, CloseButton, Dialog, Input, Stack, useDialog
} from "@chakra-ui/react";
import {IoMdAddCircleOutline} from "react-icons/io";
import useShowToast from "../hooks/useShowToast.js";
import {Toaster} from "./ui/toaster.jsx";
import {FormControl, FormLabel} from "@chakra-ui/form-control";
import {useRecoilValue} from "recoil";
import userAtom from "../atoms/userAtom.js";

const CreateGroup = ({schoolId, setGroups}) => {
    const showToast = useShowToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dialog = useDialog({open: isOpen, setOpenChange: setIsOpen});
    const [groupTitle, setGroupTitle] = useState("");
    const user = useRecoilValue(userAtom)

    const contentRef = useRef(null)

    const handleCreateGroup = async () => {
        try {
            setIsLoading(true);
            console.log("school id: ", schoolId)
            const res = await fetch("/api/schools/group", {
                method: "POST", headers: {"Content-type": "application/json"}, body: JSON.stringify({
                    title: groupTitle,
                    schoolId,
                }),
            });

            const data = await res.json();

            if (data.error) {
                throw Error(data.error);
            }

            setIsOpen(false);
            showToast("Уведомления", "Группа создана успешно", "success");
            setIsLoading(false);
            setGroupTitle("")
            setGroups((prev) => [...prev])
        } catch (error) {
            showToast("Ошибка", error.message, "error");
            setIsLoading(false);
        }
    };

    return (<>
        <Toaster/>
        <Dialog.RootProvider zIndex={0} size="sm" placement="center" motionPreset="slide-in-bottom" value={dialog}>
            <Dialog.Trigger asChild>
                <Button
                    onClick={() => setIsOpen(true)}
                    variant="outline"
                    size="xl"
                    bg={useColorMode("gray.300", "gray.dark")}
                    isLoading={isLoading}
                >
                    <IoMdAddCircleOutline/> Создать группу
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner>
                    <Dialog.Content ref={contentRef}>
                        <Dialog.Header>
                            <Dialog.Title>Создание группы</Dialog.Title>
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
                                            Создать группу
                                        </Button>
                                    </Stack>
                                </Stack>
                            </>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.RootProvider>
    </>);
};

export default CreateGroup;