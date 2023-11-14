import React, { useEffect, useState } from "react";
import { logEvent } from "./analytics"; // Import the logEvent function from analytics.js
import { useTable, useGlobalFilter } from "react-table";
import { fetchCSVData } from "./data";
import "./DataTable.css"; // Import the custom CSS file

export default function DataTable() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await fetchCSVData();
      setData(csvData);
    };
    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      // Define your column headers here
      // { Header: "Order Number", accessor: "Order Number" },
      { Header: "Customer Name", accessor: "Customer Name" },
      { Header: "Status", accessor: "Status" },
      //  { Header: 'VIN', accessor: 'VIN'},
      { Header: "ETA From", accessor: "ETA From" },
      { Header: "ETA To", accessor: "ETA To" },
      { Header: "Year", accessor: "Model Year" },
      { Header: "Model", accessor: "Model" },
      { Header: "Suffix", accessor: "Suffix" },
      { Header: "Colour", accessor: "Colour" },
      // Add more columns as needed
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setGlobalFilter(query);
    logEvent("Search", "Performed"); // Track the search event in Google Analytics
  };

  const clearSearch = () => {
    setSearchQuery("");
    logEvent("Search", "Cleared"); // Track the search event in Google Analytics
  };

  const filteredRows = searchQuery
    ? rows.filter((row, index) => index === 0 || row.isMatched)
    : [];

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Type your Order Number or Customer Name..."
          className="search-input"
        />
      </div>
      {searchQuery && filteredRows.length > 0 ? (
        <table {...getTableProps()} style={{ width: "100%" }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {filteredRows.map((row) => {
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
      ) : (
        searchQuery && (
          <p className="no-results">
            Your order may be "Pending Fullfilment". Verify that your search is
            entered correctly.
          </p>
        )
      )}
    </div>
  );
}
