import Papa from 'papaparse';

export async function fetchCSVData() {
  const response = await fetch('./VehicleDetailsReport.csv'); // Replace with the path to your CSV file
  const csv = await response.text();
  const parsedData = Papa.parse(csv, { header: true });
  return parsedData.data;
}
