import {useCallback} from "react";
import {toaster} from "../components/ui/toaster.jsx";

const useShowToast = () => {
    const showToast = useCallback((title, description, type) => {
        toaster.create({
            title,
            description,
            type,
        });
    }, []);

    return showToast;
};

export default useShowToast;
