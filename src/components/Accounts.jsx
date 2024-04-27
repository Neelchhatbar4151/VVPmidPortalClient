import { useState, useEffect } from "react";
import { developement } from "../processes/userData";
import arrow from "../assets/images/arrow.svg";
const Accounts = () => {
    const [admins, setAdmins] = useState([]);
    const [flag, setFlag] = useState(true);
    const [inputValues, setInputValues] = useState({
        userId: "",
        password: "",
        subCode: null,
        key: "",
    });
    const Handle = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };
    useEffect(() => {
        if (admins.length == 0 && flag == true) {
            getList();
        }
    }, [admins, flag]);
    const Del = async (_id) => {
        if (!inputValues.key) {
            alert("Fill Transaction Key Field");
        } else {
            try {
                const res = await fetch(
                    developement
                        ? "http://localhost:5000/removeAdmin"
                        : "/removeAdmin",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            "Access-Control-Allow-Origin": "*",
                        },
                        body: JSON.stringify({
                            id: _id,
                            key: inputValues.key,
                        }),
                    }
                );
                const data = await res.json();
                if (data.status === 400) {
                    alert("Fill Key Field then press Delete");
                } else if (data.status === 403) {
                    alert("Wrong key");
                } else if (data.status === 500) {
                    alert("Internal server Error");
                } else if (data.status === 200) {
                    alert("Removed Successfully..!");
                    setFlag(true);
                    setAdmins([]);
                } else {
                    throw Error;
                }
            } catch (error) {
                alert("Unknown Error Occurred");
            }
        }
    };
    const Add = async () => {
        if (
            !inputValues.userId ||
            !inputValues.password ||
            !inputValues.subCode ||
            !inputValues.key
        ) {
            alert("Fill The Fields Properly");
        } else {
            try {
                const res = await fetch(
                    developement
                        ? "http://localhost:5000/registerAdmin"
                        : "/registerAdmin",
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
                            subject: inputValues.subCode,
                            sem: document.getElementById("dd").value,
                            key: inputValues.key,
                        }),
                    }
                );
                const data = await res.json();
                if (data.status === 400) {
                    alert("Fill the fields properly");
                } else if (data.status === 403) {
                    alert("Wrong key or Subject Code");
                } else if (data.status == 422) {
                    alert("Account Already Exist with given User Id");
                } else if (data.status === 500) {
                    alert("Internal server Error");
                } else if (data.status === 201) {
                    alert("Listed successfully..!");
                    setFlag(true);
                    setAdmins([]);
                } else {
                    throw Error;
                }
            } catch (error) {
                console.log(error);
                alert("Unknown error occurred");
            }
        }
    };
    const getList = async () => {
        try {
            const res = await fetch(
                developement
                    ? "http://localhost:5000/listAdmins"
                    : "/listAdmins",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            );
            const data = await res.json();
            let sts;
            if (data.status === 500) {
                alert("Internal server error");
            } else if (data.status === 200) {
                sts = data.data.sort((a, b) =>
                    a.adminSemester < b.adminSemester ? 1 : -1
                );
                setAdmins(sts);
            } else {
                throw Error;
            }
            setFlag(true);
        } catch (error) {
            console.log(error);
            alert(
                "Unknown Error Occurred in Fetching Faculty Accounts Data.. !"
            );
        }
    };
    return (
        <>
            <div className="description" style={{ marginTop: "20px" }}>
                <div
                    className="a"
                    style={{
                        textDecorationLine: "underline",
                        textDecorationStyle: "solid",
                        textDecorationColor: "#000",
                    }}
                >
                    Add/Remove Faculty Accounts
                </div>
            </div>
            <div className="inputs">
                <div
                    className="userId"
                    style={{ minWidth: "210px", width: "30%" }}
                >
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
                <div className="group">
                    <div className="userId">
                        <input
                            type="number"
                            placeholder="Subject Code"
                            name="subCode"
                            onChange={Handle}
                        />
                    </div>
                    <div className="userId">
                        <input
                            type="text"
                            placeholder="Transaction Key"
                            name="key"
                            onChange={Handle}
                        />
                    </div>
                </div>
            </div>
            <div className="cover">
                <div className="buttonContainer" onClick={Add}>
                    <button className="btn">Add</button>
                    <img
                        src={arrow}
                        alt="arrow"
                        className="arrow"
                        width="40px"
                    />
                </div>
            </div>
            <hr />
            <div className="description" style={{ marginTop: "20px" }}>
                <div
                    className="a"
                    style={{
                        textDecorationLine: "underline",
                        textDecorationStyle: "solid",
                        textDecorationColor: "#000",
                    }}
                >
                    Faculty Accounts
                </div>
            </div>
            <div className="table">
                <table>
                    <tr>
                        <th>Subject Code</th>
                        <th>User Id</th>
                        <th>Semester</th>
                        <th>Delete</th>
                    </tr>
                    {admins.map((item) => {
                        return (
                            <tr key={item._id}>
                                <td>{item.adminSubjectCode}</td>
                                <td>{item.adminUserId}</td>
                                <td>{item.adminSemester}</td>
                                <td
                                    onClick={() => Del(item._id)}
                                    style={{ cursor: "pointer", color: "red" }}
                                >
                                    Delete
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </>
    );
};
export default Accounts;
