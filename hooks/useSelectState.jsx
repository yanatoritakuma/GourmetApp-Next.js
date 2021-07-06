import { useCallback, useState } from "react"

export const useSelect = () => {
  const [selectedState, setSelectedState] = useState("");
  const onSelectState = useCallback(({ categoriesState, i }) => {
    const targetState = categoriesState.find((allState) => allState.id === i);
    setSelectedState(targetState);
  },[])
  return { onSelectState, selectedState };
}