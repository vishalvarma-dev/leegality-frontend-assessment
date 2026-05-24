# 🛒 Leegality – Frontend Engineer Assessment

### Product Listing & Detail Page (Amazon-style)

A simple e-commerce product browsing application built using React, TypeScript, and Vite with data fetched from the DummyJSON Products API.

---

# 📦 Tech Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Native Fetch API

---

# 🚀 Setup Instructions

## 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/leegality-frontend-assessment.git
cd leegality-frontend-assessment
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Start the Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173** by default.

## 4. Build for Production

```bash
npm run build
```

The optimised output will be placed in the `dist/` folder.

## 📁 Project Structure

```
src/
├── api/
│   └── product.ts            # All API calls to DummyJSON (fetch wrappers)
├── components/
│   ├── common/
│   │   ├── Pagination.tsx    # Reusable smart pagination with ellipsis
│   │   └── Rating.tsx        # Star-rating display component
│   ├── FilterPanel.tsx       # Left sidebar: categories, price range, brands
│   ├── Navbar.tsx            # Top navigation bar
│   ├── ProductCard.tsx       # Individual product card (thumbnail, title, price, rating)
│   ├── ProductGrid.tsx       # Responsive grid that renders ProductCards
│   └── SearchBar.tsx         # Search bar component
├── context/
│   └── FilterContext.tsx     # Global filter state (React Context + useState)
├── hooks/
│   ├── useProductCategoryList.ts  # Fetches /products/category-list
│   ├── useProducts.ts             # Core hook: fetches, paginates & filters products
│   └── useProductSearch.ts        # Search-scoped data fetching hook
├── layouts/
│   └── MainLayout.tsx        # Shared layout wrapper (Navbar + <Outlet>)
├── pages/
│   ├── ProductListing.tsx    # "/" – grid + filters + pagination
│   └── ProductDetail.tsx     # "/product/:id" – full product info + image gallery
├── types/
│   └── product.ts            # TypeScript interfaces for Product, Review, etc.
└── utils/
    ├── cn.ts                 # clsx + tailwind-merge utility for class names
    └── constent.ts           # Base API URL constant
```

---

## ✅ Features Implemented

### Product Listing Page

- Product grid layout
- Product cards with: image, title, price, rating
- Pagination support
- Loading state & Error handling
- Filters:
  - Category filter
  - Brand filter
  - Price range filter
  - Combined filter behaviour
  - Pagination reset on filter change

### Product Detail Page

- Product details: image, title, price, rating, description, brand, category
- Navigation:
  - Product card → detail page
  - Back button support
  - Filters remain applied after navigating back

---

## 🎯 Assessment Requirements Coverage

| Requirement                                               | Status | Notes                                           |
| --------------------------------------------------------- | ------ | ----------------------------------------------- |
| Product Listing Page                                      | ✅     | `/` route with grid layout                      |
| Product Detail Page                                       | ✅     | `/product/:id` route                            |
| Product Card (image, name, price, rating)                 | ✅     | `ProductCard.tsx`                               |
| Navigate card → Detail                                    | ✅     | React Router `<Link>`                           |
| Category filter (dynamic from API)                        | ✅     | `GET /products/category-list`                   |
| Price Range filter (min/max)                              | ✅     | Client-side filter via `useMemo`                |
| Brand filter (multi-select)                               | ✅     | Extracted from fetched products                 |
| Combined filter behaviour                                 | ✅     | All three filters applied simultaneously        |
| Pagination (limit/skip)                                   | ✅     | API-level pagination, 12 items/page             |
| Pagination resets on filter change                        | ✅     | `useEffect` with filter deps                    |
| Loading state                                             | ✅     | Animated skeleton cards                         |
| Error handling                                            | ✅     | Error message shown on fetch failure            |
| Back button on Detail                                     | ✅     | `navigate(-1)` preserves filter state           |
| Filter persistence on Back                                | ✅     | Context lives above router; survives navigation |
| Detail: image, name, price, rating, desc, brand, category | ✅     | All fields rendered                             |
| Detail: image gallery                                     | ✅     | Paginated multi-image viewer                    |
| Detail: user reviews                                      | ✅     | Reviewer name, rating, comment                  |

---

## 🧠 Assumptions Made

1. **Single category selection** — The assessment did not explicitly state whether multiple categories could be selected simultaneously. Since the DummyJSON API supports filtering by only one category per request (`/products/category/{category}`), single-select behaviour was chosen for categories. Brands and price range support combined filtering on top.

2. **Brand list sourced from fetched products** — The API has no dedicated `/brands` endpoint. Brands are extracted from the products returned by the current page and accumulated across page changes within a given category.

3. **Price filtering is client-side** — DummyJSON does not expose a server-side price range parameter, so price min/max filtering is applied via `useMemo` on the already-fetched page of products. This means the filter operates on the current page's 12 items, not the entire catalogue.

4. **`category-list` endpoint used instead of `categories`** — `/products/category-list` returns a simple string array (e.g., `["beauty", "fragrances", ...]`), which is more convenient than `/products/categories` which returns an array of category objects. Both are valid; the simpler format was preferred.

5. **12 products per page** — A page size of 12 was chosen as it divides cleanly into a 4-column, 3-column, and 2-column grid, keeping every row complete on common screen widths.

6. **No search-to-filter integration** — The `SearchBar` and `useProductSearch` hook exist in the codebase but are decoupled from the main filter flow to avoid conflicting state between keyword search and structured filters.

---

## 🏗️ Architectural Decisions

### 1. React Context for Filter State (`FilterContext`)

A single `FilterProvider` wraps the entire app above the router. This means filter state survives navigation between the listing and detail pages without any URL-encoding or localStorage — navigating **Back** from the detail page restores the exact filter state the user left.

Two layers of state are maintained:

- **Draft state** (`selectedCategories`, `priceRange`, `selectedBrands`) — what the user is actively editing in the sidebar.
- **Applied state** (`appliedFilters`) — the committed version that `useProducts` actually reacts to.

### 2. Custom Hooks for Data Fetching

All API logic is isolated inside `hooks/`:

- `useProducts` owns fetching, pagination, brand extraction, and local filtering. It is the single source of truth for what products are displayed.
- `useProductCategoryList` is a simple, single-responsibility hook for the category list.
- `useProductSearch` is available for an optional search feature without coupling to the main filters.

This separation keeps pages thin ("smart pages" delegate to hooks, "dumb components" just render).

### 3. API Layer (`api/product.ts`)

All `fetch` calls are centralised in one file. Each function is a typed async utility that throws on non-2xx responses, so errors propagate cleanly to hooks. The base URL lives in `utils/constent.ts` — one place to change if the API ever moves.

### 4. Reusable Common Components

- **`Pagination`** — fully generic; accepts `currentPage`, `totalPages`, `onPageChange`. It is reused for both the product grid pagination and the per-product image gallery in the Detail page.
- **`Rating`** — renders filled/half/empty stars from any numeric rating. Used in both `ProductCard` and `ProductDetail`.

### 5. Tailwind CSS v4 + `clsx` / `tailwind-merge`

Tailwind v4 is used for utility-first styling. The `cn()` utility (combining `clsx` and `tailwind-merge`) prevents class conflicts when composing conditional class strings, particularly important in the `Pagination` component which accepts external `classNames` overrides.

### 6. TypeScript Throughout

All components, hooks, API functions, and context are fully typed. The `Product`, `ProductReview`, `ProductsResponse`, and `FilterState` interfaces ensure type safety end-to-end with zero `any` usage in production code.

---

## ⚠️ Challenges Faced

- **Combined Filtering**: The main challenge was making category, brand, and price filters work together correctly while keeping pagination in sync.
- **Filter Persistence**: Another challenge was preserving filters after navigating to the product detail page and returning back to the listing page.

---

## 🔮 Improvements if Given More Time

### Functionality

- **URL-synced filters** — Encode active filters into query params (e.g., `?category=beauty&minPrice=10&brand=Essence`). This would make filtered views shareable and survive hard refreshes.
- **Debounced price inputs** — Apply price filters automatically after a short debounce delay (e.g., 300 ms) instead of requiring an Apply button, improving UX without causing excessive re-renders.
- **Full-catalogue price filtering** — Fetch all products in a category once, cache them, and apply price filtering on the full set rather than just the current page.
- **Sort options** — Add a "Sort by" dropdown (Price: Low → High, Rating, Newest) using the API's `sortBy` and `order` params.
- **Wishlist / Favourites** — Allow users to heart-save products, persisted to `localStorage`.

### UX & Accessibility

- **Keyboard-accessible filter panel** — Ensure all checkboxes and inputs are navigable via keyboard with visible focus rings
- **Empty-state illustrations** — Replace the generic icon with a branded illustration for zero-result states.
- **Toast notifications** — Show brief feedback toasts on filter apply / error states.

### Performance & Code Quality

- **React Query / SWR** — Replace manual `useState`/`useEffect` data fetching with a dedicated async-state library for built-in caching, deduplication, background refetch, and stale-while-revalidate.
- **Virtualised product grid** — For very large lists, use a windowing library (e.g., `react-window`) to avoid rendering off-screen cards.
- **Image lazy loading** — Add `loading="lazy"` and `decoding="async"` to all product images.

---

## 🌐 API Endpoints Used

- `GET /products`
- `GET /products/category-list` (or `GET /products/categories`)
- `GET /products/category/{category}`
- `GET /products/{id}`

**DummyJSON API:** [https://dummyjson.com/docs/products](https://dummyjson.com/docs/products)

---

## 📌 Notes

- Functional components and React hooks are used throughout the project.
- Tailwind CSS is used for styling.
- Error and loading states are handled properly for API requests.
- The project structure is organised to keep components reusable and maintainable.
