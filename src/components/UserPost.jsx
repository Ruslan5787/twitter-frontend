import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Image,
  AvatarGroup,
} from "@chakra-ui/react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { TbMessageCircle } from "react-icons/tb";
import { FiRefreshCw } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Actions } from "./Actions";

export const UserPost = ({ likes, replies, postImg, postTitle }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Link to={"/markzuckerberg/post/1"}>
      <Flex gap={3} mb={4} my={5} width={"full"}>
        <Flex
          mr={2}
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Avatar.Root size={"md"}>
            <Avatar.Fallback name="Segun Adebayo" />
            <Avatar.Image src="../public/zuck-avatar.png" />
          </Avatar.Root>
          <Box h={"full"} w={"1px"} bg={"gray"}></Box>
          <AvatarGroup gap="0" spaceX="-3" size="xs" position={"relative"}>
            <Avatar.Root position={"absolute"} left={"-13px"} top={"10px"}>
              <Avatar.Fallback name="Uchiha Sasuke" />
              <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd" />
            </Avatar.Root>

            <Avatar.Root position={"absolute"} left={"10px"}>
              <Avatar.Fallback name="Baki Ani" />
              <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c" />
            </Avatar.Root>

            <Avatar.Root position={"absolute"} right={"-5px"}>
              <Avatar.Fallback name="Uchiha Chan" />
              <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863" />
            </Avatar.Root>
          </AvatarGroup>
        </Flex>

        <Box>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Box mb={2}>
              <Flex mb={2} alignItems={"center"}>
                <Text fontWeight={"bold"} mr={2}>
                  markzuckerberg
                </Text>
                <BsFillPatchCheckFill color="#3D90D7" />
              </Flex>
              <Text fontWeight={"light"}>{postTitle}</Text>
            </Box>

            <Flex>
              <Text color={"gray.light"} fontWeight={"light"} mr={2}>
                1d
              </Text>
              <Button variant={"plain"} height={"23px"}>
                <BsThreeDots />
              </Button>
            </Flex>
          </Flex>

          {postImg && (
            <Box
              mb={5}
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"light.gray"}
            >
              <Image src={postImg} />
            </Box>
          )}

          <Actions liked={liked} setLiked={setLiked} />

          <Flex gap={3} mt={3} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"} fontWeight={"light"}>
              {replies} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"} fontWeight={"light"}>
              {likes} likes
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Link>
  );
};
