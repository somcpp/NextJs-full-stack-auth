# Next.js Full-Stack Authentication

A complete full-stack authentication system built with Next.js App Router, MongoDB, and JSON Web Tokens (JWT). This project provides a robust foundation for building secure applications with user registration, login, email verification, and password reset functionalities.

## Features

- **User Authentication**: Secure signup and login flows using `bcryptjs` for password hashing.
- **Session Management**: Cookie-based sessions using `jsonwebtoken` (JWT) and Next.js middleware for route protection.
- **Email Verification**: Account verification workflow using `nodemailer` to send emails with secure tokens.
- **Password Reset**: Forgot password and reset password functionality via secure email links.
- **Database**: MongoDB integration using `mongoose`.
- **Styling**: Tailwind CSS for modern, responsive UI design.
- **API Routes**: Next.js Serverless API routes for handling backend logic.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Database**: MongoDB & Mongoose
- **Authentication**: JWT & Bcrypt.js
- **Email Service**: Nodemailer
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Database (Local or MongoDB Atlas)
- Gmail account (or any SMTP server for sending emails)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/somcpp/NextJs-full-stack-auth.git
   cd NextJs-full-stack-auth
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   TOKEN_SECRET=your_jwt_secret_key
   DOMAIN=http://localhost:3000
   USER=your_email@gmail.com
   GOOGLE_APP_PASSWORD=your_email_app_password
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Contains all frontend pages (login, signup, profile, verifyEmail, resetpassword) and API routes (`src/app/api`).
- `src/models`: Mongoose database models (User schema).
- `src/dbConfig`: MongoDB connection setup.
- `src/helpers`: Utility functions for JWT data extraction and sending emails via Nodemailer.
- `src/middleware.ts`: Next.js middleware for route protection (protecting `/profile` and redirecting authenticated users from public routes).

## License

This project is open-source and available under the [MIT License](LICENSE).
