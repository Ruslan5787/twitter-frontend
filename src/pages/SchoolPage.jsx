import React, { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast.js";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Flex, Text, Select, createListCollection, Portal } from "@chakra-ui/react";
import CreateGroup from "../components/CreateGroup.jsx";

export function SchoolPage() {
    const [school, setSchool] = useState(null);
    const [groups, setGroups] = useState([]); // Изменено с {} на [], так как ожидается массив
    const showToast = useShowToast();
    const { id } = useParams();
    const navigate = useNavigate();

    // Загрузка данных о школе
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/schools/school/${id}`);
                const data = await res.json();

                if (data.message) {
                    showToast("Ошибка", data.error, "error");
                    return;
                }

                setSchool(data);
            } catch (error) {
                showToast("Ошибка", "Не удалось загрузить данные школы", "error");
            }
        };

        fetchData();
    }, [id, showToast]);

    // Загрузка данных о группах
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/schools/groups/`);
                const data = await res.json();

                if (data.message) {
                    showToast("Ошибка", data.error, "error");
                    return;
                }

                // Сохраняем группы в состояние
                setGroups(data);
            } catch (error) {
                showToast("Ошибка", "Не удалось загрузить группы", "error");
            }
        };

        fetchData();
    }, [showToast]);

    // Создаём коллекцию для Select на основе групп
    const collection = groups.length > 0 ? createListCollection({ items: groups }) : null;

    return (
        <Box>
            <Flex>
                <Button
                    onClick={() => {
                        navigate(`/groups`);
                    }}
                >
                    Назад
                </Button>
                <Text>{school?.title}</Text>
            </Flex>

            <CreateGroup schoolId={school?._id} setGroups={setGroups} />

            {collection?.items.length > 0 && (
                <Select.Root collection={collection} size="sm" width="320px">
                    <Select.HiddenSelect />
                    <Select.Label>Выберите школу</Select.Label>
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Школы" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {collection.items.map((group) => (
                                    <Select.Item item={group} key={group._id}>
                                        {group.title}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
            )}
        </Box>
    );
}