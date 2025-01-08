import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minRevenue: "",
    maxRevenue: "",
    minNetIncome: "",
    maxNetIncome: "",
  });
  const [sortBy, setSortBy] = useState({ key: "date", order: "asc" });
  const BACKEND_URL = "https://financial-data-filtering-app-heox.onrender.com"; // Replace with your actual Render backend URL

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/financial-data` , {
        params: {
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
          minRevenue: filters.minRevenue || undefined,
          maxRevenue: filters.maxRevenue || undefined,
          minNetIncome: filters.minNetIncome || undefined,
          maxNetIncome: filters.maxNetIncome || undefined,
          sortBy: sortBy.key,
          order: sortBy.order,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters, sortBy]);

  const handleSort = (key) => {
    setSortBy((prevSortBy) => ({
      key,
      order: prevSortBy.key === key && prevSortBy.order === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Apple Financial Data</h1>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <input
          type="number"
          placeholder="Start Year"
          value={filters.startDate}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, startDate: e.target.value }))
          }
          className="border p-2"
        />
        <input
          type="number"
          placeholder="End Year"
          value={filters.endDate}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, endDate: e.target.value }))
          }
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Min Revenue"
          value={filters.minRevenue}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, minRevenue: e.target.value }))
          }
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Max Revenue"
          value={filters.maxRevenue}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, maxRevenue: e.target.value }))
          }
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Min Net Income"
          value={filters.minNetIncome}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, minNetIncome: e.target.value }))
          }
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Max Net Income"
          value={filters.maxNetIncome}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, maxNetIncome: e.target.value }))
          }
          className="border p-2"
        />
      </div>
      <p className="text-xl  mb-4">Click on Respective table header to sort data!</p>

      {/* Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("date")}
            >
              Date
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("revenue")}
            >
              Revenue
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("netIncome")}
            >
              Net Income
            </th>
            <th className="border border-gray-300 px-4 py-2">Gross Profit</th>
            <th className="border border-gray-300 px-4 py-2">EPS</th>
            <th className="border border-gray-300 px-4 py-2">Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{item.date}</td>
              <td className="border border-gray-300 px-4 py-2">{item.revenue}</td>
              <td className="border border-gray-300 px-4 py-2">{item.netIncome}</td>
              <td className="border border-gray-300 px-4 py-2">{item.grossProfit}</td>
              <td className="border border-gray-300 px-4 py-2">{item.eps}</td>
              <td className="border border-gray-300 px-4 py-2">{item.operatingIncome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
