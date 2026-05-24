import { Route, Routes } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import ProductListing from "./pages/ProductListing";
import MainLayout from "./layouts/MainLayout";
import { FilterProvider } from "./context/FilterContext";

function App() {
  return (
    <FilterProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </FilterProvider>
  );
}

export default App;
