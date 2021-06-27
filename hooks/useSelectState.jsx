import { useCallback, useState } from "react"

export const useSelect = () => {
  const [selectedState, setSelectedState] = useState("");
  const onSelectState = useCallback((props) => {
    const { allCategoryStates, i } = props;
    const targetState = allCategoryStates.find((allState) => allState.id === i);
    setSelectedState(targetState);
    console.log(targetState);
  },[])
  return { onSelectState, selectedState };
}