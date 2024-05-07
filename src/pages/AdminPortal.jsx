import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    developement,
    loginUser,
    setIsAdminLoggedIn,
} from "../processes/userData";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFDownloadLink,
} from "@react-pdf/renderer";

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
        } else {
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
        }
    }, [students, index]);
    const styles = StyleSheet.create({
        page: {
            flexDirection: "column",
            padding: 20,
            fontSize: "12px",
        },
        row: {
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "#000",
        },
        cell: {
            flexBasis: "auto",
            textAlign: "center",
            padding: "15px",
        },
        cell1: {
            marginRight: "10px",
            borderRight: "2px solid black",
            width: "120px",
        },
        cell2: {
            marginRight: "10px",
            borderRight: "2px solid black",
            width: "250px",
        },
        cell3: {
            marginRight: "10px",
            borderRight: "2px solid black",
            width: "30px",
        },
    });
    const renderPDF = () => {
        const data = []; // Array to hold table data

        // Populate data array with table rows
        // Replace this with your logic to populate the table rows
        for (let i = 0; i < students.length; i++) {
            data.push(
                <View key={i} style={styles.row}>
                    <Text style={(styles.cell, styles.cell1)}>
                        {students[i].studentEnrollment}
                    </Text>
                    <Text style={(styles.cell, styles.cell2)}>
                        {students[i].studentName}
                    </Text>
                    <Text style={(styles.cell, styles.cell3)}>
                        {students[i].studentMarks[index].mid1}
                    </Text>
                    <Text style={(styles.cell, styles.cell3)}>
                        {students[i].studentMarks[index].mid2}
                    </Text>
                    <Text style={(styles.cell, styles.cell3)}>
                        {students[i].studentMarks[index].mid1 +
                            students[i].studentMarks[index].mid2}
                    </Text>
                    <Text style={(styles.cell, styles.cell3)}>
                        {(
                            ((students[i].studentMarks[index].mid1 +
                                students[i].studentMarks[index].mid2) /
                                80) *
                            30
                        ).toFixed(1)}
                    </Text>
                    {/* Add more columns as needed */}
                </View>
            );
        }

        // Render the PDF document
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Text style={{ marginBottom: "30px" }}>
                        {loginUser.adminSubject} ({loginUser.adminSubjectCode})
                    </Text>

                    <View style={styles.row}>
                        <Text style={(styles.cell, styles.cell1)}>
                            Student Enrollment
                        </Text>
                        <Text style={(styles.cell, styles.cell2)}>
                            Student Name
                        </Text>
                        <Text style={(styles.cell, styles.cell3)}>Mid 1</Text>
                        <Text style={(styles.cell, styles.cell3)}>Mid 2</Text>
                        <Text style={(styles.cell, styles.cell3)}>Total</Text>
                        <Text style={(styles.cell, styles.cell3)}>From 30</Text>
                        {/* Add more headers as needed */}
                    </View>
                    {/* Render table rows */}
                    {data}
                </Page>
            </Document>
        );
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
            let marks = document.getElementsByName(students[i]._id);
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
                            Update Marks Of <br /> {loginUser.adminSubject} (
                            {loginUser.adminSubjectCode})
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
                                                className="disable"
                                                name={item._id}
                                                type="number"
                                                defaultValue={
                                                    item.studentMarks[index]
                                                        .mid1
                                                }
                                                min={0}
                                                max={40}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                className="disable"
                                                name={item._id}
                                                type="number"
                                                defaultValue={
                                                    item.studentMarks[index]
                                                        .mid2
                                                }
                                                min={0}
                                                max={40}
                                            />
                                        </td>
                                        <td>
                                            {item.studentMarks[index].mid1 +
                                                item.studentMarks[index].mid2}
                                        </td>
                                        <td>
                                            {(
                                                ((item.studentMarks[index]
                                                    .mid1 +
                                                    item.studentMarks[index]
                                                        .mid2) /
                                                    80) *
                                                30
                                            ).toFixed(1)}
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
                                <div className="buttonContainer">
                                    <PDFDownloadLink
                                        className="btn"
                                        document={renderPDF()}
                                        fileName={
                                            "Sem " +
                                            loginUser.adminSemester +
                                            "  " +
                                            loginUser.adminSubject +
                                            " Mid Marks"
                                        }
                                    >
                                        <button className="btn">
                                            Download
                                        </button>
                                    </PDFDownloadLink>
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
