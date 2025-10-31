# **App Name**: AuthFlow UI

## Core Features:

- Login Page: Allow users to log in with an email/username and password, with navigation to the signup page.
- Signup Page: Enable users to create an account with a name, email/username, password, and role selection (User/Admin), with navigation to the login page. Form validation using Zod and react-hook-form is implemented.
- Dashboard Page (Protected Route): Display a welcome message with the user's name and role, and a logout button. Use a Badge component to highlight the role.  The page checks for authentication and redirects unauthorized users to the login page.
- Navbar: Provide a simple navigation bar on all pages, containing the app name and, on the dashboard, the logout button.
- Alert/Toast Messages: Display success or error messages using the Shad CN Toast component, for actions like successful signup or login failures.
- Loading State Indicators: Implement a basic loading spinner or skeleton component during API calls, such as form submissions.

## Style Guidelines:

- Primary color: Indigo-600 (#4F46E5) for buttons, focus rings, active links, and headers. Indigo was chosen to convey stability, trust, and knowledge.
- Accent/Link color: A slightly lighter shade of Indigo-600, for subtle emphasis and hovers.
- Background color: White (#FFFFFF) in light mode, for a clean and readable canvas.
- Success color: Green-500 (#16A34A) for alerts indicating successful signup/login.
- Error color: Red-500 (#EF4444) for input errors and alerts for failed login/signup.
- Body and headline font: 'Inter', a grotesque-style sans-serif for a modern and neutral look. 
- Utilize a consistent set of simple icons from a library like Feather or Lucide, where necessary, to visually represent actions or status (e.g., a lock icon for password fields).
- Employ a centered card layout for forms on the login and signup pages. Use a clear, structured layout for the dashboard, potentially differentiating layouts for Admin vs. User roles.
- Implement subtle transitions and animations for UI elements like loading spinners, toast notifications, and button hover effects to enhance the user experience.