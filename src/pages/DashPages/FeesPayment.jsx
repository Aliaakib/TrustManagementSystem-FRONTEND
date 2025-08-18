// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import "./FeesPayment.css";
// import axios from "axios";
// import {
//   FaEnvelope,
//   FaCheckCircle,
//   FaRupeeSign,
//   FaWhatsapp,
// } from "react-icons/fa";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { getTrustByUser } from "../../services/trustService";

// const FeesPayment = () => {
//   const [members, setMembers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [showFeeModal, setShowFeeModal] = useState(false);
//   const [newFee, setNewFee] = useState(0);
//   const [trustName, setTrustName] = useState("");
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [showMarkPaidModal, setShowMarkPaidModal] = useState(false);
//   const [selectedMonths, setSelectedMonths] = useState([]);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//   const trustId = localStorage.getItem("trustId");
//   const userId = localStorage.getItem("userId");

//   const allMonths = [
//     "JAN",
//     "FEB",
//     "MAR",
//     "APR",
//     "MAY",
//     "JUN",
//     "JUL",
//     "AUG",
//     "SEP",
//     "OCT",
//     "NOV",
//     "DEC",
//   ];

//   useEffect(() => {
//     fetchFeeAmount();
//     fetchMembers();
//     fetchTrustDetails();
//   }, []);

//   const fetchFeeAmount = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/setfee", {
//         params: { trustId },
//       });
//       if (res.data && res.data.feeAmount) {
//         setNewFee(res.data.feeAmount);
//       }
//     } catch (error) {
//       console.error("Error fetching fee amount:", error);
//     }
//   };

//   const fetchMembers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/members", {
//         params: { trustId },
//       });
//       const unpaid = res.data.filter((m) => !m.feesPaid);
//       setMembers(unpaid);
//     } catch (error) {
//       console.error("Error fetching members:", error);
//     }
//   };

//   const fetchTrustDetails = async () => {
//     try {
//       const trust = await getTrustByUser(userId);
//       setTrustName(trust.name || "");
//     } catch (error) {
//       console.error("Error fetching trust details:", error);
//     }
//   };

//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("Unpaid Fee Members Report", 14, 20);

//     const tableColumn = [
//       "Sr No",
//       "Name",
//       "Email",
//       "Phone",
//       "Address",
//       "Status",
//     ];
//     const tableRows = members.map((m, index) => [
//       index + 1,
//       m.name,
//       m.email,
//       m.phone,
//       m.address,
//       m.feesPaid ? "PAID" : "NOT PAID",
//     ]);

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       startY: 30,
//       styles: { fontSize: 10 },
//     });

//     doc.save("unpaid_fee_members.pdf");
//   };

//   const handleSendMail = (member) => {
//     const subject = encodeURIComponent("Pending Membership Fee Reminder");
//     const body = encodeURIComponent(
//       `Dear ${member.name},\n\nThis is a gentle reminder that your membership fee of ₹${newFee} is pending with ${trustName}.\n\nPlease make the payment at your earliest convenience.\n\nRegards,\n${trustName}`
//     );
//     window.open(
//       `https://mail.google.com/mail/?view=cm&fs=1&to=${member.email}&su=${subject}&body=${body}`,
//       "_blank"
//     );
//   };

//   const handleSendWhatsApp = (member) => {
//     const message = encodeURIComponent(
//       `Dear ${member.name},\n\nYour membership fee of ₹${newFee} is pending with ${trustName}. Kindly pay at your earliest convenience.\n\nThanks,\n${trustName}`
//     );
//     const phone = member.phone?.replace(/\D/g, "");
//     if (phone) {
//       window.open(`https://wa.me/91${phone}?text=${message}`, "_blank");
//     } else {
//       alert("Invalid phone number.");
//     }
//   };

//   const handleFeeSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/setfee", {
//         trustId,
//         feeAmount: newFee,
//       });
//       setShowFeeModal(false);
//     } catch (error) {
//       console.error("Failed to update fee:", error);
//     }
//   };

//   const handleMarkAsPaid = async () => {
//     if (!selectedMonths.length) {
//       alert("Please select at least one month.");
//       return;
//     }
//     try {
//       await axios.put(
//         `http://localhost:5000/api/members/${selectedMember._id}`,
//         {
//           feesPaid: true,
//           monthsPaid: selectedMonths,
//           yearPaid: selectedYear,
//         }
//       );
//       fetchMembers();
//       setShowMarkPaidModal(false);
//     } catch (err) {
//       console.error("Error marking as paid:", err);
//     }
//   };

//   const filteredMembers = members.filter((m) =>
//     m.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="fees-wrapper">
//       <Sidebar />
//       <div className="fees-main">
//         <h2 className="fees-title">Fees & Payment</h2>

//         <div className="fees-top">
//           <input
//             type="text"
//             className="fees-search"
//             placeholder="Search members..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <div className="fees-total">
//             Total Unpaid: {filteredMembers.length}
//           </div>
//           <button className="btn-outline" onClick={() => setShowFeeModal(true)}>
//             <FaRupeeSign /> Set Fee
//           </button>
//           <button className="btn-outline" onClick={handleExportPDF}>
//             ⬇ Export PDF
//           </button>
//         </div>

//         {/* Table view for desktop */}
//         <div className="fees-table-container">
//           <table className="fees-table">
//             <thead>
//               <tr>
//                 <th>Sr No</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Address</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredMembers.length > 0 ? (
//                 filteredMembers.map((member, index) => (
//                   <tr key={member._id}>
//                     <td>{index + 1}</td>
//                     <td>{member.name}</td>
//                     <td>{member.email}</td>
//                     <td>{member.phone}</td>
//                     <td>{member.address}</td>
//                     <td>
//                       <span
//                         className={
//                           member.feesPaid ? "badge-paid" : "badge-unpaid"
//                         }
//                       >
//                         {member.feesPaid ? "PAID" : "NOT PAID"}
//                       </span>
//                     </td>
//                     <td>
//                       <div className="fees-actions">
//                         <button
//                           className="mark-paid-btn"
//                           onClick={() => {
//                             setSelectedMember(member);
//                             setShowMarkPaidModal(true);
//                             setSelectedMonths([]);
//                             setSelectedYear(new Date().getFullYear());
//                           }}
//                         >
//                           <FaCheckCircle /> Mark Paid
//                         </button>
//                         <button
//                           className="btn-outline"
//                           onClick={() => handleSendMail(member)}
//                         >
//                           <FaEnvelope /> Mail
//                         </button>
//                         <button
//                           className="btn-outline"
//                           onClick={() => handleSendWhatsApp(member)}
//                         >
//                           <FaWhatsapp style={{ color: "#25D366" }} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="7"
//                     style={{ textAlign: "center", padding: "20px" }}
//                   >
//                     No unpaid fee members found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Card view for mobile */}
//         <div className="fees-card-container">
//           {filteredMembers.length > 0 ? (
//             filteredMembers.map((member, index) => (
//               <div className="fees-card" key={member._id}>
//                 <h4>
//                   {index + 1}. {member.name}
//                 </h4>
//                 <div className="fees-card-row">
//                   <span>Email:</span>
//                   <span>{member.email}</span>
//                 </div>
//                 <div className="fees-card-row">
//                   <span>Phone:</span>
//                   <span>{member.phone}</span>
//                 </div>
//                 <div className="fees-card-row">
//                   <span>Amount:</span>
//                   <span>₹{newFee}</span>
//                 </div>
//                 <div className="fees-card-actions">
//                   <button
//                     className="mark-paid-btn"
//                     onClick={() => {
//                       setSelectedMember(member);
//                       setSelectedMonths([]);
//                       setSelectedYear(new Date().getFullYear());
//                       setShowMarkPaidModal(true);
//                     }}
//                   >
//                     <FaCheckCircle /> Mark Paid
//                   </button>
//                   <button
//                     className="btn-outline"
//                     onClick={() => handleSendMail(member)}
//                   >
//                     <FaEnvelope /> Mail
//                   </button>
//                   <button
//                     className="btn-outline"
//                     onClick={() => handleSendWhatsApp(member)}
//                   >
//                     <FaWhatsapp style={{ color: "#25D366" }} /> WhatsApp
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-fees-card-message">
//               <p>No unpaid fee members found</p>
//             </div>
//           )}
//         </div>

//         {/* Modals remain unchanged */}
//         {/* Set Fee Modal */}
//         {showFeeModal && (
//           <div className="fees-modal-overlay">
//             <div className="fees-modal-content">
//               <h3>Set Fee Amount</h3>
//               <form onSubmit={handleFeeSubmit}>
//                 <input
//                   type="number"
//                   value={newFee}
//                   onChange={(e) => setNewFee(Number(e.target.value))}
//                   placeholder="Enter fee amount"
//                   required
//                 />
//                 <div className="fees-modal-buttons">
//                   <button type="submit" className="mark-paid-btn">
//                     Save
//                   </button>
//                   <button
//                     type="button"
//                     className="btn-outline"
//                     onClick={() => setShowFeeModal(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Mark Paid Modal */}
//         {showMarkPaidModal && selectedMember && (
//           <div className="fees-modal-overlay">
//             <div className="fees-modal-content mark-paid-modal">
//               <h3>Mark Fee as Paid</h3>
//               <p>
//                 <strong>Name:</strong> {selectedMember.name}
//               </p>
//               <p>
//                 <strong>Email:</strong> {selectedMember.email}
//               </p>
//               <p>
//                 <strong>Phone:</strong> {selectedMember.phone}
//               </p>
//               <p>
//                 <strong>Address:</strong> {selectedMember.address}
//               </p>

//               <p>
//                 <strong>Select Months:</strong>
//               </p>
//               <div className="month-selection">
//                 {allMonths.map((month) => (
//                   <label
//                     key={month}
//                     className={`month-option ${
//                       selectedMonths.includes(month) ? "selected" : ""
//                     }`}
//                   >
//                     <input
//                       type="checkbox"
//                       value={month}
//                       checked={selectedMonths.includes(month)}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         setSelectedMonths((prev) =>
//                           prev.includes(value)
//                             ? prev.filter((m) => m !== value)
//                             : [...prev, value]
//                         );
//                       }}
//                     />
//                     {month}
//                   </label>
//                 ))}
//               </div>

//               <div className="year-dropdown">
//                 <label htmlFor="year">Select Year:</label>
//                 <select
//                   id="year"
//                   value={selectedYear}
//                   onChange={(e) => setSelectedYear(e.target.value)}
//                 >
//                   {[2025, 2026, 2027, 2028, 2029, 2030].map((year) => (
//                     <option key={year} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="fees-modal-buttons">
//                 <button className="mark-paid-btn" onClick={handleMarkAsPaid}>
//                   Mark as Paid
//                 </button>
//                 <button
//                   className="btn-outline"
//                   onClick={() => setShowMarkPaidModal(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FeesPayment;

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./FeesPayment.css";
import axios from "axios";
import {
  FaEnvelope,
  FaCheckCircle,
  FaRupeeSign,
  FaWhatsapp,
} from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getTrust } from "../../services/trustService";

const API_BASE = import.meta.env.VITE_API_URL; // ✅ use env variable

const FeesPayment = () => {
  const [members, setMembers] = useState([]);
  const [feeAmount, setFeeAmount] = useState(0);
  const [newFee, setNewFee] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const trustId = localStorage.getItem("trustId");

  useEffect(() => {
    const fetchFee = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/setfee`, {
          params: { trustId },
        });
        if (res.data.length > 0) {
          setFeeAmount(res.data[0].feeAmount);
        }
      } catch (err) {
        console.error("Error fetching fee:", err);
      }
    };

    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/members`, {
          params: { trustId },
        });
        setMembers(res.data);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };

    fetchFee();
    fetchMembers();
  }, [trustId]);

  const handleSetFee = async () => {
    try {
      await axios.post(`${API_BASE}/api/setfee`, {
        trustId,
        feeAmount: newFee,
      });
      setFeeAmount(newFee);
      setNewFee("");
      alert("Fee set successfully!");
    } catch (err) {
      console.error("Error setting fee:", err);
    }
  };

  const handleMarkAsPaid = async () => {
    try {
      await axios.put(`${API_BASE}/api/members/${selectedMember._id}`, {
        feesPaid: true,
        monthsPaid: selectedMonths,
        yearPaid: selectedYear,
      });

      const updatedMembers = members.map((m) =>
        m._id === selectedMember._id
          ? {
              ...m,
              feesPaid: true,
              monthsPaid: selectedMonths,
              yearPaid: selectedYear,
            }
          : m
      );
      setMembers(updatedMembers);
      setShowModal(false);
      alert("Fee marked as paid!");
    } catch (err) {
      console.error("Error marking as paid:", err);
    }
  };

  const handleSelectMonth = (month) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  const generatePDF = async () => {
    const trust = await getTrust();
    const doc = new jsPDF();
    doc.text(`Fee Payment Report - ${trust.name}`, 20, 10);
    autoTable(doc, {
      head: [
        ["Name", "Email", "Phone", "Fees Paid", "Months Paid", "Year Paid"],
      ],
      body: members.map((m) => [
        m.name,
        m.email,
        m.phone,
        m.feesPaid ? "Yes" : "No",
        m.monthsPaid ? m.monthsPaid.join(", ") : "-",
        m.yearPaid || "-",
      ]),
    });
    doc.save("fees_report.pdf");
  };

  return (
    <div className="fees-container">
      <Sidebar />
      <div className="fees-content">
        <h2>Fees Payment</h2>

        {/* Set Fee Section */}
        <div className="set-fee-section">
          <h3>
            Current Fee: <FaRupeeSign /> {feeAmount}
          </h3>
          <input
            type="number"
            placeholder="Enter new fee amount"
            value={newFee}
            onChange={(e) => setNewFee(e.target.value)}
          />
          <button onClick={handleSetFee}>Set Fee</button>
        </div>

        {/* Members Table */}
        <table className="fees-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Fees Paid</th>
              <th>Months Paid</th>
              <th>Year Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m._id}>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td>{m.phone}</td>
                <td>{m.feesPaid ? "Yes" : "No"}</td>
                <td>{m.monthsPaid ? m.monthsPaid.join(", ") : "-"}</td>
                <td>{m.yearPaid || "-"}</td>
                <td>
                  {!m.feesPaid && (
                    <button
                      onClick={() => {
                        setSelectedMember(m);
                        setShowModal(true);
                      }}
                    >
                      <FaCheckCircle /> Mark as Paid
                    </button>
                  )}
                  <a
                    href={`mailto:${m.email}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaEnvelope />
                  </a>
                  <a
                    href={`https://wa.me/${m.phone}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaWhatsapp />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="pdf-btn" onClick={generatePDF}>
          Download PDF Report
        </button>

        {/* Modal */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Mark Fee as Paid</h3>
              <p>Member: {selectedMember?.name}</p>
              <p>Select Months:</p>
              <div className="months-list">
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <label key={month}>
                    <input
                      type="checkbox"
                      checked={selectedMonths.includes(month)}
                      onChange={() => handleSelectMonth(month)}
                    />
                    {month}
                  </label>
                ))}
              </div>
              <p>
                Year:{" "}
                <input
                  type="number"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                />
              </p>
              <button onClick={handleMarkAsPaid}>Confirm</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeesPayment;
