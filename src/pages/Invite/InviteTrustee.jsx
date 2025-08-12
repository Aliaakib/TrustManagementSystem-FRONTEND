import React, { useEffect, useState } from "react";
import "./InviteMember.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const InviteTrustee = () => {
  const { trustId, adminName } = useParams();
  const navigate = useNavigate();
  const [trust, setTrust] = useState(null);

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        const res = await axios.get(`/api/invite/trustee/${trustId}`);
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
    navigate(`/register?trustId=${trustId}&role=trustee`);
  };

  const handleDecline = () => {
    navigate("/");
  };

  const handleRegisterAsMember = () => {
    navigate(`/register?trustId=${trustId}&role=member`);
  };

  if (!trust) return <div className="invite-member-container">Loading...</div>;

  return (
    <div className="invite-member-container">
      <div className="invite-member-card">
        <h2 className="invite-member-title">
          {decodeURIComponent(adminName)} has invited you to join as a{" "}
          <span>Trustee</span>
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
              Trust has invited you to join as a trustee in their trust.
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
            onClick={handleRegisterAsMember}
            className="invite-member-alt-btn"
          >
            Register as a Trustee
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteTrustee;
