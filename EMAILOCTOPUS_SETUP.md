# EmailOctopus Newsletter Integration Setup Guide

## Overview
This guide explains how to set up EmailOctopus newsletter subscription functionality for the blog section of your website.

## Prerequisites
1. EmailOctopus account (sign up at https://emailoctopus.com)
2. API key from EmailOctopus dashboard

## Setup Steps

### 1. Get Your EmailOctopus API Key
1. Log in to your EmailOctopus account
2. Go to Account Settings → API Keys
3. Create a new API key
4. Copy the API key (it starts with `eo_`)

### 2. Create a List for Blog Subscribers
1. In your EmailOctopus dashboard, go to Lists
2. Create a new list called "Blog Subscribers" or similar
3. Note down the List ID (you'll need this for the API)

### 3. Configure Environment Variables
Add these variables to your `.env.local` file:

```bash
# EmailOctopus API Key
EMAILOCTOPUS_API_KEY=your_api_key_here

# EmailOctopus List ID for blog subscribers
EMAILOCTOPUS_BLOG_LIST_ID=your_list_id_here
```

### 4. Update the Service Configuration
In `src/lib/emailoctopus.ts`, replace the placeholder list ID with your actual list ID:

```typescript
// Replace this line:
const BLOG_LIST_ID = process.env.EMAILOCTOPUS_BLOG_LIST_ID || 'your-blog-list-id';

// With your actual list ID:
const BLOG_LIST_ID = process.env.EMAILOCTOPUS_BLOG_LIST_ID || 'your-actual-list-id';
```

## Features Implemented

### NewsletterSubscription Component
- **Location**: `src/components/NewsletterSubscription.tsx`
- **Features**:
  - Email validation
  - Loading states
  - Success/error messages
  - Multilingual support (Arabic/English)
  - Compact and full-size modes
  - Form submission handling

### API Integration
- **Service**: `src/lib/emailoctopus.ts`
- **API Route**: `src/pages/api/newsletter/subscribe.ts`
- **Features**:
  - EmailOctopus API v2 integration
  - Contact creation/updating
  - Duplicate email handling
  - Error handling and validation

### Integration Points
1. **Blog Page**: Full newsletter subscription form at the bottom
2. **Blog Detail Page**: Compact subscription form after blog content

## API Endpoints

### POST /api/newsletter/subscribe
Subscribes an email to the newsletter.

**Request Body:**
```json
{
  "email": "user@example.com",
  "firstName": "John", // optional
  "lastName": "Doe",   // optional
  "source": "blog"     // optional, defaults to "blog"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "data": { /* EmailOctopus response */ }
}
```

**Response (Error):**
```json
{
  "error": "Email already subscribed",
  "message": "This email address is already subscribed to our newsletter",
  "field": "email"
}
```

## Testing

### 1. Test API Connection
You can test the EmailOctopus API connection by making a request to get your lists:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.emailoctopus.com/lists
```

### 2. Test Newsletter Subscription
1. Start your development server: `npm run dev`
2. Navigate to `/blog`
3. Scroll to the newsletter subscription form
4. Enter a test email address
5. Click "Subscribe"
6. Check your EmailOctopus dashboard for the new subscriber

## Troubleshooting

### Common Issues

1. **"Invalid API Key" Error**
   - Verify your API key is correct
   - Ensure the API key has the necessary permissions

2. **"List Not Found" Error**
   - Verify your list ID is correct
   - Ensure the list exists in your EmailOctopus account

3. **"Email Already Subscribed" Error**
   - This is expected behavior for duplicate emails
   - The system will show a user-friendly message

4. **CORS Issues**
   - Ensure your domain is properly configured in EmailOctopus
   - Check that API requests are coming from allowed origins

### Debug Mode
To enable debug logging, add this to your environment variables:
```bash
DEBUG_EMAILOCTOPUS=true
```

## Security Considerations

1. **API Key Security**
   - Never expose your API key in client-side code
   - Use environment variables for all sensitive data
   - Consider using different API keys for different environments

2. **Rate Limiting**
   - EmailOctopus has rate limits (10 requests/second, 100 burst)
   - Implement proper error handling for rate limit responses

3. **Data Privacy**
   - Ensure compliance with GDPR and other privacy regulations
   - Implement proper consent mechanisms
   - Provide unsubscribe options

## Next Steps

1. **Customize Email Templates**
   - Create welcome emails for new subscribers
   - Set up automated blog post notifications

2. **Analytics Integration**
   - Track subscription rates
   - Monitor email engagement

3. **Advanced Features**
   - Segment subscribers by interests
   - Implement double opt-in
   - Add subscription preferences

## Support

For issues with this integration:
1. Check the EmailOctopus API documentation: https://emailoctopus.com/api-documentation/v2
2. Review the console logs for error messages
3. Test API connectivity using the curl commands above

For EmailOctopus-specific issues, contact their support team.
