let isManuallyToggled = false;  // Track whether the user manually toggled the sidebar

const sidebar = document.querySelector('.sidebar');
const contractBtn = document.querySelector('.contract_btn');
const expandBtn = document.querySelector('.expand_btn');

// Handle sidebar toggle when clicking buttons
contractBtn.onclick = function () {
    sidebar.classList.add('active');  // Contract sidebar
    isManuallyToggled = true;  // User manually toggled
};

expandBtn.onclick = function () {
    sidebar.classList.remove('active');  // Expand sidebar
    isManuallyToggled = true;  // User manually toggled
};

// Function to handle resizing the window
function handleResize() {
    if (!isManuallyToggled) {
        if (window.innerWidth >= 800) {
            sidebar.classList.remove('active');  // Expand when large
        } else {
            sidebar.classList.add('active');    // Contract when small
        }
    }
}

// Attach the event listener for window resize
window.addEventListener('resize', handleResize);

// Call the function initially to set the correct state based on window size
handleResize();

// Get references to the buttons
const noteButton = document.querySelector('.note');
const moreButton = document.querySelector('.more');
const taskButton = document.querySelector('.task');
const eventButton = document.querySelector('.event');


noteButton.addEventListener('click', () => {
    alert('Note button clicked!');
    
});

moreButton.addEventListener('click', () => {
    alert('More button clicked!');
});

taskButton.addEventListener('click', () => {
    alert('Task button clicked!');
});

eventButton.addEventListener('click', () => {
    alert('Event button clicked!');
});

const note1 = document.querySelector('.note1');
const note2 = document.querySelector('.note2');
const newNote = document.querySelector('.note_new');


note1.addEventListener('click', () => {
    alert('Display note');
});

note2.addEventListener('click', () => {
    alert('Display note');
});

newNote.addEventListener('click', () => {
    alert('Create note');
});

