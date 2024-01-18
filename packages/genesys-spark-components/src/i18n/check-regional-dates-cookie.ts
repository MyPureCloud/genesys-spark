export const readRegionalDatesCookie = () => {
  return !!document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith('spark-enable-regional-dates'));
};
