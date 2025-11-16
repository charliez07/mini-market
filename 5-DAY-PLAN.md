# 5-Day Development Plan: Mini Marketplace

## Overview
This plan breaks down the mini-marketplace project into manageable daily tasks, building features incrementally from foundation to completion.

---

## Day 1: Project Setup & User Management
**Goal:** Establish foundation with user switching and basic routing

### Backend Tasks
- [ ] Set up items API routes (`/api/items`)
  - GET `/api/items` - Get all available items
  - POST `/api/items` - Create new listing
  - Implement JSON file reading/writing utilities
- [ ] Create user data structure (mock users: Alice, Bob, Charlie)
- [ ] Test API endpoints with Postman/curl

### Frontend Tasks
- [ ] Set up React Router for navigation
- [ ] Create Header component with user dropdown
  - Dropdown to switch between Alice, Bob, Charlie
  - Store selected user in React state/context
- [ ] Create basic page structure:
  - Home page (listings)
  - CreateListing page
  - MySelling page
  - MyBuying page
- [ ] Set up API service/utility for backend calls
- [ ] Basic styling setup (CSS or minimal framework)

### Deliverables
- ✅ User can switch between 3 mock users
- ✅ Basic navigation between pages works
- ✅ Backend API can read/write items.json
- ✅ Frontend can fetch items from backend

---

## Day 2: Browsing & Creating Listings
**Goal:** Users can view and create item listings

### Backend Tasks
- [ ] Enhance GET `/api/items` endpoint
  - Filter to show only `status: "available"` items
  - Return seller name with each item
- [ ] Enhance POST `/api/items` endpoint
  - Accept: title, description, price, image, seller
  - Generate unique ID
  - Set default status as "available"
  - Save to items.json
- [ ] Add image handling (accept image URL or file path)

### Frontend Tasks
- [ ] Build Home page component
  - Display all available items
  - Show: photo, title, price, seller name
  - Use ItemCard component for each listing
- [ ] Build ItemCard component
  - Display item details
  - Show "Book" button (disabled if user is seller)
- [ ] Build CreateListing page
  - Form with fields: title, description, price, image (URL for now)
  - Submit creates new listing
  - Redirect to Home after creation
- [ ] Connect frontend to backend APIs
- [ ] Add basic error handling

### Deliverables
- ✅ Public listings page shows all available items
- ✅ Users can create new listings
- ✅ New listings appear on public page
- ✅ Items show correct seller information

---

## Day 3: Booking Functionality
**Goal:** Users can book items and items become unavailable

### Backend Tasks
- [ ] Add PUT/PATCH `/api/items/:id/book` endpoint
  - Update item status to "booked"
  - Set buyer field to current user
  - Validate: item must be available, user can't book own item
- [ ] Update GET `/api/items` logic
  - Only return items with `status: "available"` for public view
- [ ] Add GET `/api/items/my-selling/:seller` endpoint
  - Return all items where seller matches
- [ ] Add GET `/api/items/my-buying/:buyer` endpoint
  - Return all items where buyer matches

### Frontend Tasks
- [ ] Implement booking flow on ItemCard
  - "Book" button calls booking API
  - Show confirmation/loading state
  - Remove item from public view after booking
- [ ] Update Home page
  - Hide booked items automatically
  - Show message if no items available
- [ ] Build MySelling page skeleton
  - Fetch user's listings
  - Display all items (available, booked, sold)
- [ ] Build MyBuying page skeleton
  - Fetch user's booked items
  - Display booked and sold items

### Deliverables
- ✅ Users can book available items
- ✅ Booked items disappear from public listings
- ✅ Users can't book their own items
- ✅ MySelling and MyBuying pages show correct items

---

## Day 4: Seller Management (My Selling)
**Goal:** Sellers can manage their listings (mark sold, cancel booking)

### Backend Tasks
- [ ] Add PUT `/api/items/:id/sold` endpoint
  - Update status to "sold"
  - Validate: only seller can mark as sold, item must be booked
- [ ] Add PUT `/api/items/:id/cancel` endpoint
  - Update status back to "available"
  - Clear buyer field
  - Validate: only seller can cancel, item must be booked

### Frontend Tasks
- [ ] Complete MySelling page
  - Display items grouped by status (Available, Booked, Sold)
  - For booked items: show "Mark as Sold" and "Cancel Booking" buttons
  - For sold items: show "Sold" badge
  - For available items: show "Available" status
- [ ] Implement "Mark as Sold" action
  - Call API, update UI
  - Show confirmation
- [ ] Implement "Cancel Booking" action
  - Call API, update UI
  - Item becomes available again
- [ ] Add status badges/indicators for visual clarity
- [ ] Handle edge cases (empty states, errors)

### Deliverables
- ✅ Sellers see all their listings with correct status
- ✅ Sellers can mark booked items as sold
- ✅ Sellers can cancel bookings (item becomes available)
- ✅ UI clearly shows item status

---

## Day 5: Buyer Management & Polish
**Goal:** Complete My Buying page, testing, and documentation

### Backend Tasks
- [ ] Review and test all endpoints
- [ ] Add error handling for edge cases
- [ ] Ensure data persistence works correctly

### Frontend Tasks
- [ ] Complete MyBuying page
  - Display all booked items
  - Show "Sold" status if seller marked as sold
  - Show seller information
  - Handle case when seller cancels (item disappears)
- [ ] Add loading states throughout app
- [ ] Improve error handling and user feedback
- [ ] Polish UI/UX
  - Consistent styling
  - Responsive design
  - Better empty states
  - Loading indicators

### Testing & Documentation
- [ ] Test complete user flows:
  - Alice posts → Bob books → Alice marks sold
  - Alice posts → Bob books → Alice cancels
  - Multiple users, multiple items
- [ ] Create README.md with:
  - Installation instructions
  - How to start server and client
  - How to switch users
  - Seed data information
  - Known limitations
- [ ] Take screenshots:
  - Public listings page
  - Create listing page
  - Booking an item
  - My Selling page (with Booked → Sold/Cancel)
  - My Buying page
- [ ] Optional: Record 1-2 minute demo video
- [ ] Code cleanup and comments
- [ ] Prepare for GitHub upload

### Deliverables
- ✅ MyBuying page fully functional
- ✅ All features working end-to-end
- ✅ README with clear instructions
- ✅ Screenshots captured
- ✅ Code clean and ready for submission

---

## Daily Time Estimate
- **Day 1:** 4-6 hours (setup and foundation)
- **Day 2:** 5-7 hours (core features)
- **Day 3:** 4-6 hours (booking logic)
- **Day 4:** 4-6 hours (seller management)
- **Day 5:** 5-7 hours (buyer features, polish, docs)

**Total:** ~22-32 hours over 5 days

---

## Tips for Success

1. **Start each day by reviewing previous day's work**
2. **Test incrementally** - don't wait until the end
3. **Commit to git daily** - helps track progress
4. **Keep it simple** - focus on requirements, avoid over-engineering
5. **Use placeholder images** initially (e.g., via.placeholder.com)
6. **Test with all three users** to verify flows work correctly

---

## Data Structure Reference

```json
{
  "id": 1,
  "title": "Sample Stroller",
  "description": "Gently used stroller",
  "price": 50,
  "image": "https://via.placeholder.com/150",
  "seller": "Alice",
  "status": "available" | "booked" | "sold",
  "buyer": null | "Bob"
}
```

## API Endpoints Summary

- `GET /api/items` - Get all available items (public)
- `POST /api/items` - Create new listing
- `PUT /api/items/:id/book` - Book an item
- `GET /api/items/my-selling/:seller` - Get seller's items
- `GET /api/items/my-buying/:buyer` - Get buyer's items
- `PUT /api/items/:id/sold` - Mark item as sold
- `PUT /api/items/:id/cancel` - Cancel booking

---

Good luck with your development! 🚀

