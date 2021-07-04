import { useCallback, useState } from "react"

export const useSelect = () => {
  const [selectedState, setSelectedState] = useState("");
  const onSelectState = useCallback(({ categorysState, i }) => {
    const targetState = categorysState.find((allState) => allState.id === i);
    setSelectedState(targetState);
  },[])
  return { onSelectState, selectedState };
}