import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
    developement,
    loginUser,
    setIsAdminLoggedIn,
} from "../processes/userData";

import loading from "../assets/images/loading.svg";
import arrow from "../assets/images/arrow.svg";
import circle from "../assets/images/circle.png";
import logout from "../assets/images/logout.svg";

import Title from "../components/Title";
function AdminPortal() {
    const [students, setStudents] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [index, setIndex] = useState(0);
    const cookie = new Cookies();
    const history = useNavigate();
    useEffect(() => {
        if (students.length === 0) {
            getList();
        }
    }, [students, index]);
    const downloadPdf = async () => {
        document.getElementsByClassName("fakeTable")[0].style =
            "display: block";
        const capture = document.querySelector(".fakeTable");
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL("img/png");
            const doc = new jsPDF("l", "in", "a3");
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
            doc.save(loginUser.adminSubject + " marks.pdf");
        });
        document.getElementsByClassName("fakeTable")[0].style = "display: none";
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
                        token: cookie.get("Token") ? cookie.get("Token") : "",
                    }),
                }
            );
            const data = await res.json();
            if (data.data) {
                for (let i = 0; i < data.data[0].studentMarks.length; i++) {
                    if (
                        loginUser.adminSubjectCode ==
                        data.data[0].studentMarks[i].subjectCode
                    ) {
                        setIndex(i);
                        break;
                    }
                }
                console.log("Egeg");
                let sts;
                if (data.status === 400) {
                    alert("Login again..");
                } else if (data.status === 402) {
                    alert("Your account may have deleted or disabled");
                } else if (data.status === 500) {
                    alert("Internal server error");
                } else if (data.status === 200) {
                    sts = data.data.sort((a, b) =>
                        a.studentEnrollment < b.studentEnrollment ? -1 : 1
                    );
                    setStudents(sts);
                } else {
                    cookie.remove("Token");
                    history("/adminLogin");
                    console.log("gGW");
                    throw Error;
                }
            }
        } catch (error) {
            console.log(error);
            alert("Unknown Error Occurred in Fetching Students Data.. !");
        }
    };
    const Update = async () => {
        setProcessing(true);
        let arr = [];
        for (let i = 0; i < students.length; i++) {
            let marks = document.getElementsByClassName(students[i]._id);
            arr.push({
                _id: students[i]._id,
                mid1: marks[0].value,
                mid2: marks[1].value,
            });
        }
        try {
            console.log(arr);
            const res = await fetch(
                developement
                    ? "http://localhost:5000/updateStudent"
                    : "/updateStudent",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        students: arr,
                        token: cookie.get("Token") ? cookie.get("Token") : "",
                        sem: loginUser.adminSemester,
                        subjectCode: loginUser.adminSubjectCode,
                    }),
                }
            );
            const data = await res.json();
            if (data.status === 400) {
                alert("Fill the fields properly");
            } else if (data.status === 403) {
                alert("Not authorized");
            } else if (data.status === 500) {
                alert("Internal server error");
            } else if (data.status === 200) {
                setStudents([]);
                alert("Marks Updated");
            } else {
                throw Error;
            }
        } catch (error) {
            console.log(error);
            alert("Unknown Error Occurred");
        }
        setProcessing(false);
    };
    if (students != [] && students != [-1] && cookie.get("Token")) {
        return (
            <div className="containerVariation">
                <div className="remove adminPortal">
                    <Title />
                    <div className="description" style={{ marginTop: "20px" }}>
                        <div
                            className="a"
                            style={{
                                textDecorationLine: "underline",
                                textDecorationStyle: "solid",
                                textDecorationColor: "#000",
                            }}
                        >
                            Update Marks Of <br /> {loginUser.adminSubject}
                        </div>
                    </div>
                    <div className="table">
                        <table>
                            <tr>
                                <th>Student Enollment</th>
                                <th>Student Name</th>
                                <th>Mid 1</th>
                                <th>Mid 2</th>
                                <th>Total</th>
                                <th>From 30</th>
                            </tr>
                            {students.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td>{item.studentEnrollment}</td>
                                        <td>{item.studentName}</td>
                                        <td>
                                            <input
                                                className={item._id}
                                                name="marks"
                                                type="number"
                                                defaultValue={
                                                    item.studentMarks[index]
                                                        .mid1
                                                }
                                                max={40}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                className={item._id}
                                                name="marks"
                                                type="number"
                                                defaultValue={
                                                    item.studentMarks[index]
                                                        .mid2
                                                }
                                                max={40}
                                            />
                                        </td>
                                        <td>
                                            {item.studentMarks[index].mid1 +
                                                item.studentMarks[index].mid2}
                                        </td>
                                        <td>
                                            {((item.studentMarks[index].mid1 +
                                                item.studentMarks[index].mid2) /
                                                80) *
                                                30}
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>
                    <div className="fakeTable" style={{ display: "none" }}>
                        <div
                            className="a"
                            style={{
                                textAlign: "center",
                                fontSize: "30px",
                                textDecorationLine: "underline",
                                textDecorationStyle: "solid",
                                textDecorationColor: "#000",
                            }}
                        >
                            Marks Of <br /> {loginUser.adminSubject}
                        </div>
                        <table>
                            <tr>
                                <th>Student Enollment</th>
                                <th>Student Name</th>
                                <th>Mid 1</th>
                                <th>Mid 2</th>
                                <th>Total</th>
                                <th>From 30</th>
                            </tr>
                            {students.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td>{item.studentEnrollment}</td>
                                        <td>{item.studentName}</td>
                                        <td>{item.studentMarks[index].mid1}</td>
                                        <td>{item.studentMarks[index].mid2}</td>
                                        <td>
                                            {item.studentMarks[index].mid1 +
                                                item.studentMarks[index].mid2}
                                        </td>
                                        <td>
                                            {((item.studentMarks[index].mid1 +
                                                item.studentMarks[index].mid2) /
                                                80) *
                                                30}
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>
                    <div className="inputs">
                        <div className="group">
                            <div className="cover">
                                <div
                                    className="buttonContainer"
                                    onClick={() => {
                                        for (
                                            let i = 0;
                                            i < students.length * 2;
                                            i++
                                        ) {
                                            document.getElementsByName("marks")[
                                                i
                                            ].value = null;
                                        }
                                    }}
                                >
                                    <button className="btn">Clear all</button>
                                    <img
                                        src={circle}
                                        alt="circle"
                                        className="arrow"
                                        width="40px"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="group" style={{ marginBottom: "30px" }}>
                            <div className="cover">
                                <div
                                    className="buttonContainer"
                                    onClick={Update}
                                >
                                    <button className="btn">Update</button>
                                    <img
                                        src={processing ? loading : arrow}
                                        alt="arrow"
                                        className="arrow"
                                        width="40px"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="group">
                            <div className="cover">
                                <div
                                    className="buttonContainer"
                                    onClick={downloadPdf}
                                >
                                    <button className="btn">Download</button>
                                    <img
                                        src={arrow}
                                        alt="arrow"
                                        className="arrow"
                                        width="40px"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            className="logout"
                            onClick={() => {
                                cookie.remove("Token");
                                setIsAdminLoggedIn(false);
                                history("/adminLogin");
                            }}
                        >
                            <div>Logout</div>
                            <img src={logout} alt="logout" width={"30px"} />
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return <>No data Available</>;
    }
}
export default AdminPortal;
