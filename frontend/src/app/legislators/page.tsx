"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { legislatorsStats } from "./types";

export default function LegislatorsPage() {
  const [legislatorsData, setLegislatorsData] = useState<legislatorsStats[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof legislatorsStats;
    direction: "ascending" | "descending";
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/legislators/stats"
        );
        setLegislatorsData(response.data.stats);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key: keyof legislatorsStats) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredData = legislatorsData.filter((legislator) =>
    legislator.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageWrapper}>
        <h1 className={styles.title}>Legislators Stats</h1>
        {legislatorsData.length > 0 ? (
          <>
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchInput}
            />
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th onClick={() => handleSort("name")}>Name</th>
                    <th onClick={() => handleSort("supportedBills")}>
                      Supported Bills
                    </th>
                    <th onClick={() => handleSort("opposedBills")}>
                      Opposed Bills
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((data) => (
                    <tr key={data.name}>
                      <td>{data.name}</td>
                      <td>{data.supportedBills}</td>
                      <td>{data.opposedBills}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.pagination}>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? styles.activePage : ""}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
