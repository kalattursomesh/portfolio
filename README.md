# 💻 Kalattur Somesh — Cyber-Tactical Portfolio

> A high-performance, futuristic portfolio built with Next.js, Framer Motion, and Tailwind CSS. Designed to emulate an advanced operating system with a sleek matrix/cyberpunk aesthetic.

![Status](https://img.shields.io/badge/Status-Active-00ff88.svg?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black.svg?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **OS Window Design:** All sections are wrapped in interactive, draggable-style window components.
- **Terminal Animations:** Authentic boot sequences, blinking cursors, and dynamic typing effects to showcase my AI/ML & AWS capabilities.
- **Advanced UI/UX:** Powered by Framer Motion and GSAP for micro-interactions, glitches, and scanline overlays.
- **Background API Fetching:** Fully functional "send email" capabilities built locally using Web3Forms inline API integrations.
- **100% Type-Safe Structure:** Entirely written in TypeScript with strict null checks.

## 🚀 Quick Start

Ensure you have Node.js 18+ installed on your machine.

```bash
# 1. Clone the repository
git clone https://github.com/kalattursomesh/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + Custom CSS modules
- **Animations:** Framer Motion + GSAP
- **Icons:** Lucide React
- **Language:** TypeScript

## 📁 Project Structure

All data (projects, skills, about me) is cleanly isolated in JSON files, making updates frictionless. 

```
/src
  /app           # Next.js App Router (Pages & API)
  /components    # Reusable React components (OS Windows, Navigation, etc.)
  /data          # portfolio.json (Resume data) & siteConfig.json
  /hooks         # Custom React hooks
  /types         # TypeScript interfaces
```

## 📬 Contact Form Configuration
The contact form uses [Web3Forms](https://web3forms.com) to directly forward emails without a backend.
To set it up for your own use:
1. Get an access key at web3forms.com
2. Place the key in `src/components/Contact/ContactForm.tsx` where instructed.

## 📄 License & Copyright

Designed and engineered by Kalattur Somesh. All rights reserved. 