// import React, { useState, useEffect } from "react";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import "./Member.css";
// import axios from "axios";
// import { FaTrash, FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
// import Swal from "sweetalert2";
// import "sweetalert2/dist/sweetalert2.min.css";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const Member = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [members, setMembers] = useState([]);
//   const [filteredMembers, setFilteredMembers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [expandedMembers, setExpandedMembers] = useState({});
//   const [trustId, setTrustId] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     feesPaid: false,
//   });

//   // Fetch members function (can be reused)
//   const fetchMembers = async (id) => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/members", {
//         params: { trustId: id },
//       });
//       const currentYear = new Date().getFullYear().toString();
//       const currentMonth = new Date()
//         .toLocaleString("en-US", { month: "short" })
//         .toUpperCase();

//       const updatedMembers = res.data.map((member) => {
//         const paidMonths = member.feesPaidData?.[currentYear] || [];
//         return { ...member, feesPaid: paidMonths.includes(currentMonth) };
//       });

//       setMembers(updatedMembers);
//       setFilteredMembers(updatedMembers);
//     } catch (error) {
//       console.error("Error fetching members:", error);
//     }
//   };

//   // Initial load
//   useEffect(() => {
//     const id = localStorage.getItem("trustId");
//     if (!id || id === "null" || id === "undefined") {
//       console.error("No valid trustId found in localStorage");
//       return;
//     }
//     setTrustId(id);
//     fetchMembers(id);
//   }, []);

//   // Search filter
//   useEffect(() => {
//     const term = searchTerm.toLowerCase();
//     setFilteredMembers(
//       members.filter(
//         (m) =>
//           m.name.toLowerCase().includes(term) ||
//           m.email.toLowerCase().includes(term) ||
//           m.phone.toLowerCase().includes(term)
//       )
//     );
//   }, [searchTerm, members]);

//   const handleModalToggle = () => {
//     setShowModal(!showModal);
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       address: "",
//       feesPaid: false,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!trustId) {
//       Swal.fire({
//         title: "Error!",
//         text: "Trust ID not found. Please log in again.",
//         icon: "error",
//         background: "#fff",
//         color: "#000",
//       });
//       return;
//     }
//     try {
//       await axios.post("http://localhost:5000/api/members", {
//         ...formData,
//         trustId,
//       });

//       // Refetch the latest members
//       await fetchMembers(trustId);

//       handleModalToggle();
//       Swal.fire({
//         title: "Success!",
//         text: "Member added successfully.",
//         icon: "success",
//         background: "#fff",
//         color: "#000",
//       });
//     } catch (error) {
//       Swal.fire({
//         title: "Error!",
//         text: "Failed to add member.",
//         icon: "error",
//         background: "#fff",
//         color: "#000",
//       });
//     }
//   };

//   const handleDelete = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This member will be deleted permanently.",
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
//           await axios.delete(`http://localhost:5000/api/members/${id}`);
//           await fetchMembers(trustId);
//           Swal.fire({
//             title: "Deleted!",
//             text: "Member has been removed.",
//             icon: "success",
//             background: "#fff",
//             color: "#000",
//           });
//         } catch (error) {
//           Swal.fire({
//             title: "Error!",
//             text: "Failed to delete member.",
//             icon: "error",
//             background: "#fff",
//             color: "#000",
//           });
//         }
//       }
//     });
//   };

//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("Members Report", 14, 20);
//     const columns = [
//       "Sr No",
//       "Name",
//       "Email",
//       "Phone",
//       "Address",
//       "Status",
//       "Fees Paid",
//     ];
//     const rows = filteredMembers.map((m, i) => [
//       i + 1,
//       m.name,
//       m.email,
//       m.phone,
//       m.address,
//       m.feesPaid ? "PAID" : "NOT PAID",
//       m.feesPaidData
//         ? Object.entries(m.feesPaidData)
//             .map(([y, mo]) => `${y}: ${mo.join(", ")}`)
//             .join(" | ")
//         : "N/A",
//     ]);
//     autoTable(doc, { head: [columns], body: rows, startY: 30 });
//     doc.save("members_report.pdf");
//   };

//   const toggleExpand = (id) => {
//     setExpandedMembers((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   return (
//     <div className="member-container">
//       <Sidebar />
//       <div className="member-main">
//         <div className="member-header">
//           <h2>Members Management</h2>
//           <div className="member-actions">
//             <button className="btn-primary" onClick={handleModalToggle}>
//               + Add Member
//             </button>
//             <button className="btn-outline" onClick={handleExportPDF}>
//               ⬇ Export PDF
//             </button>
//             <div className="member-count">
//               Total: {filteredMembers.length} members
//             </div>
//           </div>
//         </div>

//         <div className="member-search">
//           <FaSearch className="search-icon" />
//           <input
//             type="text"
//             placeholder="Search members by name, email or phone..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Desktop Table View */}
//         <div className="table-view">
//           <table className="member-table">
//             <thead>
//               <tr>
//                 <th></th>
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
//               {filteredMembers.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="no-members-message">
//                     No members found.
//                   </td>
//                 </tr>
//               ) : (
//                 filteredMembers.map((m, i) => (
//                   <React.Fragment key={m._id}>
//                     <tr>
//                       <td onClick={() => toggleExpand(m._id)}>
//                         {expandedMembers[m._id] ? (
//                           <FaChevronUp />
//                         ) : (
//                           <FaChevronDown />
//                         )}
//                       </td>
//                       <td>{i + 1}</td>
//                       <td>{m.name}</td>
//                       <td>{m.email}</td>
//                       <td>{m.phone}</td>
//                       <td>{m.address}</td>
//                       <td>
//                         <span
//                           className={m.feesPaid ? "badge-paid" : "badge-unpaid"}
//                         >
//                           {m.feesPaid ? "PAID" : "NOT PAID"}
//                         </span>
//                       </td>
//                       <td>
//                         <button
//                           className="delete-btn"
//                           onClick={() => handleDelete(m._id)}
//                         >
//                           <FaTrash />
//                         </button>
//                       </td>
//                     </tr>
//                     {expandedMembers[m._id] && (
//                       <tr>
//                         <td colSpan="8">
//                           <div className="fees-dropdown">
//                             {m.feesPaidData &&
//                             Object.keys(m.feesPaidData).length > 0 ? (
//                               Object.entries(m.feesPaidData).map(([y, mo]) => (
//                                 <div key={y}>
//                                   <strong>{y}:</strong>{" "}
//                                   {mo.length ? mo.join(", ") : "No months"}
//                                 </div>
//                               ))
//                             ) : (
//                               <div>No fee payment data available.</div>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </React.Fragment>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile Card View */}
//         {/* Mobile Card View */}
//         <div className="card-view">
//           {filteredMembers.length === 0 ? (
//             <div className="no-members-message">No members found.</div>
//           ) : (
//             filteredMembers.map((m, i) => (
//               <div key={m._id} className="member-card">
//                 <div className="card-header">
//                   <h4>
//                     {i + 1}. {m.name}
//                   </h4>
//                   <button
//                     className="dropdown-toggle-btn"
//                     onClick={() => toggleExpand(m._id)}
//                   >
//                     {expandedMembers[m._id] ? (
//                       <FaChevronUp />
//                     ) : (
//                       <FaChevronDown />
//                     )}
//                   </button>
//                 </div>
//                 <p>
//                   <strong>Email:</strong> {m.email}
//                 </p>
//                 <p>
//                   <strong>Phone:</strong> {m.phone}
//                 </p>
//                 <p>
//                   <strong>Address:</strong> {m.address}
//                 </p>
//                 <p>
//                   <strong>Status:</strong>{" "}
//                   <span className={m.feesPaid ? "badge-paid" : "badge-unpaid"}>
//                     {m.feesPaid ? "PAID" : "NOT PAID"}
//                   </span>
//                 </p>

//                 {/* Dropdown for fees data */}
//                 {expandedMembers[m._id] && (
//                   <div className="fees-dropdown">
//                     {m.feesPaidData &&
//                     Object.keys(m.feesPaidData).length > 0 ? (
//                       Object.entries(m.feesPaidData).map(([y, mo]) => (
//                         <div key={y}>
//                           <strong>{y}:</strong>{" "}
//                           {mo.length ? mo.join(", ") : "No months"}
//                         </div>
//                       ))
//                     ) : (
//                       <div>No fee payment data available.</div>
//                     )}
//                   </div>
//                 )}

//                 <div className="card-actions">
//                   <button
//                     className="delete-btn"
//                     onClick={() => handleDelete(m._id)}
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Add Member Modal */}
//         {showModal && (
//           <div className="modal-backdrop">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h3>Add New Member</h3>
//               </div>
//               <form className="modal-form" onSubmit={handleSubmit}>
//                 <label>Full Name *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 <label>Email *</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 <label>Phone Number *</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 <label>Address *</label>
//                 <textarea
//                   name="address"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   required
//                 ></textarea>
//                 <div className="modal-actions">
//                   <button
//                     type="button"
//                     className="btn-outline"
//                     onClick={handleModalToggle}
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn-primary">
//                     Add Member
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Member;

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Member.css";
import axios from "axios";
import { FaTrash, FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Member = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [expanded, setExpanded] = useState(false);

  // ✅ API base URL from .env
  const API_URL = import.meta.env.VITE_API_URL;

  // fetch members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const trustId = localStorage.getItem("trustId"); // trustId saved after login
        const res = await axios.get(`${API_URL}/api/members`, {
          params: { trustId },
        });
        setMembers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMembers();
  }, [API_URL]);

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // add member
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const trustId = localStorage.getItem("trustId");
      const res = await axios.post(`${API_URL}/api/members`, {
        ...formData,
        trustId,
      });
      setMembers([...members, res.data]);
      setFormData({ name: "", email: "", phone: "" });
      setShowForm(false);

      Swal.fire("Success", "Member added successfully!", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to add member", "error");
      console.error(err);
    }
  };

  // delete member
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/members/${id}`);
      setMembers(members.filter((m) => m._id !== id));
      Swal.fire("Deleted!", "Member has been removed.", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to delete member", "error");
      console.error(err);
    }
  };

  // export to PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Members List", 14, 10);
    autoTable(doc, {
      head: [["Name", "Email", "Phone"]],
      body: members.map((m) => [m.name, m.email, m.phone]),
    });
    doc.save("members.pdf");
  };

  return (
    <div className="member-page">
      <Sidebar />

      <div className="member-container">
        <h1 className="member-title">Members</h1>

        {/* Search bar */}
        <div className="member-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="member-actions">
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close Form" : "Add Member"}
          </button>
          <button onClick={exportPDF}>Export PDF</button>
        </div>

        {/* Add member form */}
        {showForm && (
          <form className="member-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <button type="submit">Add</button>
          </form>
        )}

        {/* Table */}
        <div className="member-table">
          <table>
            <thead>
              <tr>
                <th>
                  Name{" "}
                  <button onClick={() => setExpanded(!expanded)}>
                    {expanded ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {members
                .filter(
                  (m) =>
                    m.name.toLowerCase().includes(search.toLowerCase()) ||
                    m.email.toLowerCase().includes(search.toLowerCase())
                )
                .map((m) => (
                  <tr key={m._id}>
                    <td>{m.name}</td>
                    <td>{m.email}</td>
                    <td>{m.phone}</td>
                    <td>
                      <FaTrash
                        className="delete-icon"
                        onClick={() => handleDelete(m._id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Member;
