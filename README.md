# 📊 Sales Analytics Dashboard 

## 🎬 Overview

This dashboard visualizes mock sales data using charts, metrics, filters, and a searchable data table. The project was built with a strong focus on TypeScript, reusable architecture, responsive design, and interactive data visualizations.

## 🛠️ My Approach

### ✅ Project Setup
- **Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS, Recharts, Lucide Icons
- **Architecture**: Component-driven design with clear folder separation (`charts`, `dashboard`,`filters`,`layout`, `ui`)
- **Data Handling**: Created a reusable `useFilters` custom hook to manage filter state and memoized data transformations

### 📈 Data Visualization
- **Metric Cards**: Displays total sales, total orders, AOV, and top month
- **Line Chart**: Monthly sales trend with proper formatting and responsiveness
- **Bar Chart**: Aggregated sales by product category
- **Pie Chart**: Regional revenue distribution
- **Data Table**: Searchable, sortable sales records

## 📄 Changes & Assumptions

### ✔ Changes I Made
- Large refactor for `App.tsx` with `Metric Card`, `FilterPanel`and  `SalesRecordTable` components
- Used custom hook (`useFilters`) which encapusalted all filtering logic 
- Refactor `utils` functions to round up numbers to 2 decimal places
- Applied rounding and formatting for chart labels while keeping numeric data intact
- Ensured charts and UI components are fully responsive (mobile first)
- Added Pagination for Sales Record Table

## 🧪 Suggestions for Further Improvements
- **Export Feature**: Allow users to download filtered data
- **Unit Tests**: Add coverage for `useFilters` hook, ensuring data is displayed correctly
- **Dark Mode Toggle**
- **Revised UI design**
