import { Flex, Image } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import React from "react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent={"center"} mt={6} mb={12}>
      <Image
        cursor={"pointer"}
        w={6}
        alt={"logo"}
        src={colorMode === "dark" ? "../../public/light-logo.svg" : "../../public/dark-logo.svg"}
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default Header;
