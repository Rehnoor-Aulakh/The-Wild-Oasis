# The Wild Oasis

The Wild Oasis is a comprehensive internal hotel management application designed for boutique hotel staff. It provides a seamless interface to manage bookings, cabins, and guests, complete with an analytics dashboard to track hotel performance over time.

This application is built with a focus on performance, robust state management, and an intuitive user experience.

https://the-wild-oasis-by-rehnoor.netlify.app

## Features

- **Dashboard & Analytics:** View key performance indicators, recent activity, and booking statistics visualized through interactive charts.
- **Booking Management:** Browse, filter, and sort all bookings. Manage the entire guest lifecycle with check-in and check-out capabilities.
- **Cabin Management:** Add, edit, delete, and duplicate hotel cabins, including uploading cabin photos.
- **Settings:** Configure application-wide settings like breakfast prices, minimum/maximum booking lengths, and maximum guests per booking.
- **Authentication:** Secure staff login and user management system.
- **Dark Mode:** Built-in dark mode support for comfortable usage in any lighting condition.

## Tech Stack

This project leverages a modern React ecosystem to deliver a fast, reliable, and maintainable application.

### Core
- **React 18** - Frontend UI library
- **Vite** - Next-generation frontend tooling and bundler
- **React Router** - Client-side routing and navigation

### State Management & Data Fetching
- **React Query** - Powerful asynchronous server state management, caching, and data synchronization.
- **Context API** - Global UI state management (e.g., dark mode toggle).

### UI & Styling
- **Styled Components** - CSS-in-JS for component-scoped, highly reusable styles.
- **React Icons** - Comprehensive icon library for UI elements.
- **React Hot Toast** - Elegant, accessible notifications.
- **Recharts** - Composable charting library for dashboard analytics.

### Forms & Validation
- **React Hook Form** - Performant, flexible, and extensible form state management.

### Utilities
- **Date-fns** - Modern JavaScript date utility library for handling booking dates.
- **React Error Boundary** - Catching JavaScript errors anywhere in the child component tree.

### Backend
- **Supabase** - Open source Firebase alternative providing the Postgres database, authentication, and file storage.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm
- A Supabase account and project (for the backend data)

### Installation

1. Clone the repository (if applicable) and navigate to the project directory:
```bash
cd the-wild-oasis
```

2. Install dependencies:
```bash
npm install
```

3. Configure Environment Variables:
Create a `.env` or `.env.local` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## Architecture

The application follows a feature-based folder structure, grouping components, hooks, and services by their domain (e.g., `bookings`, `cabins`, `dashboard`). This modular approach ensures better maintainability, easier debugging, and scalability as the project grows.

- `src/features/` - Domain-specific functionality and pages
- `src/ui/` - Reusable, domain-agnostic UI components
- `src/services/` - API client and Supabase configuration
- `src/hooks/` - Custom reusable React hooks
- `src/utils/` - General helper functions
