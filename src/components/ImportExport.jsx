import React, { useState, useRef } from "react";
import Papa from "papaparse";
import { validateTaskData } from '../utils/taskUtils';
import { exportToCSV } from "../utils/csvUtils";
import './ImportExport.css';

const ImportExport = () => {
  const [tasks, setTasks] = useState([]);
  const [fileName, setFileName] = useState("No file chosen");
  const fileInputRef = useRef(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleExport = () => {
    if (!isFileSelected) {
      alert("Please choose a file before exporting.");
      return;
    }
    exportToCSV(tasks);
    fileInputRef.current.value = null;
    setFileName("No file chosen");
    setIsFileSelected(false);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); 
      setIsFileSelected(true);
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const errors = results.data.map(task => validateTaskData(task));
          const hasErrors = errors.some(error => Object.keys(error).length > 0);
          
          if (hasErrors) {
            console.log("Errors found in imported tasks:", errors);
          } else {
            setTasks(results.data);
          }
        },
      });
    }
  };

  return (
    <div className="import-export-container">
      <h2>Import and Export Tasks</h2>
      <div className="file-input-container">
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleImport} 
          className="file-input" 
        />
        <span className="file-name">{fileName}</span>
      </div>
      <button onClick={handleExport} className="export-button">Export</button>
    </div>
  );
};

export default ImportExport;

