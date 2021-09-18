import { useState } from "react";

export const useSelect = () => {
  const [selectedState, setSelectedState] = useState();
  const onSelectState = ({ categories, categoryValue }: any) => {
    console.log("categories",categories)
    console.log("categoryValue",categoryValue)
    const targetState = categories.find((state: any) => state.id === categoryValue.id);
    setSelectedState(targetState);
    console.log("targetState", targetState);
  }
  return { onSelectState, selectedState };
}
