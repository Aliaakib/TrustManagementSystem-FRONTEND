import React from "react";
import "./OurStory.css";

const OurStory = () => {
  return (
    <div className="tms-story-bg">
      <div className="tms-story-container">
        {/* Story Section */}
        <section className="tms-story-section">
          <h2 className="tms-story-heading animate-fade-up">Our Journey</h2>
          <p className="tms-story-text animate-fade-up">
            The Trust Track was born from the need to simplify and streamline
            the operations of charitable organizations. Managing members,
            trustees, donations, and financial records manually often led to
            errors, inefficiencies, and data loss.
          </p>
          <p className="tms-story-text animate-fade-up">
            This platform was designed to empower trusts with digital tools that
            offer security, transparency, and ease of access. With dynamic
            dashboards, role-based access, document management, and insightful
            reporting, our goal is to let you focus on your mission—serving your
            community—while we handle the rest.
          </p>
        </section>

        {/* Developer Section */}
        <section className="tms-developer-section animate-fade-up">
          <h2 className="tms-developer-heading">Meet the Developer</h2>
          <div className="tms-developer-profile">
            <img
              src="/image.png" // Replace with your actual image path
              alt="Bukhari Aliaakib"
              className="tms-developer-img"
            />
            <div className="tms-developer-info">
              <h3 className="tms-developer-name">Bukhari Aliaakib</h3>
              <p className="tms-developer-role">
                Full-Stack Developer | MERN Stack
              </p>
              <p className="tms-developer-bio">
                I’m Bukhari Aliaakib, a tech enthusiast and full-stack developer
                with a B.Tech in Information Technology, passionate about
                building scalable, user-centric applications using the MERN
                stack. My mission is to use technology to solve real-world
                problems and deliver tools that truly empower people and
                organizations.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OurStory;
