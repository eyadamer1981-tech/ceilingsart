import { NextApiRequest, NextApiResponse } from 'next';
import { emailOctopusService } from '../../../lib/emailoctopus';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstName, lastName, source = 'blog' } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({ 
        error: 'Valid email address is required',
        field: 'email'
      });
    }

    // Prepare additional fields
    const additionalFields: Record<string, any> = {
      source,
      subscribed_at: new Date().toISOString(),
    };

    if (firstName) additionalFields.first_name = firstName;
    if (lastName) additionalFields.last_name = lastName;

    // Subscribe to EmailOctopus
    const result = await emailOctopusService.subscribeToBlogNewsletter(email, additionalFields);

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: result
    });

  } catch (error: any) {
    console.error('Newsletter subscription error:', error);

    // Handle specific EmailOctopus errors
    if (error.message.includes('EmailOctopus API Error')) {
      return res.status(400).json({
        error: 'Subscription failed',
        message: error.message,
        details: 'Please try again or contact support if the issue persists'
      });
    }

    // Handle duplicate email (already subscribed)
    if (error.message.includes('already-exists') || error.message.includes('already exists')) {
      return res.status(409).json({
        error: 'Email already subscribed',
        message: 'This email address is already subscribed to our newsletter',
        field: 'email'
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong. Please try again later.'
    });
  }
}
