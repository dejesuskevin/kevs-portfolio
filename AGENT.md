# AGENT.md

## Project Overview

This project is a premium, minimalist personal portfolio website for a Web Developer.

The application will showcase:

- Landing / Hero section
- About Me
- Skills
- Projects
- Technology Stack
- Contact
- Responsive navigation
- Interactive project case studies
- Premium animations and transitions
- Dark glassmorphism visual design

The project will use a full-stack JavaScript architecture.

---

# Technology Stack

## Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Vite, if already configured
- React Router, if routing is required
- Framer Motion / Motion, if needed for advanced animations

## Backend

- Node.js
- Express.js
- REST API architecture

## Database

- MongoDB
- Mongoose

## Development Tools

- VS Code
- Git
- GitHub
- npm

---

# Architecture

Use a clear separation between frontend and backend.

Recommended structure:

```text
project-root/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── sections/
│   │   ├── pages/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── assets/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── config/
│   │   ├── utils/
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── AGENT.md
├── README.md
└── .gitignore
```

If the existing repository uses a different structure, inspect it first and preserve the existing architecture where practical.

Do not restructure the entire project unnecessarily.

---

# Core Development Rules

Before making changes:

1. Inspect the existing repository.
2. Identify the current frontend and backend structure.
3. Check `package.json` files.
4. Check existing components and routes.
5. Check installed dependencies.
6. Reuse existing functionality whenever possible.
7. Do not delete working features without a clear reason.
8. Do not replace the entire application when a targeted modification is sufficient.

Always prefer clean, maintainable, reusable code.

---

# Frontend Rules

The frontend must use React.js.

Use functional components and React hooks.

Prefer reusable components instead of creating large monolithic components.

Recommended components include:

```text
Navbar
Sidebar
Hero
About
Skills
SkillCard
Projects
ProjectCard
ProjectDetail
TechStack
TechCard
Contact
Footer
```

Keep project and technology information in structured data files when practical.

Example:

```javascript
const projects = [
  {
    id: "mindcare",
    title: "MindCare",
    description: "AI-powered mental wellness platform.",
    technologies: ["React", "Node.js", "MongoDB"],
    category: "Web Application",
    image: "/images/mindcare.png"
  }
];
```

Do not duplicate project markup unnecessarily.

---

# Frontend Design System

The visual direction is:

**Premium + Minimalist + Dark + Glassmorphism + Smooth Motion**

Use:

- Dark slate background
- Frosted glass surfaces
- Semi-transparent white borders
- Backdrop blur
- Soft pastel violet accents
- Soft mint accents
- Subtle shadows
- Large whitespace
- Clean typography
- Smooth transitions

Avoid:

- Excessive neon effects
- Excessive gradients
- Cluttered layouts
- Generic portfolio templates
- Excessive animations
- Poor contrast
- Huge unnecessary text
- Random decorative elements

---

# Animation Rules

The portfolio should feel smooth, premium, and tactile.

Use approximately:

```css
transition: all 0.4s ease-in-out;
```

for standard UI transitions.

Animations should primarily use:

- `transform`
- `opacity`
- `scale`
- `translate`
- `filter`

Avoid animations that cause unnecessary layout recalculation.

---

# Project Card Morphing

Project cards are a major interaction.

When a user selects a project:

```text
Project Card
     ↓
Fluid Expansion
     ↓
Full-Screen Case Study
```

The transition should feel like the original card is transforming into the detailed project view.

Do NOT implement this as a basic instant modal.

Use Framer Motion / Motion if it is appropriate for the existing project.

The project detail view should contain:

- Project title
- Project image
- Overview
- Problem
- Solution
- Features
- Technologies
- Developer role
- Challenges
- Results/outcome
- GitHub link
- Live demo link when available
- Close/back action

When closing the detail view, animate it back toward the original project card.

---

# Responsive Design

The application must be fully responsive.

Support:

- Desktop
- Laptop
- Tablet
- Mobile

Important mobile requirements:

- Hamburger navigation
- Slide-out sidebar
- Touch-friendly buttons
- One-column project layout
- Proper typography scaling
- No horizontal overflow
- Proper project detail behavior
- Responsive glassmorphism components

Always test mobile layouts after significant UI changes.

---

# Backend Architecture

The backend must use:

- Node.js
- Express.js
- MongoDB
- Mongoose

Use RESTful API design.

Recommended structure:

```text
backend/src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── config/
├── utils/
└── server.js
```

Keep responsibilities separated.

### Controllers

Handle request/response logic.

### Models

Define MongoDB/Mongoose schemas.

### Routes

Define API endpoints.

### Services

Contain reusable business logic.

### Middleware

Handle:

- Error handling
- Request validation
- Security
- Authentication if needed

---

# MongoDB Rules

Use MongoDB through Mongoose.

Create models only when persistent data is actually required.

Potential models include:

```text
Project
ContactMessage
```

Do not create unnecessary database collections for static portfolio content.

If project information is static and does not need administration, it may remain in frontend/backend configuration rather than MongoDB.

---

# Contact Form

The contact form may submit data to the Node.js backend.

Example endpoint:

```text
POST /api/contact
```

The backend should:

1. Validate the request.
2. Sanitize input.
3. Validate email format.
4. Store the message in MongoDB.
5. Return an appropriate response.
6. Handle errors safely.

Never expose database credentials to the frontend.

---

# API Design

Use a consistent API structure.

Example:

```text
GET    /api/projects
GET    /api/projects/:id
POST   /api/contact
```

Use appropriate HTTP status codes.

Examples:

```text
200 OK
201 Created
400 Bad Request
404 Not Found
500 Internal Server Error
```

Return consistent JSON responses.

Example:

```javascript
{
  success: true,
  message: "Message sent successfully",
  data: {}
}
```

For errors:

```javascript
{
  success: false,
  message: "Unable to process request"
}
```

Do not expose stack traces or sensitive server information to clients.

---

# Environment Variables

Never hardcode secrets.

Use environment variables.

Backend example:

```env
PORT=5000
MONGODB_URI=mongodb+srv://...
CORS_ORIGIN=http://localhost:5173
```

Frontend example:

```env
VITE_API_URL=http://localhost:5000/api
```

Never commit `.env` files containing secrets.

Ensure `.gitignore` contains:

```text
.env
.env.local
.env.*.local
node_modules/
dist/
```

---

# Security

Follow basic web security practices.

Implement where appropriate:

- Input validation
- Input sanitization
- CORS configuration
- Helmet
- Rate limiting for public endpoints
- Secure error handling
- Environment variables
- MongoDB injection protection
- Proper HTTP methods

Never expose:

- MongoDB credentials
- API keys
- Private tokens
- Passwords
- Secret environment variables

Do not place backend secrets in React/Vite environment variables.

Remember:

Any variable beginning with:

```text
VITE_
```

is potentially exposed to the browser.

---

# Error Handling

The backend must have centralized error handling.

Do not duplicate large error-handling blocks across controllers.

Errors should be logged server-side but returned to the frontend in a safe format.

Frontend errors should display user-friendly messages.

Never display raw backend stack traces to users.

---

# Code Style

Use clear and descriptive names.

Prefer:

```javascript
const projectList = [];
```

instead of:

```javascript
const x = [];
```

Use:

- camelCase for variables/functions
- PascalCase for React components
- descriptive filenames
- modular functions
- small reusable components

Avoid unnecessarily complicated abstractions.

---

# React State Management

Use React state and hooks when local state is sufficient.

Do not introduce Redux or another global state library unless the application genuinely requires it.

Use:

```javascript
useState
useEffect
useMemo
useCallback
useRef
```

only when appropriate.

Avoid unnecessary state.

---

# Performance

Keep the website fast.

Prefer:

- Lazy loading
- Optimized images
- Code splitting when useful
- Efficient React rendering
- CSS transforms for animation
- Avoiding unnecessary dependencies

Do not add a large library for functionality that can reasonably be implemented with existing tools.

---

# Accessibility

All interactive components must be accessible.

Use:

- Semantic HTML
- Proper headings
- Accessible buttons
- Keyboard navigation
- Visible focus states
- Alt text
- ARIA labels when necessary
- Good color contrast

The hamburger menu must be keyboard accessible.

The project detail view must support keyboard interaction.

Support:

```css
@media (prefers-reduced-motion: reduce)
```

and reduce non-essential animations.

---

# Navigation Behavior

The hamburger menu should:

1. Open the sidebar smoothly.
2. Lock or appropriately manage page scrolling while open.
3. Provide a visible close button.
4. Close when clicking outside.
5. Close when selecting a navigation link.
6. Support Escape key.
7. Work correctly on desktop and mobile.

---

# Do Not Break Existing Functionality

Before modifying an existing feature:

- Understand how it works.
- Identify its dependencies.
- Make the smallest safe change.

Do not:

- Delete existing APIs without checking usage.
- Rename environment variables unnecessarily.
- Replace working components without reason.
- Remove installed dependencies without checking usage.
- Change database configuration without understanding the existing setup.

---

# Dependency Rules

Before installing a package:

1. Check whether the functionality already exists.
2. Check whether an installed dependency can provide it.
3. Install a new dependency only when justified.

Preferred libraries:

- React
- Express
- Mongoose
- Framer Motion / Motion
- React Router
- Lucide React or an existing icon library

Do not install multiple libraries that solve the same problem.

---

# Git Rules

Do not perform destructive Git operations.

Never run commands such as:

```text
git reset --hard
git clean -fd
```

unless explicitly instructed by the user.

Do not overwrite unrelated user changes.

Keep modifications focused on the requested task.

---

# Testing Requirements

After implementing a feature:

1. Run the frontend.
2. Run the backend.
3. Check for compilation errors.
4. Check browser console errors.
5. Test the relevant API endpoint.
6. Test the UI interaction.
7. Test responsive behavior.

For frontend:

```text
npm run dev
```

For backend, use the project's existing development command.

Do not assume the application works simply because the code was generated.

---

# Final Verification Checklist

Before considering a task complete, verify:

## Frontend

- [ ] React application starts successfully.
- [ ] No compilation errors.
- [ ] No major browser console errors.
- [ ] Navbar works.
- [ ] Hamburger menu works.
- [ ] Sidebar animation works.
- [ ] Navigation links work.
- [ ] Hero section works.
- [ ] About section works.
- [ ] Skills section works.
- [ ] Projects section works.
- [ ] Project cards work.
- [ ] Project morphing transition works.
- [ ] Project detail view works.
- [ ] Tech stack works.
- [ ] Contact form works.
- [ ] Footer works.
- [ ] Mobile layout works.
- [ ] Tablet layout works.
- [ ] Desktop layout works.
- [ ] No horizontal overflow.

## Backend

- [ ] Node.js server starts successfully.
- [ ] Express routes work.
- [ ] MongoDB connection works.
- [ ] Mongoose models work.
- [ ] Contact API works.
- [ ] Validation works.
- [ ] Error handling works.
- [ ] CORS works correctly.
- [ ] Environment variables are used.
- [ ] Secrets are not exposed.

---

# Development Philosophy

When making decisions, prioritize:

1. Functionality
2. User experience
3. Visual quality
4. Accessibility
5. Performance
6. Security
7. Maintainability

Do not sacrifice functionality merely for visual effects.

Do not sacrifice accessibility for animations.

Do not sacrifice security for convenience.

Do not sacrifice maintainability for overly clever code.

---

# Codex Working Instructions

When the user gives a development request:

1. Inspect the relevant files first.
2. Understand the current implementation.
3. Identify the smallest set of files that need modification.
4. Implement the requested feature.
5. Reuse existing components and utilities.
6. Follow the architecture defined in this file.
7. Run the appropriate checks.
8. Fix errors introduced by the changes.
9. Verify the final result.
10. Clearly summarize what was changed.

If requirements are ambiguous, make the most reasonable implementation based on the existing project rather than unnecessarily rewriting unrelated code.

Always preserve existing working functionality unless the user explicitly asks for it to be changed or removed.

The final portfolio should feel like a **premium professional Web Developer portfolio**, not a generic student template.