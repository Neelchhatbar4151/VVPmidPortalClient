import { studentUser } from "../processes/userData";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import Title from "../components/Title";
function MarkSheet() {
    const history = useNavigate();
    useEffect(() => {
        if (!studentUser) {
            history("/");
        }
    }, [history]);
    const downloadPdf = async () => {
        const capture = document.querySelector(".download");
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL("img/png");
            const doc = new jsPDF("l", "in", "a3");
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
            doc.save("Sem " + studentUser.studentSem + " Mid Marks.pdf");
        });
    };
    if (!studentUser) {
        return <></>;
    } else {
        let sum1, sum2;
        sum1 = 0;
        sum2 = 0;
        for (let i = 0; i < studentUser.studentMarks.length; i++) {
            sum1 += studentUser.studentMarks[i].mid1;
            sum2 += studentUser.studentMarks[i].mid2;
        }
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
                        <div className="download">
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
                                        {/* Status :{" "}
                                    <u style={{ letterSpacing: "2px" }}>
                                        {"Pass/Fail"}
                                    </u> */}
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
                                                        "3px solid rgb(" +
                                                        (item.mid1 <= 20
                                                            ? "200"
                                                            : "0") +
                                                        "," +
                                                        (item.mid1 >= 30
                                                            ? "200"
                                                            : "0") +
                                                        "," +
                                                        (item.mid1 > 20 &&
                                                        item.mid1 < 30
                                                            ? "200"
                                                            : "0") +
                                                        ")",
                                                }}
                                            >
                                                <span>
                                                    {item.mid1 == null
                                                        ? "-"
                                                        : item.mid1}
                                                </span>
                                                /40
                                            </td>
                                            <td
                                                style={{
                                                    borderBottom:
                                                        "3px solid rgb(" +
                                                        (item.mid2 <= 20
                                                            ? "200"
                                                            : "0") +
                                                        "," +
                                                        (item.mid2 >= 30
                                                            ? "200"
                                                            : "0") +
                                                        "," +
                                                        (item.mid2 > 20 &&
                                                        item.mid2 < 30
                                                            ? "200"
                                                            : "0") +
                                                        ")",
                                                }}
                                            >
                                                <span>
                                                    {item.mid2 == null
                                                        ? "-"
                                                        : item.mid2}
                                                </span>
                                                /40
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td>
                                            <u>Total: </u>
                                        </td>
                                        <td>={sum1}</td>
                                        <td>={sum2}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div className="inputs">
                            <div className="group">
                                <div className="cover">
                                    <div
                                        className="buttonContainer"
                                        onClick={() => {
                                            history("/Highest");
                                        }}
                                    >
                                        <button className="btn">
                                            Show Highest Marks
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="group hideDownload">
                                <div className="cover">
                                    <div
                                        className="buttonContainer"
                                        onClick={downloadPdf}
                                    >
                                        <button className="btn">
                                            Download Result
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default MarkSheet;
