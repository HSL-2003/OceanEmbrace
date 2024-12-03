import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./BalancePage.css";

const BalancePage: React.FC = () => {
  const [balance, setBalance] = useState<number>(0); // Số dư tài khoản
  const [history, setHistory] = useState<any[]>([]); // Lịch sử giao dịch
  const [amount, setAmount] = useState<number | string>(""); // Số tiền cần nạp/rút
  const [activeTab, setActiveTab] = useState<"history" | "deposit" | "withdraw">("history");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  // Lấy số dư từ localStorage khi trang được tải lại
  useEffect(() => {
    const savedBalance = localStorage.getItem("balance");
    if (savedBalance) {
      setBalance(Number(savedBalance));
    }
  }, []);

  const fetchHistory = async () => {
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
          fromDate: "2020-01-01T00:00:00.000Z", // Thử phạm vi thời gian rộng hơn
          toDate: new Date().toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      // Kiểm tra cấu trúc dữ liệu trả về
      console.log("API Response for History:", response.data);
      
      // Nếu API trả về dữ liệu theo dạng đối tượng duy nhất
      const transactions = response.data.items || [response.data]; // Nếu có nhiều giao dịch thì sử dụng mảng
      setHistory(transactions);
  
    } catch (error) {
      console.error("Error fetching history:", error);
      toast.error("Failed to load transaction history.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
  
    if (!user.accountId || !token) {
      toast.error("Missing user information or token.");
      return;
    }
  
    try {
      setLoading(true);
      await axios.post(
        "http://poserdungeon.myddns.me:5000/balance/deposit",
        {
          accountId: user.accountId,
          amount: Number(amount),
          transactionType: 1,  // 2 for Deposit
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      toast.success("Deposit successful!");
      setAmount(""); // Reset amount after successful deposit
      fetchBalance(); // Fetch the updated balance
      fetchHistory(); // Reload transaction history to reflect the deposit
    } catch (error) {
      console.error("Error during deposit:", error);
      toast.error("Deposit failed. Please try again.");
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
  
    if (!user.accountId || !token) {
      toast.error("Missing user information or token.");
      return;
    }
  
    try {
      setLoading(true);
      await axios.post(
        "http://poserdungeon.myddns.me:5000/balance/withdraw",
        {
          accountId: user.accountId,
          amount: Number(amount),
          transactionType: 2,  // 1 for Withdraw
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Withdrawal successful!");
      setAmount(""); // Reset amount after successful withdrawal
      fetchBalance(); // Fetch the updated balance
      fetchHistory(); // Reload transaction history to reflect the withdrawal
    } catch (error) {
      console.error("Error during withdrawal:", error);
      toast.error("Withdrawal failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBalance = async () => {
    if (!user.accountId || !token) {
      toast.error("Missing user information or token.");
      return;
    }
  
    try {
      const response = await axios.get(
        `http://poserdungeon.myddns.me:5000/balance/${user.accountId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      console.log("API Response for Balance:", response.data); // Kiểm tra phản hồi
      if (response.data && response.data.balance !== undefined) {
        const newBalance = response.data.balance; // Lấy balance từ API
        setBalance(newBalance); // Cập nhật balance vào state
        localStorage.setItem("balance", newBalance.toString()); // Lưu vào localStorage
      } else {
        throw new Error("Balance not found in API response");
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast.error("Failed to fetch balance.");
    }
  };
  
  
  return (
    <div className="balance-page">
      <h2>Your Balance</h2>
      <div className="balance-info">
        <p>Current Balance: ${balance}</p>
      </div>

      <div className="tabs">
        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => {
            setActiveTab("history");
            fetchHistory();
          }}
        >
          History
        </button>
        <button
          className={activeTab === "deposit" ? "active" : ""}
          onClick={() => setActiveTab("deposit")}
        >
          Deposit
        </button>
        <button
          className={activeTab === "withdraw" ? "active" : ""}
          onClick={() => setActiveTab("withdraw")}
        >
          Withdraw
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "history" && (
          <div className="history-tab">
            {loading ? (
              <p>Loading...</p>
            ) : history.length > 0 ? (
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
                      <td>{transaction.transactionType === 1 ? "Withdraw" : "Deposit"}</td>
                      <td>${transaction.transactionAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No transactions found.</p>
            )}
          </div>
        )}

        {activeTab === "deposit" && (
          <div className="deposit-tab">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleDeposit} disabled={loading}>
              {loading ? "Processing..." : "Confirm Deposit"}
            </button>
          </div>
        )}

        {activeTab === "withdraw" && (
          <div className="withdraw-tab">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleWithdraw} disabled={loading}>
              {loading ? "Processing..." : "Confirm Withdraw"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalancePage;
