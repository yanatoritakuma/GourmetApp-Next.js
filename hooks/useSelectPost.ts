import { useState, useCallback } from "react";

export const useSelectPost = () => {
  const [selectedState, setSelectedState] = useState();
  const onSelectState = useCallback(({ posts, post }: any) => {
    const targetState = posts.find((state: any) => state.id === post.id);
    setSelectedState(targetState);
  }, []);
  return { onSelectState, selectedState };
};
