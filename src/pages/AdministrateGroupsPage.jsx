import { useState } from "react"
import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import {CreateGroup} from "../components/CreateGroup.jsx"
import {CreateSchool} from "../components/CreateSchool.jsx"

const AdministrateGroupsPage = () => {
    const [groups, setGroups] = useState([]);
    console.log('e');
    

    return <Box>
        {groups.map(group => {
            <Box>
                <Text>group.name</Text>
                <Text>group.users.count</Text>
            </Box>
        })}

        <CreateGroup />
        <CreateSchool />
    </Box>
}

export default AdministrateGroupsPage