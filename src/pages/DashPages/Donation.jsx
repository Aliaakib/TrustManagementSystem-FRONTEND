
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Donation.css";
import { FaMoneyCheckAlt, FaTrash, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  getDonations,
  addDonation,
  deleteDonation,
} from "../../services/donationService";
import { getTrustByUser } from "../../services/trustService";

const Donation = () => {
  const [donations, setDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    mode: "cash",
    date: "",
    amount: "",
  });
  const [trustInfo, setTrustInfo] = useState({
    name: "",
    logo: "",
    presidentName: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const trustId = localStorage.getItem("trustId");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (trustId) {
          const donationsData = await getDonations(trustId);
          setDonations(donationsData);
        }
        if (userId) {
          const trustData = await getTrustByUser(userId);
          setTrustInfo({
            name: trustData.name || "Trust Name",
            logo: trustData.logo || "",
            presidentName: trustData.presidentName || "President",
          });
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to load trust information",
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [trustId, userId]);

  const handleModalToggle = () => {
    setShowModal(!showModal);
    setFormData({ name: "", phone: "", mode: "cash", date: "", amount: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!trustId) return alert("Trust ID missing. Please login again.");
    const newDonation = {
      ...formData,
      amount: parseFloat(formData.amount),
      trustId,
    };
    try {
      const saved = await addDonation(newDonation);
      setDonations((prev) => [...prev, saved]);
      handleModalToggle();
      Swal.fire({
        title: "Success!",
        text: "Donation added successfully",
        icon: "success",
      });
    } catch (error) {
      console.error("Add donation failed:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add donation",
        icon: "error",
      });
    }
  };

  const handleDeleteDonation = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This donation record will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDonation(id);
          setDonations((prev) => prev.filter((d) => d._id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Donation has been removed.",
            icon: "success",
          });
        } catch (error) {
          console.error("Delete donation failed:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete donation.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleDownloadReceipt = (donation) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let yPosition = 20;

    if (trustInfo.logo) {
      const img = new Image();
      img.src = trustInfo.logo;
      doc.addImage(img, "PNG", margin, 10, 30, 30);
      yPosition = 45;
    }

    doc
      .setFontSize(14)
      .setFont("helvetica", "bold")
      .text(trustInfo.name, pageWidth / 2, yPosition, { align: "center" });
    yPosition += 10;
    doc
      .setFontSize(18)
      .text("DONATION RECEIPT", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 15;
    doc.setFontSize(12).setFont("helvetica", "normal");
    doc.text(`NAME: ${donation.name}`, margin, yPosition);
    doc.text(
      `Date: ${new Date(donation.date).toLocaleDateString()}`,
      pageWidth - margin,
      yPosition,
      { align: "right" }
    );
    yPosition += 12;
    doc.text(`AMOUNT: Rs. ${donation.amount}`, margin, yPosition);
    yPosition += 8;
    doc.text(`MODE OF PAYMENT: ${donation.mode}`, margin, yPosition);
    yPosition += 8;
    doc.text(`PURPOSE: Donation`, margin, yPosition);
    yPosition += 8;
    doc.text(`CONTACT NO.: ${donation.phone}`, margin, yPosition);
    yPosition += 12;
    doc.text(
      `AUTHOTIZED SIGNATURE : ${trustInfo.presidentName}`,
      margin,
      yPosition
    );
    doc
      .setLineWidth(0.5)
      .line(margin, yPosition - 5, pageWidth - margin, yPosition - 5);
    doc.save(`${donation.name.replace(/\s+/g, "_")}_donation_receipt.pdf`);
  };

  const handleExportCSV = () => {
    if (!donations.length)
      return Swal.fire({
        title: "No Data!",
        text: "No donations available to export",
        icon: "info",
      });
    const headers = ["Sr No", "Name", "Phone", "Mode", "Date", "Amount (₹)"];
    const rows = donations.map((d, i) => [
      i + 1,
      d.name,
      d.phone,
      d.mode,
      new Date(d.date).toLocaleDateString(),
      `₹${d.amount}`,
    ]);
    const csvContent =
      "\uFEFF" + [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "donations.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalCash = donations
    .filter((d) => d.mode === "cash")
    .reduce((sum, d) => sum + d.amount, 0);
  const totalOnline = donations
    .filter((d) => d.mode === "online")
    .reduce((sum, d) => sum + d.amount, 0);
  const totalCheque = donations
    .filter((d) => d.mode === "cheque")
    .reduce((sum, d) => sum + d.amount, 0);

  if (isLoading)
    return (
      <div className="donation-container">
        <Sidebar />
        <div className="donation-main">Loading...</div>
      </div>
    );

  return (
    <div className="donation-container">
      <Sidebar />
      <div className="donation-main">
        <h2 className="donation-title">Donations Management</h2>

        <div className="donation-top">
          <input
            type="text"
            placeholder="Search donations..."
            className="donation-search"
          />
          <div className="donation-total">
            Total: ₹{donations.reduce((acc, d) => acc + d.amount, 0)}
          </div>
          <button className="btn-outline" onClick={handleExportCSV}>
            ⬇ Export CSV
          </button>
          <button className="btn-primary" onClick={handleModalToggle}>
            + Add Donation
          </button>
        </div>

        <div className="donation-table-container">
          <table className="donation-table">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Mode</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.length > 0 ? (
                donations.map((d, i) => (
                  <tr key={d._id}>
                    <td>{i + 1}</td>
                    <td>{d.name}</td>
                    <td>{d.phone}</td>
                    <td>
                      <span
                        className={
                          d.mode === "online"
                            ? "badge-online"
                            : d.mode === "cheque"
                            ? "badge-offline"
                            : "badge-paid"
                        }
                      >
                        {d.mode}
                      </span>
                    </td>
                    <td>{new Date(d.date).toLocaleDateString()}</td>
                    <td>₹{d.amount}</td>
                    <td className="donation-actions">
                      <button
                        className="receipt-btn"
                        onClick={() => handleDownloadReceipt(d)}
                      >
                        <FaMoneyCheckAlt /> Receipt
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteDonation(d._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No donations available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="donation-card-container">
          {donations.map((d, i) => (
            <div className="donation-card" key={d._id}>
              <h4>{d.name}</h4>
              <div className="donation-card-row">
                <span>Sr No:</span>
                <span>{i + 1}</span>
              </div>
              <div className="donation-card-row">
                <span>Phone:</span>
                <span>{d.phone}</span>
              </div>
              <div className="donation-card-row">
                <span>Mode:</span>
                <span>{d.mode}</span>
              </div>
              <div className="donation-card-row">
                <span>Date:</span>
                <span>{new Date(d.date).toLocaleDateString()}</span>
              </div>
              <div className="donation-card-row">
                <span>Amount:</span>
                <span>₹{d.amount}</span>
              </div>
              <div className="donation-card-actions">
                <button
                  className="receipt-btn"
                  onClick={() => handleDownloadReceipt(d)}
                >
                  <FaMoneyCheckAlt /> Receipt
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteDonation(d._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="donation-mode-summary">
          <p>Cash: ₹{totalCash.toFixed(2)}</p>
          <p>Online: ₹{totalOnline.toFixed(2)}</p>
          <p>Cheque: ₹{totalCheque.toFixed(2)}</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fees-modal-overlay">
          <div className="fees-modal-content">
            <h3>Add New Donation</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Donor Name *"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <select
                name="mode"
                value={formData.mode}
                onChange={handleInputChange}
                required
              >
                <option value="cash">Cash</option>
                <option value="online">Online</option>
                <option value="cheque">Cheque</option>
              </select>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount (₹) *"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
              <div className="fees-modal-buttons">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={handleModalToggle}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Donation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donation;
