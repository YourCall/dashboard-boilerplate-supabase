# Dashboard Boilerplate with Supabase

A reusable boilerplate for creating dashboards with full authentication using Supabase, built with Next.js 15, TypeScript, Tailwind CSS and shadcn/ui.

## Features

• ✅ Full authentication (sign up, login, logout)
• ✅ Route protection with middleware
• ✅ Supabase database with Row Level Security (RLS)
• ✅ Dashboard with stats and activity
• ✅ Settings page
• ✅ Light / Dark mode
• ✅ Responsive layout with sidebar
• ✅ Strict TypeScript
• ✅ shadcn/ui components

## Project structure

\`\`\`
├── app/
│ ├── dashboard/ # Protected dashboard page
│ ├── settings/ # Protected settings page
│ ├── login/ # Login page
│ ├── signup/ # Sign-up page
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Home page
│ └── globals.css # Global styles
├── components/
│ ├── ui/ # shadcn/ui components
│ ├── dashboard-layout.tsx # Dashboard layout
│ ├── user-nav.tsx # User navigation
│ ├── theme-toggle.tsx # Theme toggle
│ └── theme-provider.tsx # Theme provider
├── lib/
│ ├── supabase/
│ │ ├── client.ts # Supabase client (browser)
│ │ ├── server.ts # Supabase client (server)
│ │ └── middleware.ts # Middleware helper
│ └── utils.ts # Utils
├── types/
│ └── database.ts # TypeScript types for DB
├── scripts/
│ ├── 001_create_profiles_table.sql # Create profiles table
│ └── 002_create_profile_trigger.sql # Trigger for automatic profile creation
└── middleware.ts # Next.js middleware
\`\`\`

## Local installation

### Prerequisites

- Node.js 18+

### Steps

1.  **Clone the project**
    \`\`\`bash
    git clone <votre-repo>
    cd <nom-du-projet>
    \`\`\`

2.  **Install dependencies**
    \`\`\`bash
    npm install
    \`\`\`

3.  **Configure Supabase**
    Case 1 — Create a new dashboard
    If you want a new Supabase project, run the automatic setup script:

npm run create:supabase -- \
 --token TOKEN \ # Supabase access token (stored in Bitwarden)
--org ORG_ID \ # Organization ID (stored in Bitwarden)
--name "SUPABASE_PROJECT_NAME" \ # Supabase project name
--password "PASSWORD" # Chosen database password

Example :
npm run create:supabase -- \
 --token "sbp_b\***\*\*\*\*\*\***" \
 --org "ftzjq\***\*\*\*\*\*\*\***" \
 --name "dashboard-client-test1" \
 --password "mypassword123"

The script:
• Automatically creates the project in your organization
• Fetches API keys
• Writes them directly to a .env.local file
You can start the project immediately after that.

Case 2 — The dashboard already exists

If a Supabase project already exists, create your .env at the root of the repo and ask the team for the credentials.

NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...

4.  **Environment variables (for external deployment)**

    Create a .env file at the root:
    \`\`\`env

    NEXT_PUBLIC_SUPABASE_URL=url_supabase
    NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY=anon_key
    \`\`\`

5.  **Start the development server**
    \`\`\`bash
    npm run dev
    \`\`\`

6.  **Open the app**

    Go to http://localhost:3000

## Usage

### Create an account

1. Click “Create an account”
2. Enter your email and password
3. Check your email (Supabase sends a confirmation link)
4. Click the link to confirm
5. Log in with your credentials

### Navigation

- **Dashboard** : overview with stats
- **Paramètres** : manage profile and preferences

### Logout

Click your avatar in the top-right corner and select “Logout”

## Security

- **Row Level Security (RLS)** : enabled on all tables
- **Middleware** : automatic route protection
- **Tokens** : auto-refresh handled by middleware
- **Validation** : client and server-side validation

## Technologies

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS v4
- **UI** : shadcn/ui
- **Auth & DB** : Supabase
- **Icons** : Lucide React

## Customization

### Add a new protected page

1. Create app/my-page/page.tsx
2. Use the DashboardLayout
3. Check authentication with createClient() from @/lib/supabase/server

### Change the theme

Edit CSS variables in app/globals.css (sections :root and .dark)

## Licence

MIT - Free for personal and commercial use.

## Support

For any questions, open an issue on GitHub or check the Supabase documentation: https://supabase.com/docs
