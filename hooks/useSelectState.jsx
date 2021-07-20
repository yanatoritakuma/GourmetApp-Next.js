import { useState } from "react"

export const useSelect = () => {
  const [selectedState, setSelectedState] = useState("");
  const onSelectState = ({ allCategory,categoryValue }) => {
    const targetState = allCategory.find((state) => state.id === categoryValue.id);
    setSelectedState(targetState);
  }
  return { onSelectState, selectedState };
}