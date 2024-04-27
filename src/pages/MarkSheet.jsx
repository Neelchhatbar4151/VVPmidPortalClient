import { studentUser } from "../processes/userData";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Title from "../components/Title";
function MarkSheet() {
    const history = useNavigate();
    useEffect(() => {
        if (!studentUser) {
            history("/");
        }
    }, [history]);
    if (!studentUser) {
        return <></>;
    } else {
        return (
            <>
                <div className="containerVariation">
                    <div className="remove markSheet">
                        <Title />
                        <div
                            className="description"
                            style={{ marginTop: "20px" }}
                        >
                            <div
                                className="a"
                                style={{
                                    textDecorationLine: "underline",
                                    textDecorationStyle: "solid",
                                    textDecorationColor: "#000",
                                }}
                            >
                                MarkSheet
                            </div>
                        </div>
                        <div className="inputs profile" width="90%">
                            <div
                                className="group"
                                style={{
                                    textAlign: "left",
                                    fontSize: "25px",
                                    minWidth: "400px",
                                }}
                            >
                                <div>
                                    Name :{" "}
                                    <u style={{ letterSpacing: "2px" }}>
                                        {studentUser.studentName}
                                    </u>
                                </div>
                                <div>
                                    Enrollment :
                                    <u style={{ letterSpacing: "2px" }}>
                                        {studentUser.studentEnrollment}
                                    </u>
                                </div>
                            </div>
                            <div
                                className="group"
                                style={{
                                    textAlign: "left",
                                    fontSize: "25px",
                                    minWidth: "400px",
                                }}
                            >
                                <div>
                                    Semester :{" "}
                                    <u style={{ letterSpacing: "2px" }}>
                                        {studentUser.studentSem}
                                    </u>
                                </div>
                                <div>
                                    Status :{" "}
                                    <u style={{ letterSpacing: "2px" }}>
                                        {studentUser.studentName}
                                    </u>
                                </div>
                            </div>
                        </div>
                        <div className="table">
                            <table>
                                <tr>
                                    <th>Subject Code</th>
                                    <th>Subject Name</th>
                                    <th>Mid 1</th>
                                    <th>Mid 2</th>
                                </tr>
                                {studentUser.studentMarks.map((item) => (
                                    <tr key={item.subjectCode}>
                                        <td>{item.subjectCode}</td>
                                        <td>{item.subjectName}</td>
                                        <td
                                            style={{
                                                borderBottom:
                                                    "4px solid rgb(" +
                                                    200 * (1 - item.mid1 / 40) +
                                                    "," +
                                                    200 * (item.mid1 / 40) +
                                                    ",0)",
                                            }}
                                        >
                                            <span>{item.mid1}</span>
                                            /40
                                        </td>
                                        <td
                                            style={{
                                                borderBottom:
                                                    "4px solid rgb(" +
                                                    200 * (1 - item.mid2 / 40) +
                                                    "," +
                                                    200 * (item.mid2 / 40) +
                                                    ",0)",
                                            }}
                                        >
                                            <span>{item.mid2}</span>
                                            /40
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default MarkSheet;
