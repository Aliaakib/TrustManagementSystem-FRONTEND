// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import "./Document.css";
// import {
//   getDocuments,
//   uploadDocument,
//   deleteDocument,
// } from "../../services/documentService";
// import { FaTrashAlt } from "react-icons/fa";
// import Swal from "sweetalert2";

// const Document = () => {
//   const [documents, setDocuments] = useState([]);
//   const [newDoc, setNewDoc] = useState({
//     title: "",
//     uploadedBy: "",
//     file: null,
//   });
//   const [showModal, setShowModal] = useState(false);

//   const trustId = localStorage.getItem("trustId");

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       try {
//         const res = await getDocuments(trustId);
//         setDocuments(res.data);
//       } catch (err) {
//         console.error("Failed to fetch documents:", err);
//         Swal.fire("Error", "Failed to fetch documents", "error");
//       }
//     };

//     if (trustId) {
//       fetchDocuments();
//     }
//   }, [trustId]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "file") {
//       setNewDoc((prev) => ({ ...prev, file: files[0] }));
//     } else {
//       setNewDoc((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleAddDocument = async (e) => {
//     e.preventDefault();
//     if (!newDoc.file || !newDoc.title) return;

//     const formData = new FormData();
//     formData.append("title", newDoc.title);
//     formData.append("uploadedBy", newDoc.uploadedBy || "Admin");
//     formData.append("file", newDoc.file);
//     formData.append("trustId", trustId);

//     try {
//       const res = await uploadDocument(formData);
//       setDocuments([...documents, res.data]);
//       setNewDoc({ title: "", uploadedBy: "", file: null });
//       setShowModal(false);
//       Swal.fire("Success", "Document uploaded successfully", "success");
//     } catch (err) {
//       console.error("Document upload failed:", err);
//       Swal.fire("Error", "Failed to upload document", "error");
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "You are about to delete this document.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await deleteDocument(id);
//         setDocuments((prev) => prev.filter((doc) => doc._id !== id));
//         Swal.fire("Deleted!", "Document has been deleted.", "success");
//       } catch (err) {
//         console.error("Failed to delete document:", err);
//         Swal.fire("Error", "Failed to delete document", "error");
//       }
//     }
//   };

//   return (
//     <div className="document-container">
//       <Sidebar />
//       <div className="document-main">
//         {/* Header */}
//         <div className="document-header">
//           <h2>Documents</h2>
//           <button className="btn-primary" onClick={() => setShowModal(true)}>
//             + Add Document
//           </button>
//         </div>

//         {/* TABLE VIEW */}
//         <div className="document-table-wrapper">
//           <table className="document-table">
//             <thead>
//               <tr>
//                 <th>Sr No</th>
//                 <th>Title</th>
//                 <th>Upload Date</th>
//                 <th>File</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {documents.length > 0 ? (
//                 documents.map((doc, index) => (
//                   <tr key={doc._id}>
//                     <td>{index + 1}</td>
//                     <td>{doc.title}</td>
//                     <td>
//                       {doc.uploadDate
//                         ? new Date(doc.uploadDate).toLocaleDateString()
//                         : "-"}
//                     </td>
//                     <td className="doc-actions">
//                       <a
//                         href={`http://localhost:5000${doc.fileUrl}`}
//                         download={doc.fileName}
//                         className="view-btn"
//                       >
//                         ⬇ Download
//                       </a>
//                       <a
//                         href={`http://localhost:5000${doc.fileUrl}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="view-btn"
//                       >
//                         👁 View
//                       </a>
//                     </td>
//                     <td>
//                       <button
//                         className="btn-icon-delete"
//                         onClick={() => handleDelete(doc._id)}
//                         title="Delete Document"
//                       >
//                         <FaTrashAlt />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="5"
//                     style={{ textAlign: "center", padding: "20px" }}
//                   >
//                     There is no document uploaded yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* CARD VIEW FOR SMALL DEVICES */}
//         <div className="document-cards">
//           {documents.length > 0 ? (
//             documents.map((doc, index) => (
//               <div className="document-card" key={doc._id}>
//                 <h4>{doc.title}</h4>
//                 <p>
//                   <strong>Sr No:</strong> {index + 1}
//                 </p>
//                 <p>
//                   <strong>Upload Date:</strong>{" "}
//                   {doc.uploadDate
//                     ? new Date(doc.uploadDate).toLocaleDateString()
//                     : "-"}
//                 </p>
//                 <div className="card-actions">
//                   <a
//                     href={`http://localhost:5000${doc.fileUrl}`}
//                     download={doc.fileName}
//                     className="view-btn"
//                   >
//                     ⬇ Download
//                   </a>
//                   <a
//                     href={`http://localhost:5000${doc.fileUrl}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="view-btn"
//                   >
//                     👁 View
//                   </a>
//                   <button
//                     className="btn-icon-delete"
//                     onClick={() => handleDelete(doc._id)}
//                     title="Delete Document"
//                   >
//                     <FaTrashAlt />
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p style={{ padding: "20px", textAlign: "center" }}>
//               There is no document uploaded yet.
//             </p>
//           )}
//         </div>

//         {/* MODAL */}
//         {showModal && (
//           <div className="modal-backdrop">
//             <div className="modal-content">
//               <h3>Add New Document</h3>
//               <form onSubmit={handleAddDocument}>
//                 <label>Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={newDoc.title}
//                   onChange={handleChange}
//                   required
//                 />
//                 <label>Select File</label>
//                 <input
//                   type="file"
//                   name="file"
//                   onChange={handleChange}
//                   required
//                 />
//                 <div className="modal-actions">
//                   <button
//                     type="button"
//                     className="btn-outline"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn-primary">
//                     Upload
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

// export default Document;

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Document.css";
import {
  getDocuments,
  uploadDocument,
  deleteDocument,
} from "../../services/documentService";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Document = () => {
  const [documents, setDocuments] = useState([]);
  const [newDoc, setNewDoc] = useState({
    title: "",
    uploadedBy: "",
    file: null,
  });
  const [showModal, setShowModal] = useState(false);

  const trustId = localStorage.getItem("trustId");
  const API_URL = import.meta.env.VITE_API_URL; // ✅ use env variable

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await getDocuments(trustId);
        setDocuments(res.data);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
        Swal.fire("Error", "Failed to fetch documents", "error");
      }
    };

    if (trustId) {
      fetchDocuments();
    }
  }, [trustId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setNewDoc((prev) => ({ ...prev, file: files[0] }));
    } else {
      setNewDoc((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddDocument = async (e) => {
    e.preventDefault();
    if (!newDoc.file || !newDoc.title) return;

    const formData = new FormData();
    formData.append("title", newDoc.title);
    formData.append("uploadedBy", newDoc.uploadedBy || "Admin");
    formData.append("file", newDoc.file);
    formData.append("trustId", trustId);

    try {
      const res = await uploadDocument(formData);
      setDocuments([...documents, res.data]);
      setNewDoc({ title: "", uploadedBy: "", file: null });
      setShowModal(false);
      Swal.fire("Success", "Document uploaded successfully", "success");
    } catch (err) {
      console.error("Document upload failed:", err);
      Swal.fire("Error", "Failed to upload document", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this document.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteDocument(id);
        setDocuments((prev) => prev.filter((doc) => doc._id !== id));
        Swal.fire("Deleted!", "Document has been deleted.", "success");
      } catch (err) {
        console.error("Failed to delete document:", err);
        Swal.fire("Error", "Failed to delete document", "error");
      }
    }
  };

  return (
    <div className="document-container">
      <Sidebar />
      <div className="document-main">
        {/* Header */}
        <div className="document-header">
          <h2>Documents</h2>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            + Add Document
          </button>
        </div>

        {/* TABLE VIEW */}
        <div className="document-table-wrapper">
          <table className="document-table">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Title</th>
                <th>Upload Date</th>
                <th>File</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <tr key={doc._id}>
                    <td>{index + 1}</td>
                    <td>{doc.title}</td>
                    <td>
                      {doc.uploadDate
                        ? new Date(doc.uploadDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="doc-actions">
                      <a
                        href={`${API_URL}${doc.fileUrl}`} // ✅ updated
                        download={doc.fileName}
                        className="view-btn"
                      >
                        ⬇ Download
                      </a>
                      <a
                        href={`${API_URL}${doc.fileUrl}`} // ✅ updated
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-btn"
                      >
                        👁 View
                      </a>
                    </td>
                    <td>
                      <button
                        className="btn-icon-delete"
                        onClick={() => handleDelete(doc._id)}
                        title="Delete Document"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    There is no document uploaded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* CARD VIEW FOR SMALL DEVICES */}
        <div className="document-cards">
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <div className="document-card" key={doc._id}>
                <h4>{doc.title}</h4>
                <p>
                  <strong>Sr No:</strong> {index + 1}
                </p>
                <p>
                  <strong>Upload Date:</strong>{" "}
                  {doc.uploadDate
                    ? new Date(doc.uploadDate).toLocaleDateString()
                    : "-"}
                </p>
                <div className="card-actions">
                  <a
                    href={`${API_URL}${doc.fileUrl}`} // ✅ updated
                    download={doc.fileName}
                    className="view-btn"
                  >
                    ⬇ Download
                  </a>
                  <a
                    href={`${API_URL}${doc.fileUrl}`} // ✅ updated
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-btn"
                  >
                    👁 View
                  </a>
                  <button
                    className="btn-icon-delete"
                    onClick={() => handleDelete(doc._id)}
                    title="Delete Document"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ padding: "20px", textAlign: "center" }}>
              There is no document uploaded yet.
            </p>
          )}
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <h3>Add New Document</h3>
              <form onSubmit={handleAddDocument}>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={newDoc.title}
                  onChange={handleChange}
                  required
                />
                <label>Select File</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  required
                />
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Document;
