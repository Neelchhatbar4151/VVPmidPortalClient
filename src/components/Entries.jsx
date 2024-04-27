import { useState, useEffect } from "react";
import { developement } from "../processes/userData";
import circle from "../assets/images/circle.png";
import arrow from "../assets/images/arrow.svg";

import ExcelFetcher, { getStudentList } from "../components/ExcelFetcher";

const Entries = () => {
    const [students, setStudents] = useState([]);
    const [key, setKey] = useState("");
    const [sem, setSem] = useState(1);
    useEffect(() => {}, [students]);
    const removeAll = async () => {
        try {
            const res = await fetch(
                developement
                    ? "http://localhost:5000/removeAllStudents"
                    : "/removeAllStudents",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        sem,
                        key,
                    }),
                }
            );
            const data = await res.json();
            if (data.status === 400) {
                alert("Key is Not entered or Semester is not selected");
            } else if (data.status === 403) {
                alert("Wrong Key");
            } else if (data.status === 500) {
                alert("Internal server error");
            } else if (data.status === 201) {
                alert("Cleared..");
                setStudents([]);
            } else {
                throw Error;
            }
        } catch (error) {
            alert("Unknown Error Occurred.. !");
        }
    };
    const removeOne = async (student) => {
        try {
            const res = await fetch(
                developement
                    ? "http://localhost:5000/removeStudent"
                    : "/removeStudent",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        students: [student],
                        sem,
                        key,
                    }),
                }
            );
            const data = await res.json();
            if (data.status === 400) {
                alert("Key is Not entered or Semester is not selected");
            } else if (data.status === 403) {
                alert("Wrong Key");
            } else if (data.status === 500) {
                alert("Internal server error");
            } else if (data.status === 201) {
                getList();
            } else {
                throw Error;
            }
        } catch (error) {
            alert("Unknown Error Occurred.. !");
        }
    };
    const getList = async () => {
        try {
            const res = await fetch(
                developement
                    ? "http://localhost:5000/listStudents"
                    : "/listStudents",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        sem,
                        key,
                    }),
                }
            );
            const data = await res.json();
            let sts;
            if (data.status === 400) {
                alert("Key is Not entered or Semester is not selected");
            } else if (data.status === 403) {
                alert("Wrong Key");
            } else if (data.status === 500) {
                alert("Internal server error");
            } else if (data.status === 200) {
                sts = data.data.sort((a, b) =>
                    a.studentEnrollment < b.studentEnrollment ? -1 : 1
                );
                setStudents(sts);
            } else {
                throw Error;
            }
        } catch (error) {
            alert("Unknown Error Occurred in Fetching Students Data.. !");
        }
    };
    const addStudents = async () => {
        try {
            const list = getStudentList();
            if (
                !list ||
                Object.keys(list[0]).length !== 3 ||
                !list[0].enrollment ||
                !list[0].name ||
                !list[0].password
            ) {
                alert(
                    "Choose File Properly..\nFile must have 3 Columns named:\n1: enrollment\n2:name\n3:password"
                );
            } else {
                for (let i = 0; i < list.length; i++) {
                    if (
                        !list[i].enrollment ||
                        !list[i].name ||
                        !list[i].password
                    ) {
                        alert("Some Row has missing fields");
                        return;
                    }
                }
                const res = await fetch(
                    developement
                        ? "http://localhost:5000/studentEntry"
                        : "/studentEntry",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            "Access-Control-Allow-Origin": "*",
                        },
                        body: JSON.stringify({
                            students: list,
                            sem,
                            key,
                        }),
                    }
                );
                const data = await res.json();
                if (data.status === 400) {
                    alert("Key is Not entered or Semester is not selected");
                } else if (data.status === 403) {
                    alert("Wrong Key");
                } else if (data.status === 500) {
                    alert("Internal server error, please Recheck file");
                } else if (data.status === 201) {
                    alert("Students Listed Successfully.. !");
                    getList();
                } else {
                    throw Error;
                }
            }
        } catch (error) {
            alert("Unknown Error Occurred.. ! Please Recheck File");
        }
    };

    // if (JSON.stringify(students) !== JSON.stringify([])) {
    if (true) {
        return (
            <>
                <div className="inputs">
                    <div
                        className="userId"
                        style={{ minWidth: "210px", width: "30%" }}
                    >
                        <label htmlFor="sem" className="semSelector">
                            Semester :
                        </label>
                        <select
                            name="sem"
                            id="dd"
                            value={sem}
                            onChange={(e) => setSem(e.target.value)}
                        >
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
                                placeholder="Transaction Key"
                                name="key"
                                id="key"
                                onChange={(e) => {
                                    setKey(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="cover">
                        <div className="buttonContainer">
                            <button
                                className="btn"
                                onClick={() => {
                                    getList();
                                }}
                            >
                                Load Student List
                            </button>
                            <img
                                src={circle}
                                alt="circle"
                                className="arrow"
                                width="40px"
                            />
                        </div>
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
                        Students List
                    </div>
                </div>
                <div className="table">
                    <table>
                        <tr>
                            <th>Student Enollment</th>
                            <th>Student Name</th>
                            <th>Student Password</th>
                            <th>Delete</th>
                        </tr>
                        {students.map((item) => {
                            return (
                                <tr key={item._id} name="listOfStudent">
                                    <td>{item.studentEnrollment}</td>
                                    <td>{item.studentName}</td>
                                    <td>{item.studentPassword}</td>
                                    <td
                                        style={{
                                            color: "red",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => removeOne(item)}
                                    >
                                        Delete
                                    </td>
                                </tr>
                            );
                        })}
                    </table>
                </div>
                <div className="inputs">
                    {students.length === 0
                        ? "No Records in Semester " + sem
                        : ""}
                </div>
                <div className="inputs">
                    <div className="group">
                        <div className="cover">
                            <div
                                className="buttonContainer"
                                onClick={removeAll}
                            >
                                <button className="btn">Remove All</button>
                                <img
                                    src={circle}
                                    alt="circle"
                                    className="arrow"
                                    width="40px"
                                />
                            </div>
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
                            Add Students
                        </div>
                    </div>
                    <ExcelFetcher />
                    <div className="inputs">
                        <div className="group">
                            <div className="cover">
                                <div className="buttonContainer">
                                    <button
                                        className="btn"
                                        onClick={() => addStudents()}
                                    >
                                        Add Students
                                    </button>
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
                </div>
            </>
        );
    } else {
        // return (
        //     <>
        //         <div className="inputs">
        //             <div
        //                 className="userId"
        //                 style={{ minWidth: "210px", width: "30%" }}
        //             >
        //                 <label htmlFor="sem" className="semSelector">
        //                     Semester :
        //                 </label>
        //                 <select
        //                     name="sem"
        //                     id="dd"
        //                     value={sem}
        //                     onChange={(e) => setSem(e.target.value)}
        //                 >
        //                     <option value="1">1</option>
        //                     <option value="2">2</option>
        //                     <option value="3">3</option>
        //                     <option value="4">4</option>
        //                     <option value="5">5</option>
        //                     <option value="6">6</option>
        //                     <option value="7">7</option>
        //                 </select>
        //             </div>
        //             <div className="group">
        //                 <div className="userId">
        //                     <input
        //                         type="text"
        //                         placeholder="Transaction Key"
        //                         name="key"
        //                         id="key"
        //                         onChange={(e) => {
        //                             setKey(e.target.value);
        //                         }}
        //                     />
        //                 </div>
        //             </div>
        //             <div className="cover">
        //                 <div className="buttonContainer">
        //                     <button className="btn" onClick={() => getList()}>
        //                         Load Student List
        //                     </button>
        //                     <img
        //                         src={circle}
        //                         alt="circle"
        //                         className="arrow"
        //                         width="40px"
        //                     />
        //                 </div>
        //             </div>
        //         </div>
        //         <hr />
        //         <div className="inputs">
        //             <div className="cover">No Records</div>
        //         </div>
        //         <ExcelFetcher />
        //         <div className="inputs">
        //             <div className="group">
        //                 <div className="userId">
        //                     <label htmlFor="1">Append</label>
        //                     <input
        //                         type="checkbox"
        //                         name="append"
        //                         id="1"
        //                         onChange={() => {}}
        //                     />
        //                 </div>
        //             </div>
        //             <div className="group">
        //                 <div className="cover">
        //                     <div className="buttonContainer">
        //                         <button className="btn">Add Students</button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </>
        // );
    }
};
export default Entries;
