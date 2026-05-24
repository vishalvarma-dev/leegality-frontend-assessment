import { Route, Routes } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import ProductListing from "./pages/ProductListing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductListing />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;
