import { Menu, ShoppingCart, PieChart, User, X } from "lucide-react";
import SearchBar from "./SearchBar";

interface NavbarProps {
  isFilterOpen?: boolean;
  onToggleFilter?: () => void;
}

const Navbar = ({ isFilterOpen = false, onToggleFilter }: NavbarProps) => {
  return (
    <nav className="bg-(--background-color) h-16 flex items-center justify-between px-4 shadow-sm text-slate-100 sticky top-0 z-40">
      <div className="flex items-center">
        <button
          onClick={onToggleFilter}
          className="p-2 hover:bg-white/10 rounded-md transition-all duration-200 relative"
          aria-label={isFilterOpen ? "Close filters" : "Open filters"}
          title={isFilterOpen ? "Close filters" : "Open filters"}
        >
          <span
            className={`block transition-all duration-300 ${isFilterOpen ? "rotate-90 opacity-0 absolute inset-2" : "rotate-0 opacity-100"}`}
          >
            <Menu size={24} />
          </span>
          <span
            className={`block transition-all duration-300 ${isFilterOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0 absolute inset-2"}`}
          >
            <X size={24} />
          </span>
        </button>
      </div>

      <SearchBar />

      <div className="hidden md:flex items-center space-x-2">
        <button className="p-2 hover:bg-white/10 rounded-md transition-colors">
          <ShoppingCart size={24} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-md transition-colors">
          <PieChart size={24} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-md transition-colors">
          <User size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;