# Financial Data Filtering App

This is a React-based web application that fetches and displays financial data for Apple Inc. using the Financial Modeling Prep API. The app provides features like filtering and sorting the data, with a backend implemented in FastAPI for handling API requests.

## Features

- Fetches annual income statements for Apple Inc. (AAPL).
- Displays financial metrics such as revenue, net income, gross profit, EPS, and operating income in a table.
- Filters data based on:
  - Date range (years).
  - Revenue range.
  - Net income range.
- Sorts data by:
  - Date (ascending/descending).
  - Revenue (ascending/descending).
  - Net income (ascending/descending).
- Fully responsive design using TailwindCSS.

## Tech Stack

- **Frontend**: React, Axios, TailwindCSS
- **Backend**: FastAPI
- **Deployment**: Vercel (Frontend) and Render (Backend)

---

## Live Demo

- **Deployed App**: [View Live App](https://financial-data-filtereing-app.vercel.app)
- **Backend API**: [Backend URL](https://financial-data-filtering-app-heox.onrender.com/financial-data)

---

## Installation and Setup

### Prerequisites

- Node.js and npm installed
- Python 3.9 or higher installed
- Git installed

---

### Steps to Run the Project Locally

#### 1. Clone the Repository

```bash
git clone https://github.com/AdhikChintalwar/FinancialData-filtereing-app.git
cd FinancialData-filtereing-app
```

#### 2. For backend
```bash
cd backend
python -m venv venv
source venv/bin/activate   # For Mac/Linux
venv\Scripts\activate      # For Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

#### 3. For frontend
```bash
cd ../frontend
npm install
npm start
```

Add an environment variable in Render:
API_KEY = <Your Financial Modeling Prep API Key>

