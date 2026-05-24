import { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import type { LayoutContextType } from "../hooks/useLayoutContext";

const MainLayout = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const onToggleFilter = () => setIsFilterOpen((prev) => !prev);
  const onCloseFilter = () => setIsFilterOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar isFilterOpen={isFilterOpen} onToggleFilter={onToggleFilter} />
      <main className="max-w-[1500px] mx-auto p-4">
        <Outlet context={{ isFilterOpen, onToggleFilter, onCloseFilter } satisfies LayoutContextType} />
      </main>
    </div>
  );
};

export default MainLayout;