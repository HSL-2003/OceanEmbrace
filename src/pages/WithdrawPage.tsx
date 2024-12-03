import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./WithdrawPage.css";

const WithdrawPage: React.FC = () => {
  const [amount, setAmount] = useState<number | string>("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");

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
          transactionAmount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Withdrawal successful!");
      setAmount(""); // Reset the input
    } catch (error: any) {
      console.error("Error during withdrawal:", error);
      toast.error("Withdrawal failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdraw-page">
      <h2>Withdraw Money</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleWithdraw} disabled={loading}>
        {loading ? "Processing..." : "Confirm Withdrawal"}
      </button>
    </div>
  );
};

export default WithdrawPage;
