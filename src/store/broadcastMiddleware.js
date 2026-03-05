export const broadcastMiddleware = (store) => {
  const tabId = crypto.randomUUID();
  const channel = new BroadcastChannel("tic-tac-toe");

  // Listen for messages from other tabs
  channel.onmessage = (event) => {
    const { action, sender } = event.data;

    if (sender === tabId) return;

    // Dispatch received action
    store.dispatch({ ...action, meta: { ...action.meta, fromBroadcast: true } });
  };

  return (next) => (action) => {
    const result = next(action);

    // Only broadcast actions that did not come from broadcast
    if (!action.meta?.fromBroadcast) {
      channel.postMessage({ action, sender: tabId });
    }

    return result;
  };
};