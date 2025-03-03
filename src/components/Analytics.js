import React, { useState } from 'react';
import { ClaudeAPI } from '../api/ClaudeAPI';

const Analytics = ({ isLoading, socialMediaData, claudeApiConfigured }) => {
  const [generatingAnalysis, setGeneratingAnalysis] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiError, setAiError] = useState(null);
  
  const generateAiAnalysis = async () => {
    if (!claudeApiConfigured) {
      alert("Please configure your Claude API in Settings first.");
      return;
    }
    
    setGeneratingAnalysis(true);
    setAiError(null);
    
    try {
      const result = await ClaudeAPI.generateInsights(socialMediaData);
      setAiAnalysis(result);
    } catch (error) {
      console.error("Error generating AI analysis:", error);
      setAiError(error.message);
    } finally {
      setGeneratingAnalysis(false);
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
    <div className="container" style={{ marginTop: "40px" }}>
      <div className="row">
        <div className="col col-12">
          <h2>Performance Analytics</h2>
          <p>Comprehensive analysis of your marketing activities across platforms.</p>
          
          {claudeApiConfigured && (
            <button 
              className="btn btn-primary" 
              onClick={generateAiAnalysis}
              disabled={generatingAnalysis}
              style={{ marginTop: "16px" }}
            >
              {generatingAnalysis ? "Analyzing..." : "Generate AI Analysis"}
            </button>
          )}
          
          {!claudeApiConfigured && (
            <div style={{ 
              backgroundColor: "var(--secondary-3)", 
              padding: "16px", 
              borderRadius: "8px", 
              marginTop: "16px",
              marginBottom: "24px"
            }}>
              <p style={{ margin: 0 }}>
                <strong>Note:</strong> Configure your Claude API in Settings to generate advanced AI analysis.
              </p>
            </div>
          )}
          
          {aiError && (
            <div style={{ 
              backgroundColor: "rgba(255, 0, 0, 0.1)", 
              padding: "16px", 
              borderRadius: "8px", 
              marginTop: "16px",
              marginBottom: "24px",
              color: "#d32f2f"
            }}>
              <p style={{ margin: 0 }}>
                <strong>Error generating analysis:</strong> {aiError}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="row" style={{ marginTop: "24px" }}>
        <div className="col col-8">
          <div className="card">
            <div className="dashboard-card-header">
              <h3>Engagement Trends</h3>
              <div>
                <select defaultValue="30days">
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="90days">Last 90 days</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>
            
            <div className="chart-container">
              {/* Chart would go here in a real app */}
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--secondary-4)", borderRadius: "8px" }}>
                <p>Engagement trends over time (Chart.js would render here)</p>
              </div>
            </div>
            
            <div className="dashboard-metrics" style={{ marginTop: "24px" }}>
              <div className="metric-item">
                <h4>Instagram</h4>
                <p>{socialMediaData.instagram.engagement}%</p>
              </div>
              <div className="metric-item">
                <h4>Facebook</h4>
                <p>{socialMediaData.facebook.engagement}%</p>
              </div>
              <div className="metric-item">
                <h4>Twitter</h4>
                <p>{socialMediaData.twitter.engagement}%</p>
              </div>
              <div className="metric-item">
                <h4>LinkedIn</h4>
                <p>{socialMediaData.linkedin.engagement}%</p>
              </div>
            </div>
          </div>
          
          <div className="card" style={{ marginTop: "24px" }}>
            <h3>Audience Demographics</h3>
            
            <div className="row">
              <div className="col col-6">
                <h4 style={{ marginTop: "16px" }}>Age Distribution</h4>
                <div className="chart-container" style={{ height: "200px" }}>
                  {/* Chart would go here in a real app */}
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--secondary-4)", borderRadius: "8px" }}>
                    <p>Age demographics chart</p>
                  </div>
                </div>
              </div>
              
              <div className="col col-6">
                <h4 style={{ marginTop: "16px" }}>Gender Distribution</h4>
                <div className="chart-container" style={{ height: "200px" }}>
                  {/* Chart would go here in a real app */}
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--secondary-4)", borderRadius: "8px" }}>
                    <p>Gender demographics chart</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col col-4">
          <div className="card">
            <h3>Performance Insights</h3>
            
            <div style={{ marginTop: "16px" }}>
              {aiAnalysis ? (
                // Display AI-generated analysis
                aiAnalysis.map((insight, idx) => (
                  <div key={idx} className="recommendation-item">
                    <h4>{insight.title}</h4>
                    <p>{insight.description}</p>
                  </div>
                ))
              ) : (
                // Default insights
                <>
                  <div className="recommendation-item">
                    <h4>Content Performance</h4>
                    <p>Video content is outperforming images by 43% on Instagram and 28% on Facebook. Consider increasing video production for your next campaign.</p>
                  </div>
                  
                  <div className="recommendation-item">
                    <h4>Audience Growth</h4>
                    <p>Your LinkedIn audience is growing at 6.2% month-over-month, significantly outpacing other platforms. This represents an opportunity for B2B content initiatives.</p>
                  </div>
                  
                  <div className="recommendation-item">
                    <h4>Campaign Effectiveness</h4>
                    <p>Your eco-friendly product campaign achieved 37% higher engagement than your average posts. Environmental responsibility resonates strongly with your audience.</p>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="card" style={{ marginTop: "24px" }}>
            <h3>Export Reports</h3>
            <p>Download detailed analytics reports for further analysis.</p>
            
            <div style={{ marginTop: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span>Performance Overview</span>
                <button className="btn btn-secondary" style={{ padding: "6px 12px" }}>Export</button>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span>Audience Analysis</span>
                <button className="btn btn-secondary" style={{ padding: "6px 12px" }}>Export</button>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span>Campaign Results</span>
                <button className="btn btn-secondary" style={{ padding: "6px 12px" }}>Export</button>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Content Performance</span>
                <button className="btn btn-secondary" style={{ padding: "6px 12px" }}>Export</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;