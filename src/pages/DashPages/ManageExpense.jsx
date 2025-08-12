// import React, { useState, useEffect } from "react";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import "./ManageExpense.css";
// import axios from "axios";
// import { FaTrashAlt } from "react-icons/fa";
// import Swal from "sweetalert2";
// import "sweetalert2/dist/sweetalert2.min.css";

// const ManageExpense = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [filter, setFilter] = useState("all");
//   const [trustId] = useState(localStorage.getItem("trustId"));
//   const [summary, setSummary] = useState({
//     totalDonations: 0,
//     feesCollected: 0,
//   });

//   const [formData, setFormData] = useState({
//     notes: "",
//     amount: "",
//     date: new Date().toISOString().split("T")[0],
//     source: "donation",
//   });

//   const fetchExpenses = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/expenses", {
//         params: { trustId, filter },
//       });
//       setExpenses(res.data.expenses);
//     } catch (err) {
//       console.error("Failed to fetch expenses:", err);
//     }
//   };

//   const fetchDashboardStats = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/dashboard/stats", {
//         params: { trustId },
//       });
//       const { totalDonations = 0, feesCollected = 0 } = res.data;
//       setSummary({ totalDonations, feesCollected });
//     } catch (err) {
//       console.error("Failed to fetch dashboard stats:", err);
//     }
//   };

//   useEffect(() => {
//     if (trustId) {
//       fetchExpenses();
//       fetchDashboardStats();
//     }
//   }, [filter, trustId]);

//   const handleModalToggle = () => {
//     setShowModal(!showModal);
//     setFormData({
//       notes: "",
//       amount: "",
//       date: new Date().toISOString().split("T")[0],
//       source: "donation",
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const newExpense = {
//         ...formData,
//         amount: parseFloat(formData.amount),
//         trustId,
//       };

//       const res = await axios.post(
//         "http://localhost:5000/api/expenses",
//         newExpense
//       );
//       setExpenses((prev) => [...prev, res.data]);
//       handleModalToggle();
//     } catch (error) {
//       console.error("Failed to add expense:", error);
//     }
//   };

//   const handleDeleteExpense = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This expense will be permanently deleted.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//       background: "#fff",
//       color: "#000",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`http://localhost:5000/api/expenses/${id}`);
//           fetchExpenses();
//           Swal.fire({
//             title: "Deleted!",
//             text: "Expense has been deleted.",
//             icon: "success",
//             background: "#fff",
//             color: "#000",
//             confirmButtonColor: "#3085d6",
//           });
//         } catch (err) {
//           console.error("Failed to delete expense:", err);
//           Swal.fire({
//             title: "Error!",
//             text: "Failed to delete expense.",
//             icon: "error",
//             background: "#fff",
//             color: "#000",
//             confirmButtonColor: "#d33",
//           });
//         }
//       }
//     });
//   };

//   const filteredExpenses = expenses.filter((expense) =>
//     expense.notes.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalAmount = filteredExpenses.reduce(
//     (sum, item) => sum + item.amount,
//     0
//   );

//   const totalCollected =
//     filter === "all"
//       ? summary.totalDonations + summary.feesCollected
//       : filter === "donation"
//       ? summary.totalDonations
//       : summary.feesCollected;

//   // ✅ Export CSV Handler
//   const handleExportCSV = () => {
//     if (!filteredExpenses.length) {
//       alert("No expenses to export.");
//       return;
//     }

//     const headers = ["Sr No", "Notes", "Date", "Amount (₹)", "Source"];
//     const rows = filteredExpenses.map((exp, index) => [
//       index + 1,
//       `"${exp.notes}"`,
//       `"${new Date(exp.date).toLocaleDateString()}"`,
//       `"₹${exp.amount}"`,
//       `"${exp.source}"`,
//     ]);

//     const csvContent =
//       "\uFEFF" + [headers, ...rows].map((row) => row.join(",")).join("\n");

//     const blob = new Blob([csvContent], {
//       type: "text/csv;charset=utf-8;",
//     });

//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "expenses.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="expense-container">
//       <Sidebar />
//       <div className="expense-main">
//         <div className="expense-header">
//           <h2>Manage Expenses</h2>
//           <div className="expense-actions">
//             <input
//               type="text"
//               className="expense-search"
//               placeholder="Search expenses..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />

//             <select
//               className="expense-filter-select"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//             >
//               <option value="all">All</option>
//               <option value="fees">Fees</option>
//               <option value="donation">Donation</option>
//             </select>

//             <div className="expense-total-badge">
//               Total Expenses ({filter}): ₹{totalAmount}
//             </div>

//             <button className="expense-btn-primary" onClick={handleModalToggle}>
//               + Add Expense
//             </button>

//             <button className="expense-btn-outline" onClick={handleExportCSV}>
//               ⬇ Export CSV
//             </button>
//           </div>
//         </div>

//         <table className="expense-table">
//           <thead>
//             <tr>
//               <th>Sr No</th>
//               <th>Notes</th>
//               <th>Date</th>
//               <th>Amount</th>
//               <th>Source</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredExpenses.length > 0 ? (
//               filteredExpenses.map((exp, index) => (
//                 <tr key={exp._id || exp.id}>
//                   <td>{index + 1}</td>
//                   <td>{exp.notes}</td>
//                   <td>{new Date(exp.date).toLocaleDateString()}</td>
//                   <td className="expense-amount-cell">₹{exp.amount}</td>
//                   <td>{exp.source}</td>
//                   <td>
//                     <button
//                       className="expense-delete-icon"
//                       onClick={() => handleDeleteExpense(exp._id)}
//                       title="Delete Expense"
//                     >
//                       <FaTrashAlt />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="6"
//                   style={{ textAlign: "center", padding: "20px" }}
//                 >
//                   No expenses found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//         {/* Card View for Mobile Devices */}
//         <div className="expense-card-container">
//           {filteredExpenses.length > 0 ? (
//             filteredExpenses.map((exp, index) => (
//               <div className="expense-card" key={exp._id || exp.id}>
//                 <div className="expense-card-row">
//                   <span>
//                     <strong>#{index + 1}</strong>
//                   </span>
//                   <span>{new Date(exp.date).toLocaleDateString()}</span>
//                 </div>
//                 <div className="expense-card-row">
//                   <span>Notes:</span>
//                   <span>{exp.notes}</span>
//                 </div>
//                 <div className="expense-card-row">
//                   <span>Amount:</span>
//                   <span className="expense-amount-cell">₹{exp.amount}</span>
//                 </div>
//                 <div className="expense-card-row">
//                   <span>Source:</span>
//                   <span>{exp.source}</span>
//                 </div>
//                 <div
//                   className="expense-card-delete-icon"
//                   onClick={() => handleDeleteExpense(exp._id)}
//                   title="Delete Expense"
//                 >
//                   <FaTrashAlt />
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-expense-mobile">No expenses found.</div>
//           )}
//         </div>

//         <div className="expense-summary">
//           <h3>Summary</h3>
//           <p>
//             Total Expenses ({filter}): ₹{totalAmount}
//           </p>
//           <p>
//             Total Collected (
//             {filter === "all"
//               ? "Donation + Fees"
//               : filter.charAt(0).toUpperCase() + filter.slice(1)}
//             ): ₹{totalCollected}
//           </p>
//         </div>
//       </div>

//       {showModal && (
//         <div className="modal-backdrop">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3>Add New Expense</h3>
//             </div>
//             <form className="modal-form" onSubmit={handleSubmit}>
//               <label>Expense Notes *</label>
//               <input
//                 type="text"
//                 name="notes"
//                 value={formData.notes}
//                 onChange={handleInputChange}
//                 placeholder="Enter expense notes"
//                 required
//               />

//               <label>Amount (₹) *</label>
//               <input
//                 type="number"
//                 name="amount"
//                 value={formData.amount}
//                 onChange={handleInputChange}
//                 placeholder="Enter amount"
//                 required
//               />

//               <label>Date *</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleInputChange}
//                 required
//               />

//               <label>Source *</label>
//               <select
//                 name="source"
//                 value={formData.source}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="donation">Donation</option>
//                 <option value="fees">Fees</option>
//               </select>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="btn-outline"
//                   onClick={handleModalToggle}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn-primary">
//                   Add Expense
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageExpense;

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./ManageExpense.css";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const ManageExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [trustId] = useState(localStorage.getItem("trustId"));
  const [summary, setSummary] = useState({
    totalDonations: 0,
    feesCollected: 0,
  });

  const [formData, setFormData] = useState({
    notes: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    source: "donation",
  });

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/expenses", {
        params: { trustId, filter },
      });
      setExpenses(res.data.expenses);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    }
  };

  // Fetch dashboard stats
  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard/stats", {
        params: { trustId },
      });
      const { totalDonations = 0, feesCollected = 0 } = res.data;
      setSummary({ totalDonations, feesCollected });
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
    }
  };

  useEffect(() => {
    if (trustId) {
      fetchExpenses();
      fetchDashboardStats();
    }
  }, [filter, trustId]);

  const handleModalToggle = () => {
    setShowModal(!showModal);
    setFormData({
      notes: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      source: "donation",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newExpense = {
        ...formData,
        amount: parseFloat(formData.amount),
        trustId,
      };

      const res = await axios.post(
        "http://localhost:5000/api/expenses",
        newExpense
      );
      setExpenses((prev) => [...prev, res.data]);
      handleModalToggle();
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This expense will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
      color: "#000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/expenses/${id}`);
          fetchExpenses();
          Swal.fire({
            title: "Deleted!",
            text: "Expense has been deleted.",
            icon: "success",
            background: "#fff",
            color: "#000",
          });
        } catch (err) {
          console.error("Failed to delete expense:", err);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete expense.",
            icon: "error",
            background: "#fff",
            color: "#000",
          });
        }
      }
    });
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredExpenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const totalCollected =
    filter === "all"
      ? summary.totalDonations + summary.feesCollected
      : filter === "donation"
      ? summary.totalDonations
      : summary.feesCollected;

  const handleExportCSV = () => {
    if (!filteredExpenses.length) {
      alert("No expenses to export.");
      return;
    }
    const headers = ["Sr No", "Notes", "Date", "Amount (₹)", "Source"];
    const rows = filteredExpenses.map((exp, index) => [
      index + 1,
      `"${exp.notes}"`,
      `"${new Date(exp.date).toLocaleDateString()}"`,
      `"₹${exp.amount}"`,
      `"${exp.source}"`,
    ]);
    const csvContent =
      "\uFEFF" + [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="expense-container">
      <Sidebar />
      <div className="expense-main">
        <div className="expense-header">
          <h2>Manage Expenses</h2>
          <div className="expense-actions">
            <input
              type="text"
              className="expense-search"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="expense-filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="fees">Fees</option>
              <option value="donation">Donation</option>
            </select>

            <div className="expense-total-badge">
              Total Expenses ({filter}): ₹{totalAmount}
            </div>

            <button className="expense-btn-primary" onClick={handleModalToggle}>
              + Add Expense
            </button>

            <button className="expense-btn-outline" onClick={handleExportCSV}>
              ⬇ Export CSV
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="table-wrapper">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Notes</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Source</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((exp, index) => (
                  <tr key={exp._id || exp.id}>
                    <td>{index + 1}</td>
                    <td>{exp.notes}</td>
                    <td>{new Date(exp.date).toLocaleDateString()}</td>
                    <td className="expense-amount-cell">₹{exp.amount}</td>
                    <td>{exp.source}</td>
                    <td>
                      <button
                        className="expense-delete-icon"
                        onClick={() => handleDeleteExpense(exp._id)}
                        title="Delete Expense"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No expenses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Card View (Mobile) */}
        <div className="expense-card-container">
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((exp, index) => (
              <div className="expense-card" key={exp._id || exp.id}>
                <div className="expense-card-row">
                  <span>
                    <strong>#{index + 1}</strong>
                  </span>
                  <span>{new Date(exp.date).toLocaleDateString()}</span>
                </div>
                <div className="expense-card-row">
                  <span>Notes:</span>
                  <span>{exp.notes}</span>
                </div>
                <div className="expense-card-row">
                  <span>Amount:</span>
                  <span className="expense-amount-cell">₹{exp.amount}</span>
                </div>
                <div className="expense-card-row">
                  <span>Source:</span>
                  <span>{exp.source}</span>
                </div>
                <div
                  className="expense-card-delete-icon"
                  onClick={() => handleDeleteExpense(exp._id)}
                  title="Delete Expense"
                >
                  <FaTrashAlt />
                </div>
              </div>
            ))
          ) : (
            <div className="no-expense-mobile">No expenses found.</div>
          )}
        </div>

        <div className="expense-summary">
          <h3>Summary</h3>
          <p>
            Total Expenses ({filter}): ₹{totalAmount}
          </p>
          <p>
            Total Collected (
            {filter === "all"
              ? "Donation + Fees"
              : filter.charAt(0).toUpperCase() + filter.slice(1)}
            ): ₹{totalCollected}
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Expense</h3>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <label>Expense Notes *</label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Enter expense notes"
                required
              />

              <label>Amount (₹) *</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                required
              />

              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />

              <label>Source *</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                required
              >
                <option value="donation">Donation</option>
                <option value="fees">Fees</option>
              </select>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={handleModalToggle}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageExpense;
