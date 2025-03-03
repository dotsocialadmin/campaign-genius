import React, { useState, useEffect } from 'react';
import { MetaAPI } from '../api/MetaAPI';
import { ClaudeAPI } from '../api/ClaudeAPI';

const Settings = ({ 
  isLoading, 
  connectedAccounts, 
  setConnectedAccounts, 
  claudeApiKey, 
  setClaudeApiKey, 
  claudeApiConfigured, 
  setClaudeApiConfigured 
}) => {
  const [metaApiStatus, setMetaApiStatus] = useState({
    initialized: false,
    connected: false,
    loading: false,
    error: null
  });
  
  const [metaPages, setMetaPages] = useState([]);
  const [metaInstagram, setMetaInstagram] = useState([]);
  const [claudeApiStatus, setClaudeApiStatus] = useState({
    loading: false,
    error: null,
    testSuccess: false
  });
  
  useEffect(() => {
    // Check if Meta API is already initialized
    if (window.FB) {
      setMetaApiStatus(prev => ({ ...prev, initialized: true }));
      checkMetaLoginStatus();
    }
  }, []);
  
  const initializeMetaAPI = async () => {
    setMetaApiStatus(prev => ({ ...prev, loading: true }));
    
    try {
      await MetaAPI.initialize();
      setMetaApiStatus(prev => ({ 
        ...prev, 
        initialized: true,
        loading: false
      }));
      
      checkMetaLoginStatus();
    } catch (error) {
      setMetaApiStatus({
        initialized: false,
        connected: false,
        loading: false,
        error: error.message
      });
    }
  };
  
  const checkMetaLoginStatus = async () => {
    try {
      const isLoggedIn = await MetaAPI.checkLoginStatus();
      setMetaApiStatus(prev => ({ ...prev, connected: isLoggedIn }));
      
      if (isLoggedIn) {
        fetchMetaPages();
      }
    } catch (error) {
      setMetaApiStatus(prev => ({ 
        ...prev, 
        connected: false,
        error: error.message
      }));
    }
  };
  
  const loginToMeta = async () => {
    setMetaApiStatus(prev => ({ ...prev, loading: true }));
    
    try {
      await MetaAPI.login();
      setMetaApiStatus(prev => ({ 
        ...prev, 
        connected: true,
        loading: false
      }));
      
      fetchMetaPages();
    } catch (error) {
      setMetaApiStatus({
        ...metaApiStatus,
        connected: false,
        loading: false,
        error: error.message
      });
    }
  };
  
  const logoutFromMeta = async () => {
    setMetaApiStatus(prev => ({ ...prev, loading: true }));
    
    try {
      await MetaAPI.logout();
      setMetaApiStatus({
        ...metaApiStatus,
        connected: false,
        loading: false
      });
      
      setMetaPages([]);
      setMetaInstagram([]);
    } catch (error) {
      setMetaApiStatus({
        ...metaApiStatus,
        loading: false,
        error: error.message
      });
    }
  };
  
  const fetchMetaPages = async () => {
    try {
      const pages = await MetaAPI.getPages();
      setMetaPages(pages);
      
      if (pages.length > 0) {
        await MetaAPI.selectPage(pages[0].id);
        fetchInstagramAccounts();
      }
    } catch (error) {
      setMetaApiStatus(prev => ({ 
        ...prev,
        error: error.message
      }));
    }
  };
  
  const fetchInstagramAccounts = async () => {
    try {
      const igAccounts = await MetaAPI.getInstagramAccounts();
      setMetaInstagram(igAccounts);
    } catch (error) {
      // Instagram account might not be connected, which is fine
      console.log('Instagram fetch error:', error);
    }
  };
  
  const updateClaudeApiKey = (key) => {
    setClaudeApiKey(key);
  };
  
  const testClaudeAPI = async () => {
    setClaudeApiStatus({ loading: true, error: null, testSuccess: false });
    
    try {
      await ClaudeAPI.initialize(claudeApiKey);
      await ClaudeAPI.testConnection();
      
      setClaudeApiStatus({
        loading: false,
        error: null,
        testSuccess: true
      });
      
      setClaudeApiConfigured(true);
      localStorage.setItem('claudeApiKey', claudeApiKey);
    } catch (error) {
      setClaudeApiStatus({
        loading: false,
        error: error.message,
        testSuccess: false
      });
      
      setClaudeApiConfigured(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }
  
  const toggleAccount = (platform) => {
    setConnectedAccounts({
      ...connectedAccounts,
      [platform]: !connectedAccounts[platform]
    });
  };
  
  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <div className="row">
        <div className="col col-12">
          <h2>Account Settings</h2>
          <p>Manage your preferences, connected accounts, and API configurations.</p>
        </div>
      </div>
      
      <div className="row" style={{ marginTop: "24px" }}>
        <div className="col col-6">
          <div className="card">
            <h3>Connected Social Media Accounts</h3>
            <p>Manage your connected social media platforms</p>
            
            <div style={{ marginTop: "24px" }}>
              {/* Meta (Facebook/Instagram) Integration */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", padding: "16px", backgroundColor: "var(--primary)", color: "var(--accent-1)", borderRadius: "8px" }}>
                <div>
                  <strong>Meta Business Suite</strong>
                  <div>{metaApiStatus.connected ? 
                    `Connected (${metaPages.length} Pages${metaInstagram.length > 0 ? `, ${metaInstagram.length} Instagram Accounts` : ''})` 
                    : "Disconnected"}</div>
                </div>
                {metaApiStatus.loading ? (
                  <div className="loading-spinner" style={{ width: "24px", height: "24px" }}></div>
                ) : metaApiStatus.connected ? (
                  <button 
                    className="btn btn-secondary"
                    onClick={logoutFromMeta}
                  >
                    Disconnect
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary"
                    onClick={metaApiStatus.initialized ? loginToMeta : initializeMetaAPI}
                  >
                    Connect
                  </button>
                )}
              </div>
              
              {metaApiStatus.connected && metaPages.length > 0 && (
                <div style={{ marginBottom: "24px", padding: "16px", backgroundColor: "var(--secondary-3)", borderRadius: "8px" }}>
                  <h4 style={{ marginBottom: "16px" }}>Connected Meta Accounts</h4>
                  
                  {metaPages.map(page => (
                    <div key={page.id} style={{ marginBottom: "12px", padding: "12px", backgroundColor: "var(--accent-1)", borderRadius: "8px" }}>
                      <strong>{page.name}</strong>
                      <div>Facebook Page</div>
                    </div>
                  ))}
                  
                  {metaInstagram.length > 0 && metaInstagram.map(ig => (
                    <div key={ig.id} style={{ marginBottom: "12px", padding: "12px", backgroundColor: "var(--accent-1)", borderRadius: "8px" }}>
                      <strong>Instagram Business Account</strong>
                      <div>Connected to {metaPages.find(p => p.id === MetaAPI.state.selectedPageId)?.name}</div>
                    </div>
                  ))}
                </div>
              )}
              
              {metaApiStatus.error && (
                <div style={{ marginBottom: "24px", padding: "16px", backgroundColor: "rgba(255, 0, 0, 0.1)", borderRadius: "8px", color: "#d32f2f" }}>
                  <strong>Error: </strong>{metaApiStatus.error}
                </div>
              )}
              
              {/* Other social platforms */}
              {Object.entries(connectedAccounts)
                .filter(([platform]) => !['facebook', 'instagram'].includes(platform))
                .map(([platform, isConnected]) => (
                  <div key={platform} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", padding: "12px", backgroundColor: "var(--secondary-3)", borderRadius: "8px" }}>
                    <div>
                      <strong>{platform.charAt(0).toUpperCase() + platform.slice(1)}</strong>
                      <div>{isConnected ? "Connected" : "Disconnected"}</div>
                    </div>
                    <button 
                      className={`btn ${isConnected ? "btn-secondary" : "btn-primary"}`}
                      onClick={() => toggleAccount(platform)}
                    >
                      {isConnected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                ))
              }
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", padding: "12px", backgroundColor: "var(--secondary-3)", borderRadius: "8px" }}>
                <div>
                  <strong>TikTok</strong>
                  <div>Disconnected</div>
                </div>
                <button className="btn btn-primary">Connect</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col col-6">
          <div className="card">
            <h3>Claude AI Configuration</h3>
            <p>Manage your Claude API settings for AI-powered recommendations</p>
            
            <div style={{ marginTop: "24px" }}>
              <div style={{ marginBottom: "16px" }}>
                <label htmlFor="claude-api-key" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                  API Key
                </label>
                <input 
                  type="password" 
                  id="claude-api-key"
                  value={claudeApiKey}
                  onChange={(e) => updateClaudeApiKey(e.target.value)}
                  placeholder="Enter your Claude API key"
                  style={{ width: "100%", padding: "12px", marginBottom: "8px" }}
                />
                <small>Your API key is stored locally in your browser for security.</small>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <button 
                  className="btn btn-primary"
                  onClick={testClaudeAPI}
                  disabled={!claudeApiKey || claudeApiStatus.loading}
                >
                  {claudeApiStatus.loading ? "Testing..." : "Test Connection"}
                </button>
                <div>
                  Status: <strong>{claudeApiConfigured ? "Connected" : "Not Connected"}</strong>
                </div>
              </div>
              
              {claudeApiStatus.error && (
                <div style={{ marginBottom: "24px", padding: "16px", backgroundColor: "rgba(255, 0, 0, 0.1)", borderRadius: "8px", color: "#d32f2f" }}>
                  <strong>Error: </strong>{claudeApiStatus.error}
                </div>
              )}
              
              {claudeApiStatus.testSuccess && (
                <div style={{ marginBottom: "24px", padding: "16px", backgroundColor: "rgba(0, 255, 0, 0.1)", borderRadius: "8px", color: "#388e3c" }}>
                  <strong>Success! </strong>Your Claude API connection is working correctly.
                </div>
              )}
              
              <div style={{ backgroundColor: "var(--secondary-3)", padding: "16px", borderRadius: "8px" }}>
                <h4 style={{ marginTop: 0 }}>About Claude AI</h4>
                <p>
                  Claude is the AI that powers CampaignGenius's recommendation engine. It analyzes your social media data
                  to generate intelligent campaign ideas and content recommendations.
                </p>
                <p style={{ marginBottom: 0 }}>
                  <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer">
                    Get a Claude API key →
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          <div className="card" style={{ marginTop: "24px" }}>
            <h3>API Connections</h3>
            <p>Manage third-party integrations and API keys</p>
            
            <div style={{ marginTop: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", padding: "12px", backgroundColor: "var(--secondary-3)", borderRadius: "8px" }}>
                <div>
                  <strong>Google Analytics</strong>
                  <div>Connected</div>
                </div>
                <button className="btn btn-secondary">Manage</button>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", padding: "12px", backgroundColor: "var(--secondary-3)", borderRadius: "8px" }}>
                <div>
                  <strong>Mailchimp</strong>
                  <div>Connected</div>
                </div>
                <button className="btn btn-secondary">Manage</button>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", padding: "12px", backgroundColor: "var(--secondary-3)", borderRadius: "8px" }}>
                <div>
                  <strong>HubSpot</strong>
                  <div>Disconnected</div>
                </div>
                <button className="btn btn-primary">Connect</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;