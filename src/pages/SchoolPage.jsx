import React, {useEffect, useRef, useState} from "react";
import useShowToast from "../hooks/useShowToast.js";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Flex, Tabs, Text} from "@chakra-ui/react";
import CreateGroup from "../components/CreateGroup.jsx";
import CreateUser from "../components/CreateUser.jsx";

export function SchoolPage() {
    const [school, setSchool] = useState(null);
    const [groups, setGroups] = useState([]);
    const [groupUsers, setGroupUsers] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const showToast = useShowToast();
    const { id } = useParams();
    const navigate = useNavigate();
    const tabGroupRef = useRef(null);

    // Загрузка данных школы
    useEffect(() => {
        const fetchSchool = async () => {
            try {
                const res = await fetch(`/api/schools/school/${id}`);
                const data = await res.json();
                if (data.error) {
                    showToast("Ошибка", data.error, "error");
                    return;
                }
                setSchool(data);
            } catch (error) {
                showToast("Ошибка", "Не удалось загрузить данные школы", "error");
            }
        };
        fetchSchool();
    }, [id, showToast]);

    // Загрузка групп
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await fetch(`/api/schools/groups/`);
                const data = await res.json();
                if (data.error) {
                    showToast("Ошибка", data.error, "error");
                    return;
                }
                setGroups(data);
                // Устанавливаем первую группу активной, если группы есть
                if (data.length > 0 && !activeTab) {
                    setActiveTab(data[0].title);
                }
            } catch (error) {
                showToast("Ошибка", "Не удалось загрузить группы", "error");
            }
        };
        fetchGroups();
    }, [showToast]);

    // Загрузка пользователей активной группы
    useEffect(() => {
        if (activeTab) {
            const activeGroup = groups.find(group => group.title === activeTab);
            if (activeGroup) {
                const fetchGroupUsers = async () => {
                    try {
                        const res = await fetch(`/api/schools/group_students/${activeGroup._id}`);
                        const data = await res.json();
                        if (data.message) {
                            showToast("Ошибка", data.message, "error");
                            return;
                        }
                        setGroupUsers(data);
                    } catch (error) {
                        showToast("Ошибка", "Не удалось загрузить пользователей группы", "error");
                    }
                };
                fetchGroupUsers();
            }
        }
    }, [activeTab, groups, showToast]);

    // Обработчик переключения табов
    const handleTabChange = (value) => {
        setActiveTab(value);
    };

    return (
        <Box>
            <Flex gap={3} mb={4}>
                <Button onClick={() => navigate(`/groups`)}>Назад</Button>
                <Text>{school?.title}</Text>
            </Flex>

            <CreateGroup schoolId={school?._id} setGroups={setGroups} setActiveTab={setActiveTab}/>

            <CreateUser
                setGroupUsers={setGroupUsers}
                tabGroupRef={tabGroupRef}
                isDisabled={groups.length === 0}
                activeGroupId={groups.find(group => group.title === activeTab)?._id}
            />

            {groups.length > 0 && (
                <Flex minH="dvh">
                    <Tabs.Root value={activeTab} onValueChange={handleTabChange} width="full">
                        <Tabs.List>
                            {groups.map((item) => (
                                <Tabs.Trigger key={item._id} value={item.title}>
                                    {item.title}
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>
                        <Box pos="relative" minH="200px" width="full">
                            {groups.map((item) => (
                                <Tabs.Content
                                    ref={item.title === activeTab ? tabGroupRef : null}
                                    key={item._id}
                                    id={item._id}
                                    value={item.title}
                                    position="absolute"
                                    inset="0"
                                    _open={{
                                        animationName: "fade-in, scale-in",
                                        animationDuration: "300ms",
                                    }}
                                    _closed={{
                                        animationName: "fade-out, scale-out",
                                        animationDuration: "120ms",
                                    }}
                                >
                                    {groupUsers.length > 0 ? (
                                        <Box>
                                            {groupUsers.map((user) => (
                                                <Box key={user._id} p={2} borderBottom="1px solid gray">
                                                    <Text>{user.username}</Text>
                                                    <Text fontSize="sm">{user.email}</Text>
                                                </Box>
                                            ))}
                                        </Box>
                                    ) : (
                                        <Text>В этой группе пока нет учеников</Text>
                                    )}
                                </Tabs.Content>
                            ))}
                        </Box>
                    </Tabs.Root>
                </Flex>
            )}
        </Box>
    );
}