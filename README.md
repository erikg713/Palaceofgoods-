# Palaceofgoods-

---
Web3-based marketplace application built on Pi Network’s blockchain 
---

mkdir palace-of-goods && cd palace-of-goods
npm init -y
npm install react react-dom react-router-dom
npm install -D @swc/core @swc/cli typescript @types/react @types/react-dom @types/react-router-dom
npm install axios zustand classnames
npm install pi-sdk
npm install jwt-decode bcryptjs
npm install -D @types/jwt-decode
backend dependencies 
npm install nodemailer
npm install react-toastify
npm install socket.io express
---
# File Structure #
---
palace-of-goods/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── state/
│   ├── utils/
│   ├── App.tsx
│   └── index.tsx
├── .swcrc
├── tsconfig.json
├── package.json
└── node_modules/
---
"scripts": {
  "build": "swc src -d dist --source-maps true"
}
npm install -D @swc/core @swc/cli
palace-of-goods/.swcrc
{
  "jsc": {
    "parser": {
      "syntax": "typescript",     // Specifies that TypeScript syntax will be parsed.
      "tsx": true,                // Enables support for JSX syntax used in React.
      "decorators": false,        // Disables support for experimental decorators.
      "dynamicImport": true       // Enables support for dynamic imports (`import()`).
    },
    "transform": {
      "react": {
        "runtime": "automatic"    // Uses the automatic JSX runtime (React 17+), removing the need to explicitly import React.
      }
    },
    "target": "es2022"             // Outputs code compatible with ECMAScript 2022.
  },
  "module": {
    "type": "es6",                // Outputs ES6 module syntax.
    "strict": true                // Ensures strict module transformation rules.
  }
}
---
# Docker #
docker build -t palace-of-goods .
docker run -p 3000:3000 palace-of-goods
