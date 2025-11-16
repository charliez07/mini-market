# Mini Market – Client

Simple mini marketplace frontend built with React. It talks to the Express backend in the `server` directory.

---

## How to Install & Start

### 1. Install dependencies

From the project root, install both server and client:

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Start the backend (Express)

```bash
cd server
npm start
```

You should see:

```text
Server running on port 5001
```

The API will be available at `http://localhost:5001`.

### 3. Start the frontend (React)

In a separate terminal:

```bash
cd client
npm start
```

The app will open at `http://localhost:3000`.

The React dev server is configured with a proxy to the backend (`proxy: "http://localhost:5001"` in `client/package.json`), so frontend API calls go through `/api/...`.

---

## How to Switch Users (Alice / Bob / Charlie)

- At the top of the app, in the header, there is a **User** dropdown.
- Select **Alice**, **Bob**, or **Charlie** from this dropdown.
- The selected user is treated as the **current signed-in user** for:
  - Creating listings (they become the seller).
  - Booking items (they become the buyer).
  - What appears on **My Selling** and **My Buying** pages.

You can use this switcher to simulate the full flow (Alice sells, Bob books, etc.).

---

## Feature Overview

- **Public Listings (Home)**
  - Shows all items with `status: "available"`.
  - Each card shows image, title, description, price, and seller.
  - Non-sellers can click **Book** to book an item.

- **Create Listing**
  - Form for: title, description, price, optional image URL.
  - Uses the current user as the seller.
  - On success, redirects back to Home and the new item is visible.

- **Booking Flow**
  - A user cannot book their own item.
  - After booking, the item:
    - Gets `status: "booked"`.
    - Disappears from public Home listings.
    - Appears in:
      - Seller’s **My Selling → Booked**.
      - Buyer’s **My Buying**.

- **My Selling**
  - Grouped sections for **Available**, **Booked**, and **Sold**.
  - For **Booked** items:
    - **Mark as Sold** – sets status to `sold`.
    - **Cancel Booking** – resets status to `available` and clears buyer.

- **My Buying**
  - Shows items the current user has booked.
  - Shows whether each is currently **Booked** or **Sold**.

---

## Known Limitations

- **No authentication**: User identity is purely from the header dropdown; there is no real login.
- **File-based storage**:
  - Data is stored in `server/data/items.json`.
  - It is not safe for heavy concurrent writes.
  - Changes are lost if you delete the file, but otherwise persisted between runs.
- **No real-time updates**:
  - Pages fetch data on load / after certain actions.
  - There is no WebSocket or live update mechanism; you may need to refresh pages to see changes from another “user”.
- **No validation on extremely large inputs** beyond basic checks (e.g. price must be non-negative).
- **No production build / deployment configuration** included; project is focused on local development use.

---

