# My Restaurant

![App Preview](https://imgix.cosmicjs.com/fa8229d0-85e7-11f1-94b5-e7d581aac3e0-autopilot-photo-1414235077428-338989a2e8c0-1784736681060.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern steak restaurant website built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). Browse a delicious menu grouped by category, explore restaurant locations with hours and reservation info, and read what customers are saying.

## Features

- 🥩 **Elegant Menu Display** — Menu items grouped by category with pricing, dietary tags, and chef's favorites
- 📍 **Locations Page** — Addresses, hours, contact details, and reservation links for each location
- ⭐ **Customer Reviews** — Star ratings and testimonials from real diners
- 🎨 **Modern Responsive Design** — Warm, upscale steakhouse aesthetic that looks great on any device
- ⚡ **Server-Side Rendering** — Fast, SEO-friendly pages powered by Next.js App Router
- 🔥 **Chef's Favorites Highlighting** — Signature dishes are visually emphasized
- 🖼️ **Optimized Images** — imgix-powered image delivery for crisp, fast-loading visuals

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=6a60eb31b881bf17a5be9a0b&clone_repository=6a60ec6677f85fc773e9d295)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a restaurant website with menu items (including images, pricing, and dietary info), menu categories, locations, and customer reviews.
>
> User instructions: A steak restaurant site with menu items grouped by category, hours, locations, and reservation info"

### Code Generation Prompt

> Build a Next.js application for an online business called "My Restaurant". The content is managed in Cosmic CMS with the following object types: menu-categories, menu-items, locations, customer-reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type. A steak restaurant site with menu items grouped by category, hours, locations, and reservation info

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with the bucket for this project

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set the following environment variables (added automatically when cloning in Cosmic):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all menu items with connected category data
const { objects: items } = await cosmic.objects
  .find({ type: 'menu-items' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single location
const { object: location } = await cosmic.objects
  .findOne({ type: 'locations', slug: 'downtown' })
  .depth(1)
```

## Cosmic CMS Integration

This app reads from four object types in your Cosmic bucket:

- **menu-categories** — `name`, `description`, `display_order`
- **menu-items** — `name`, `description`, `price`, `featured_image`, `dietary_tags`, `chefs_favorite`, `category`
- **locations** — `location_name`, `address`, `phone`, `email`, `hours`, `reservation_info`, `reservation_link`, `location_photo`
- **customer-reviews** — `reviewer_name`, `rating`, `review`, `date`, `location`

Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

- **Vercel** — Import the repo, set your environment variables, and deploy.
- **Netlify** — Connect the repo, configure env vars, and deploy.

Set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in your hosting platform's dashboard.
<!-- README_END -->