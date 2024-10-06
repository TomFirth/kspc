export const getTimestamp = () => {
  const now = new Date();
  return new Date().toISOString();
};