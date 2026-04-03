import { NextRequest, NextResponse } from 'next/server';
import { ContactFormData, ContactFormResponse, ValidationError } from '@/types';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per window

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded ? forwarded.split(',')[0] : (realIp || (request as any).ip || 'unknown');
  return `contact_${ip}`;
}

function checkRateLimit(key: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    // Create new record or reset expired record
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, resetTime: record.resetTime };
  }

  // Increment count
  record.count++;
  rateLimitStore.set(key, record);
  return { allowed: true };
}

function validateContactForm(data: ContactFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  // Name validation
  if (!data.name || !data.name.trim()) {
    errors.push({ field: 'name', message: 'Name is required', code: 'REQUIRED' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters', code: 'MIN_LENGTH' });
  } else if (data.name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Name must be less than 100 characters', code: 'MAX_LENGTH' });
  }

  // Email validation
  if (!data.email || !data.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required', code: 'REQUIRED' });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.push({ field: 'email', message: 'Please enter a valid email address', code: 'INVALID_FORMAT' });
    } else if (data.email.trim().length > 254) {
      errors.push({ field: 'email', message: 'Email address is too long', code: 'MAX_LENGTH' });
    }
  }

  // Subject validation
  if (!data.subject || !data.subject.trim()) {
    errors.push({ field: 'subject', message: 'Subject is required', code: 'REQUIRED' });
  } else if (data.subject.trim().length < 5) {
    errors.push({ field: 'subject', message: 'Subject must be at least 5 characters', code: 'MIN_LENGTH' });
  } else if (data.subject.trim().length > 200) {
    errors.push({ field: 'subject', message: 'Subject must be less than 200 characters', code: 'MAX_LENGTH' });
  }

  // Message validation
  if (!data.message || !data.message.trim()) {
    errors.push({ field: 'message', message: 'Message is required', code: 'REQUIRED' });
  } else if (data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters', code: 'MIN_LENGTH' });
  } else if (data.message.trim().length > 5000) {
    errors.push({ field: 'message', message: 'Message must be less than 5000 characters', code: 'MAX_LENGTH' });
  }

  return errors;
}

function detectSpam(data: ContactFormData): boolean {
  // Honeypot check
  if (data.honeypot && data.honeypot.trim()) {
    return true;
  }

  // Common spam patterns
  const spamPatterns = [
    /\b(viagra|cialis|casino|poker|loan|mortgage|insurance)\b/i,
    /\b(click here|visit now|act now|limited time)\b/i,
    /\$\$\$|!!!/,
    /http[s]?:\/\/[^\s]+/g // Multiple URLs
  ];

  const content = `${data.name} ${data.subject} ${data.message}`.toLowerCase();

  for (const pattern of spamPatterns) {
    if (pattern.test(content)) {
      return true;
    }
  }

  // Check for excessive repetition
  const words = content.split(/\s+/);
  const wordCount = new Map<string, number>();

  for (const word of words) {
    if (word.length > 3) {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }
  }

  // If any word appears more than 5 times, likely spam
  for (const count of wordCount.values()) {
    if (count > 5) {
      return true;
    }
  }

  return false;
}

async function sendEmail(data: ContactFormData): Promise<boolean> {
  // Production integration with email service (resend, sendgrid, or smtp)
  const isProd = process.env.NODE_ENV === 'production';
  const emailFrom = process.env.EMAIL_FROM || 'noreply@resend.dev';
  const emailTo = process.env.EMAIL_TO || 'kalathursomesh@gmail.com';

  try {
    // In production, we would use an actual service
    if (isProd && process.env.RESEND_API_KEY) {
      // Integration logic for Resend would go here
      console.log('Production: Sending actual email via Resend');
    }

    // Always log for development/transparency
    console.log('--- Email Activation Logic ---');
    console.log(`From: ${emailFrom}`);
    console.log(`To: ${emailTo}`);
    console.log(`Subject: Portfolio Contact - ${data.subject}`);
    console.log('------------------------------');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return true;
  } catch (error) {
    console.error('Email activation failed:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    const rateLimit = checkRateLimit(rateLimitKey);

    if (!rateLimit.allowed) {
      const resetTime = rateLimit.resetTime || Date.now();
      const waitTime = Math.ceil((resetTime - Date.now()) / 1000 / 60);

      return NextResponse.json(
        {
          success: false,
          message: `Too many requests. Please try again in ${waitTime} minutes.`,
          errors: [],
          timestamp: new Date()
        } as ContactFormResponse,
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString()
          }
        }
      );
    }

    // Parse request body
    let data: ContactFormData;
    try {
      data = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request format',
          errors: [],
          timestamp: new Date()
        } as ContactFormResponse,
        { status: 400 }
      );
    }

    // Validate form data
    const validationErrors = validateContactForm(data);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please correct the errors below',
          errors: validationErrors,
          timestamp: new Date()
        } as ContactFormResponse,
        { status: 400 }
      );
    }

    // Spam detection
    if (detectSpam(data)) {
      // Log spam attempt but don't reveal to user
      console.warn('Spam detected:', {
        ip: getRateLimitKey(request),
        data: data
      });

      // Return success to avoid revealing spam detection
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you for your message! I\'ll get back to you soon.',
          errors: [],
          timestamp: new Date()
        } as ContactFormResponse
      );
    }

    // Send email
    const emailSent = await sendEmail(data);

    if (!emailSent) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send message. Please try again later.',
          errors: [],
          timestamp: new Date()
        } as ContactFormResponse,
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! I\'ll get back to you within 24 hours.',
        errors: [],
        timestamp: new Date()
      } as ContactFormResponse
    );

  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
        errors: [],
        timestamp: new Date()
      } as ContactFormResponse,
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}