import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setStudentUser, developement } from "../processes/userData";

import vvp from "../assets/images/vvp.png";
import arrow from "../assets/images/arrow.svg";
function StudentLogin() {
    const history = useNavigate();
    const [inputValues, setInputValues] = useState({
        userId: null,
        password: "",
    });
    const Handle = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };
    const Login = async () => {
        try {
            if (!inputValues.userId || !inputValues.password) {
                alert("Fill The Fields Properly");
            } else {
                const res = await fetch(
                    developement
                        ? "http://localhost:5000/studentLogin"
                        : "/studentLogin",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            "Access-Control-Allow-Origin": "*",
                        },
                        body: JSON.stringify({
                            sem: document.getElementById("dd").value,
                            userId: inputValues.userId,
                            password: inputValues.password,
                        }),
                    }
                );
                const data = await res.json();

                if (data.status === 400) {
                    alert("Fill the fields properly");
                } else if (data.status === 401) {
                    alert("Incorrect Enrollment Number or Password");
                } else if (data.status === 500) {
                    alert("Internal server error");
                } else if (data.status === 202) {
                    setStudentUser(data.data);
                    history("/MarkSheet");
                    // alert("Login Successful");
                } else {
                    throw Error;
                }
            }
        } catch (error) {
            console.log(error);
            alert("Unknown Error Occurred.. !");
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
                        <div className="a">A Web Portal For Viewing</div>
                        <div className="b">Student's Mid - Sem Marks</div>
                    </div>
                    <div className="instruction">Login To Your Account</div>
                    <div className="inputs">
                        <div className="group">
                            <div className="userId">
                                <label htmlFor="sem" className="semSelector">
                                    Semester :
                                </label>
                                <select name="sem" id="dd">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                </select>
                            </div>
                            <div className="userId">
                                <input
                                    type="number"
                                    placeholder="Enrollment no."
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

export default StudentLogin;
