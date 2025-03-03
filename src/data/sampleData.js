// Sample data for the application
export const socialMediaData = {
    facebook: {
      followers: 12450,
      engagement: 3.2,
      topPosts: [
        { id: 1, content: "Our new product launch is just around the corner! #ExcitingNews", engagement: 543 },
        { id: 2, content: "Customer spotlight: How Brand X transformed their marketing strategy", engagement: 421 },
        { id: 3, content: "5 tips for improving your digital marketing ROI", engagement: 389 }
      ],
      demographics: {
        age: { "18-24": 15, "25-34": 32, "35-44": 28, "45-54": 18, "55+": 7 },
        gender: { "male": 42, "female": 56, "other": 2 }
      }
    },
    instagram: {
      followers: 28750,
      engagement: 4.7,
      topPosts: [
        { id: 1, content: "Behind the scenes at our creative studio! #WorkLife", engagement: 1244 },
        { id: 2, content: "Our team volunteering at the local community garden this weekend", engagement: 982 },
        { id: 3, content: "Product feature: The innovation behind our latest release", engagement: 876 }
      ],
      demographics: {
        age: { "18-24": 28, "25-34": 40, "35-44": 22, "45-54": 7, "55+": 3 },
        gender: { "male": 38, "female": 60, "other": 2 }
      }
    },
    twitter: {
      followers: 8920,
      engagement: 2.1,
      topPosts: [
        { id: 1, content: "We're excited to announce our partnership with @TechCorp! #Innovation", engagement: 342 },
        { id: 2, content: "Join our webinar next Tuesday to learn about emerging trends in digital marketing", engagement: 287 },
        { id: 3, content: "Q&A with our CEO: The future of sustainable business practices", engagement: 231 }
      ],
      demographics: {
        age: { "18-24": 22, "25-34": 35, "35-44": 25, "45-54": 12, "55+": 6 },
        gender: { "male": 53, "female": 45, "other": 2 }
      }
    },
    linkedin: {
      followers: 5680,
      engagement: 3.8,
      topPosts: [
        { id: 1, content: "We're hiring! Check out our open positions in marketing and design", engagement: 421 },
        { id: 2, content: "Our latest case study: How we helped Company Y increase their conversion rates by 45%", engagement: 387 },
        { id: 3, content: "Thought leadership: Our CMO's take on the future of AI in marketing", engagement: 356 }
      ],
      demographics: {
        age: { "18-24": 8, "25-34": 36, "35-44": 32, "45-54": 18, "55+": 6 },
        gender: { "male": 58, "female": 41, "other": 1 }
      }
    }
  };
  
  export const industryTrends = [
    { id: 1, name: "Sustainable Marketing", growth: 42, relevance: 9.2 },
    { id: 2, name: "User-Generated Content", growth: 38, relevance: 8.7 },
    { id: 3, name: "Short-form Video", growth: 65, relevance: 9.5 },
    { id: 4, name: "AI-Powered Personalization", growth: 53, relevance: 8.9 },
    { id: 5, name: "Social Commerce", growth: 47, relevance: 8.3 }
  ];
  
  export const campaignRecommendations = [
    {
      id: 1,
      title: "Eco-Friendly Product Showcase",
      description: "Highlight your sustainable practices and eco-friendly products with a series of behind-the-scenes content.",
      platforms: ["Instagram", "Facebook"],
      contentTypes: ["Video", "Carousel"],
      predictedEngagement: 4.8,
      aiInsight: "Your audience shows high engagement with sustainability content. Authentic behind-the-scenes material performs 43% better than standard product photos."
    },
    {
      id: 2,
      title: "User Testimonial Campaign",
      description: "Feature real customers sharing their experiences with your products through short video testimonials.",
      platforms: ["Instagram", "TikTok"],
      contentTypes: ["Video", "Stories"],
      predictedEngagement: 5.2,
      aiInsight: "User-generated content receives 52% higher trust scores. Your audience demographics align with platforms prioritizing authentic testimonials."
    },
    {
      id: 3,
      title: "Industry Expert Webinar Series",
      description: "Host monthly webinars with industry experts discussing relevant topics and featuring your solutions.",
      platforms: ["LinkedIn", "YouTube"],
      contentTypes: ["Live Video", "Long-form Content"],
      predictedEngagement: 3.9,
      aiInsight: "Your LinkedIn audience shows strong interest in educational content. B2B decision-makers in your target demographic consume 3.2 hours of thought leadership content weekly."
    },
    {
      id: 4,
      title: "Interactive Product Quiz",
      description: "Create an engaging quiz that helps users identify which of your products best suits their needs.",
      platforms: ["Instagram", "Facebook"],
      contentTypes: ["Interactive", "Stories"],
      predictedEngagement: 4.3,
      aiInsight: "Interactive content generates 2x more conversions than passive content. Your audience demographic responds positively to personalized recommendations."
    },
    {
      id: 5,
      title: "Limited-Time Flash Sale",
      description: "Run a 24-hour flash sale promoted primarily through social media with countdown timers.",
      platforms: ["Instagram", "Facebook", "Email"],
      contentTypes: ["Stories", "Ads"],
      predictedEngagement: 4.6,
      aiInsight: "Your audience shows high response rates to limited-time offers. Previous flash sales have generated 3.7x normal daily revenue."
    }
  ];
  
  export const contentIdeas = [
    {
      id: 1,
      title: "Day in the Life: Behind the Scenes",
      description: "Show a day in the life of your team members, showcasing your company culture and human side.",
      format: "Video Series",
      predictedEngagement: 4.7,
      example: "A series of short videos following different team members as they work on projects, interact with clients, and collaborate with colleagues."
    },
    {
      id: 2,
      title: "Customer Success Stories",
      description: "Feature real customers sharing how your product or service has helped them solve a problem or achieve a goal.",
      format: "Video Testimonials",
      predictedEngagement: 4.9,
      example: "Short, authentic videos of customers explaining their challenges before using your product and the results they've achieved after implementation."
    },
    {
      id: 3,
      title: "Educational Infographics",
      description: "Create visually appealing infographics that educate your audience about topics relevant to your industry.",
      format: "Static Infographics",
      predictedEngagement: 3.8,
      example: "A series of infographics breaking down complex industry concepts, trends, or processes in an easy-to-understand visual format."
    },
    {
      id: 4,
      title: "Weekly Tips & Tricks",
      description: "Share helpful tips related to your product or industry expertise in a consistent weekly format.",
      format: "Carousel Posts",
      predictedEngagement: 4.2,
      example: "Monday Masterclass series with 5-7 carousel slides offering practical advice, hacks, or insights that provide immediate value to your audience."
    },
    {
      id: 5,
      title: "Interactive Product Demo",
      description: "Create engaging demonstrations of your product features and benefits in an interactive format.",
      format: "Live Demos or Interactive Stories",
      predictedEngagement: 4.5,
      example: "Live streams or interactive story sequences where you walk through product features and answer questions in real-time from potential customers."
    }
  ];