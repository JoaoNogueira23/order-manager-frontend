// lib/config.ts
export function getGlobalUrls() {
    return {
      url_api: process.env.URL_API || 'https://api.exemplo.com',
      url_webhook: process.env.URL_WEBHOOK || 'https://webhook.exemplo.com',
    };
  }
  