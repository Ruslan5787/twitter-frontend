import React from "react";
import {useSetRecoilState} from "recoil";
import userAtom from "../atoms/userAtom.js";
import useShowToast from "../hooks/useShowToast.js";
import {Button} from '@chakra-ui/react';
import {IoIosLogOut} from "react-icons/io";
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = (await res).json();

            if (data.error) {
                showToast("Error", data.error, "error")
                return;
            }
            setUser(null);
            localStorage.removeItem("user-threads");
            navigate("/auth")
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
