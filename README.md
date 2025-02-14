palace-of-goods/
├── public/               # Static files (favicon, index.html, etc.)
│   └── index.html        # Main HTML entry point
├── src/                  # Frontend source code
│   ├── assets/           # Images, fonts, SVGs
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components (Home, Login, Marketplace, etc.)
│   ├── routes/           # Routing configuration (AppRouter.tsx)
│   ├── services/         # API calls using Axios
│   ├── state/            # Zustand store and related logic
│   ├── types/            # TypeScript definitions for components, data, etc.
│   ├── utils/            # Utility functions, formatters, helpers
│   ├── styles/           # Global styles (CSS or CSS-in-JS)
│   ├── App.tsx           # Main application component
│   └── index.tsx         # Entry point for rendering the app
├── backend/              # Backend source code (Express.js server)
│   ├── routes/           # API routes (auth.ts, products.ts, etc.)
│   ├── models/           # Database models/schemas
│   ├── config/           # Configuration files for database, environment
│   ├── middleware/       # Middleware for authentication, error handling
│   ├── utils/            # Backend utility functions
│   ├── app.ts            # Main Express app file
│   └── server.ts         # Entry point for the backend server
├── .swcrc                # SWC compiler config (for faster builds)
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
├── Dockerfile            # Docker container configuration
├── .dockerignore         # Ignore files for Docker build
├── .gitignore            # Ignore files for Git
└── README.md             # Project documentation
