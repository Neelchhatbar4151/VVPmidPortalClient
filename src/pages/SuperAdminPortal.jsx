import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isSuperAdminLoggedIn } from "../processes/userData";

import Accounts from "../components/Accounts";
import Entries from "../components/Entries";
import Title from "../components/Title";

const SuperAdminPortal = () => {
    const history = useNavigate();
    const [mode, setMode] = useState(0);

    useEffect(() => {
        if (!isSuperAdminLoggedIn) {
            history("/adminLogin");
        }
        try {
            document.getElementsByClassName("accounts")[0].style.display = !mode
                ? "block"
                : "none";
            document.getElementsByClassName("entries")[0].style.display = !mode
                ? "none"
                : "block";
            let el0 = document.getElementById("0"),
                el1 = document.getElementById("1");
            if (!mode) {
                el0.classList.remove("backChange");
                el1.classList.add("backChange");
                el0.style.color = "#124682";
                el1.style.color = "white";
            } else {
                el0.classList.add("backChange");
                el1.classList.remove("backChange");
                el0.style.color = "white";
                el1.style.color = "#124682";
            }
        } catch (error) {}
    }, [isSuperAdminLoggedIn, mode]);
    if (isSuperAdminLoggedIn) {
        return (
            <div className="containerVariation">
                <div className="remove adminPortal">
                    <Title />
                    <div className="subNav">
                        <div
                            id="0"
                            onClick={() => {
                                setMode(0);
                            }}
                        >
                            Admin Accounts
                        </div>
                        <div
                            id="1"
                            onClick={() => {
                                setMode(1);
                            }}
                        >
                            Student Entry
                        </div>
                    </div>
                    <div className="accounts" style={{ marginBottom: "40px" }}>
                        <Accounts />
                    </div>
                    <div className="entries">
                        <Entries />
                    </div>
                </div>
            </div>
        );
    } else {
        return <>No data Available</>;
    }
};

export default SuperAdminPortal;
