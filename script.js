const handle = document.querySelector('.sidebar');
const sidebar = document.querySelector('.sidebar_container');

let isResizing = false;

// Mouse down event to start resizing
handle.addEventListener('mousedown', (e) => {
    isResizing = true;
});

// Mouse up event to stop resizing
document.addEventListener('mouseup', () => {
    isResizing = false;
});

// Mouse move event to resize the sidebar
document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;

    const newWidth = e.clientX - sidebar.getBoundingClientRect().left;
    sidebar.style.width = `${newWidth}px`; // Set new width of the sidebar
});