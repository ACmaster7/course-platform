# 🎓 Modern LMS Platform

A modern course platform (LMS) built with **Next.js 15**, **React 19**, **Stripe**, **Drizzle ORM**, **Shadcn UI**, and **PostgreSQL** — focused on best practices, caching, and scalable project structure.

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://docs.docker.com/get-docker/)
- [Stripe CLI](https://stripe.com/docs/stripe-cli) (for local webhook testing)

---

### 2. Clone the Repository

```bash
git clone https://github.com/ACmaster7/course-platform
cd course-platform-project
```

---

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and copy values from `.env.example`.

> ❗️You **must** fill out all values in `.env` before running the project — otherwise the app will throw an error on startup.

Example:

```env
DB_PASSWORD=password
DB_USER=postgres
DB_NAME=course-platform
DB_HOST=localhost
DB_PORT=5432
...
```

---

### 4. Start PostgreSQL via Docker

This project uses a PostgreSQL container managed by Docker Compose.

```bash
docker-compose up -d
```

This will:

- Start a `postgres:17.0` container
- Map container port `5432` to your local machine’s `5432` (by default)
- Use credentials and port from your `.env` file

---

### ⚠️ Port Conflict Notice

If port `5432` is already in use on your machine change the `DB_PORT` value in `.env` (e.g., to `5434`)

---

### 5. 📦 Install Dependencies & Set Up Database

Since the project uses a canary version of Next.js, run with `--force`:

```bash
npm install --force
```

Once the database container is up and dependencies are installed, generate the schema and migrate tables into the database:

```bash
npm run db:generate
npm run db:migrate
```

This will create and apply the database schema defined using **Drizzle ORM**.

You can now view and explore the database tables using:

```bash
npm run db:studio
```

---

### 6. 🔐 Configure Required Services

#### 📇 Clerk (Authentication)

1. Go to [Clerk.com](https://clerk.com/) and create a free account.
2. Create a new application.
3. Get the following values from your Clerk dashboard and add them to your `.env`:

> **Note: `CLERK_WEBHOOK_SIGNING_SECRET` – You will get this value in **Step 7** when you create the Clerk webhook.

```env
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SIGNING_SECRET=whsec_... 
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

> ⚠️ **Important:** You **must** have your Clerk webhook set up *before creating a user*, so the PostgreSQL database can sync with Clerk. Otherwise, the app's logic will break.

> 👤 To test admin features: After creating a user, go to the Clerk dashboard → Users tab → Metadata section → Public → Edit → Set `role` to `admin` → Save. Make sure the webhook is set up so the change is reflected in your database.

---

#### 💳 Stripe (Payments)

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/).
2. Get your keys and create promo codes as needed.
3. Add the following values:

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

STRIPE_PPP_50_COUPON_ID=your_coupon_id_here
STRIPE_PPP_40_COUPON_ID=your_coupon_id_here
STRIPE_PPP_30_COUPON_ID=your_coupon_id_here
STRIPE_PPP_20_COUPON_ID=your_coupon_id_here
```

> 🧪 To test a purchase in dev mode, use the test card number: `4242 4242 4242 4242`  
> You can enter any valid date, CVC, and name in the other inputs.

---

#### 🛡️ Arcjet (Bot Protection)

1. Sign up at [Arcjet.com](https://arcjet.com/) and create a project.
2. Copy your Arcjet key:

```env
ARCJET_KEY=your_arcjet_key_here
```

---

#### 🌐 Other

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Optional:
# TEST_IP_ADDRESS=1.187.0.0  # A test IP address from India to simulate regional coupons (e.g., PPP discounts)

```

---

### 7. 🔁 Set Up Webhooks

#### 📇 Clerk Webhooks

To forward Clerk webhook events to your local server:

1. In **VS Code**, open the **Ports** tab.
2. Click **“Forward a Port”**, enter `3000`, then hit **Enter**.
3. After the URL is generated (e.g., `https://[random-chararcters]-3000.use2.devtunnels.ms/`):
   - **Right-click** → **Make port visibility Public**
4. Copy the URL and set up a webhook in Clerk:

```
[YOUR_PUBLIC_URL]/api/webhooks/clerk
```

---

#### 💳 Stripe Webhooks

To receive Stripe events locally:

```bash
stripe login
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

Copy the `whsec_...` key it gives you and add it to `.env`:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

### 8. ✅ Run the Development Server

Once everything is configured and installed:

```bash
npm run dev
```

---

### 9. 🌱 Seed the Database

To populate the database with initial data:

```url
http://localhost:3000/api/seed
```

Navigate to that URL after starting the dev server.

---

