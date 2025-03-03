// Claude API Integration Module
export const ClaudeAPI = {
    // Configuration
    config: {
      apiKey: null,
      apiUrl: process.env.REACT_APP_CLAUDE_API_URL || 'https://api.anthropic.com/v1/messages',
      model: process.env.REACT_APP_CLAUDE_MODEL || 'claude-3-opus-20240229',
      maxTokens: 4000
    },
    
    // State variables
    state: {
      isConfigured: false,
      error: null
    },
    
    // Initialize with API key
    initialize(apiKey) {
      if (!apiKey || apiKey.trim() === '') {
        this.state.isConfigured = false;
        this.state.error = 'API key is required';
        return Promise.reject(new Error('API key is required'));
      }
      
      this.config.apiKey = apiKey;
      this.state.isConfigured = true;
      this.state.error = null;
      
      return Promise.resolve();
    },
    
    // Make a request to Claude API
    async makeRequest(prompt, options = {}) {
      if (!this.state.isConfigured) {
        this.state.error = 'API not configured';
        return Promise.reject(new Error('API not configured'));
      }
      
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.config.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: options.model || this.config.model,
          max_tokens: options.maxTokens || this.config.maxTokens,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      };
      
      try {
        const response = await fetch(this.config.apiUrl, requestOptions);
        
        if (!response.ok) {
          const errorData = await response.json();
          this.state.error = errorData.error || 'API request failed';
          throw new Error(`API request failed: ${this.state.error}`);
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        this.state.error = error.message;
        throw error;
      }
    },
    
    // Test the API connection
    async testConnection() {
      if (!this.state.isConfigured) {
        this.state.error = 'API not configured';
        return Promise.reject(new Error('API not configured'));
      }
      
      try {
        const response = await this.makeRequest('Hello, please respond with just the word "Connected" to verify the API connection is working.');
        
        if (response && response.content && response.content.includes('Connected')) {
          return Promise.resolve(true);
        } else {
          this.state.error = 'Unexpected response from API';
          return Promise.reject(new Error('Unexpected response from API'));
        }
      } catch (error) {
        this.state.error = error.message;
        return Promise.reject(error);
      }
    },
    
    // Generate campaign recommendations based on data
    async generateCampaignRecommendations(data, options = {}) {
      const prompt = `
        I need marketing campaign recommendations based on the following social media data:
        
        ${JSON.stringify(data, null, 2)}
        
        Please generate ${options.count || 5} campaign ideas with the following information for each:
        1. Campaign title
        2. Brief description
        3. Target platforms (which social media platforms would work best)
        4. Content types to create
        5. Expected engagement prediction
        6. Strategic insight explaining why this would work well
        
        Format the response as JSON with an array of campaign objects.
      `;
      
      try {
        const response = await this.makeRequest(prompt);
        // Parse JSON from the response text
        const jsonResponse = this.extractJSON(response.content);
        return jsonResponse;
      } catch (error) {
        this.state.error = error.message;
        throw error;
      }
    },
    
    // Generate content ideas based on data
    async generateContentIdeas(data, options = {}) {
      const prompt = `
        I need creative content ideas based on the following social media data:
        
        ${JSON.stringify(data, null, 2)}
        
        Please generate ${options.count || 5} content ideas with the following information for each:
        1. Content title
        2. Description
        3. Format (e.g., Video Series, Carousel Post, etc.)
        4. Predicted engagement (on a scale of 1-5)
        5. Example of how this would be executed
        
        Format the response as JSON with an array of content idea objects.
      `;
      
      try {
        const response = await this.makeRequest(prompt);
        // Parse JSON from the response text
        const jsonResponse = this.extractJSON(response.content);
        return jsonResponse;
      } catch (error) {
        this.state.error = error.message;
        throw error;
      }
    },
    
    // Generate insights from social media data
    async generateInsights(data) {
      const prompt = `
        Please analyze this social media data and provide strategic insights:
        
        ${JSON.stringify(data, null, 2)}
        
        Generate insights about:
        1. Audience behavior patterns
        2. Content performance analysis
        3. Strategic recommendations
        4. Growth opportunities
        
        Format the response as JSON with an array of insight objects, each with a title and description.
      `;
      
      try {
        const response = await this.makeRequest(prompt);
        // Parse JSON from the response text
        const jsonResponse = this.extractJSON(response.content);
        return jsonResponse;
      } catch (error) {
        this.state.error = error.message;
        throw error;
      }
    },
    
    // Extract JSON from a text response
    extractJSON(text) {
      try {
        // Find content between ```json and ``` or just find JSON-like content
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/);
        
        if (jsonMatch && jsonMatch[1]) {
          return JSON.parse(jsonMatch[1]);
        } else if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        
        // If no JSON format found, try to parse the whole response
        return JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse JSON from response:', e);
        throw new Error('Failed to parse JSON from AI response');
      }
    }
  };