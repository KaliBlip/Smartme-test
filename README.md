# Smartme Test - Academic Quiz Application

Smartme Test is an interactive academic quiz application designed to help students improve their knowledge across various subjects through structured multiple-choice quizzes. The application features an admin-managed question bank, where quiz content is manually uploaded and categorized by subject and educational level (JHS and SHS).

## Key Features

### User Roles & Authentication

- **Admin:**
  - Upload and manage multiple-choice questions (MCQs) with designated answers
  - Categorize quizzes by subject and educational level (JHS and SHS)
  - View student progress and leaderboard rankings
  - Manage user accounts (approve, remove, or update student roles)

- **Student/User:**
  - Sign up and log in to take subject-based quizzes
  - Select quizzes based on their education level (JHS or SHS)
  - Track progress and view performance statistics

### Admin Dashboard

- Upload and organize quiz questions into categories (e.g., Mathematics, Science, English)
- Edit or delete questions when needed
- Monitor student performance and leaderboard rankings
- Manage user accounts and permissions

### Quiz Categories

- **JHS Subjects:**
  - Mathematics
  - Science
  - English
  - Social Studies

- **SHS Subjects:**
  - Advanced Mathematics
  - Science
  - English Literature
  - History
  - Languages
  - Arts & Literature

### Quiz Gameplay

- Interactive multiple-choice question (MCQ) format
- Real-time progress tracking during quizzes
- Instant feedback after answering a question

### Leaderboard System

- Track top-performing students based on quiz scores
- Separate leaderboards for JHS and SHS categories
- Visual ranking indicators for top students

### User Profiles

- Display personal statistics and quiz history
- Show performance graphs to visualize progress
- Allow students to review past quizzes and correct answers

## Technology Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **UI Components:** Shadcn UI
- **Styling:** Tailwind CSS with animations
- **Data Management:** Mock data (ready for API integration)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/smartme-test.git
   ```

2. Install dependencies:
   ```
   cd smartme-test
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `app/` - Next.js app router pages and components
  - `admin/` - Admin dashboard and question management
  - `categories/` - Subject categories for JHS and SHS
  - `quiz/` - Quiz creation and gameplay
  - `leaderboard/` - Leaderboards for JHS and SHS
  - `profile/` - User profile and statistics
- `components/` - Reusable UI components
- `lib/` - Utilities and data services
- `public/` - Static assets

## Admin Access

To access the admin dashboard, navigate to `/admin` after starting the application.

## Future Enhancements

- Database integration for persistent storage
- User authentication with role-based access control
- Analytics dashboard for tracking student progress
- Mobile application for on-the-go learning
- Integration with school management systems

## License

This project is licensed under the MIT License - see the LICENSE file for details. 