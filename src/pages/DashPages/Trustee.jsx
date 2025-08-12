// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import "./Trustee.css";
// import axios from "axios";
// import { FaTrash, FaSearch } from "react-icons/fa";
// import Swal from "sweetalert2";
// import "sweetalert2/dist/sweetalert2.min.css";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const Trustee = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [trustees, setTrustees] = useState([]);
//   const [filteredTrustees, setFilteredTrustees] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const trustId = localStorage.getItem("trustId");

//   useEffect(() => {
//     fetchTrustees();
//   }, []);

//   useEffect(() => {
//     const term = searchTerm.toLowerCase();
//     const filtered = trustees.filter(
//       (trustee) =>
//         trustee.name.toLowerCase().includes(term) ||
//         trustee.email.toLowerCase().includes(term) ||
//         trustee.phone.toLowerCase().includes(term)
//     );
//     setFilteredTrustees(filtered);
//   }, [searchTerm, trustees]);

//   const fetchTrustees = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/trustees", {
//         params: { trustId },
//       });
//       setTrustees(res.data);
//       setFilteredTrustees(res.data);
//     } catch (error) {
//       console.error("Error fetching trustees:", error);
//     }
//   };

//   const toggleModal = () => {
//     setShowModal(!showModal);
//     setFormData({ name: "", email: "", phone: "", address: "" });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/trustees", {
//         ...formData,
//         trustId,
//       });
//       setTrustees((prev) => [...prev, res.data]);
//       toggleModal();
//       fetchTrustees();
//       Swal.fire({
//         title: "Success!",
//         text: "Trustee added successfully.",
//         icon: "success",
//         background: "#fff",
//         color: "#000",
//         confirmButtonColor: "#3085d6",
//       });
//     } catch (error) {
//       console.error("Error adding trustee:", error);
//       Swal.fire({
//         title: "Error!",
//         text: "Failed to add trustee.",
//         icon: "error",
//         background: "#fff",
//         color: "#000",
//       });
//     }
//   };

//   const handleDelete = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This trustee record will be deleted permanently.",
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
//           await axios.delete(`http://localhost:5000/api/trustees/${id}`);
//           setTrustees((prev) => prev.filter((t) => t._id !== id));
//           fetchTrustees();
//           Swal.fire({
//             title: "Deleted!",
//             text: "Trustee has been removed.",
//             icon: "success",
//             background: "#fff",
//             color: "#000",
//             confirmButtonColor: "#3085d6",
//           });
//         } catch (error) {
//           console.error("Error deleting trustee:", error);
//           Swal.fire({
//             title: "Error!",
//             text: "Failed to delete trustee.",
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
//     doc.text("Trustees Report", 14, 20);

//     const columns = ["Sr No", "Name", "Email", "Phone", "Address"];
//     const rows = filteredTrustees.map((t, index) => [
//       index + 1,
//       t.name,
//       t.email,
//       t.phone,
//       t.address,
//     ]);

//     autoTable(doc, {
//       head: [columns],
//       body: rows,
//       startY: 30,
//       styles: { fontSize: 10 },
//     });

//     doc.save("trustees_report.pdf");
//   };

//   return (
//     <div className="trustee-container">
//       <Sidebar />

//       <div className="trustee-main">
//         <div className="trustee-header">
//           <h2>Trustees Management</h2>
//           <div className="trustee-actions">
//             <button className="btn-primary" onClick={toggleModal}>
//               + Add Trustee
//             </button>
//             <button className="btn-outline" onClick={handleExportPDF}>
//               ⬇ Export PDF
//             </button>
//           </div>
//         </div>

//         <div className="trustee-search">
//           <FaSearch className="search-icon-inside" />
//           <input
//             type="text"
//             placeholder="Search trustees by name, email or phone..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <table className="trustee-table">
//           <thead>
//             <tr>
//               <th>Sr No</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Address</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTrustees.length > 0 ? (
//               filteredTrustees.map((trustee, index) => (
//                 <tr key={trustee._id}>
//                   <td>{index + 1}</td>
//                   <td>{trustee.name}</td>
//                   <td>{trustee.email}</td>
//                   <td>{trustee.phone}</td>
//                   <td>{trustee.address}</td>
//                   <td>
//                     <button
//                       className="delete-btn"
//                       onClick={() => handleDelete(trustee._id)}
//                       title="Delete Trustee"
//                     >
//                       <FaTrash />
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
//                   No trustees available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {showModal && (
//         <div className="modal-backdrop">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3>Add New Trustee</h3>
//               <button onClick={toggleModal}>✕</button>
//             </div>
//             <form className="modal-form" onSubmit={handleSubmit}>
//               <label>Full Name *</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />

//               <label>Email *</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />

//               <label>Phone Number *</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />

//               <label>Address *</label>
//               <textarea
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//               ></textarea>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="btn-outline"
//                   onClick={toggleModal}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn-primary">
//                   Add Trustee
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Trustee;

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Trustee.css";
import axios from "axios";
import { FaTrash, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Trustee = () => {
  const [showModal, setShowModal] = useState(false);
  const [trustees, setTrustees] = useState([]);
  const [filteredTrustees, setFilteredTrustees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const trustId = localStorage.getItem("trustId");

  useEffect(() => {
    fetchTrustees();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = trustees.filter(
      (t) =>
        t.name.toLowerCase().includes(term) ||
        t.email.toLowerCase().includes(term) ||
        t.phone.toLowerCase().includes(term)
    );
    setFilteredTrustees(filtered);
  }, [searchTerm, trustees]);

  const fetchTrustees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/trustees", {
        params: { trustId },
      });
      setTrustees(res.data);
      setFilteredTrustees(res.data);
    } catch (error) {
      console.error("Error fetching trustees:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setFormData({ name: "", email: "", phone: "", address: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/trustees", {
        ...formData,
        trustId,
      });
      toggleModal();
      fetchTrustees();
      Swal.fire("Success", "Trustee added successfully.", "success");
    } catch (error) {
      console.error("Error adding trustee:", error);
      Swal.fire("Error", "Failed to add trustee.", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This trustee will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/trustees/${id}`);
          fetchTrustees();
          Swal.fire("Deleted!", "Trustee has been removed.", "success");
        } catch (error) {
          console.error("Error deleting trustee:", error);
          Swal.fire("Error", "Failed to delete trustee.", "error");
        }
      }
    });
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Trustees Report", 14, 20);

    const columns = ["Sr No", "Name", "Email", "Phone", "Address"];
    const rows = filteredTrustees.map((t, index) => [
      index + 1,
      t.name,
      t.email,
      t.phone,
      t.address,
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 30,
      styles: { fontSize: 10 },
    });

    doc.save("trustees_report.pdf");
  };

  return (
    <div className="trustee-container">
      <Sidebar />

      <div className="trustee-main">
        <div className="trustee-header">
          <h2>Trustees Management</h2>
          <div className="trustee-actions">
            <button className="btn-primary" onClick={toggleModal}>
              + Add Trustee
            </button>
            <button className="btn-outline" onClick={handleExportPDF}>
              ⬇ Export PDF
            </button>
            <div className="trustee-count">
              Total: {filteredTrustees.length} trustees
            </div>
          </div>
        </div>

        <div className="trustee-search">
          <FaSearch className="search-icon-inside" />
          <input
            type="text"
            placeholder="Search trustees by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="trustee-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrustees.length > 0 ? (
              filteredTrustees.map((trustee, index) => (
                <tr key={trustee._id}>
                  <td>{index + 1}</td>
                  <td>{trustee.name}</td>
                  <td>{trustee.email}</td>
                  <td>{trustee.phone}</td>
                  <td>{trustee.address}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(trustee._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No trustees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Mobile Cards for Small Screens */}
        <div className="trustee-mobile-cards">
          {filteredTrustees.length > 0 ? (
            filteredTrustees.map((trustee, index) => (
              <div className="trustee-card" key={trustee._id}>
                <div className="trustee-card-row">
                  <strong>Sr No:</strong> {index + 1}
                </div>
                <div className="trustee-card-row">
                  <strong>Name:</strong> {trustee.name}
                </div>
                <div className="trustee-card-row">
                  <strong>Email:</strong> {trustee.email}
                </div>
                <div className="trustee-card-row">
                  <strong>Phone:</strong> {trustee.phone}
                </div>
                <div className="trustee-card-row">
                  <strong>Address:</strong> {trustee.address}
                </div>
                <button
                  className="trustee-delete-btn"
                  onClick={() => handleDelete(trustee._id)}
                  title="Delete Trustee"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No trustees found.
            </p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Trustee</h3>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <label>Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Trustee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trustee;
