export const emitAuthFailed = () => {
  window.dispatchEvent(new Event('auth-failed'));
};

export const emitConnectionError = () => {
  window.dispatchEvent(new Event('connection-error'));
};
