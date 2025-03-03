import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CampaignRecommendations from './components/CampaignRecommendations';
import ContentIdeas from './components/ContentIdeas';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import SetupWizard from './components/SetupWizard';
import Footer from './components/Footer';
import { MetaAPI } from './api/MetaAPI';
import { ClaudeAPI } from './api/ClaudeAPI';
import './App.css';

// Import sample data
import { socialMediaData, industryTrends, campaignRecommendations, contentIdeas } from './data/sampleData';

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSetupWizard, setShowSetupWizard] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [metaData, setMetaData] = useState(null);
  const [connectedAccounts, setConnectedAccounts] = useState({
    facebook: false,
    instagram: false,
    twitter: true,
    linkedin: true
  });
  const [claudeApiKey, setClaudeApiKey] = useState('');
  const [claudeApiConfigured, setClaudeApiConfigured] = useState(false);
  
  const loadData = () => {
    setIsLoading(true);
    
    // Try to load Meta data if SDK is available
    if (window.FB) {
      MetaAPI.initialize()
        .then(() => MetaAPI.checkLoginStatus())
        .then(isLoggedIn => {
          if (isLoggedIn) {
            return MetaAPI.fetchDashboardData()
              .then(data => {
                setMetaData(data);
                setConnectedAccounts(prev => ({
                  ...prev,
                  facebook: true,
                  instagram: data.instagram.insights.length > 0
                }));
              })
              .catch(error => {
                console.error("Error fetching Meta data:", error);
              });
          }
        })
        .catch(error => {
          console.error("Error initializing Meta API:", error);
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
    
    // Check for stored Claude API key
    const storedApiKey = localStorage.getItem('claudeApiKey');
    if (storedApiKey) {
      setClaudeApiKey(storedApiKey);
      ClaudeAPI.initialize(storedApiKey)
        .then(() => {
          setClaudeApiConfigured(true);
        })
        .catch(() => {
          setClaudeApiConfigured(false);
        });
    }
    
    // Check if setup has been completed before
    const setupCompleted = localStorage.getItem('setupCompleted');
    if (setupCompleted === 'true') {
      setShowSetupWizard(false);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);

  const completeSetup = () => {
    setShowSetupWizard(false);
    localStorage.setItem('setupCompleted', 'true');
  };
  
  return (
    <div className="app">
      {showSetupWizard ? (
        <SetupWizard 
          completeSetup={completeSetup} 
          claudeApiKey={claudeApiKey}
          setClaudeApiKey={setClaudeApiKey}
          claudeApiConfigured={claudeApiConfigured}
          setClaudeApiConfigured={setClaudeApiConfigured}
        />
      ) : (
        <>
          <Header activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <main>
            {activeTab === "dashboard" && <Dashboard 
              isLoading={isLoading} 
              socialMediaData={metaData || socialMediaData} 
              industryTrends={industryTrends} 
              claudeApiConfigured={claudeApiConfigured}
            />}
            {activeTab === "campaigns" && <CampaignRecommendations 
              isLoading={isLoading} 
              recommendations={campaignRecommendations}
              claudeApiConfigured={claudeApiConfigured}
              socialMediaData={metaData || socialMediaData}
            />}
            {activeTab === "content" && <ContentIdeas 
              isLoading={isLoading} 
              contentIdeas={contentIdeas}
              claudeApiConfigured={claudeApiConfigured}
              socialMediaData={metaData || socialMediaData}
            />}
            {activeTab === "analytics" && <Analytics 
              isLoading={isLoading} 
              socialMediaData={metaData || socialMediaData}
              claudeApiConfigured={claudeApiConfigured}
            />}
            {activeTab === "settings" && <Settings 
              isLoading={isLoading} 
              connectedAccounts={connectedAccounts} 
              setConnectedAccounts={setConnectedAccounts}
              claudeApiKey={claudeApiKey}
              setClaudeApiKey={setClaudeApiKey}
              claudeApiConfigured={claudeApiConfigured}
              setClaudeApiConfigured={setClaudeApiConfigured}
            />}
          </main>
          
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;