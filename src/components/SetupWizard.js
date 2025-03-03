import React, { useState, useEffect } from 'react';
import { MetaAPI } from '../api/MetaAPI';
import { ClaudeAPI } from '../api/ClaudeAPI';

const SetupWizard = ({ 
  completeSetup, 
  claudeApiKey, 
  setClaudeApiKey, 
  claudeApiConfigured, 
  setClaudeApiConfigured 
}) => {
  const [step, setStep] = useState(1);
  const [metaApiStatus, setMetaApiStatus] = useState({
    initialized: false,
    connected: false,
    loading: false,
    error: null
  });
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
  
  const checkMetaLoginStatus = async () => {
    try {
      const isLoggedIn = await MetaAPI.checkLoginStatus();
      setMetaApiStatus(prev => ({ ...prev, connected: isLoggedIn }));
    } catch (error) {
      setMetaApiStatus(prev => ({ 
        ...prev, 
        connected: false,
        error: error.message
      }));
    }
  };
  
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
  
  const loginToMeta = async () => {
    setMetaApiStatus(prev => ({ ...prev, loading: true }));
    
    try {
      await MetaAPI.login();
      setMetaApiStatus(prev => ({ 
        ...prev, 
        connected: true,
        loading: false
      }));
    } catch (error) {
      setMetaApiStatus({
        ...metaApiStatus,
        connected: false,
        loading: false,
        error: error.message
      });
    }
  };
  
  const setClaudeKey = (key) => {
    setClaudeApiKey(key);
  };
  
  const testClaudeAPI = async () => {
    setClaudeApiStatus(prev => ({ ...prev, loading: true, error: null, testSuccess: false }));
    
    try {
      await ClaudeAPI.initialize(claudeApiKey);
      const testResult = await ClaudeAPI.testConnection();
      
      setClaudeApiStatus({
        loading: false,
        error: null,
        testSuccess: true
      });
      
      setClaudeApiConfigured(true);
      
      // Store the API key for future use
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
  
  const goToNextStep = () => {
    setStep(step + 1);
  };
  
  const goToPreviousStep = () => {
    setStep(step - 1);
  };
  
  return (
    <div style={{ 
      backgroundColor: 'var(--secondary-3)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '800px',
        width: '100%',
        backgroundColor: 'var(--accent-1)',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden'
      }}>
        <div style={{ backgroundColor: 'var(--primary)', padding: '24px', textAlign: 'center' }}>
          <h1 style={{ color: 'var(--accent-1)', margin: 0, fontFamily: 'The Seasons, Georgia, serif' }}>
            Welcome to CampaignGenius
          </h1>
          <p style={{ color: 'var(--accent-1)', marginTop: '8px' }}>
            Let's get you set up in just a few steps
          </p>
        </div>
        
        <div style={{ padding: '24px' }}>
          {/* Progress indicator */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '32px'
          }}>
            {[1, 2, 3].map(stepNumber => (
              <div key={stepNumber} style={{ 
                display: 'flex',
                alignItems: 'center',
                marginRight: stepNumber < 3 ? '60px' : 0,
                position: 'relative'
              }}>
                <div style={{ 
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: step >= stepNumber ? 'var(--primary)' : 'var(--secondary-4)',
                  color: step >= stepNumber ? 'var(--accent-1)' : 'var(--secondary-1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>
                  {stepNumber}
                </div>
                <div style={{ 
                  position: 'absolute',
                  bottom: '-24px',
                  width: '100px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: step === stepNumber ? 'bold' : 'normal'
                }}>
                  {stepNumber === 1 ? 'Welcome' : stepNumber === 2 ? 'Meta Setup' : 'Claude AI Setup'}
                </div>
                {stepNumber < 3 && (
                  <div style={{ 
                    height: '2px',
                    width: '60px',
                    backgroundColor: step > stepNumber ? 'var(--primary)' : 'var(--secondary-4)',
                    position: 'absolute',
                    right: '-60px',
                    top: '20px'
                  }} />
                )}
              </div>
            ))}
          </div>
          
          {/* Step content */}
          <div style={{ marginTop: '48px', minHeight: '320px' }}>
            {step === 1 && (
              <>
                <h2>Welcome to CampaignGenius!</h2>
                <p>
                  CampaignGenius uses the power of AI and your social media data to generate 
                  intelligent marketing campaign recommendations and content ideas.
                </p>
                <p>
                  In this quick setup, we'll connect your Meta Business accounts and configure the Claude AI
                  to provide personalized marketing insights.
                </p>
                <div style={{ marginTop: '32px' }}>
                  <h3>What you'll need:</h3>
                  <ul>
                    <li>Access to your Facebook Business accounts</li>
                    <li>A Claude API key (you can get one from <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer">Anthropic</a>)</li>
                  </ul>
                </div>
                <p>
                  Don't worry if you don't have these ready - you can still explore the app with sample data
                  and configure the connections later.
                </p>
              </>
            )}
            
            {step === 2 && (
              <>
                <h2>Connect your Meta Business accounts</h2>
                <p>
                  Connecting your Facebook Pages and Instagram Business accounts will allow us to analyze your 
                  social media performance and generate tailored recommendations.
                </p>
                
                <div style={{ 
                  padding: '24px',
                  backgroundColor: 'var(--secondary-3)',
                  borderRadius: '8px',
                  marginTop: '24px'
                }}>
                  <h3 style={{ marginTop: 0 }}>Meta Connection Status</h3>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--accent-1)',
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <strong>Facebook & Instagram</strong>
                      <div>{metaApiStatus.connected ? "Connected" : "Not connected"}</div>
                    </div>
                    {metaApiStatus.loading ? (
                      <div className="loading-spinner" style={{ width: "24px", height: "24px" }}></div>
                    ) : metaApiStatus.connected ? (
                      <button 
                        className="btn btn-secondary"
                        onClick={loginToMeta}
                      >
                        Reconnect
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
                  
                  {metaApiStatus.error && (
                    <div style={{ 
                      padding: '12px',
                      backgroundColor: 'rgba(255, 0, 0, 0.1)',
                      color: '#d32f2f',
                      borderRadius: '4px',
                      marginBottom: '16px'
                    }}>
                      <strong>Error: </strong>{metaApiStatus.error}
                    </div>
                  )}
                  
                  <p style={{ marginBottom: 0 }}>
                    {metaApiStatus.connected ? (
                      "✅ Your Meta accounts are successfully connected!"
                    ) : (
                      "You can still continue without connecting your Meta accounts. You can always set this up later."
                    )}
                  </p>
                </div>
              </>
            )}
            
            {step === 3 && (
              <>
                <h2>Configure Claude AI</h2>
                <p>
                  Claude is an AI assistant that powers the recommendation engine in CampaignGenius.
                  To enable AI-powered recommendations, enter your Claude API key below.
                </p>
                
                <div style={{ 
                  padding: '24px',
                  backgroundColor: 'var(--secondary-3)',
                  borderRadius: '8px',
                  marginTop: '24px'
                }}>
                  <h3 style={{ marginTop: 0 }}>Claude API Configuration</h3>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="claude-api-key" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                      Claude API Key
                    </label>
                    <input 
                      type="password"
                      id="claude-api-key"
                      value={claudeApiKey}
                      onChange={(e) => setClaudeKey(e.target.value)}
                      placeholder="Enter your Claude API key here"
                      style={{ 
                        width: '100%',
                        padding: '12px',
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                      }}
                    />
                    <small style={{ display: 'block', marginTop: '4px' }}>
                      Your API key is stored locally in your browser and never sent to our servers.
                    </small>
                  </div>
                  
                  <button 
                    className="btn btn-primary"
                    onClick={testClaudeAPI}
                    disabled={!claudeApiKey || claudeApiStatus.loading}
                    style={{ marginBottom: '16px' }}
                  >
                    {claudeApiStatus.loading ? "Testing..." : "Test Connection"}
                  </button>
                  
                  {claudeApiStatus.error && (
                    <div style={{ 
                      padding: '12px',
                      backgroundColor: 'rgba(255, 0, 0, 0.1)',
                      color: '#d32f2f',
                      borderRadius: '4px',
                      marginBottom: '16px'
                    }}>
                      <strong>Error: </strong>{claudeApiStatus.error}
                    </div>
                  )}
                  
                  {claudeApiStatus.testSuccess && (
                    <div style={{ 
                      padding: '12px',
                      backgroundColor: 'rgba(0, 255, 0, 0.1)',
                      color: '#388e3c',
                      borderRadius: '4px',
                      marginBottom: '16px'
                    }}>
                      <strong>Success! </strong>Your Claude API connection is working correctly.
                    </div>
                  )}
                  
                  <p style={{ marginBottom: 0 }}>
                    {claudeApiConfigured ? (
                      "✅ Claude AI is successfully configured!"
                    ) : (
                      "You can still continue without configuring Claude AI. You can always set this up later in Settings."
                    )}
                  </p>
                </div>
              </>
            )}
          </div>
          
          {/* Navigation buttons */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '32px'
          }}>
            {step > 1 ? (
              <button className="btn btn-secondary" onClick={goToPreviousStep}>
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button className="btn btn-primary" onClick={goToNextStep}>
                Continue
              </button>
            ) : (
              <button className="btn btn-primary" onClick={completeSetup}>
                Complete Setup
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;