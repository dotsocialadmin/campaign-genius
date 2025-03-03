import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';

function BasicApp() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Simple header component
  const Header = () => {
    return (
      <header style={{ 
        backgroundColor: "#435E50", 
        padding: "16px 0", 
        color: "#FFFFFF" 
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <a href="#" style={{ fontWeight: "700", fontSize: "1.5rem", color: "#FFFFFF", textDecoration: "none" }}>
              CampaignGenius
            </a>
            <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ marginLeft: "24px" }}>
                <a 
                  href="#" 
                  onClick={() => setActiveTab("dashboard")}
                  style={{ color: "#FFFFFF", textDecoration: "none", fontWeight: activeTab === "dashboard" ? "700" : "400" }}
                >
                  Dashboard
                </a>
              </li>
              <li style={{ marginLeft: "24px" }}>
                <a 
                  href="#" 
                  onClick={() => setActiveTab("campaigns")}
                  style={{ color: "#FFFFFF", textDecoration: "none", fontWeight: activeTab === "campaigns" ? "700" : "400" }}
                >
                  Campaigns
                </a>
              </li>
              <li style={{ marginLeft: "24px" }}>
                <a 
                  href="#" 
                  onClick={() => setActiveTab("settings")}
                  style={{ color: "#FFFFFF", textDecoration: "none", fontWeight: activeTab === "settings" ? "700" : "400" }}
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

  // Simple content components
  const Dashboard = () => (
    <div style={{ padding: "40px 20px" }}>
      <h1>Dashboard</h1>
      <p>Welcome to your marketing command center.</p>
    </div>
  );

  const Campaigns = () => (
    <div style={{ padding: "40px 20px" }}>
      <h1>Campaign Recommendations</h1>
      <p>AI-powered campaign ideas will appear here.</p>
    </div>
  );

  const Settings = () => (
    <div style={{ padding: "40px 20px" }}>
      <h1>Settings</h1>
      <p>Configure your application settings.</p>
    </div>
  );

  return (
    <Router>
      <div className="App">
        <Header />
        
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "campaigns" && <Campaigns />}
        {activeTab === "settings" && <Settings />}
        
        <footer style={{ 
          backgroundColor: "#0B0721", 
          color: "#FFFFFF", 
          padding: "24px 0", 
          marginTop: "48px", 
          textAlign: "center" 
        }}>
          <p>CampaignGenius © 2025. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default BasicApp;