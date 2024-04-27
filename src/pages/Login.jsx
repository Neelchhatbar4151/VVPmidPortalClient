import React, { useState, useEffect } from "react";
import {
    developement,
    isAdminLoggedIn,
    isSuperAdminLoggedIn,
    setIsAdminLoggedIn,
    setIsSuperAdminLoggedIn,
    LoginOrNot,
} from "../processes/userData.jsx";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

import vvp from "../assets/images/vvp.png";
import arrow from "../assets/images/arrow.svg";

function Login() {
    const history = useNavigate();
    useEffect(() => {
        if (isAdminLoggedIn) {
            // console.log(loginUser);
            history("/AdminPortal");
        } else if (isSuperAdminLoggedIn) {
            history("/SuperAdminPortal");
        }
    }, [history]);
    const cookie = new Cookies();
    const [inputValues, setInputValues] = useState({
        admin: true,
        userId: "",
        password: "",
    });
    const Handle = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };
    const toggle = (value) => {
        setInputValues({ ...inputValues, admin: value });
    };
    const Login = async () => {
        try {
            if (!inputValues.userId || !inputValues.password) {
                alert("Fill The Fields Properly");
            } else {
                try {
                    if (inputValues.admin) {
                        const res = await fetch(
                            developement
                                ? "http://localhost:5000/LoginAdmin"
                                : "/LoginAdmin",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "application/json",
                                    "Access-Control-Allow-Origin": "*",
                                },
                                body: JSON.stringify({
                                    userId: inputValues.userId,
                                    password: inputValues.password,
                                }),
                            }
                        );
                        const data = await res.json();

                        if (data.status === 400) {
                            alert("Fill the fields properly");
                        } else if (data.status === 401) {
                            alert("Incorrect UserName or Password");
                        } else if (data.status === 403) {
                            alert("Not Authorized By Admin");
                        } else if (data.status === 500) {
                            alert("Internal server error");
                        } else if (data.status === 202) {
                            setIsAdminLoggedIn(true);
                            cookie.set("Token", data.token, {
                                maxAge: 3.154e10,
                            });
                            await LoginOrNot();
                            history("/AdminPortal");
                            // if (document.getElementById("remember").checked) {
                            // } else {
                            //     cookie.set("Token", data.token);
                            //     cookie.set("userType", "ngo");
                            // }
                            alert("Login Successful");
                        } else {
                            throw Error;
                        }
                    } else {
                        const res = await fetch(
                            developement
                                ? "http://localhost:5000/superAdminLogin"
                                : "/superAdminLogin",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "application/json",
                                    "Access-Control-Allow-Origin": "*",
                                },
                                body: JSON.stringify({
                                    userId: inputValues.userId,
                                    password: inputValues.password,
                                }),
                            }
                        );
                        const data = await res.json();
                        if (data.status === 400) {
                            alert("Fill the fields properly");
                        } else if (data.status === 401) {
                            alert("Incorrect UserName or Password");
                        } else if (data.status === 500) {
                            alert("Internal server Error");
                        } else if (data.status === 200) {
                            setIsSuperAdminLoggedIn(true);
                            history("/SuperAdminPortal");
                            alert("Login Successful..!");
                        } else {
                            throw Error;
                        }
                    }
                } catch (error) {
                    alert("Unknown error occurred");
                }
            }
        } catch (error) {
            alert("Unknown error occurred");
        }
    };

    return (
        <>
            <div className="container">
                <div className="Box">
                    <div className="nameCover">
                        <img
                            id="logo"
                            src={vvp}
                            alt="vvp logo"
                            height={70}
                            width={65}
                        />
                        <div className="titleText">
                            V.V.P. ENGINEERING COLLEGE
                        </div>
                    </div>
                    <div className="department">
                        Department Of Information Technology
                    </div>

                    <div className="description">
                        <div className="a">A Web Portal For Staff</div>
                        <div className="b">Mid - Sem Marks Management</div>
                    </div>
                    <div className="instruction">Login To Your Account</div>
                    <div className="inputs">
                        <div className="group">
                            <div className="userId">
                                <label htmlFor="1">Super Admin</label>
                                <input
                                    type="radio"
                                    name="Role"
                                    id="1"
                                    checked={inputValues.admin === false}
                                    onChange={() => toggle(false)}
                                />
                            </div>
                            <div className="userId">
                                <label htmlFor="2">Admin</label>
                                <input
                                    type="radio"
                                    name="Role"
                                    id="2"
                                    checked={inputValues.admin === true}
                                    onChange={() => toggle(true)}
                                />
                            </div>
                        </div>
                        <div className="group">
                            <div className="userId">
                                <input
                                    type="text"
                                    placeholder="User Id"
                                    name="userId"
                                    onChange={Handle}
                                />
                            </div>
                            <div className="userId">
                                <input
                                    type="text"
                                    placeholder="Password"
                                    name="password"
                                    onChange={Handle}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cover">
                        <div className="buttonContainer" onClick={Login}>
                            <button className="btn">Login</button>
                            <img
                                src={arrow}
                                alt="arrow"
                                className="arrow"
                                width="40px"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login;
