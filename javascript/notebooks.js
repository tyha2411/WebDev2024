window.notebooks = [];
let currentUserName = "User";

function createActionsDropdown(notebookIndex) {
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");

    const moreButton = document.createElement("button");
    moreButton.innerHTML = '<i class="ri-more-line"></i>';
    moreButton.onclick = (e) => {
        e.stopPropagation(); // Prevent event bubbling
        const dropdown = actionsDiv.querySelector('.dropdown');
        // Close all other dropdowns first
        document.querySelectorAll('.actions .dropdown').forEach(d => {
            if (d !== dropdown) d.style.display = 'none';
        });
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    };

    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="ri-edit-2-line"></i> Edit';
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="ri-delete-bin-2-line"></i> Delete';
    const shareButton = document.createElement("button");
    shareButton.innerHTML = '<i class="ri-share-line"></i> Share';
    const addNoteButton = document.createElement("button");
    addNoteButton.innerHTML = '<i class="ri-add-line"></i> Add Note';
    addNoteButton.onclick = (e) => {
        e.stopPropagation();
        addNoteToNotebook(notebookIndex);
        dropdown.style.display = 'none';
    };

    dropdown.appendChild(editButton);
    dropdown.appendChild(deleteButton);
    dropdown.appendChild(shareButton);
    dropdown.appendChild(addNoteButton);
    actionsDiv.appendChild(moreButton);
    actionsDiv.appendChild(dropdown);
    
    return actionsDiv;
}

function addNotebookRow(title, creator, updated, sharedWith) {
    const tableBody = document.getElementById("notebookTableBody");
    if (!tableBody) {
        console.error("Notebook table body not found");
        return;
    }

    const row = document.createElement("tr");
    row.dataset.notebookIndex = window.notebooks.length;

    const titleCell = document.createElement("td");
    titleCell.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <button class="collapse-btn" onclick="toggleNotes(${window.notebooks.length})">
                <i class="ri-arrow-down-s-line"></i>
            </button>
            ${title}
        </div>
    `;

    const creatorCell = document.createElement("td");
    creatorCell.innerText = creator;

    const updatedCell = document.createElement("td");
    updatedCell.innerText = updated;

    const sharedWithCell = document.createElement("td");
    sharedWithCell.innerText = sharedWith;

    const actionsCell = document.createElement("td");
    const actionsContainer = createActionsDropdown(window.notebooks.length);

    actionsCell.appendChild(actionsContainer);
    row.appendChild(titleCell);
    row.appendChild(creatorCell);
    row.appendChild(updatedCell);
    row.appendChild(sharedWithCell);
    row.appendChild(actionsCell);
    tableBody.appendChild(row);

    window.notebooks.push({ title, creator, updated, sharedWith, notes: [] });
    updateNotebookCount();
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.actions')) {
        document.querySelectorAll('.actions .dropdown').forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    }
});

function toggleNotes(notebookIndex) {
    const tableBody = document.getElementById("notebookTableBody");
    const notebookRow = tableBody.querySelector(`tr[data-notebook-index="${notebookIndex}"]`);
    if (!notebookRow) return;

    const collapseBtn = notebookRow.querySelector('.collapse-btn i');
    if (!collapseBtn) return;

    //get all the note rows that belong to this notebook
    let currentRow = notebookRow.nextElementSibling;
    while (currentRow && currentRow.querySelector('td')?.textContent.trim().startsWith('└─')) {
        currentRow.style.display = collapseBtn.classList.contains('ri-arrow-down-s-line') ? 'none' : '';
        currentRow = currentRow.nextElementSibling;
    }

    collapseBtn.classList.toggle('ri-arrow-down-s-line');
    collapseBtn.classList.toggle('ri-arrow-right-s-line');
}

function addNoteToNotebook(notebookIndex) {
    const noteTitle = prompt("Enter note title:");
    if (noteTitle) {
        const creator = currentUserName;
        const updated = new Date().toLocaleDateString();
        const sharedWith = "No one";

        const newNote = {
            title: noteTitle,
            creator,
            updated,
            sharedWith
        };

        notebooks[notebookIndex].notes.push(newNote);

        const tableBody = document.getElementById("notebookTableBody");
        const noteRow = document.createElement("tr");
        noteRow.style.backgroundColor = "#f8f8f8";

        const notebookRow = tableBody.querySelector(`tr[data-notebook-index="${notebookIndex}"]`);
        const isCollapsed = notebookRow.querySelector('.collapse-btn i').classList.contains('ri-arrow-right-s-line');
        if (isCollapsed) {
            noteRow.style.display = 'none';
        }

        noteRow.innerHTML = `
            <td style="padding-left: 40px;">
                └─ <span class="note-title" style="color: blue; cursor: pointer; text-decoration: underline;" 
                onclick="navigateToNote('${encodeURIComponent(newNote.title)}', '${encodeURIComponent(notebooks[notebookIndex].title)}')">${newNote.title}</span>
            </td>
            <td>${newNote.creator}</td>
            <td>${newNote.updated}</td>
            <td>${newNote.sharedWith}</td>
            <td>
                <div class="actions">
                    <button>
                        <i class="ri-more-line"></i>
                    </button>
                    <div class="dropdown">
                        <button><i class="ri-edit-2-line"></i> Edit</button>
                        <button><i class="ri-delete-bin-2-line"></i> Delete</button>
                    </div>
                </div>
            </td>
        `;

        let lastNoteRow = notebookRow;
        while (lastNoteRow.nextElementSibling && 
                lastNoteRow.nextElementSibling.querySelector('td').textContent.startsWith('└─')) {
            lastNoteRow = lastNoteRow.nextElementSibling;
        }
        lastNoteRow.insertAdjacentElement('afterend', noteRow);
    }
}

function updateNotebookCount() {
    document.getElementById("notebookCount").innerText = notebooks.length;
}

function navigateToNote(noteTitle, notebookTitle) {
    window.location.href = `notes.html?note=${noteTitle}&notebook=${notebookTitle}`;
}

document.getElementById("newNotebookBtn").addEventListener("click", () => {
    document.getElementById("newNotebookModal").style.display = "block";
});

document.getElementById("cancelBtn").addEventListener("click", () => {
    document.getElementById("newNotebookModal").style.display = "none";
    document.getElementById("notebookName").value = "";
});

document.getElementById("createBtn").addEventListener("click", () => {
    const title = document.getElementById("notebookName").value;
    if (title) {
        const creator = currentUserName;
        const updated = new Date().toLocaleDateString();
        const sharedWith = "No one";
        addNotebookRow(title, creator, updated, sharedWith);
        document.getElementById("newNotebookModal").style.display = "none";
        document.getElementById("notebookName").value = "";
    } else {
        alert("Please enter a notebook name.");
    }
});

document.getElementById("sortBtn").addEventListener("click", () => {
    const dropdown = document.querySelector(".sort-button .dropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (event) => {
    if (!document.getElementById("sortBtn").contains(event.target)) {
        const dropdowns = document.querySelectorAll('.sort-button .dropdown');
        dropdowns.forEach(dropdown => dropdown.style.display = "none");
    }
});

// Initialize with a default notebook
addNotebookRow("Default Notebook", "Admin", new Date().toLocaleDateString(), "Everyone");