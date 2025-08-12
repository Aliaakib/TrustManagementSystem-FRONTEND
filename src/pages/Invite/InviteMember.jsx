import React, { useEffect, useState } from "react";
import "./InviteMember.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const InviteMember = () => {
  const { trustId, adminName } = useParams();
  const navigate = useNavigate();
  const [trust, setTrust] = useState(null);

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        // const res = await axios.get(`/api/invite/member/${trustId}`);
        const res = await axios.get(
          `http://localhost:5000/api/invite/member/${trustId}`
        );

        setTrust(res.data);
      } catch (error) {
        console.error("Error fetching invite info:", error);
      }
    };

    if (trustId) {
      fetchInvite();
    }
  }, [trustId]);

  const handleAccept = () => {
    navigate(`/register?trustId=${trustId}&role=member`);
  };

  const handleDecline = () => {
    navigate("/");
  };

  const handleRegisterAsTrustee = () => {
    navigate(`/register?trustId=${trustId}&role=trustee`);
  };

  if (!trust) return <div className="invite-member-container">Loading...</div>;

  return (
    <div className="invite-member-container">
      <div className="invite-member-card">
        <h2 className="invite-member-title">
          {decodeURIComponent(adminName)} has invited you to join as a{" "}
          <span>Member</span>
        </h2>
        <div className="invite-member-trust-details">
          <img
            src={trust.trustLogo}
            alt="Trust Logo"
            className="invite-member-trust-logo"
          />
          <div className="invite-member-trust-info">
            <h3>{trust.trustName}</h3>
            <p className="invite-member-role-message">
              Trust has invited you to join as a member in their trust.
            </p>
          </div>
        </div>
        <div className="invite-member-actions">
          <button onClick={handleAccept} className="invite-member-yes">
            Yes, I want to join
          </button>
          <button onClick={handleDecline} className="invite-member-no">
            No, thanks
          </button>
        </div>

        <div className="invite-member-alternative">
          <p className="invite-member-or">Or</p>
          <button
            onClick={handleRegisterAsTrustee}
            className="invite-member-alt-btn"
          >
            Register as a Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteMember;
