import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./DepositPage.css";

const DepositPage: React.FC = () => {
  const [amount, setAmount] = useState<number | string>("");
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
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
        "http://poserdungeon.myddns.me:5000/balance/deposit",
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

      toast.success("Deposit successful!");
      setAmount(""); // Reset the input
    } catch (error: any) {
      console.error("Error during deposit:", error);
      toast.error("Deposit failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deposit-page">
      <h2>Deposit Money</h2>
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
  );
};

export default DepositPage;
