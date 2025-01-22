# Quorum Take Home Test

This project is a full-stack application. The backend runs on port `5000`, and the frontend runs on port `3000`.

---

## Technologies

This project uses the following technologies:

- [**Node.js**](https://nodejs.org/)
- [**Express**](https://expressjs.com/)
- [**React**](https://react.dev/)
- [**Next.js**](https://nextjs.org/)
- [**TypeScript**](https://www.typescriptlang.org/)

---

## Prerequisites

- **Node.js** (v16+ recommended)
- **npm** or **yarn**

---

## Setup and Running

### Backend

1. Navigate to the backend directory:

```bash
   cd backend
```

2. Install dependencies:

```bash
   npm install
```

3. Create a .env file with:

```bash
   PORT=5000

   BILLS_CSV=./src/data/bills.csv
   LEGISLATORS_CSV=./src/data/legislators.csv
   VOTES_CSV=./src/data/votes.csv
   VOTE_RESULTS_CSV=./src/data/vote_results.csv
```

4. Start the backend

```bash
   npm run dev
```

---

### Frontend

1. Navigate to the frontend directory:

```bash
   cd frontend
```

2. Install dependencies:

```bash
   npm install
```

4. Start the frontend

```bash
   npm run dev
```

---

## Accessing the Application

- **Backend**: [http://localhost:5000](http://localhost:5000)
- **Frontend**: [http://localhost:3000](http://localhost:3000)

---

## Available Routes

The following routes are available in the backend:

- **GET** `/bills/stats`  
  Provides statistics about bills. You can access it at [http://localhost:5000/bills/stats](http://localhost:5000/bills/stats).

- **GET** `/legislators/stats`  
  Provides statistics about legislators. You can access it at [http://localhost:5000/legislators/stats](http://localhost:5000/legislators/stats).
