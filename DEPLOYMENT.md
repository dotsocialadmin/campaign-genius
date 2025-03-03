# Deployment Guide for CampaignGenius

This guide provides detailed instructions for deploying the CampaignGenius application using VS Code and other methods.

## Deployment via VS Code

### Prerequisites

1. Install VS Code if you haven't already: [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Install the required extensions:
   - For Azure: [Azure App Service extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice)
   - For general deployment: [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (for testing)

### Preparing the Application for Deployment

1. Ensure you have created a production build:
```bash
npm run build
```

2. Test the build locally (using Live Server):
   - Open VS Code
   - Right-click on the `build/index.html` file
   - Select "Open with Live Server"
   - Verify that the application works correctly

### Option 1: Deploying to Azure App Service

1. Sign in to your Azure account in VS Code:
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
   - Type "Azure: Sign In" and follow the authentication steps

2. Deploy the application:
   - Click on the Azure extension icon in the Activity Bar
   - Expand your subscription
   - Right-click on "App Services"
   - Select "Create New Web App"
   - Follow the prompts to create a new web app
   - When prompted for the folder to deploy, select the `build` folder

3. Configure the web app:
   - Set up continuous deployment if desired
   - Configure environment variables in the Azure portal (for API keys)

### Option 2: Deploying to GitHub Pages

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

4. Configure GitHub Pages in your repository settings:
   - Go to your GitHub repository
   - Navigate to Settings > Pages
   - Set the source to the gh-pages branch

### Option 3: Deploying to Netlify

1. Install the Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build your application:
```bash
npm run build
```

3. Deploy with Netlify:
```bash
netlify deploy
```

4. Follow the prompts:
   - Select "Create & configure a new site"
   - Choose a team
   - Provide a site name (optional)
   - When asked for the publish directory, enter "build"

5. Preview the deployment:
   - Netlify will provide a preview URL
   - Verify that everything works correctly

6. Deploy to production:
```bash
netlify deploy --prod
```

## Environment Variables

For security reasons, API keys should be set as environment variables. Here's how to do it on different platforms:

### Local Development
Create a `.env` file in the root directory with:
```
REACT_APP_META_APP_ID=your_meta_app_id
REACT_APP_CLAUDE_API_URL=https://api.anthropic.com/v1/messages
REACT_APP_CLAUDE_MODEL=claude-3-opus-20240229
```

### Azure App Service
1. Go to your App Service in the Azure Portal
2. Navigate to Settings > Configuration
3. Add new application settings for each environment variable

### Netlify
1. Go to your site dashboard on Netlify
2. Navigate to Site settings > Build & deploy > Environment
3. Add environment variables there

### GitHub Pages
Since GitHub Pages is a static hosting service, environment variables need to be embedded during the build process. For security, consider using GitHub Actions with secrets:

1. Add your secrets in GitHub repository settings
2. Create a workflow file that builds your app with the variables injected

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Verify that your API keys are correctly set in environment variables
   - Check CORS settings if applicable
   - Verify that your Meta app has the required permissions

2. **Routing Issues**
   - For GitHub Pages or similar static hosts, ensure your app uses hash routing
   - Add a `404.html` file that redirects to `index.html`

3. **Build Errors**
   - Check the console for specific error messages
   - Ensure all dependencies are installed (`npm install`)
   - Verify Node.js version compatibility

### Getting Help

If you encounter issues not covered in this guide:

1. Check the project's GitHub issues
2. Consult the documentation for the hosting platform you're using
3. Reach out to the development team for assistance

## Post-Deployment Steps

1. **Verify Authentication**:
   - Confirm that Meta login works correctly
   - Verify Claude API integration works

2. **Set Up Monitoring**:
   - Configure error tracking (e.g., Sentry)
   - Set up analytics (e.g., Google Analytics)

3. **Performance Optimization**:
   - Use Lighthouse to analyze the deployed application
   - Make necessary optimizations based on the results

## Updates and Maintenance

1. **Updating the Application**:
   - Make changes to the codebase
   - Test locally
   - Follow the same deployment process

2. **Version Control**:
   - Tag releases in your repository
   - Maintain a changelog

3. **Regular Maintenance**:
   - Keep dependencies updated (`npm audit fix`)
   - Monitor API usage and limits
   - Check for any deprecation notices from Meta or Claude APIs