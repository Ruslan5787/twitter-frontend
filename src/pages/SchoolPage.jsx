import React, {useEffect, useState} from "react";
import useShowToast from "../hooks/useShowToast.js";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Flex, Text, Select, createListCollection, Portal} from "@chakra-ui/react";
import CreateGroup from "../components/CreateGroup.jsx";

export function SchoolPage() {
    const [school, setSchool] = useState(null);
    const showToast = useShowToast();
    const {id} = useParams();
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);

    const [schools, setSchools] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/schools/school/${id}`)
            const data = await res.json();

            if (data.message) {
                showToast("Ошибка", data.error, 'error')
            }

            setSchool(data);
        }

        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/schools/groups/`)
            const data = await res.json();

            if (data.message) {
                showToast("Ошибка", data.error, 'error')
            }

            setGroups(data);

            const itemsForSelect = createListCollection({
                items: groups
            })

            console.log(itemsForSelect.items)
            setSchools(itemsForSelect.items)
        }

        fetchData()
    }, [setGroups])

    return <Box>
        <Flex>
            <Button onClick={() => {
                navigate(`/groups`)
            }}>Назад</Button>
            <Text>{school?.title}</Text>
        </Flex>

        <CreateGroup schoolId={school?._id} setGroups={setGroups}/>


        {/*{schools !== null &&*/}
        {/*    <Select.Root collection={schools} size="sm" width="320px">*/}
        {/*        <Select.HiddenSelect/>*/}
        {/*        <Select.Label>Выберите школу</Select.Label>*/}
        {/*        <Select.Control>*/}
        {/*            <Select.Trigger>*/}
        {/*                <Select.ValueText placeholder="Школы"/>*/}
        {/*            </Select.Trigger>*/}
        {/*            <Select.IndicatorGroup>*/}
        {/*                <Select.Indicator/>*/}
        {/*            </Select.IndicatorGroup>*/}
        {/*        </Select.Control>*/}
        {/*        <Portal>*/}
        {/*            <Select.Positioner>*/}
        {/*                <Select.Content>*/}
        {/*                    {schools?.map((item) => (<Select.Item item={item} key={item.title}>*/}
        {/*                        {item.title}*/}
        {/*                        <Select.ItemIndicator/>*/}
        {/*                    </Select.Item>))}*/}
        {/*                </Select.Content>*/}
        {/*            </Select.Positioner>*/}
        {/*        </Portal>*/}
        {/*    </Select.Root>*/}
        {/*}*/}
    </Box>
}