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

        document.getElementById('new-event-btn').addEventListener('click', function() {
            document.getElementById('event-modal').style.display = 'block';
        });

        document.getElementById('modal-close').addEventListener('click', function() {
            document.getElementById('event-modal').style.display = 'none';
        });

        document.getElementById('save-event').addEventListener('click', function() {
            // Add your event saving logic here
            document.getElementById('event-modal').style.display = 'none';
        });

        function selectDate(date) {
            const dateObj = new Date(date);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById('selected-date').innerText = dateObj.toLocaleDateString('en-US', options);
            document.getElementById('event-date').value = date;
            updateView();

            // Highlight the selected date
            const cells = document.querySelectorAll('.calendar td');
            cells.forEach(cell => {
                cell.classList.remove('highlighted');
                if (cell.innerText == dateObj.getDate()) {
                    cell.classList.add('highlighted');
                }
            });
        }

        document.getElementById('today-btn').addEventListener('click', function() {
            const today = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById('selected-date').innerText = today.toLocaleDateString('en-US', options);
            document.getElementById('event-date').value = today.toISOString().split('T')[0];
            updateView();

            // Highlight the selected date
            const cells = document.querySelectorAll('.calendar td');
            cells.forEach(cell => {
                cell.classList.remove('highlighted');
                if (cell.innerText == today.getDate()) {
                    cell.classList.add('highlighted');
                }
            });
        });

        document.getElementById('view-selector').addEventListener('change', function() {
            updateView();
        });

        function updateView() {
            const view = document.getElementById('view-selector').value;
            const timeSlots = document.getElementById('time-slots');
            timeSlots.innerHTML = '';

            if (view === 'day') {
                timeSlots.style.gridTemplateColumns = '1fr';
                for (let i = 6; i <= 23; i++) {
                    const time = i > 12 ? `${i - 12} PM` : `${i} AM`;
                    timeSlots.innerHTML += `<div class="time">${time}</div>`;
                }
            } else if (view === 'week') {
                timeSlots.style.gridTemplateColumns = 'repeat(8, 1fr)';
                const days = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                for (let i = 0; i < days.length; i++) {
                    timeSlots.innerHTML += `<div>${days[i]}</div>`;
                }
                for (let j = 6; j <= 23; j++) {
                    const time = j > 12 ? `${j - 12} PM` : `${j} AM`;
                    timeSlots.innerHTML += `<div class="time">${time}</div>`;
                    for (let k = 1; k < days.length; k++) {
                        timeSlots.innerHTML += `<div></div>`;
                    }
                }
            } else if (view === 'month') {
                timeSlots.style.gridTemplateColumns = 'repeat(7, 1fr)';
                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                for (let i = 0; i < days.length; i++) {
                    timeSlots.innerHTML += `<div>${days[i]}</div>`;
                }
                const totalDays = 31; // Assuming 31 days in the month for simplicity
                for (let day = 1; day <= totalDays; day++) {
                    timeSlots.innerHTML += `<div>${day}</div>`;
                }
            }
        }

        // Initialize view
        updateView();
