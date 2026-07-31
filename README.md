text
TS_Store/
├── src/
│   ├── app.ts                  # Application entry point & Express setup
│   ├── controllers/            # HTTP request/response handlers
│   ├── services/               # Business logic and orchestration layer
│   ├── repositories/           # Data access layer (SQL queries)
│   ├── models/                 # TypeScript interfaces and data models
│   ├── routes/                 # API route definitions
│   ├── middlewares/            # Auth, validation, error handling, rate limiting
│   └── utilities/              # Helper functions (Multer config, TryCatch wrapper)
├── public/                     # Static assets (e.g., uploaded avatars)
├── Shop.mdf                    # SQL Server database file
├── package.json
├── tsconfig.json               # Strict TypeScript configuration
└── .env                        # Environment variables (not committed to Git)
