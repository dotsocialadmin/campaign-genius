# CampaignGenius - AI-Powered Marketing Recommendations

CampaignGenius is a web application that uses AI and social media data to generate intelligent marketing campaign recommendations and content ideas. The application integrates with Meta Business accounts (Facebook and Instagram) and uses Claude AI to provide personalized marketing insights.

## Features

- **AI-powered marketing recommendations** for campaigns and content
- **Social media data integration** with Meta Business accounts
- **Real-time analytics** for tracking performance across platforms
- **Custom recommendation generation** based on your specific goals and requirements
- **Smart insights** generated through AI analysis of your audience data

## Technology Stack

- React.js for the frontend
- Meta API for Facebook & Instagram data
- Claude API for AI-powered recommendations
- Chart.js for data visualization
- Local Storage for client-side data persistence

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- Meta Developer account with an app that has basic Graph API permissions
- Claude API key from Anthropic

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/campaign-genius.git
cd campaign-genius
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory based on `.env.example` and add your API keys:
```
REACT_APP_META_APP_ID=your_meta_app_id
REACT_APP_CLAUDE_API_URL=https://api.anthropic.com/v1/messages
REACT_APP_CLAUDE_MODEL=claude-3-opus-20240229
```

4. Start the development server:
```bash
npm start
```

## Deployment

### Deploying with VS Code

1. Install the Azure App Service extension in VS Code if you want to deploy to Azure
2. Build the production-ready application:
```bash
npm run build
```

3. Deploy the build folder to your hosting provider
   - For Azure: Right-click on the build folder and select "Deploy to Web App"
   - For Netlify/Vercel: Connect your repository and configure the build settings

### Alternative Deployment Methods

#### Using GitHub Pages

1. Install the gh-pages package:
```bash
npm install --save-dev gh-pages
```

2. Add these lines to `package.json`:
```json
"homepage": "https://yourusername.github.io/campaign-genius",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy to GitHub Pages:
```bash
npm run deploy
```

## Configuration

### Meta API Setup

1. Go to [Meta for Developers](https://developers.facebook.com/) and create a new app
2. Enable Graph API permissions for:
   - Pages (read)
   - Instagram Basic Display
   - Marketing API
3. Add your app's Client ID to the `.env` file

### Claude API Setup

1. Sign up for an [Anthropic API key](https://console.anthropic.com/)
2. Add your API key to the `.env` file or enter it in the app's settings

## Project Structure

```
campaign-genius/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── api/
│   │   ├── MetaAPI.js
│   │   └── ClaudeAPI.js
│   ├── components/
│   │   ├── Header.js
│   │   ├── Dashboard.js
│   │   ├── CampaignRecommendations.js
│   │   ├── ContentIdeas.js
│   │   ├── Analytics.js
│   │   ├── Settings.js
│   │   ├── SetupWizard.js
│   │   └── Footer.js
│   ├── data/
│   │   └── sampleData.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Customization

### Color Palette

The application uses the following color palette, which can be customized in the CSS files:

- Primary color: #435E50
- Secondary colors: #0B0721, #DF9DB8, #EFEDE3, #E1E9F4, #4F182A
- Accent colors: #FFFFFF, #264336, #E27558

### Typography

- Primary font: Poppins (Bold, Regular, ExtraLight, and Regular Italic)
- Secondary font: The Seasons (Light, Regular, and Bold)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Meta Graph API](https://developers.facebook.com/docs/graph-api/)
- [Anthropic Claude API](https://docs.anthropic.com/claude/reference/getting-started-with-the-api)
- [React.js](https://reactjs.org/)
- [Chart.js](https://www.chartjs.org/)