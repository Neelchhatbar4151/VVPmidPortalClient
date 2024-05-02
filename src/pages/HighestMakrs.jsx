import { useState, useEffect } from "react";
import { studentUser } from "../processes/userData";
import { developement } from "../processes/userData";

import Title from "../components/Title";

const HighestMarks = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        if (list.length === 0 && studentUser) {
            getList();
        }
    }, [list]);
    const getList = async () => {
        try {
            const res = await fetch(
                developement
                    ? "http://localhost:5000/getHighest"
                    : "/getHighest",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        sem: studentUser.studentSem,
                    }),
                }
            );
            const data = await res.json();
            if (data.status === 500) {
                alert("Internal server error");
            } else if (data.status === 200) {
                console.log(data.data);
                setList(data.data);
            } else {
                throw Error;
            }
        } catch (error) {
            console.log(error);
            alert("Unknown Error Occurred..!");
        }
    };
    if (studentUser) {
        return (
            <div className="containerVariation">
                <div className="remove markSheet">
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
                            Highest Marks Obtained By Students
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
                            {list.map((item) => (
                                <tr key={item.subjectCode}>
                                    <td>{item.subjectCode}</td>
                                    <td>{item.subject}</td>
                                    <td>
                                        <span>
                                            {item.mid1 == 0 ? "-" : item.mid1}
                                        </span>
                                        /40
                                    </td>
                                    <td>
                                        <span>
                                            {item.mid2 == 0 ? "-" : item.mid2}
                                        </span>
                                        /40
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        );
    } else {
        return <>Login to see Highest marks</>;
    }
};
export default HighestMarks;
