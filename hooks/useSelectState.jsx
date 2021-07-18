import { useCallback, useState } from "react"

export const useSelect = () => {
  const [selectedState, setSelectedState] = useState("");
  const onSelectState = useCallback(({ all,categoryState }) => {
    const targetState = all.find((state) => state.uuid === categoryState.uuid);
    setSelectedState(targetState);
  },[])
  return { onSelectState, selectedState };
}