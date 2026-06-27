# Nagar Nigam Inter College - Python Backend (Flask)

This folder contains a fully-featured, ready-to-use Python Flask backend for local testing on your laptop. It perfectly mirrors the Express API running in the web preview, allowing you to run and test the complete website offline!

## Features

- **Notice Board API**: Create and delete school announcements.
- **Online Admissions API**: Submit forms, check approval status, and manage student registrations.
- **Interactive Dashboards**: Simulated student portal and administrative teacher control panels.
- **Visitor Statistics Counter**: Locally persistent counter using a secure local `data.json` database.
- **Contact Forms & Queries**: Stores messages submitted by visitors.

---

## Local Development Setup

To run the Python backend on your laptop, follow these steps:

### 1. Prerequisites

Make sure you have **Python 3.x** and **Node.js** installed on your laptop.

### 2. Install Python Dependencies

Open your terminal or command prompt inside this directory (`python-backend`) and run:

```bash
pip install flask flask-cors
```

### 3. Run the Python Server

Start the Flask server by running:

```bash
python app.py
```

The python backend will boot up at **`http://127.0.0.1:5000`**.

---

## Running the React Frontend Locally

To run the frontend on your laptop and connect it to your Python backend:

1. **Unzip or Clone** the downloaded project onto your laptop.
2. In the root directory, install the required packages:
   ```bash
   npm install
   ```
3. Edit the `.env` file or update the frontend's fetch requests. In `src/App.tsx` (or your config file), you can change the target URL of the APIs to `http://127.0.0.1:5000` so it targets your Python backend.
4. Launch the frontend development server:
   ```bash
   npm run dev
   ```
5. Open your browser to the local address (usually `http://localhost:3000` or `http://localhost:5173`) to view and interact with your fully functional website!

---

## Credentials for Testing Admin / Teacher Panel

- **Username**: `admin`
- **Password**: `password123`
- **Role**: Select "Teacher/Admin Dashboard" on the login screen.
