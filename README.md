# Hostel Management System - Client Side

## Overview
This repository contains the client-side implementation of the **Hostel Management System** using React.js. The client allows students and administrators to interact with the system via a user-friendly interface. Students can log in, view meal details, and provide reviews, while administrators can manage meal data, reviews, and student information.

---

## Screenshot
![Hostel Management System](/src/assets/screenshot.png)

---

## Features
1. **User Authentication**
   - Students can log in securely.
   - Persistent authentication using JWT.

2. **Meal Display**
   - Students can view the list of available meals.
   - Interactive UI for displaying meal details.

3. **Review Management**
   - Students can add, edit, and delete reviews.
   - Reviews are displayed with ratings and comments.

4. **Admin Panel**
   - Admins can manage meal entries (add, edit, delete).
   - Admins can view and moderate food reviews.
   - Admins can manage student data.

---

## Technologies Used
- **React.js**: Front-end library for building user interfaces.
- **Axios**: For making API calls to the server.
- **Tailwind CSS**: For styling the components.
- **React Router**: For navigation between pages.
- **JWT (JSON Web Tokens)**: For secure authentication.

---

## Dependencies
Make sure you have the following dependencies installed in your project:
```json
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.15.0",
  "axios": "^1.5.1",
  "tailwindcss": "^3.4.0",
  "jwt-decode": "^4.0.0"
}
```
---

## Installation & Setup
Follow these steps to run the project locally:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/hostel-management-client.git
   cd hostel-management-client
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. **Configure the API Base URL:**
   - Open `.env` file and set your backend API URL:
     ```sh
     VITE_API_URL=http://localhost:5000/api
     ```

5. **Access the application:**
   - Open `http://localhost:5173` in your browser.

---

## Live Demo & Resources
- **Live Project:** [https://hotel-management-25cdc.web.app/](https://hotel-management-25cdc.web.app/)
- **Backend Repository:** [https://github.com/rudraprotapchakraborty/hotel-management-server](https://github.com/rudraprotapchakraborty/hotel-management-server)
---

### License
This project is open-source and available under the [MIT License](LICENSE).

