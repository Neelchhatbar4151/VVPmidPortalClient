import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setStudentUser, developement } from "../processes/userData";
import Title from "../components/Title";

import loading from "../assets/images/loading.svg";
import arrow from "../assets/images/arrow.svg";
function StudentLogin() {
    const history = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [inputValues, setInputValues] = useState({
        userId: null,
        password: "",
    });
    useEffect(() => {
        const handleWheel = (event) => {
            event.preventDefault();
        };

        // Disable increment/decrement functionality on mouse wheel scroll for all input elements
        const inputElements = document.querySelectorAll(".disable");
        inputElements.forEach((inputElement) => {
            inputElement.addEventListener("wheel", handleWheel);
        });

        // Cleanup: remove event listeners when component unmounts
        return () => {
            inputElements.forEach((inputElement) => {
                inputElement.removeEventListener("wheel", handleWheel);
            });
        };
    }, []);

    const Handle = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };
    const Login = async () => {
        setProcessing(true);
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
        setProcessing(false);
    };

    return (
        <>
            <div className="container">
                <div className="Box">
                    <Title />
                    <div className="description">
                        <div className="a">A Web Portal For Viewing</div>
                        <div className="b">Student's Mid - Sem Marks</div>
                    </div>
                    <div className="instruction">Login To Your Account</div>
                    <div className="inputs">
                        <div className="group">
                            <div className="userId">
                                <label
                                    htmlFor="sem"
                                    style={{ marginRight: "10px" }}
                                    className="semSelector"
                                >
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
                                    className="disable"
                                    type="number"
                                    placeholder="Enrollment no."
                                    name="userId"
                                    onChange={Handle}
                                />
                            </div>
                            <div className="userId">
                                <input
                                    type="password"
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
                                src={processing ? loading : arrow}
                                alt="arrow"
                                className="arrow"
                                width="40px"
                            />
                        </div>
                    </div>
                    <div className="credits">
                        Developed By{" "}
                        <a href="https://neelchhatbar4151.github.io/portfolio/">
                            Neel
                        </a>
                    </div>
                    <div className="credits">
                        Designed By{" "}
                        <a href="https://neelchhatbar4151.github.io/portfolio/">
                            Jay
                        </a>
                    </div>
                </div>
                <div className="credit">
                    Developed By{" "}
                    <a href="https://neelchhatbar4151.github.io/portfolio/">
                        Neel
                    </a>
                </div>
                <div className="credit">
                    Designed By{" "}
                    <a href="https://neelchhatbar4151.github.io/portfolio/">
                        Jay
                    </a>
                </div>
            </div>
        </>
    );
}

export default StudentLogin;
