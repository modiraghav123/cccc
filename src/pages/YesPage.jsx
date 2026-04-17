import React, { useEffect, useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts.jsx';
import emailjs from '@emailjs/browser';

/* ============================================
   ✏️ EDIT THESE - Email Configuration
   ============================================
   To set up EmailJS (free - 200 emails/month):
   1. Go to https://www.emailjs.com/ and create a free account
   2. Add an Email Service (Gmail, Outlook, etc.)
   3. Create an Email Template with these variables:
      - {{to_name}} - recipient name
      - {{from_name}} - your name
      - {{message}} - the love message
   4. Copy your Service ID, Template ID, and Public Key below
   ============================================ */
const EMAIL_CONFIG = {
  serviceId: 'service_rgexexb',       // e.g., 'service_abc123'
  templateId: 'template_9cgjkr3',     // e.g., 'template_xyz789'
  publicKey: 'ydncSkleCf9jKRiU6',        // e.g., 'AbCdEfGhIjKlMnOp'

  // Template parameters - customize your love message! 💌
  templateParams: {
    to_name: 'My Love',               // Her name
    from_name: 'Mr. Mine',       // Your name
    to_email: 'raghavmodi.alcheringa@gmail.com', // Her email address
    subject: 'Date confirmation and Details for my love',
    message: `
My Dearest Love,

Acha hua haa bol diya! 🎉💕

I know I make a lot of mistakes and I'm veryy murkh
but I promise to change myself and I will never ever hurt you.

I promise to:
💖 Love you infinite
💖 Make you smile every day 
💖 Always be with you and stand by you for life
💖 Give my best to fulfill whatever you want

So the details of the date are as follows:
 Date starts from 14th May 2025
 Time: 10:30am sharp
 Location : Ormanjhi
 I will pick you up from your hostel
 It included dinner date, water park and much more.

To chal rahe ho na mam. And haa water park me jo bhi slides hogi jana pdega.

I love you soooo muchhhh babyyyyy
Love u infinitely❤️
I am sorry for everything I did wrong. I promise to be a better person for you.
I promise to love you more than you love me. ❤️

With all my heart,
Your Mr.Mine 🌹
    `.trim(),
  },
};

/* ============================================
   ✏️ EDIT THESE - Page Messages
   ============================================ */
const PAGE_MESSAGES = {
  title: "Haa to bolna hi tha mam aapko!",
  subtitle: "I love you my love",
  emojiRow: "🥰💕🫶💕🥰",
};

/* ============================================
   Confetti Generator
   ============================================ */
function Confetti() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const confettiEmojis = ['💕', '💖', '❤️', '🌹', '✨', '💝', '🩷', '💗', '🎉', '💐', '🦋', '⭐'];
    const newPieces = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
      left: Math.random() * 100,
      size: 16 + Math.random() * 24,
      duration: 2500 + Math.random() * 4000,
      delay: Math.random() * 2000,
    }));
    setPieces(newPieces);

    // Clear confetti after animation
    const timer = setTimeout(() => setPieces([]), 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            fontSize: `${piece.size}px`,
            animationDuration: `${piece.duration}ms`,
            animationDelay: `${piece.delay}ms`,
          }}
        >
          {piece.emoji}
        </span>
      ))}
    </div>
  );
}

/* ============================================
   Yes Page Component
   ============================================ */
function YesPage() {
  const [emailStatus, setEmailStatus] = useState('sending');
  const emailSent = useRef(false);

  useEffect(() => {
    if (emailSent.current) return;
    emailSent.current = true;

    // Skip email if not configured
    if (
      EMAIL_CONFIG.serviceId === 'YOUR_SERVICE_ID' ||
      EMAIL_CONFIG.templateId === 'YOUR_TEMPLATE_ID' ||
      EMAIL_CONFIG.publicKey === 'YOUR_PUBLIC_KEY'
    ) {
      console.log('📧 EmailJS not configured yet. Set up your keys in YesPage.jsx');
      console.log('📧 Email would have sent:', EMAIL_CONFIG.templateParams);
      setEmailStatus('not-configured');
      return;
    }

    // Send email via EmailJS
    emailjs
      .send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        EMAIL_CONFIG.templateParams,
        EMAIL_CONFIG.publicKey
      )
      .then(() => {
        console.log('💌 Love letter sent successfully! Check your email love');
        setEmailStatus('sent');
      })
      .catch((error) => {
        console.error('💔 Failed to send email:', error);
        setEmailStatus('error');
      });
  }, []);

  return (
    <div className="page yes-page">
      <FloatingHearts />
      <Confetti />

      <div className="card">
        <div className="big-emoji" style={{ animationDelay: '0.2s', opacity: 0 }}>
          🎉
        </div>

        <h1 className="yes-title">{PAGE_MESSAGES.title}</h1>

        <p className="love-message">
          {PAGE_MESSAGES.subtitle} ❤️
        </p>

        <p className="love-message">
          {PAGE_MESSAGES.emojiRow}
        </p>

        <div className="bouquet-container">
          <img
            src="/bouquet.jpeg"
            alt="A beautiful bouquet of roses for you 🌹"
            className="bouquet-img"
          />
        </div>

        <div className="big-emoji">
          💝🌹💝
        </div>

        <div className={`email-status ${emailStatus}`}>
          {emailStatus === 'sending' && '💌 Sending a love letter...'}
          {emailStatus === 'sent' && '💌 A special love letter has been sent to you! 💕'}
          {emailStatus === 'error' && '💌 Could not send the love letter, but my love is still real! 💕'}
          {emailStatus === 'not-configured' && '💌 Configure EmailJS to send a love letter! Check YesPage.jsx 💕'}
        </div>
      </div>
    </div>
  );
}

export default YesPage;
