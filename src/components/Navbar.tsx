import { Menu, ShoppingCart, PieChart, User } from "lucide-react";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="bg-(--background-color) h-16 flex items-center justify-between px-4 shadow-sm text-slate-100">
      <div className="flex items-center">
        <button className="p-2 hover:bg-white/10 rounded-md transition-colors">
          <Menu size={24} />
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