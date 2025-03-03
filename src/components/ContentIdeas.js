import React, { useState } from 'react';
import { ClaudeAPI } from '../api/ClaudeAPI';

const ContentIdeas = ({ isLoading, contentIdeas, claudeApiConfigured, socialMediaData }) => {
  const [generatingIdeas, setGeneratingIdeas] = useState(false);
  const [aiContentIdeas, setAiContentIdeas] = useState(null);
  const [aiError, setAiError] = useState(null);
  
  const generateAiContentIdeas = async () => {
    if (!claudeApiConfigured) {
      alert("Please configure your Claude API in Settings first.");
      return;
    }
    
    setGeneratingIdeas(true);
    setAiError(null);
    
    try {
      const result = await ClaudeAPI.generateContentIdeas(socialMediaData, { count: 5 });
      setAiContentIdeas(result);
    } catch (error) {
      console.error("Error generating AI content ideas:", error);
      setAiError(error.message);
    } finally {
      setGeneratingIdeas(false);
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
          <h2>AI-Generated Content Ideas</h2>
          <p>Fresh content concepts tailored to your audience's preferences and engagement patterns.</p>
          
          {claudeApiConfigured && (
            <button 
              className="btn btn-primary" 
              onClick={generateAiContentIdeas}
              disabled={generatingIdeas}
              style={{ marginTop: "16px" }}
            >
              {generatingIdeas ? "Generating..." : "Generate New AI Content Ideas"}
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
                <strong>Note:</strong> Configure your Claude API in Settings to generate personalized AI content ideas.
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
                <strong>Error generating content ideas:</strong> {aiError}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="row" style={{ marginTop: "24px" }}>
        <div className="col col-8">
          {(aiContentIdeas || contentIdeas).map((idea, idx) => (
            <div key={idea.id || idx} className="card" style={{ marginBottom: "24px" }}>
              <h3>{idea.title}</h3>
              <span className="badge badge-primary">{idea.format}</span>
              <span className="badge badge-accent">Predicted Engagement: {idea.predictedEngagement || idea.predicted_engagement || "4.5"}/5</span>
              
              <p style={{ marginTop: "16px" }}>{idea.description}</p>
              
              <div style={{ backgroundColor: "var(--secondary-4)", padding: "16px", borderRadius: "8px", marginTop: "16px" }}>
                <strong>Example:</strong> {idea.example}
              </div>
              
              <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
                <button className="btn btn-primary">Create Content</button>
                <button className="btn btn-secondary">Save Idea</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="col col-4">
          <div className="card">
            <h3>Generate Custom Content Ideas</h3>
            
            <form>
              <div>
                <label htmlFor="content-type">Content Type</label>
                <select id="content-type">
                  <option>All Types</option>
                  <option>Video</option>
                  <option>Image Posts</option>
                  <option>Carousels</option>
                  <option>Stories</option>
                  <option>Live Streams</option>
                  <option>Blog Content</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="content-goal">Content Goal</label>
                <select id="content-goal">
                  <option>Engagement</option>
                  <option>Education</option>
                  <option>Entertainment</option>
                  <option>Conversion</option>
                  <option>Brand Awareness</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="content-tone">Content Tone</label>
                <select id="content-tone">
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Humorous</option>
                  <option>Inspirational</option>
                  <option>Educational</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="content-theme">Content Theme</label>
                <input type="text" id="content-theme" placeholder="e.g., Sustainability, Innovation" />
              </div>
              
              <div>
                <label htmlFor="content-notes">Additional Context</label>
                <textarea id="content-notes" placeholder="Provide any specific details or requirements for your content"></textarea>
              </div>
              
              <button className="btn btn-primary" style={{ width: "100%" }}>Generate Custom Ideas</button>
            </form>
          </div>
          
          <div className="card" style={{ marginTop: "24px" }}>
            <h3>Content Calendar</h3>
            <p>Schedule your content ideas in your marketing calendar</p>
            
            <div style={{ marginTop: "16px", backgroundColor: "var(--secondary-4)", padding: "16px", borderRadius: "8px", textAlign: "center" }}>
              <p>Connect your content calendar to schedule ideas directly</p>
              <div style={{ marginTop: "16px", display: "flex", gap: "8px", justifyContent: "center" }}>
                <button className="btn btn-secondary">Connect Google Calendar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentIdeas;