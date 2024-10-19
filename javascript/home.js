document.addEventListener("DOMContentLoaded", () => {
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


  const header = document.querySelector(".calendar h3");
  const dates = document.querySelector(".date");
  const navs = document.querySelectorAll("#prev, #next");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date();
  let month = date.getMonth();
  let year = date.getFullYear();

  function renderCalendar() {
    // first day of the month
    const start = new Date(year, month, 1).getDay();
    // last date of the month
    const endDate = new Date(year, month + 1, 0).getDate();
    // last day of the month
    const end = new Date(year, month, endDate).getDay();
    // last date of the previous month
    const endDatePrev = new Date(year, month, 0).getDate();

    let datesHtml = "";

    for (let i = start; i > 0; i--) {
      datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
    }

    for (let i = 1; i <= endDate; i++) {
      let className =
        i === date.getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear()
          ? ' class="today"'
          : "";
      datesHtml += `<li${className}>${i}</li>`;
    }

    for (let i = end; i < 6; i++) {
      datesHtml += `<li class="inactive">${i - end + 1}</li>`;
    }

    dates.innerHTML = datesHtml;
    header.textContent = `${months[month]} ${year}`;
  }

  navs.forEach((nav) => {
    nav.addEventListener("click", (e) => {
      const btnId = e.target.id;

      if (btnId === "prev" && month === 0) {
        year--;
        month = 11;
      } else if (btnId === "next" && month === 11) {
        year++;
        month = 0;
      } else {
        month = btnId === "next" ? month + 1 : month - 1;
      }

      date = new Date(year, month, new Date().getDate());
      year = date.getFullYear();
      month = date.getMonth();

      renderCalendar();
    });
  });

  renderCalendar();

  // Display notes
  const displayNotes = document.querySelector(".display-notes");
  const displayHome = document.querySelector(".display-home");
  const displayFiles = document.querySelector(".display-files");
  const displayTrash = document.querySelector(".display-trash");
  const displaySettings = document.querySelector(".display-settings");
  
  const noteContainer = document.querySelector(".note-container");
  const mainContent = document.querySelector(".main_content");
  const fileContainer = document.querySelector(".container");
  const trashContainer = document.querySelector(".trash-container");
  const settingsContainer = document.querySelector(".settings-container");
  const logOut = document.querySelector(".log-out");

  displayNotes.addEventListener("click", () => {
    mainContent.style.display = "none";
    noteContainer.classList.add("active");
    fileContainer.classList.remove("active");
    trashContainer.classList.remove("active");
    settingsContainer.classList.remove("active");
  });

  displayHome.addEventListener("click", () => {
    mainContent.style.display = "block";
    noteContainer.classList.remove("active");
    fileContainer.classList.remove("active");
    trashContainer.classList.remove("active");
    settingsContainer.classList.remove("active");
  });

  displayFiles.addEventListener("click", () => {
    mainContent.style.display = "none";
    fileContainer.classList.add("active");
    noteContainer.classList.remove("active");
    trashContainer.classList.remove("active");
    settingsContainer.classList.remove("active");
  }); 

  displayTrash.addEventListener("click", () => {
    trashContainer.classList.add("active");
    mainContent.style.display = "none";
    noteContainer.classList.remove("active");
    fileContainer.classList.remove("active");
    settingsContainer.classList.remove("active");
  });

  displaySettings.addEventListener("click", () => {
    settingsContainer.classList.add("active");
    mainContent.style.display = "none";
    noteContainer.classList.remove("active");
    fileContainer.classList.remove("active");
    trashContainer.classList.remove("active");
  });

  logOut.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = "login.html";
  });
});