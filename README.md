# Art Ceiling & Acoustic Panels Website

A modern Next.js website showcasing acoustic panels and stretch ceiling solutions. This project features a responsive design with multilingual support, admin dashboard, and comprehensive product galleries.

## Project Description

This is a professional website for an acoustic panels and stretch ceiling company. The site includes:

- **Product Showcases**: Detailed galleries for acoustic panels and stretch ceilings
- **Admin Dashboard**: Content management system for products and projects
- **Multilingual Support**: Language switching functionality
- **Responsive Design**: Mobile-first approach with modern UI components
- **Image Management**: GridFS integration for efficient image storage
- **Project Portfolio**: Showcase of completed installations

## How to Run

To run this Next.js application, follow these steps:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   Create a `.env.local` file in the root directory with your MongoDB connection string and other required variables.

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

5. **Admin Access**
   Navigate to `/admin` to access the admin dashboard for content management.

## How to Test

To run tests for this project, execute the following commands:

1. **Run All Tests**
   ```bash
   npm test
   ```

2. **Run Tests in Watch Mode**
   ```bash
   npm run test:watch
   ```

3. **Run Tests with Coverage**
   ```bash
   npm run test:coverage
   ```

4. **Run Specific Test Files**
   ```bash
   npm test -- --testPathPattern=test_main.py
   ```

## Additional Scripts

- **Build for Production**: `npm run build`
- **Start Production Server**: `npm start`
- **Lint Code**: `npm run lint`
- **Type Check**: `npm run type-check`

## Project Structure

- `src/app/` - Next.js app router pages and layouts
- `src/components/` - React components and UI elements
- `src/pages/api/` - API routes for backend functionality
- `src/lib/` - Utility functions and database connections
- `scripts/` - Database migration and management scripts
- `public/` - Static assets and images

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, MongoDB, GridFS
- **Styling**: Tailwind CSS, Custom CSS
- **Database**: MongoDB with GridFS for file storage
- **Deployment**: Vercel (configured in `vercel.json`)