"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { billsStats } from "./types";

export default function BillsPage() {
  const [billsData, setBillsData] = useState<billsStats[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof billsStats;
    direction: "ascending" | "descending";
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/bills/stats");
        setBillsData(response.data.stats);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key: keyof billsStats) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredData = billsData.filter((bill) =>
    bill.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageWrapper}>
        <h1 className={styles.title}>Bills Stats</h1>
        {billsData.length > 0 ? (
          <>
            <input
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchInput}
            />
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th onClick={() => handleSort("billId")}>Bill ID</th>
                    <th onClick={() => handleSort("title")}>Title</th>
                    <th onClick={() => handleSort("supporters")}>Supporters</th>
                    <th onClick={() => handleSort("opposers")}>Opposers</th>
                    <th onClick={() => handleSort("primarySponsor")}>
                      Primary Sponsor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((data) => (
                    <tr key={data.billId}>
                      <td>{data.billId}</td>
                      <td>{data.title}</td>
                      <td>{data.supporters}</td>
                      <td>{data.opposers}</td>
                      <td>{data.primarySponsor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
