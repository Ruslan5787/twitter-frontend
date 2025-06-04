import {Box, Flex, Image, Text} from "@chakra-ui/react";
import {useColorMode} from "./ui/color-mode";
import {FiMessageCircle} from "react-icons/fi";
import React from "react";
import {IoIosHome} from "react-icons/io";
import {FaUserCircle} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useRecoilValue} from "recoil";
import userAtom from "../atoms/userAtom.js";

const Header = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const user = useRecoilValue(userAtom);

    return (
        <Flex
            justifyContent={"space-between"}
            mt={6}
            mb={12}
        >
            {user && (
                <Link to="/">
                    <IoIosHome size={24}/>
                </Link>
            )}
            <Image
                cursor={"pointer"}
                w={8}
                alt={"logo"}
                src={
                    colorMode === "dark"
                        ? "../../public/light-logo.svg"
                        : "../../public/dark-logo.svg"
                }
                onClick={toggleColorMode}
            />

            <Flex>
                <Box mr={7}>
                    {user && (
                        <Link to={`/chat`}>
                            <FiMessageCircle size={24}/>
                        </Link>
                    )}
                </Box>

            {user && (
                <Link to={`/${user.username}`}>
                    <FaUserCircle size={24}/>
                </Link>
            )}
            </Flex>

            {!user && (
                <Link to={"/auth"}>
                    <Text textAlign={"center"}>Зарегистрироваться/Войти</Text>
                </Link>
            )}
        </Flex>
    );
};

export default Header;
