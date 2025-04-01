# ByteBattle Quiz App

A modern, responsive quiz application built with Next.js, TypeScript, and Shadcn/UI. The app features a comprehensive admin dashboard, quiz management system, and user-friendly interface for students.

## Features

### 1. Authentication System
- User registration and login
- Role-based access control (Admin/Student)
- Secure session management
- Profile customization

### 2. Admin Dashboard
- **Overview Statistics**
  - Total users count
  - Total questions count
  - Quizzes taken
  - Average scores
  - Trend indicators

- **Quick Actions**
  - Add new questions
  - Manage users
  - View reports
  - Access settings

- **Recent Activity Feed**
  - New questions added
  - User registrations
  - Reported questions
  - Timestamp tracking

- **Performance Overview**
  - Subject-wise statistics
  - Progress tracking
  - Performance metrics

### 3. Question Management
- **Question List**
  - Search functionality
  - Filter by level, subject, and difficulty
  - Sort by date added
  - Bulk actions

- **Question Details**
  - Question text
  - Level (JHS/SHS)
  - Subject
  - Difficulty
  - Time limit
  - Date added
  - Status indicators

- **Actions**
  - Edit questions
  - Delete questions
  - Toggle status
  - View details

### 4. User Management
- **User List**
  - Search by name/email
  - Filter by role, level, and status
  - Sort by join date
  - Bulk actions

- **User Details**
  - Name and email
  - Role (Admin/Student)
  - Education level
  - Account status
  - Join date
  - Quiz statistics

- **Actions**
  - Edit user details
  - Change user status
  - Delete users
  - View activity

### 5. Analytics & Reporting
- **Key Metrics**
  - Total users
  - Total quizzes
  - Average scores
  - Completion rates
  - Trend analysis

- **Subject Performance**
  - JHS vs SHS comparison
  - Subject-wise breakdown
  - Progress tracking
  - Visual charts

- **Quiz Duration Analysis**
  - Time spent distribution
  - Average completion time
  - Performance correlation

### 6. Settings Management
- **General Settings**
  - Site name
  - Site description
  - Contact email
  - Maintenance mode

- **Security Settings**
  - Two-factor authentication
  - Session timeout
  - IP blocking
  - Session duration

- **Notification Settings**
  - Email notifications
  - Push notifications
  - Weekly reports
  - Activity alerts

- **User Settings**
  - Registration control
  - Email verification
  - Profile customization
  - Login attempts

### 7. Education Level Management
- **JHS Configuration**
  - Enable/disable level
  - Default time limit
  - Questions per quiz
  - Passing score
  - Subject management

- **SHS Configuration**
  - Enable/disable level
  - Default time limit
  - Questions per quiz
  - Passing score
  - Subject management

### 8. Subject Management
- **Subject List**
  - Search functionality
  - Filter by level
  - Status indicators
  - Quick actions

- **Subject Details**
  - Name and description
  - Education level
  - Question count
  - Quiz count
  - Status management

### 9. UI/UX Features
- **Responsive Design**
  - Mobile-first approach
  - Tablet optimization
  - Desktop layouts
  - Adaptive components

- **Navigation**
  - Sidebar navigation
  - Breadcrumb trails
  - Quick access menu
  - Mobile menu

- **Visual Feedback**
  - Loading states
  - Success/error messages
  - Progress indicators
  - Status badges

- **Accessibility**
  - Keyboard navigation
  - Screen reader support
  - High contrast mode
  - Focus management

## Technical Stack

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **State Management**: React Hooks
- **Routing**: Next.js App Router
- **Authentication**: NextAuth.js
- **Database**: (To be implemented)
- **API**: (To be implemented)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 