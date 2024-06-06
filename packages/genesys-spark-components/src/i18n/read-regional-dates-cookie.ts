// Remove with this ticket https://inindca.atlassian.net/browse/COMUI-2598
export const readRegionalDatesCookie = () => {
  return !!document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith('spark-enable-regional-dates'));
};
