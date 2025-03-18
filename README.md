# User Management System
A full-stack user management platform that allows administrators to manage users efficiently. The system includes user authentication, role-based access, and a well-designed dashboard for better usability.

## Features

### Frontend
#### User Authentication
- Users can register and log in.
- Admin authentication with restricted access to manage users.

#### User Dashboard
- Displays a list of registered users with search and filter options.
- Categorized user roles for better management.

#### User Management
- Admin can create, update, and remove users.
- Profile image upload for user accounts.
- Role assignment (Student, Employee, Teacher) with detailed descriptions.

#### Responsive Design
- Optimized for desktops, tablets, and mobile devices.

### Backend
#### Authentication API
- Secure authentication using JWT for user login and registration.

#### User Management API
- CRUD operations for user creation, editing, and deletion.
- Role-based access control for admin privileges.

#### Real-Time Updates
- WebSockets for live updates on user management actions.

### Database
- User data is stored efficiently in **MongoDB Atlas**.

## Deployment

### Frontend Hosting
- Deployed on **Vercel** for free-tier hosting.

### Backend Hosting
- Deployed on **Render** for free-tier hosting.

### Database
- **MongoDB Atlas** (Free Plan) is used for database hosting.

## Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- MongoDB Atlas account for the database.

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/Abhishek-Dhamshetty/user-management.git
   cd user-management
   ```
2. Install dependencies for both frontend and backend:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file and configure database and authentication settings.

4. Start the development server:
   ```sh
   npm start
   ```

5. Open your browser and visit `https://user-management-ab.vercel.app/` to access the application.

