export const useUUID = () => {
  const createUUID = (uuid) => {
    let stong = 1000;
    if(uuid) stong = uuId;
    new Date().getTime().toString(16) + Math.floor(stong*Math.random()).toString(16)
  };
  return { createUUID };
}