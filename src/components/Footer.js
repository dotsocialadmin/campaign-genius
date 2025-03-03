import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: "#0B0721", 
      color: "#FFFFFF", 
      padding: "48px 0 24px",
      marginTop: "48px"
    }}>
      <div className="container">
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          justifyContent: "space-between",
          marginBottom: "32px"
        }}>
          <div style={{ 
            flex: 1, 
            minWidth: "200px",
            marginBottom: "24px"
          }}>
            <h3 style={{ 
              color: "#FFFFFF", 
              marginBottom: "16px",
              fontSize: "1.2rem"
            }}>CampaignGenius</h3>
            <p>AI-powered marketing campaign and content recommendations to elevate your brand's social media presence.</p>
            <div style={{ 
              display: "flex", 
              gap: "12px",
              margin: "16px 0"
            }}>
              <a href="#" className="social-icon">F</a>
              <a href="#" className="social-icon">T</a>
              <a href="#" className="social-icon">I</a>
              <a href="#" className="social-icon">L</a>
            </div>
          </div>
          
          <div style={{ 
            flex: 1, 
            minWidth: "200px",
            marginBottom: "24px"
          }}>
            <h3 style={{ 
              color: "#FFFFFF", 
              marginBottom: "16px",
              fontSize: "1.2rem"
            }}>Features</h3>
            <ul style={{ listStyle: "none" }}>
              <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#EFEDE3", textDecoration: "none" }}>AI Recommendations</a></li>
              <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#EFEDE3", textDecoration: "none" }}>Campaign Ideas</a></li>
              <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#EFEDE3", textDecoration: "none" }}>Content Planning</a></li>
              <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#EFEDE3", textDecoration: "none" }}>Analytics & Insights</a></li>
              <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#EFEDE3", textDecoration: "none" }}>Social Integration</a></li>
            </ul>
          </div>
          
          <div style={{ 
            flex: 1, 
            minWidth: "200px",
            marginBottom: "24px"
          }}>
            <h3 style={{ 
              color: "#FFFFFF", 
              marginBottom: "16px",
              fontSize: "1.2rem"
            }}>Resources</h3>
            <ul style={{ listStyle: "none" }}>
              <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#EFEDE3", textDecoration: "none" }}>Help Center</a></li>
              <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#EFEDE3", textDecoration: "none" }}>API Documentation</a></li>
              <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#EFEDE3", textDecoration: "none" }}>Blog</a></li>
              <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#EFEDE3", textDecoration: "none" }}>Webinars</a></li>
              <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#EFEDE3", textDecoration: "none" }}>Case Studies</a></li>
            </ul>
          </div>
          
          <div style={{ 
            flex: 1, 
            minWidth: "200px",
            marginBottom: "24px"
          }}>
            <h3 style={{ 
              color: "#FFFFFF", 
              marginBottom: "16px",
              fontSize: "1.2rem"
            }}>Company</h3>
            <ul style={{ listStyle: "none" }}>
              <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#EFEDE3", textDecoration: "none" }}>About Us</a></li>
              <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#EFEDE3", textDecoration: "none" }}>Careers</a></li>
              <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#EFEDE3", textDecoration: "none" }}>Contact</a></li>
              <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#EFEDE3", textDecoration: "none" }}>Privacy Policy</a></li>
              <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#EFEDE3", textDecoration: "none" }}>Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div style={{ 
          textAlign: "center",
          paddingTop: "24px",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <p style={{ 
            fontSize: "0.9rem",
            color: "#EFEDE3"
          }}>&copy; 2025 CampaignGenius. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;