import Papa from "papaparse";

export async function fetchCSVData2() {
  const response = await fetch("./OrderData.csv"); // Replace with the path to your second CSV file
  const csv = await response.text();
  const parsedData = Papa.parse(csv, { header: true });
  return parsedData.data;
}
