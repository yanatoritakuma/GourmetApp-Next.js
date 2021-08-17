import { useState } from "react";

export const useSelect = () => {
  const [selectedState, setSelectedState] = useState("");
  const onSelectState = ({ categories,categoryValue }) => {
    const targetState = categories.find((state) => state.id === categoryValue.id);
    setSelectedState(targetState);
  }
  return { onSelectState, selectedState };
}