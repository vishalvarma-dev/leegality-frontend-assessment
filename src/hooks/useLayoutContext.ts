import { useOutletContext } from "react-router-dom";

export type LayoutContextType = {
  isFilterOpen: boolean;
  onToggleFilter: () => void;
  onCloseFilter: () => void;
};

export function useLayoutContext() {
  return useOutletContext<LayoutContextType>();
}
