import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./HistoryPage.css";

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");

    if (!user.accountId || !token) {
      toast.error("Missing user information or token.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://poserdungeon.myddns.me:5000/balance/history",
        {
          accountId: user.accountId,
          fromDate: "2024-11-01T00:00:00.000Z", // Example range
          toDate: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(response.data);
      toast.success("Transaction history loaded successfully!");
    } catch (error: any) {
      console.error("Error fetching history:", error);
      toast.error("Failed to load transaction history.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="history-page">
      <h2>Transaction History</h2>
      <button onClick={fetchHistory} disabled={loading}>
        {loading ? "Loading..." : "Load History"}
      </button>
      <div className="history-table">
        {history.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {history.map((transaction, index) => (
                <tr key={index}>
                  <td>{new Date(transaction.transactionDate).toLocaleDateString()}</td>
                  <td>{transaction.transactionType === 1 ? "Deposit" : "Withdraw"}</td>
                  <td>${transaction.transactionAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
