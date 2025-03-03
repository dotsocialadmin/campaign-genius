// Meta API Integration Module
export const MetaAPI = {
    // Configuration
    config: {
      appId: process.env.REACT_APP_META_APP_ID || 'YOUR_APP_ID',
      apiVersion: 'v18.0',
      scopes: [
        'pages_show_list',
        'pages_read_engagement',
        'instagram_basic',
        'instagram_content_publish',
        'instagram_manage_insights',
        'ads_management',
        'ads_read',
        'business_management',
        'public_profile',
        'email'
      ]
    },
    
    // State variables
    state: {
      isInitialized: false,
      isLoggedIn: false,
      accessToken: null,
      userId: null,
      userPages: [],
      selectedPageId: null,
      selectedPageToken: null,
      instagramAccounts: [],
      selectedInstagramId: null,
      error: null
    },
    
    // Initialize the Facebook SDK
    initialize() {
      return new Promise((resolve, reject) => {
        if (window.FB) {
          this.state.isInitialized = true;
          resolve();
          return;
        }
        
        window.fbAsyncInit = () => {
          window.FB.init({
            appId: this.config.appId,
            cookie: true,
            xfbml: true,
            version: this.config.apiVersion
          });
          
          this.state.isInitialized = true;
          this.checkLoginStatus()
            .then(() => resolve())
            .catch(error => reject(error));
        };
      });
    },
    
    // Check if user is logged in
    checkLoginStatus() {
      return new Promise((resolve, reject) => {
        if (!this.state.isInitialized) {
          reject(new Error('SDK not initialized'));
          return;
        }
        
        window.FB.getLoginStatus(response => {
          if (response.status === 'connected') {
            this.state.isLoggedIn = true;
            this.state.accessToken = response.authResponse.accessToken;
            this.state.userId = response.authResponse.userID;
            resolve(true);
          } else {
            this.state.isLoggedIn = false;
            this.state.accessToken = null;
            this.state.userId = null;
            resolve(false);
          }
        });
      });
    },
    
    // Login with Facebook
    login() {
      return new Promise((resolve, reject) => {
        if (!this.state.isInitialized) {
          reject(new Error('SDK not initialized'));
          return;
        }
        
        window.FB.login(response => {
          if (response.authResponse) {
            this.state.isLoggedIn = true;
            this.state.accessToken = response.authResponse.accessToken;
            this.state.userId = response.authResponse.userID;
            resolve(response);
          } else {
            reject(new Error('User cancelled login or did not fully authorize'));
          }
        }, { scope: this.config.scopes.join(',') });
      });
    },
    
    // Logout
    logout() {
      return new Promise((resolve, reject) => {
        if (!this.state.isInitialized) {
          reject(new Error('SDK not initialized'));
          return;
        }
        
        window.FB.logout(response => {
          this.state.isLoggedIn = false;
          this.state.accessToken = null;
          this.state.userId = null;
          this.state.userPages = [];
          this.state.selectedPageId = null;
          this.state.selectedPageToken = null;
          this.state.instagramAccounts = [];
          this.state.selectedInstagramId = null;
          resolve(response);
        });
      });
    },
    
    // Get user's Facebook pages
    getPages() {
      return new Promise((resolve, reject) => {
        if (!this.state.isLoggedIn) {
          reject(new Error('User not logged in'));
          return;
        }
        
        window.FB.api('/me/accounts', response => {
          if (response.error) {
            this.state.error = response.error;
            reject(response.error);
            return;
          }
          
          this.state.userPages = response.data;
          resolve(response.data);
        });
      });
    },
    
    // Select a page to work with
    selectPage(pageId) {
      const page = this.state.userPages.find(p => p.id === pageId);
      if (!page) {
        return Promise.reject(new Error('Page not found'));
      }
      
      this.state.selectedPageId = pageId;
      this.state.selectedPageToken = page.access_token;
      
      return Promise.resolve(page);
    },
    
    // Get Instagram accounts connected to the selected page
    getInstagramAccounts() {
      return new Promise((resolve, reject) => {
        if (!this.state.selectedPageId) {
          reject(new Error('No page selected'));
          return;
        }
        
        const pageId = this.state.selectedPageId;
        const pageToken = this.state.selectedPageToken;
        
        window.FB.api(
          `/${pageId}?fields=instagram_business_account&access_token=${pageToken}`,
          response => {
            if (response.error) {
              this.state.error = response.error;
              reject(response.error);
              return;
            }
            
            if (response.instagram_business_account) {
              this.state.instagramAccounts = [response.instagram_business_account];
              this.state.selectedInstagramId = response.instagram_business_account.id;
              resolve([response.instagram_business_account]);
            } else {
              this.state.instagramAccounts = [];
              resolve([]);
            }
          }
        );
      });
    },
    
    // Get page insights
    getPageInsights(metrics, period = 'day', daysAgo = 30) {
      return new Promise((resolve, reject) => {
        if (!this.state.selectedPageId) {
          reject(new Error('No page selected'));
          return;
        }
        
        const pageId = this.state.selectedPageId;
        const pageToken = this.state.selectedPageToken;
        const since = Math.floor(Date.now() / 1000) - (daysAgo * 24 * 60 * 60);
        const until = Math.floor(Date.now() / 1000);
        
        window.FB.api(
          `/${pageId}/insights`,
          'GET',
          {
            metric: metrics.join(','),
            period: period,
            since: since,
            until: until,
            access_token: pageToken
          },
          response => {
            if (response.error) {
              this.state.error = response.error;
              reject(response.error);
              return;
            }
            
            resolve(response.data);
          }
        );
      });
    },
    
    // Get page posts
    getPagePosts(limit = 10) {
      return new Promise((resolve, reject) => {
        if (!this.state.selectedPageId) {
          reject(new Error('No page selected'));
          return;
        }
        
        const pageId = this.state.selectedPageId;
        const pageToken = this.state.selectedPageToken;
        
        window.FB.api(
          `/${pageId}/posts`,
          'GET',
          {
            fields: 'id,message,created_time,permalink_url,full_picture,attachments,insights.metric(post_impressions,post_engagements){values}',
            limit: limit,
            access_token: pageToken
          },
          response => {
            if (response.error) {
              this.state.error = response.error;
              reject(response.error);
              return;
            }
            
            resolve(response.data);
          }
        );
      });
    },
    
    // Get Instagram insights
    getInstagramInsights(metrics, period = 'day', daysAgo = 30) {
      return new Promise((resolve, reject) => {
        if (!this.state.selectedInstagramId) {
          reject(new Error('No Instagram account selected'));
          return;
        }
        
        const igId = this.state.selectedInstagramId;
        const pageToken = this.state.selectedPageToken;
        const since = Math.floor(Date.now() / 1000) - (daysAgo * 24 * 60 * 60);
        const until = Math.floor(Date.now() / 1000);
        
        window.FB.api(
          `/${igId}/insights`,
          'GET',
          {
            metric: metrics.join(','),
            period: period,
            since: since,
            until: until,
            access_token: pageToken
          },
          response => {
            if (response.error) {
              this.state.error = response.error;
              reject(response.error);
              return;
            }
            
            resolve(response.data);
          }
        );
      });
    },
    
    // Get Instagram media
    getInstagramMedia(limit = 10) {
      return new Promise((resolve, reject) => {
        if (!this.state.selectedInstagramId) {
          reject(new Error('No Instagram account selected'));
          return;
        }
        
        const igId = this.state.selectedInstagramId;
        const pageToken = this.state.selectedPageToken;
        
        window.FB.api(
          `/${igId}/media`,
          'GET',
          {
            fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count,insights.metric(impressions,reach,engagement)',
            limit: limit,
            access_token: pageToken
          },
          response => {
            if (response.error) {
              this.state.error = response.error;
              reject(response.error);
              return;
            }
            
            resolve(response.data);
          }
        );
      });
    },
    
    // Get audience demographics for the Instagram account
    getInstagramAudience() {
      return new Promise((resolve, reject) => {
        if (!this.state.selectedInstagramId) {
          reject(new Error('No Instagram account selected'));
          return;
        }
        
        const igId = this.state.selectedInstagramId;
        const pageToken = this.state.selectedPageToken;
        
        window.FB.api(
          `/${igId}/insights`,
          'GET',
          {
            metric: 'audience_gender_age,audience_country,audience_city,audience_locale,online_followers',
            period: 'lifetime',
            access_token: pageToken
          },
          response => {
            if (response.error) {
              this.state.error = response.error;
              reject(response.error);
              return;
            }
            
            resolve(response.data);
          }
        );
      });
    },
    
    // Get all necessary data for the dashboard
    fetchDashboardData() {
      return new Promise(async (resolve, reject) => {
        try {
          if (!this.state.isLoggedIn) {
            await this.login();
          }
          
          const pages = await this.getPages();
          if (pages.length > 0) {
            await this.selectPage(pages[0].id);
            
            const instagramAccounts = await this.getInstagramAccounts();
            
            // Fetch Facebook data
            const pageInsights = await this.getPageInsights([
              'page_impressions',
              'page_engaged_users',
              'page_post_engagements',
              'page_fans'
            ]);
            
            const pagePosts = await this.getPagePosts(20);
            
            // Fetch Instagram data if available
            let instagramInsights = [];
            let instagramMedia = [];
            let instagramAudience = [];
            
            if (instagramAccounts.length > 0) {
              instagramInsights = await this.getInstagramInsights([
                'impressions',
                'reach',
                'profile_views',
                'follower_count'
              ]);
              
              instagramMedia = await this.getInstagramMedia(20);
              instagramAudience = await this.getInstagramAudience();
            }
            
            // Process and format the data
            const dashboardData = {
              facebook: {
                insights: pageInsights,
                posts: pagePosts
              },
              instagram: {
                insights: instagramInsights,
                media: instagramMedia,
                audience: instagramAudience
              }
            };
            
            resolve(dashboardData);
          } else {
            reject(new Error('No Facebook Pages found'));
          }
        } catch (error) {
          this.state.error = error;
          reject(error);
        }
      });
    },
    
    // Process insights data for visualization
    processInsightsForCharts(insights) {
      // Transform insights data into format suitable for charts
      const chartData = {};
      
      insights.forEach(insight => {
        const metricName = insight.name;
        const values = insight.values.map(value => ({
          date: new Date(value.end_time).toLocaleDateString(),
          value: value.value
        }));
        
        chartData[metricName] = values;
      });
      
      return chartData;
    },
    
    // Process audience data for visualization
    processAudienceForCharts(audienceData) {
      const chartData = {};
      
      audienceData.forEach(data => {
        const metricName = data.name;
        
        switch (metricName) {
          case 'audience_gender_age':
            chartData.genderAge = Object.entries(data.values[0].value).map(([key, value]) => {
              const [gender, age] = key.split('.');
              return { gender, age, value };
            });
            break;
            
          case 'audience_country':
            chartData.countries = Object.entries(data.values[0].value)
              .map(([key, value]) => ({ country: key, value }))
              .sort((a, b) => b.value - a.value)
              .slice(0, 10);
            break;
            
          case 'audience_city':
            chartData.cities = Object.entries(data.values[0].value)
              .map(([key, value]) => ({ city: key, value }))
              .sort((a, b) => b.value - a.value)
              .slice(0, 10);
            break;
            
          case 'online_followers':
            chartData.onlineHours = data.values[0].value;
            break;
            
          default:
            break;
        }
      });
      
      return chartData;
    }
  };