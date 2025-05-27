import { useContext } from "react";
import { authContext } from "../customContexts/AuthContext";
import airtime from '../assets/icons/airtime.gif';
import data from '../assets/icons/data.gif';
import send_money from '../assets/icons/send_money.gif';
import { uiContext } from "../customContexts/UiContext";
import { useNavigate } from "react-router-dom";
import './Wallet.css';
import DashbordUserCard from "./DashbordCard";

const Wallet = () => {
    const { currentUser } = useContext(authContext);
    const navigate = useNavigate();

    const { setAirtimeOrData } = useContext(uiContext);
    return (
        <>
            {/* Main Balance Card */}
            <DashbordUserCard/>
        </>
    );
};

export default Wallet;
