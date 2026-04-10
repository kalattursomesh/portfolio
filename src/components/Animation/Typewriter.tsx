'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export default function Typewriter({
  words,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseTime = 2000,
  className = ''
}: TypewriterProps) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (text === currentWord) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      } else if (currentWord) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        className="inline-block w-1.5 h-[1.2em] bg-[#00ff88] ml-1 align-middle"
      />
    </span>
  );
}
