function toggleSortOptions() {
    var sortOptions = document.getElementById('sortOptions');
    if (sortOptions.classList.contains('active')) {
        sortOptions.classList.remove('active');
    } else {
        sortOptions.classList.add('active');
    }
}

function toggleSelection(event) {
    var element = event.target;
    var isFileSizeOrPosition = element.textContent.includes('Show File Size') || element.textContent.includes('Show File Position');
    if (!isFileSizeOrPosition) {
        var siblings = element.parentElement.children;
        for (var i = 0; i < siblings.length; i++) {
            if (!siblings[i].textContent.includes('Show File Size') && !siblings[i].textContent.includes('Show File Position')) {
                siblings[i].classList.remove('selected');
            }
        }
    }
    element.classList.toggle('selected');
    updateFileList();
}

function triggerUpload() {
    document.getElementById('uploadInput').click();
    //window.location.href = 'upload.html';
}

function handleFileUpload(event) {
    var fileList = document.getElementById('fileList');
    var files = event.target.files;
    for (var i = 0; i < files.length; i++) {
        var li = document.createElement('li');
        li.textContent = files[i].name;
        li.setAttribute('data-type', getFileType(files[i].name));
        li.setAttribute('data-size', files[i].size); // Set the size
        li.setAttribute('data-date', files[i].lastModified);
        li.setAttribute('data-position', i + 1);
        li.setAttribute('data-title', 'Untitled');
        li.setAttribute('data-content', URL.createObjectURL(files[i]));
        li.onclick = function() {
            showFilePreview(this);
        };

        // Append file size directly here
        var sizeSpan = document.createElement('span');
        sizeSpan.className = 'file-size';
        sizeSpan.textContent = formatFileSize(files[i].size); // Call formatFileSize here
        li.appendChild(sizeSpan);

        fileList.appendChild(li);
    }
    document.getElementById('info').style.display = 'none';
    document.getElementById('fileListContainer').style.display = 'block';
    document.getElementById('filterOptions').style.display = 'block';
    updateFileCount();
    updateFileList();
}


function getFileType(fileName) {
    var extension = fileName.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
        return 'image';
    } else if (['pdf', 'doc', 'docx'].includes(extension)) {
        return 'doc';
    } else {
        return 'other';
    }
}

function filterFiles(type) {
    var fileList = document.getElementById('fileList').children;
    for (var i = 0; i < fileList.length; i++) {
        if (type === 'all' || fileList[i].getAttribute('data-type') === type) {
            fileList[i].style.display = 'block';
        } else {
            fileList[i].style.display = 'none';
        }
    }
}

function toggleSortOrder(event) {
    var element = event.target;
    var isAscending = element.classList.contains('ascending');
    element.classList.toggle('ascending', !isAscending);
    element.classList.toggle('descending', isAscending);

    var siblings = element.parentElement.children;
    for (var i = 0; i < siblings.length; i++) {
        if (siblings[i] !== element && !siblings[i].textContent.includes('Show File Size') && !siblings[i].textContent.includes('Show File Position')) {
            siblings[i].classList.remove('ascending', 'descending');
        }
    }

    sortFiles(element.textContent, !isAscending);
}

function sortFiles(criteria, ascending) {
    var fileList = document.getElementById('fileList');
    var files = Array.from(fileList.children);

    files.sort(function(a, b) {
        var aValue, bValue;
        switch (criteria) {
            case 'Sort by Recent':
                aValue = parseInt(a.getAttribute('data-date'));
                bValue = parseInt(b.getAttribute('data-date'));
                break;
            case 'Sort by Title':
                aValue = a.textContent.toLowerCase();
                bValue = b.textContent.toLowerCase();
                break;
            case 'Sort by File Size':
                aValue = parseInt(a.getAttribute('data-size'));
                bValue = parseInt(b.getAttribute('data-size'));
                break;
            case 'Sort by File Kind':
                aValue = a.getAttribute('data-type');
                bValue = b.getAttribute('data-type');
                break;
        }
        if (aValue < bValue) return ascending ? -1 : 1;
        if (aValue > bValue) return ascending ? 1 : -1;
        return 0;
    });

    files.forEach(function(file) {
        fileList.appendChild(file);
    });
}

function updateFileList() {
    const fileList = document.getElementById('fileList').children;
    const showFileSize = Array.from(document.querySelectorAll('li')).find(li => li.textContent.includes('Show File Size'))?.classList.contains('selected');

    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        let sizeSpan = file.querySelector('.file-size');
        
        if (showFileSize) {
            if (!sizeSpan) { // Only append if it doesn't exist
                sizeSpan = document.createElement('span');
                sizeSpan.className = 'file-size';
                sizeSpan.textContent = formatFileSize(file.getAttribute('data-size'));
                file.appendChild(sizeSpan);
            }
        } else {
            if (sizeSpan) file.removeChild(sizeSpan); // Remove the file size span if it exists
        }
    }
}


function formatFileSize(size) {
    if (size < 1024) return size + ' B';
    if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB';
    if (size < 1024 * 1024 * 1024) return (size / (1024 * 1024)).toFixed(2) + ' MB';
    return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
}

function searchFiles() {
    var input = document.getElementById('searchInput');
    var filter = input.value.toLowerCase();
    var fileList = document.getElementById('fileList').children;
    for (var i = 0; i < fileList.length; i++) {
        var file = fileList[i];
        var text = file.textContent || file.innerText;
        if (text.toLowerCase().indexOf(filter) > -1) {
            file.style.display = '';
        } else {
            file.style.display = 'none';
        }
    }
}

function updateFileCount() {
    var fileList = document.getElementById('fileList').children;
    var count = fileList.length;
    document.getElementById('fileCount').textContent = count + ' elements';
}


function showFilePreview(fileElement) {
    var fileType = fileElement.getAttribute('data-type');
    var fileContent = fileElement.getAttribute('data-content');
    var fileName = fileElement.textContent.trim(); // Get the file name from the clicked element
    var previewContainer = document.getElementById('filePreview');
    var taskbar = document.getElementById('taskbar'); // Taskbar element
    var previewContent = '';

    // Set the file name in the taskbar
    document.querySelector('.taskbar .file-name').textContent = fileName;

    if (fileType === 'image') {
        previewContent = '<img src="' + fileContent + '" alt="Image preview">';
    } else if (fileType === 'doc' || fileType === 'pdf') {
        previewContent = '<iframe src="' + fileContent + '" frameborder="0"></iframe>';
    } else {
        previewContent = '<p>Preview not available for this file type.</p>';
    }

    // Show file preview
    previewContainer.innerHTML = previewContent;
    previewContainer.style.display = 'block';

    // Show taskbar only when a file is clicked
    taskbar.style.display = 'flex';

    // Hide "No preview available" text
    document.querySelector('.no-preview').style.display = 'none';
}

function goToNote() {
    const noteContainer = document.querySelector(".note-container");
    const goToNote = document.querySelector(".go-to-note");
    const fileContainer = document.querySelector(".container");
    goToNote.addEventListener("click", () => {
        noteContainer.classList.add("active");
        fileContainer.classList.remove("active");
    });
}
