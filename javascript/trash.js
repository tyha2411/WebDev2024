
const notes = [
    { id: 1, title: 'note 2', content: 'This is note 2 content', date: 'Oct 5' },
    { id: 2, title: 'note 3', content: 'This is note 3 content', date: 'Oct 5' },
    { id: 3, title: 'note 4', content: 'This is note 4 content', date: 'Oct 5' },
    { id: 4, title: 'note 5', content: 'This is note 5 content', date: 'Oct 5' }
];


const noteList = document.getElementById('note-list');
const noteCount = document.getElementById('note-count');

const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');


function updateNoteCount() {
    noteCount.textContent = notes.length;
}


function populateNotes() {
    noteList.innerHTML = '';
    notes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = `${note.title} (${note.date})`;
        li.dataset.id = note.id;
        noteList.appendChild(li);
    });
    updateNoteCount();  
}


populateNotes();

noteList.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        const selectedNote = notes.find(note => note.id == e.target.dataset.id);
        noteTitle.textContent = selectedNote.title;
        noteContent.textContent = selectedNote.content;
    }
});

document.getElementById('empty-trash-btn').addEventListener('click', function () {
    if (confirm('Are you sure you want to empty the trash?')) {
        notes.length = 0; 
        populateNotes();  
        noteTitle.textContent = 'Select a note';
        noteContent.textContent = 'Note content will appear here when you click a note.';
    }
});

let selectedNoteId = null; // Track the currently selected note

// Get reference to the delete button
const deleteNoteBtn = document.getElementById('delete-note-btn');

// Update the function to show the delete button when a note is selected
noteList.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        const selectedNote = notes.find(note => note.id == e.target.dataset.id);
        noteTitle.textContent = selectedNote.title;
        noteContent.textContent = selectedNote.content;
        selectedNoteId = selectedNote.id;

        // Show the delete button when a note is selected
        deleteNoteBtn.style.display = 'inline-block';
    }
});

// Add delete functionality
deleteNoteBtn.addEventListener('click', function () {
    if (selectedNoteId !== null) {
        if (confirm('Are you sure you want to delete this note?')) {
            // Find index of the selected note and remove it from the array
            const noteIndex = notes.findIndex(note => note.id == selectedNoteId);
            if (noteIndex !== -1) {
                notes.splice(noteIndex, 1); // Remove the selected note
                populateNotes(); // Update the note list
                noteTitle.textContent = 'Select a note';
                noteContent.textContent = 'Note content will appear here when you click a note.';
                deleteNoteBtn.style.display = 'none'; // Hide the delete button
                selectedNoteId = null; // Reset the selected note
            }
        }
    }
});

