"use client";

import React, { useCallback } from 'react';
import { ContactFormData } from '@/types';
import ContactForm from './ContactForm';

export default function ContactFormWrapper() {
  const onSubmit = useCallback(async (data: ContactFormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      return json;
    } catch (error) {
      return { success: false, message: 'Request failed', errors: [] };
    }
  }, []);

  return <ContactForm onSubmit={onSubmit} />;
}
