import { useState } from "react"

export const useUuId = () => {
  const [getUuId, setGetUuId] = useState();
  const getUnique = (uuId) => {
    let stong = 1000;
    if(uuId) stong = uuId;
    const generate = new Date().getTime().toString(16) + Math.floor(stong*Math.random()).toString(16)
    setGetUuId(generate);
  };
  return { getUnique };
}