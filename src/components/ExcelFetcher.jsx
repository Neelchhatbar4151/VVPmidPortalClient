import { useState } from "react";
import * as XLSX from "xlsx";

// import "./App.css";

let list;

export const getStudentList = () => {
    return list;
};

function Demo() {
    const [data, setData] = useState([]);

    const handleFileUpload = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            list = parsedData;
            setData(parsedData);
        };
    };

    return (
        <div className="App">
            <div className="inputs">
                <div className="group">
                    <div className="userId">
                        <input
                            style={{ fontSize: "20px" }}
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleFileUpload}
                        />
                    </div>
                </div>
            </div>

            {data.length > 0 && (
                <table className="table">
                    <tr>
                        {Object.keys(data[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((value, index) => {
                                return <td key={index}>{value}</td>;
                            })}
                        </tr>
                    ))}
                </table>
            )}
            <br />
            <br />
        </div>
    );
}

export default Demo;
