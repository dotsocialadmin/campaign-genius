import React, { useState } from 'react';
import { ClaudeAPI } from '../api/ClaudeAPI';

const CampaignRecommendations = ({ isLoading, recommendations, claudeApiConfigured, socialMediaData }) => {
  const [generatingRecommendations, setGeneratingRecommendations] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [aiError, setAiError] = useState(null);
  
  const generateAiRecommendations = async () => {
    if (!claudeApiConfigured) {
      alert("Please configure your Claude API in Settings first.");
      return;
    }
    
    setGeneratingRecommendations(true);
    setAiError(null);
    
    try {
      const result = await ClaudeAPI.generateCampaignRecommendations(socialMediaData, { count: 3 });
      setAiRecommendations(result);
    } catch (error) {
      console.error("Error generating AI recommendations:", error);
      setAiError(error.message);
    } finally {
      setGeneratingRecommendations(false);
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
          <h2>AI-Powered Campaign Recommendations</h2>
          <p>Based on your audience data, industry trends, and engagement patterns, we recommend these campaign ideas.</p>
          
          {claudeApiConfigured && (
            <button 
              className="btn btn-primary" 
              onClick={generateAiRecommendations}
              disabled={generatingRecommendations}
              style={{ marginTop: "16px" }}
            >
              {generatingRecommendations ? "Generating..." : "Generate New AI Recommendations"}
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
                <strong>Note:</strong> Configure your Claude API in Settings to generate personalized AI recommendations.
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
                <strong>Error generating recommendations:</strong> {aiError}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="row" style={{ marginTop: "24px" }}>
        <div className="col col-8">
          <div className="card">
            <h3>Recommended Campaigns</h3>
            
            <ul className="recommendation-list">
              {(aiRecommendations || recommendations).map((campaign, idx) => (
                <li key={campaign.id || idx} className="recommendation-item">
                  <h4>{campaign.title}</h4>
                  <p>{campaign.description}</p>
                  
                  <div className="content-tags">
                    {campaign.platforms && campaign.platforms.map((platform, i) => (
                      <span key={i} className="badge badge-primary">{platform}</span>
                    ))}
                    
                    {campaign.contentTypes && campaign.contentTypes.map((type, i) => (
                      <span key={i} className="badge badge-secondary">{type}</span>
                    ))}
                    
                    <span className="badge badge-accent">
                      Engagement: {campaign.predictedEngagement || campaign.predicted_engagement || "4.3"}/5
                    </span>
                  </div>
                  
                  <div style={{ marginTop: "16px", backgroundColor: "var(--secondary-4)", padding: "12px", borderRadius: "8px" }}>
                    <strong>AI Insight:</strong> {campaign.aiInsight || campaign.strategic_insight || "Not available"}
                  </div>
                  
                  <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
                    <button className="btn btn-primary">Create Campaign</button>
                    <button className="btn btn-secondary">Save Idea</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="col col-4">
          <div className="card">
            <h3>Customize Recommendations</h3>
            
            <form>
              <div>
                <label htmlFor="campaign-goal">Campaign Goal</label>
                <select id="campaign-goal">
                  <option>Brand Awareness</option>
                  <option>Lead Generation</option>
                  <option>Conversion</option>
                  <option>Customer Retention</option>
                  <option>Product Launch</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="campaign-budget">Budget Range</label>
                <select id="campaign-budget">
                  <option>$0 - $500</option>
                  <option>$500 - $2,000</option>
                  <option>$2,000 - $5,000</option>
                  <option>$5,000 - $10,000</option>
                  <option>$10,000+</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="campaign-timeline">Timeline</label>
                <select id="campaign-timeline">
                  <option>1-2 weeks</option>
                  <option>2-4 weeks</option>
                  <option>1-3 months</option>
                  <option>3-6 months</option>
                  <option>6+ months</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="target-platforms">Target Platforms</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                  <div>
                    <input type="checkbox" id="platform-instagram" defaultChecked />
                    <label htmlFor="platform-instagram">Instagram</label>
                  </div>
                  <div>
                    <input type="checkbox" id="platform-facebook" defaultChecked />
                    <label htmlFor="platform-facebook">Facebook</label>
                  </div>
                  <div>
                    <input type="checkbox" id="platform-twitter" defaultChecked />
                    <label htmlFor="platform-twitter">Twitter</label>
                  </div>
                  <div>
                    <input type="checkbox" id="platform-linkedin" defaultChecked />
                    <label htmlFor="platform-linkedin">LinkedIn</label>
                  </div>
                  <div>
                    <input type="checkbox" id="platform-tiktok" />
                    <label htmlFor="platform-tiktok">TikTok</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="campaign-notes">Additional Context</label>
                <textarea id="campaign-notes" placeholder="Add any specific requirements or context for your campaign"></textarea>
              </div>
              
              <button className="btn btn-primary" style={{ width: "100%" }}>Regenerate Recommendations</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignRecommendations;