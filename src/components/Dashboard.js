import React, { useState } from 'react';
import { ClaudeAPI } from '../api/ClaudeAPI';

const Dashboard = ({ isLoading, socialMediaData, industryTrends, claudeApiConfigured }) => {
  const [refreshingMetaData, setRefreshingMetaData] = useState(false);
  const [generatingInsights, setGeneratingInsights] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);
  const [aiError, setAiError] = useState(null);
  
  const refreshMetaData = async () => {
    if (!window.FB || refreshingMetaData) return;
    
    setRefreshingMetaData(true);
    
    try {
      await window.MetaAPI.initialize();
      const isLoggedIn = await window.MetaAPI.checkLoginStatus();
      
      if (isLoggedIn) {
        const data = await window.MetaAPI.fetchDashboardData();
        console.log("Refreshed Meta data:", data);
        alert("Meta data refreshed successfully!");
      } else {
        alert("Please connect your Meta account in Settings first.");
      }
    } catch (error) {
      console.error("Error refreshing Meta data:", error);
      alert(`Error refreshing data: ${error.message}`);
    } finally {
      setRefreshingMetaData(false);
    }
  };
  
  const generateAiInsights = async () => {
    if (!claudeApiConfigured) {
      alert("Please configure your Claude API in Settings first.");
      return;
    }
    
    setGeneratingInsights(true);
    setAiError(null);
    
    try {
      const result = await ClaudeAPI.generateInsights(socialMediaData);
      setAiInsights(result);
    } catch (error) {
      console.error("Error generating AI insights:", error);
      setAiError(error.message);
    } finally {
      setGeneratingInsights(false);
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
  
  return (
    <>
      <div className="hero">
        <div className="container">
          <h1>Welcome to your Marketing Command Center</h1>
          <p>Get AI-powered recommendations for your campaigns based on social media trends and audience behavior.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button 
              className="btn btn-primary"
              onClick={generateAiInsights}
              disabled={generatingInsights || !claudeApiConfigured}
            >
              {generatingInsights ? "Generating..." : "Generate AI Insights"}
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={refreshMetaData} 
              disabled={refreshingMetaData}
            >
              {refreshingMetaData ? "Refreshing..." : "Refresh Meta Data"}
            </button>
          </div>
          
          {!claudeApiConfigured && (
            <div style={{ 
              backgroundColor: "var(--secondary-3)", 
              padding: "12px", 
              borderRadius: "8px", 
              maxWidth: "600px",
              margin: "16px auto 0",
              fontSize: "0.9rem"
            }}>
              <p style={{ margin: 0 }}>
                Configure your Claude API in Settings to enable AI-powered insights and recommendations.
              </p>
            </div>
          )}
          
          {aiError && (
            <div style={{ 
              backgroundColor: "rgba(255, 0, 0, 0.1)", 
              padding: "12px", 
              borderRadius: "8px", 
              maxWidth: "600px",
              margin: "16px auto 0",
              fontSize: "0.9rem",
              color: "#d32f2f"
            }}>
              <p style={{ margin: 0 }}>
                <strong>Error generating insights:</strong> {aiError}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="container" style={{ marginTop: "40px" }}>
        <div className="row">
          <div className="col col-12">
            <h2>Marketing Performance Overview</h2>
            <p>See how your channels are performing and identify opportunities for growth.</p>
          </div>
        </div>
        
        <div className="row" style={{ marginTop: "24px" }}>
          <div className="col col-8">
            <div className="card dashboard-card">
              <div className="dashboard-card-header">
                <h3>Social Media Performance</h3>
                <div>
                  <select defaultValue="30days">
                    <option value="7days">Last 7 days</option>
                    <option value="30days">Last 30 days</option>
                    <option value="90days">Last 90 days</option>
                  </select>
                </div>
              </div>
              
              <div className="dashboard-metrics">
                <div className="metric-item">
                  <h4>Total Followers</h4>
                  <p>55,800</p>
                </div>
                <div className="metric-item">
                  <h4>Avg. Engagement</h4>
                  <p>3.5%</p>
                </div>
                <div className="metric-item">
                  <h4>Total Impressions</h4>
                  <p>287.4K</p>
                </div>
                <div className="metric-item">
                  <h4>Growth Rate</h4>
                  <p>+4.2%</p>
                </div>
              </div>
              
              <div className="chart-container">
                {/* Chart would go here in a real app */}
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--secondary-4)", borderRadius: "8px" }}>
                  <p>Engagement graph by platform (Chart.js would render here)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col col-4">
            <div className="card dashboard-card">
              <h3>Top Performing Content</h3>
              <p>Your highest engaging posts from the last 30 days</p>
              
              <div style={{ marginTop: "16px" }}>
                {Object.keys(socialMediaData).slice(0, 3).map((platform, i) => {
                  const post = socialMediaData[platform].topPosts[0];
                  return (
                    <div key={i} className="recommendation-item">
                      <span className="badge badge-primary">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                      <p>{post.content}</p>
                      <small>Engagement: {post.engagement}</small>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        <div className="row" style={{ marginTop: "24px" }}>
          <div className="col col-6">
            <div className="card dashboard-card">
              <h3>Industry Trends</h3>
              <p>Current trends gaining traction in your industry</p>
              
              <div style={{ marginTop: "16px" }}>
                {industryTrends.slice(0, 3).map((trend, i) => (
                  <div key={i} className="recommendation-item">
                    <h4>{trend.name}</h4>
                    <div className="content-tags">
                      <span className="badge badge-secondary">Growth: {trend.growth}%</span>
                      <span className="badge badge-accent">Relevance: {trend.relevance}/10</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col col-6">
            <div className="card dashboard-card">
              <h3>AI-Generated Insights</h3>
              <p>Strategic recommendations based on your data</p>
              
              <div style={{ marginTop: "16px" }}>
                {aiInsights ? (
                  // Display AI-generated insights
                  aiInsights.map((insight, idx) => (
                    <div key={idx} className="recommendation-item">
                      <h4>{insight.title}</h4>
                      <p>{insight.description}</p>
                    </div>
                  ))
                ) : (
                  // Default insights
                  <>
                    <div className="recommendation-item">
                      <h4>Audience Behavior</h4>
                      <p>Your audience engages most with content posted between 7-9am and 5-7pm on weekdays. Consider scheduling your most important content during these windows.</p>
                    </div>
                    
                    <div className="recommendation-item">
                      <h4>Content Type Preference</h4>
                      <p>Video content receives 43% higher engagement than static images across all your platforms. Consider increasing video content by 25% in your next campaign.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;