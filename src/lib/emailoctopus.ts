// EmailOctopus API integration service
// Based on EmailOctopus API v2 documentation: https://emailoctopus.com/api-documentation/v2

const EMAILOCTOPUS_API_KEY = process.env.EMAILOCTOPUS_API_KEY || 'eo_d8e594e0d5851cb61f59974459d9f762d27db783836a08372da66a3200221d8c';
const EMAILOCTOPUS_BASE_URL = 'https://api.emailoctopus.com';

export interface EmailOctopusContact {
  email_address: string;
  fields?: Record<string, any>;
  tags?: string[];
  status?: 'pending' | 'subscribed' | 'unsubscribed';
}

export interface EmailOctopusResponse {
  data?: any;
  paging?: {
    next?: {
      url: string;
      starting_after: string;
    };
  };
}

export interface EmailOctopusError {
  title: string;
  detail: string;
  status: number;
  type: string;
  errors?: Array<{
    detail: string;
    pointer: string;
  }>;
}

class EmailOctopusService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = EMAILOCTOPUS_API_KEY;
    this.baseUrl = EMAILOCTOPUS_BASE_URL;
  }

  private async makeRequest(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any
  ): Promise<EmailOctopusResponse> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      method,
      headers,
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData: EmailOctopusError = await response.json();
        throw new Error(`EmailOctopus API Error: ${errorData.title} - ${errorData.detail}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('EmailOctopus API request failed:', error);
      throw error;
    }
  }

  // Get all lists
  async getLists(): Promise<EmailOctopusResponse> {
    return this.makeRequest('/lists');
  }

  // Get contacts from a specific list
  async getContacts(listId: string, limit: number = 100, startingAfter?: string): Promise<EmailOctopusResponse> {
    let endpoint = `/lists/${listId}/contacts?limit=${limit}`;
    if (startingAfter) {
      endpoint += `&starting_after=${encodeURIComponent(startingAfter)}`;
    }
    return this.makeRequest(endpoint);
  }

  // Add a contact to a list
  async addContact(listId: string, contact: EmailOctopusContact): Promise<EmailOctopusResponse> {
    return this.makeRequest(`/lists/${listId}/contacts`, 'POST', contact);
  }

  // Create or update a contact (upsert)
  async createOrUpdateContact(listId: string, contact: EmailOctopusContact): Promise<EmailOctopusResponse> {
    return this.makeRequest(`/lists/${listId}/contacts`, 'PUT', contact);
  }

  // Get a specific contact
  async getContact(listId: string, contactId: string): Promise<EmailOctopusResponse> {
    return this.makeRequest(`/lists/${listId}/contacts/${contactId}`);
  }

  // Update a contact
  async updateContact(listId: string, contactId: string, contact: Partial<EmailOctopusContact>): Promise<EmailOctopusResponse> {
    return this.makeRequest(`/lists/${listId}/contacts/${contactId}`, 'PUT', contact);
  }

  // Delete a contact
  async deleteContact(listId: string, contactId: string): Promise<EmailOctopusResponse> {
    return this.makeRequest(`/lists/${listId}/contacts/${contactId}`, 'DELETE');
  }

  // Subscribe email to blog newsletter
  async subscribeToBlogNewsletter(email: string, additionalFields?: Record<string, any>): Promise<EmailOctopusResponse> {
    const contact: EmailOctopusContact = {
      email_address: email,
      fields: {
        source: 'blog_subscription',
        subscribed_at: new Date().toISOString(),
        ...additionalFields
      },
      tags: ['blog_subscriber', 'newsletter'],
      status: 'subscribed'
    };

    // For now, we'll use a default list ID. In production, you should:
    // 1. Create a specific list for blog subscribers
    // 2. Store the list ID in environment variables
    // 3. Use the actual list ID here
    
    // This is a placeholder - you'll need to replace with your actual list ID
    const BLOG_LIST_ID = process.env.EMAILOCTOPUS_BLOG_LIST_ID || 'your-blog-list-id';
    
    return this.createOrUpdateContact(BLOG_LIST_ID, contact);
  }

  // Check if email is already subscribed
  async isEmailSubscribed(listId: string, email: string): Promise<boolean> {
    try {
      const response = await this.getContacts(listId, 100);
      
      if (response.data && Array.isArray(response.data)) {
        return response.data.some((contact: any) => 
          contact.email_address?.toLowerCase() === email.toLowerCase()
        );
      }
      
      return false;
    } catch (error) {
      console.error('Error checking subscription status:', error);
      return false;
    }
  }
}

export const emailOctopusService = new EmailOctopusService();
export default emailOctopusService;
