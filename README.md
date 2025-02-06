# Palaceofgoods-
---
Web3-based marketplace application built on Pi Network’s blockchain 
---
mkdir palace-of-goods && cd palace-of-goods
npm init -y
npm install react react-dom react-router-dom
npm install axios zustand classnames pi-sdk jwt-decode bcryptjs
npm install react-toastify socket.io-client
npm install -D @swc/core @swc/cli typescript @types/react @types/react-dom @types/react-router-dom
npm install -D @types/jwt-decode @types/bcryptjs
npm install express socket.io nodemailer dotenv cors helmet morgan
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── serviceWorker.js
    └── setupTests.js
---
# Project Structure #

palace-of-goods/
├── public/
│   └── index.html
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components (Home, Login, Marketplace, etc.)
│   ├── services/        # API calls (e.g., Axios for backend communication)
│   ├── state/           # Zustand store (global state management)
│   ├── utils/           # Utility functions (helper functions, formatters, etc.)
│   ├── App.tsx
│   └── index.tsx
├── .swcrc               # SWC compiler config
├── tsconfig.json        # TypeScript configuration
├── package.json
├── Dockerfile
├── .dockerignore
├── .gitignore
└── node_modules/
---
# Use Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
---

# Docker Setup #

docker build -t palace-of-goods .
docker run -p 3000:3000 -d palace-of-goods
---
palace-of-goods/
├── public/
│   └── index.html  (Main HTML entry point)
├── src/
│   ├── assets/        (Images, fonts, SVGs)
│   ├── components/      (Reusable UI components)
│   ├── context/         (React Context providers)
│   ├── hooks/           (Custom React hooks)
│   ├── pages/           (Page components: Home, Login, Marketplace, etc.)
│   ├── routes/          (Routing configuration: AppRouter.tsx)
│   ├── services/        (API calls using Axios)
│   ├── state/           (Zustand store and related logic)
│   ├── types/           (TypeScript definitions for components, data, etc.)
│   ├── utils/           (Utility functions, formatters, helpers)
│   ├── App.tsx           (Main application component)
│   ├── index.tsx         (Entry point for rendering the app)
│   └── styles/         (Global styles or setup for CSS-in-JS)
├── backend/             (Express.js backend)
│   ├── routes/          (API routes: auth.js, products.js, etc.)
│   ├── models/          (Database models/schemas)
│   ├── config/          (Configuration files for database, etc.)
│   ├── middleware/      (Middleware for authentication, error handling)
│   ├── utils/           (Backend utility functions)
│   ├── app.js           (Main Express app file)
│   └── server.js        (Entry point for the backend server)
├── .swcrc               (SWC compiler config)
├── tsconfig.json        (TypeScript configuration)
├── package.json
├── Dockerfile
├── .dockerignore
├── .gitignore
└── README.md
