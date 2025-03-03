import React from 'react';

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header style={{ 
      backgroundColor: "#435E50", 
      color: "#FFFFFF", 
      padding: "16px 0",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      <div className="container">
        <nav style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center" 
        }}>
          <a href="#" 
            className="nav-logo" 
            style={{
              fontFamily: "'The Seasons', 'Georgia', serif",
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "#FFFFFF",
              textDecoration: "none"
            }}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("dashboard");
            }}
          >
            CampaignGenius
          </a>
          
          <ul style={{ 
            display: "flex", 
            listStyle: "none",
            margin: 0,
            padding: 0
          }}>
            <li style={{ marginLeft: "24px" }}>
              <a 
                href="#" 
                style={{ 
                  color: "#FFFFFF", 
                  textDecoration: "none",
                  fontWeight: activeTab === "dashboard" ? 700 : 400,
                  transition: "all 0.3s ease"
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("dashboard");
                }}
              >
                Dashboard
              </a>
            </li>
            <li style={{ marginLeft: "24px" }}>
              <a 
                href="#" 
                style={{ 
                  color: "#FFFFFF", 
                  textDecoration: "none",
                  fontWeight: activeTab === "campaigns" ? 700 : 400,
                  transition: "all 0.3s ease"
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("campaigns");
                }}
              >
                Campaign Ideas
              </a>
            </li>
            <li style={{ marginLeft: "24px" }}>
              <a 
                href="#" 
                style={{ 
                  color: "#FFFFFF", 
                  textDecoration: "none",
                  fontWeight: activeTab === "content" ? 700 : 400,
                  transition: "all 0.3s ease"
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("content");
                }}
              >
                Content Ideas
              </a>
            </li>
            <li style={{ marginLeft: "24px" }}>
              <a 
                href="#" 
                style={{ 
                  color: "#FFFFFF", 
                  textDecoration: "none",
                  fontWeight: activeTab === "analytics" ? 700 : 400,
                  transition: "all 0.3s ease"
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("analytics");
                }}
              >
                Analytics
              </a>
            </li>
            <li style={{ marginLeft: "24px" }}>
              <a 
                href="#" 
                style={{ 
                  color: "#FFFFFF", 
                  textDecoration: "none",
                  fontWeight: activeTab === "settings" ? 700 : 400,
                  transition: "all 0.3s ease"
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("settings");
                }}
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;