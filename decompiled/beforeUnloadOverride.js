function overrideBeforeUnload() {
  const uniqueEventId = chrome.runtime.id + Math.random();
  
  // Listener for runtime messages
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "override") {
      window.dispatchEvent(new Event(uniqueEventId));
      sendResponse("ok");
    }
  });

  // Override the beforeunload behavior
  let isUnloadPrevented = false;
  
  window.addEventListener("beforeunload", () => {
    window.onbeforeunload = null;
    isUnloadPrevented = true;
  });

  window.addEventListener("beforeunload", (event) => {
    if (isUnloadPrevented) {
      event.stopImmediatePropagation();
    }
  });

  // Dispatch an override message to trigger the event
  chrome.runtime.sendMessage({ type: "override" });
}

// Example usage
overrideBeforeUnload();
