import { Avatar } from "@chakra-ui/avatar";
import { toaster } from "../components/ui/toaster";
import {
  Box,
  Flex,
  VStack,
  Text,
  Menu,
  IconButton,
  Portal,
  Button,
  Link,
  // Avatar
} from "@chakra-ui/react";
import React from "react";
import { BsInstagram } from "react-icons/bs";
import { CiCircleMore } from "react-icons/ci";

const UserHeader = () => {

  const copyURL = () => {
    toaster.create({
      description: "Ссылка скопирована",
      type: "success",
    });
  };

  return (
    <VStack gap={4} alignItems={"start"} mb={5}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"}>Mark Zuckerberg</Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>markzuckerberg</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color="gray.light"
              p={1}
              borderRadius={"full"}
            >
              threads.net
            </Text>
          </Flex>
          <Text fontSize={"lg"}></Text>
        </Box>
        <Box>
          <Avatar name="Mark Zuckerberg" src="./zuck-avatar.png" size="xl"/>
        </Box>
      </Flex>

      <Text>Co-founder, executive chairman and CEO of Meta Platforms.</Text>

      <Flex justifyContent={"space-between"} w={"full"} mb={10}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>3.2K followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Text color={"gray.light"}>
            <Link color={"gray.light"} textDecoration={"none"}>instagram.com</Link>
          </Text>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>

          <Menu.Root>
            <Menu.Trigger asChild ml={3}>
              <Box className="icon-container" >
                <CiCircleMore size={24} cursor={"pointer"} />
              </Box>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="copy-link" onClick={copyURL}>
                    Скопировать ссылку на профиль
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Flex>
      </Flex>

      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb={"3"}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1.5px solid gray"}
          justifyContent={"center"}
          pb={"3"}
          cursor={"pointer"}
          color={"gray.light"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
