export const useUuId = () => {
  const getUnique = (uuId) => {
    let stong = 1000;
    if(uuId) stong = uuId;
    new Date().getTime().toString(16) + Math.floor(stong*Math.random()).toString(16)
  };
  return { getUnique };
}