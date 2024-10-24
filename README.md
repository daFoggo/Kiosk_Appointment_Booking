# 1. About
- A simple project base for React and Shadcn. Which include some common Shadcn components and Reusable Charts
- NextJS is not used here

# 2. Libraries 
- React
- Shadcn
- Framer motion
- React Router
- Axios

# 2. Project structrue

```
└── 📁my_simple_react_shadcn_base
    └── 📁public
    └── 📁src
        └── 📁assets
            └── 📁fonts
                // Custom fonts not from Google
                └── 📁ClashDisplay
                ...
            └── 📁images
            └── 📁videos
            └── react.svg
        └── 📁components
            // Self-created components
            └── 📁ReuseDonutChart
                └── ReuseDonutChart.tsx
            └── 📁ReusePieChart
                └── ReusePieChart.tsx
            ...
            // Shadcn components
            └── 📁ui
                └── accordion.tsx
                └── avatar.tsx
                └── badge.tsx
                ...
        └── 📁contexts
        └── 📁hooks
        // Layouts for different types of page
        └── 📁layouts
            └── 📁RootLayout
                └── RootLayout.tsx
        └── 📁lib
            └── utils.ts
        // Interfaces for components and Columns for table,..
        └── 📁models
        // Map for routes
        └── 📁pages
            └── 📁Home
                └── Home.tsx
        └── 📁router
            └── router.tsx
            └── routerConfig.ts // route constants
        └── 📁utils
            └── 📁Helper
                └── 📁Home
                    └── helper.ts
                └── common.ts
            └── constant.ts
            └── ip.ts
        └── App.css
        └── App.tsx
        └── index.css
        └── main.tsx
        └── vite-env.d.ts
    └── .env
    └── .gitignore
    └── components.json
    └── eslint.config.js
    └── index.html
    └── package-lock.json
    └── package.json
    └── postcss.config.js
    └── README.md
    └── tailwind.config.js
    └── tsconfig.app.json
    └── tsconfig.json
    └── tsconfig.node.json
    └── vite.config.ts
```
