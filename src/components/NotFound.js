import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import ApiRequest from "../Helpers/ApiRequest";

const NotFound = () => {
    let navigator = useNavigate();
    useEffect(() => {
        navigator('/');
    }, []);
}

export default NotFound;