// Tiny toast utility (no external deps)
// Usage: toast.success("..."), toast.error("...")

const TOAST_ROOT_ID = "toast-root";

function ensureRoot() {
  let root = document.getElementById(TOAST_ROOT_ID);
  if (root) return root;

  root = document.createElement("div");
  root.id = TOAST_ROOT_ID;
  root.className = "toast-root";
  document.body.appendChild(root);
  return root;
}

function addToast({ type, message, durationMs = 3500 }) {
  const root = ensureRoot();

  const toastEl = document.createElement("div");
  toastEl.className = `toast toast--${type}`;
  toastEl.setAttribute("role", "status");
  toastEl.textContent = message;

  root.appendChild(toastEl);

  window.setTimeout(() => {
    toastEl.style.opacity = "0";
    toastEl.style.transform = "translateY(-6px)";
    toastEl.style.pointerEvents = "none";
  }, durationMs - 500);

  window.setTimeout(() => {
    toastEl.remove();
  }, durationMs);
}

export const toast = {
  success: (message) => addToast({ type: "success", message }),
  error: (message) => addToast({ type: "error", message }),
};

