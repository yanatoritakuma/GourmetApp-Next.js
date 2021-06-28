import { useCallback, useState } from "react"

export const useSelect = () => {
  const [selectedState, setSelectedState] = useState("");
  const onSelectState = useCallback((props) => {
    const { allCategory, i } = props;
    const targetState = allCategory.find((allState) => allState.id === i);
    setSelectedState(targetState);
    console.log(targetState);
  },[])
  return { onSelectState, selectedState };
}