import { studentUser } from "../processes/userData";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFDownloadLink,
} from "@react-pdf/renderer";

import Title from "../components/Title";
function MarkSheet() {
    const history = useNavigate();
    useEffect(() => {
        if (!studentUser) {
            history("/");
        }
    }, [history]);
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
        const data = [];
        for (let i = 0; i < studentUser.studentMarks.length; i++) {
            data.push(
                <View key={i} style={styles.row}>
                    <Text style={(styles.cell, styles.cell1)}>
                        {studentUser.studentMarks[i].subjectCode}
                    </Text>
                    <Text style={(styles.cell, styles.cell2)}>
                        {studentUser.studentMarks[i].subjectName}
                    </Text>
                    <Text style={(styles.cell, styles.cell3)}>
                        {studentUser.studentMarks[i].mid1}
                    </Text>
                    <Text style={(styles.cell, styles.cell3)}>
                        {studentUser.studentMarks[i].mid2}
                    </Text>
                </View>
            );
        }

        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Text style={{ marginBottom: "30px" }}>
                        {studentUser.studentName} (
                        {studentUser.studentEnrollment}) Semester:{" "}
                        {studentUser.studentSem}
                    </Text>

                    <View style={styles.row}>
                        <Text style={(styles.cell, styles.cell1)}>
                            Subject Code
                        </Text>
                        <Text style={(styles.cell, styles.cell2)}>
                            Subject Name
                        </Text>
                        <Text style={(styles.cell, styles.cell3)}>Mid 1</Text>
                        <Text style={(styles.cell, styles.cell3)}>Mid 2</Text>
                    </View>
                    {data}
                </Page>
            </Document>
        );
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
                            <div className="inputs" width="90%">
                                <div
                                    className="group"
                                    style={{
                                        textAlign: "left",
                                        fontSize: "17px",
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
                                        fontSize: "17px",
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
                            <div className="group">
                                <div className="cover">
                                    <div className="buttonContainer">
                                        <PDFDownloadLink
                                            className="btn"
                                            document={renderPDF()}
                                            fileName={
                                                "sem " +
                                                studentUser.studentSem +
                                                " Mid MarkSheet"
                                            }
                                        >
                                            {/* Button to trigger PDF download */}
                                            <button className="btn">
                                                Download
                                            </button>
                                        </PDFDownloadLink>
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
