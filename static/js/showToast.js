function showToast(message, status = "success") {
    const toastContainer = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${status} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = `
    <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    `;
    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast,  {autohide: true, delay: 3000 });
    bsToast.show();

    setTimeout(() => toast.remove(), 3000);
}