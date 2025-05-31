import React from "react";
import {useSetRecoilState} from "recoil";
import userAtom from "../atoms/userAtom.js";
import useShowToast from "../hooks/useShowToast.js";
import {Button} from '@chakra-ui/react';
import {IoIosLogOut} from "react-icons/io";

const LogoutButton = () => {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast();

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = (await res).json();
            console.log(data);
            if (data.error) {
                showToast("Error", data.error, "error")
                return;
            }
            setUser(null);
            localStorage.removeItem("user-threads");
        } catch (error) {
            showToast("Error", error, "error")
        }
    };
    return (
        <Button
            position={"fixed"}
            top={"30px"}
            right={"30px"}
            size={"sm"}
            onClick={handleLogout}
        >
            <IoIosLogOut size={20}/>
        </Button>
    );
};

export default LogoutButton;
