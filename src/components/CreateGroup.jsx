import React, {useState} from "react";
import {Button, Input, useDisclosure} from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast.js";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/modal";

export default function CreateGroup({schoolId, setGroups, setActiveTab}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [groupTitle, setGroupTitle] = useState("");
    const showToast = useShowToast();

    const handleCreateGroup = async () => {
        try {
            const res = await fetch("/api/schools/group", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({title: groupTitle, schoolId}),
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
        <>
            <Button onClick={onOpen} colorScheme="blue">Создать группу</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Создать новую группу</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Input
                            placeholder="Название группы"
                            value={groupTitle}
                            onChange={(e) => setGroupTitle(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose}>Отмена</Button>
                        <Button colorScheme="blue" onClick={handleCreateGroup} isDisabled={!groupTitle.trim()}>
                            Создать
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}