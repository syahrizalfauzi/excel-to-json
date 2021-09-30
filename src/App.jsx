import { useState } from "react";
import XLSX from "xlsx";

function App() {
  const [rows, setRows] = useState();

  async function handleUpload(e) {
    e.preventDefault();
    const targetFile = e.target.files[0];
    const buffer = await targetFile.arrayBuffer();
    const imported = XLSX.read(buffer, { type: "buffer" });
    const sheet = imported.Sheets[imported.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);
    setRows(json);
  }

  return (
    <div>
      <h3>Input file .XLSX</h3>
      <input
        type="file"
        onChange={handleUpload}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      />
      {rows && (
        <div>
          <h3>Result : </h3>
          <div>
            <a
              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(rows)
              )}`}
              download="converted.json"
            >
              Download Json
            </a>
            <div>{JSON.stringify(rows)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
