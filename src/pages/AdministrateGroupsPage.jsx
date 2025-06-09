import {useEffect, useState} from "react"
import {Box, Flex, Text} from "@chakra-ui/react";
import {CreateSchool} from "../components/CreateSchool.jsx"
import useShowToast from "../hooks/useShowToast.js";
import {Toaster} from "../components/ui/toaster.jsx";
import {Link} from "react-router-dom";

const AdministrateGroupsPage = () => {
    const [schools, setSchools] = useState([]);
    const showToast = useShowToast();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resSchools = await fetch(`/api/schools/`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                    },
                });
                const dataSchools = await resSchools.json();

                if (dataSchools.message) {
                    showToast("Ошибка", dataSchools.message, 'error')
                }
                console.log(dataSchools)
                setSchools(dataSchools)
            } catch (err) {
                console.log(err.details)
                showToast("Ошибка", "Произошла ошибка при получении списка учебных заведений", 'error')
            }
        }

        console.log(schools)
        fetchData();
    }, [setSchools])

    return <Box>
        <Toaster/>

        <CreateSchool setSchools={setSchools}/>

        <Flex gap={5} mt={5}>
            {schools.length > 0 && schools.map((school) => {

                return (
                    <Link display={"block"} to={`/school/${school._id}`} key={school._id}>
                        <Box background={"gray.400"} borderRadius={10} p={15}>
                            <Text>{school.title}</Text>
                            <Text>{school.inn}</Text>
                            <Text>{school.email}</Text>
                        </Box>
                    </Link>
                )
            })}
        </Flex>
    </Box>
}

export default AdministrateGroupsPage