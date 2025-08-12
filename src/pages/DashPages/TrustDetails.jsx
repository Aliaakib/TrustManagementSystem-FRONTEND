// import React, { useState } from "react";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import "./TrustDetails.css";
// const TrustDetails = () => {
//   const [trust, setTrust] = useState({
//     name: "SQ Trust",
//     dateCreated: "6/26/2025",
//     description:
//       "SQ Trust is dedicated to community welfare and social development initiatives.",
//     presidentName: "Ali",
//     presidentPhone: "897561423",
//     trusteeName: "Husain",
//     trusteePhone: "806321475",
//     logoUrl: "https://i.ibb.co/TK9x7Fy/natural-oil-logo.png",
//     // activeMembers: "24",
//     yearFounded: "2020",
//     // trustRating: "4.8",
//   });

//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({ ...trust });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData((prev) => ({ ...prev, logoUrl: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSave = () => {
//     setTrust(formData);
//     setShowModal(false);
//   };

//   return (
//     <div className="trust-details-container">
//       <Sidebar />
//       <div className="trust-details-main">
//         {/* Header */}
//         <div className="trust-details-header">
//           <div>
//             <h1>Trust Details</h1>
//             {/* <p className="subtitle">Manage and view trust information</p> */}
//           </div>
//           <div className="header-actions">
//             {/* <span className="status-badge">Active</span> */}
//             <button
//               className="edit-details-btn"
//               onClick={() => setShowModal(true)}
//             >
//               Edit Details
//             </button>
//           </div>
//         </div>

//         {/* Trust Info Card */}
//         <div className="trust-info-card">
//           <div className="trust-logo-section">
//             <div className="trust-logo-container">
//               <img src={trust.logoUrl} alt="Trust Logo" />
//               <div className="upload-overlay">
//                 {/* <span>Trust Logo</span> */}
//                 {/* <small>Upload Image</small> */}
//               </div>
//             </div>
//           </div>

//           <div className="trust-main-info">
//             <div className="trust-header-info">
//               <h2>{trust.name}</h2>
//               {/* <span className="verified-badge">Verified</span> */}
//             </div>
//             <p className="trust-description">{trust.description}</p>

//             <div className="trust-stats">
//               {/* <div className="stat-item">
//                 <div className="stat-number">{trust.activeMembers}</div>
//                 <div className="stat-label">Active Members</div>
//               </div> */}
//               <div className="stat-item">
//                 <div className="stat-number">{trust.yearFounded}</div>
//                 <div className="stat-label">Year Founded</div>
//               </div>
//               {/* <div className="stat-item">
//                 <div className="stat-number">{trust.trustRating}</div>
//                 <div className="stat-label">Trust Rating</div>
//               </div> */}
//             </div>
//           </div>
//         </div>

//         {/* Detailed Information */}
//         <div className="detailed-info-section">
//           <h3>Detailed Information</h3>

//           <div className="info-grid">
//             <div className="info-item">
//               <div className="info-content">
//                 <div className="info-label">Trust Name</div>
//                 <div className="info-value">{trust.name}</div>
//               </div>
//             </div>

//             <div className="info-item">
//               <div className="info-content">
//                 <div className="info-label">Date Created</div>
//                 <div className="info-value">{trust.dateCreated}</div>
//               </div>
//             </div>

//             <div className="info-item">
//               <div className="info-content">
//                 <div className="info-label">President Name</div>
//                 <div className="info-value">{trust.presidentName}</div>
//               </div>
//             </div>

//             <div className="info-item">
//               <div className="info-content">
//                 <div className="info-label">President Phone</div>
//                 <div className="info-value">{trust.presidentPhone}</div>
//               </div>
//             </div>

//             <div className="info-item">
//               <div className="info-content">
//                 <div className="info-label">Trustee Name</div>
//                 <div className="info-value">{trust.trusteeName}</div>
//               </div>
//             </div>

//             <div className="info-item">
//               <div className="info-content">
//                 <div className="info-label">Trustee Phone</div>
//                 <div className="info-value">{trust.trusteePhone}</div>
//               </div>
//             </div>

//             <div className="info-item description-item">
//               <div className="info-content">
//                 <div className="info-label">Trust Description</div>
//                 <div className="info-value">{trust.description}</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Edit Modal */}
//         {showModal && (
//           <div className="modal-backdrop">
//             <div className="modal-content">
//               <h3>Edit Trust Details</h3>

//               <div className="modal-field">
//                 <label>Trust Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="modal-field">
//                 <label>Date Created</label>
//                 <input
//                   type="text"
//                   name="dateCreated"
//                   value={formData.dateCreated}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="modal-field">
//                 <label>Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows="3"
//                 />
//               </div>

//               <div className="modal-field">
//                 <label>President Name</label>
//                 <input
//                   type="text"
//                   name="presidentName"
//                   value={formData.presidentName}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="modal-field">
//                 <label>President Phone</label>
//                 <input
//                   type="text"
//                   name="presidentPhone"
//                   value={formData.presidentPhone}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="modal-field">
//                 <label>Trustee Name</label>
//                 <input
//                   type="text"
//                   name="trusteeName"
//                   value={formData.trusteeName}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="modal-field">
//                 <label>Trustee Phone</label>
//                 <input
//                   type="text"
//                   name="trusteePhone"
//                   value={formData.trusteePhone}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="modal-field">
//                 <label>Logo</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                 />
//                 {formData.logoUrl && (
//                   <img
//                     src={formData.logoUrl}
//                     alt="Preview"
//                     className="logo-preview"
//                   />
//                 )}
//               </div>

//               <div className="modal-actions">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="btn-cancel"
//                 >
//                   Cancel
//                 </button>
//                 <button onClick={handleSave} className="btn-save">
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TrustDetails;

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./TrustDetails.css";
import { getTrustByUser, updateTrust } from "../../services/trustService";

const TrustDetails = () => {
  const userId = localStorage.getItem("userId");
  const [trust, setTrust] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("❌ No userId found in localStorage");
      return;
    }

    const fetchTrust = async () => {
      try {
        console.log("Fetching trust for userId:", userId);
        const response = await getTrustByUser(userId);
        console.log("Trust fetched:", response);
        setTrust(response);
        // ...
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchTrust();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, logoFile: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, logoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("dateCreated", formData.dateCreated);
      form.append("description", formData.description);
      form.append("presidentName", formData.presidentName);
      form.append("presidentPhone", formData.presidentPhone);
      form.append("trusteeName", formData.trusteeName);
      form.append("trusteePhone", formData.trusteePhone);
      if (formData.logoFile) {
        form.append("logo", formData.logoFile);
      }

      const updated = await updateTrust(formData._id, form);
      setTrust(updated);
      setShowModal(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (!trust) return <div className="trust-details-loading">Loading...</div>;

  return (
    <div className="trust-details-container">
      <Sidebar />
      <div className="trust-details-main">
        {/* Header */}
        <div className="trust-details-header">
          <h1>Trust Details</h1>
        </div>

        {/* <button
          className="edit-details-btn top-right-btn"
          onClick={() => setShowModal(true)}
        >
          Edit Details
        </button> */}

        {/* Trust Info Card */}
        <div className="trust-info-card">
          <div className="trust-logo-section">
            <div className="trust-logo-container">
              <img src={trust.logo} alt="Trust Logo" />
            </div>
          </div>
          <div className="trust-main-info">
            <h2>{trust.name}</h2>
            <p className="trust-description">{trust.description}</p>
            <div className="trust-stats">
              <div className="stat-item">
                {/* <div className="stat-number">
                  {new Date(trust.dateCreated).getFullYear()}
                </div> */}
                {/* <div className="stat-label">Year Founded</div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="detailed-info-section">
          <h3>Detailed Information</h3>
          <div className="info-grid">
            {[
              ["Trust Name", trust.name],
              // ["Date Created", trust.dateCreated?.substring(0, 10)],
              ["President Name", trust.president?.name],
              ["President Phone", trust.president?.phone],
              ["Trustee Name", trust.trustee?.name],
              ["Trustee Phone", trust.trustee?.phone],
              ["Trust Description", trust.description],
            ].map(([label, value], i) => (
              <div key={i} className="info-item">
                <div className="info-content">
                  <div className="info-label">{label}</div>
                  <div className="info-value">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Modal */}
        {/* {showModal && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <h3>Edit Trust Details</h3>
              {[
                ["Trust Name", "name"],
                // ["Date Created", "dateCreated"],
                ["Description", "description", "textarea"],
                ["President Name", "presidentName"],
                ["President Phone", "presidentPhone"],
                ["Trustee Name", "trusteeName"],
                ["Trustee Phone", "trusteePhone"],
              ].map(([label, name, type], i) => (
                <div className="modal-field" key={i}>
                  <label>{label}</label>
                  {type === "textarea" ? (
                    <textarea
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      rows="3"
                    />
                  ) : (
                    <input
                      type="text"
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}

              <div className="modal-field">
                <label>Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {formData.logoUrl && (
                  <img
                    src={formData.logoUrl}
                    alt="Preview"
                    className="logo-preview"
                  />
                )}
              </div>

              <div className="modal-actions">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button onClick={handleSave} className="btn-save">
                  Save
                </button>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TrustDetails;
