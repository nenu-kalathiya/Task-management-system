import Papa from 'papaparse';

export const exportToCSV = (tasks) => {
  if (!Array.isArray(tasks)) {
    throw new Error("Input data is not an array");
  }

  const csv = Papa.unparse(tasks);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'tasks.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
