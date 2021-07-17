import { useCallback, useState } from "react"

export const useSelect = () => {
  const [selectedState, setSelectedState] = useState("");
  const onSelectState = useCallback(({ all,i }) => {
    const targetState = all.find((state) => state.uuid === state.uuid);
    setSelectedState(targetState);
  },[])
  return { onSelectState, selectedState };
}