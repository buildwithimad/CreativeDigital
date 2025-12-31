# CreativeDigital - Digital Solutions & Web Development

A modern, responsive website for CreativeDigital, a digital marketing and web development agency. Built with Next.js, featuring internationalization (Arabic/English), Sanity CMS integration, and optimized for SEO and performance.

## 🌐 Live Website

Visit us at: [www.creativeedigital.com](https://www.creativeedigital.com)

## ✨ Features

- **Multilingual Support**: Arabic (RTL) and English languages
- **CMS Integration**: Powered by Sanity for content management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Meta tags, sitemap, robots.txt, and Open Graph
- **Performance Focused**: Optimized images, lazy loading, and fast loading times
- **Contact Forms**: Integrated email sending with Resend
- **Animations**: Smooth scroll-based animations with Framer Motion
- **Blog System**: Dynamic blog posts with Sanity CMS
- **Portfolio Showcase**: Work samples and testimonials

## 🛠 Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS
- **CMS**: Sanity
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: Resend
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account and project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/creativeedigital.git
cd creativeedigital
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-11-02
RESEND_API_KEY=your_resend_api_key
```

4. Configure Sanity:
```bash
npm run sanity
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏗 Project Structure

```
creativeedigital/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (send-email, robots.txt, sitemap.xml)
│   ├── en/                # English pages
│   │   ├── blogs/         # Blog pages
│   │   ├── contact/       # Contact page
│   │   ├── services/      # Services page
│   │   ├── work/          # Portfolio page
│   │   └── page.js        # Homepage
│   ├── ar/                # Arabic pages (RTL)
│   │   ├── blogs/         # Blog pages
│   │   ├── contact/       # Contact page
│   │   ├── services/      # Services page
│   │   ├── work/          # Portfolio page
│   │   └── page.js        # Homepage
│   ├── studio/            # Sanity Studio
│   └── layout.js          # Root layout
├── components/            # React components
│   ├── home/              # Homepage components
│   ├── blogs/             # Blog components
│   ├── contact/           # Contact components
│   ├── services/          # Services components
│   ├── work/              # Portfolio components
│   ├── seo/               # SEO components
│   └── ...                # Other components
├── lib/                   # Utility libraries
├── sanity/                # Sanity configuration
│   ├── schemaTypes/       # Content schemas
│   ├── queries/           # GROQ queries
│   └── lib/               # Sanity client
├── public/                # Static assets
└── utils/                 # Helper functions
```

## 🌍 Internationalization

The website supports Arabic and English languages using separate routes:

- `/en/` - English pages
- `/ar/` - Arabic pages with RTL layout
- Content is managed through Sanity CMS with language-specific entries

## 📧 Contact

For inquiries: info@creativeedigital.com

## 🚀 Deployment

The project is optimized for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is private and proprietary to CreativeDigital.

## 👨‍💻 Developed by

[Imad Hussain Khan](https://www.imadkhan.online) - CreativeDigital Team
