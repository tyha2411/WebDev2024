
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
