import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { fetchCSVData2 } from "./data2";
import "./DataTable.css"; // Import the custom CSS file

export default function DataTable2() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await fetchCSVData2();
      setData(csvData);
    };
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      { Header: "Deal Number", accessor: "deal" },
      /*     { Header: "Status", accessor: "Status" },
      { Header: "ETA From", accessor: "ETA From" },
      { Header: "ETA To", accessor: "ETA To" },
      { Header: "Year", accessor: "Model Year" },
      { Header: "Model", accessor: "Model" },
      { Header: "Suffix", accessor: "Suffix" },
      { Header: "Colour", accessor: "Colour" },
      */
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <table {...getTableProps()} className="datatable">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
