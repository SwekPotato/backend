module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
      {
        name: 'letsunite',
        script: './index.js',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  }