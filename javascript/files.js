function showFiles() {
    const mainContent = document.querySelector('.main-content');
    
    if (mainContent.style.display === 'block') {
        mainContent.style.display = 'none';
    } else {
        mainContent.style.display = 'block';
    }
}

document.getElementById('file-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const fileInfo = document.querySelector('.file-info');

    const fileContainer = document.createElement('div');
    fileContainer.classList.add('file-container');

    const fileName = document.createElement('p');
    fileName.textContent = `File: ${file.name}`;

    const fileType = document.createElement('p');
    fileType.textContent = `Type: ${file.type}`;

    // Add click event to fileContainer
    fileContainer.addEventListener('click', function() {
        const fileContent = document.getElementById('file-content');
        
        if (file.type === 'application/pdf') {
            const fileURL = URL.createObjectURL(file);
            fileContent.innerHTML = `<h3>${file.name}</h3><iframe src="${fileURL}" style="width: 100%; height: 500px;" frameborder="0"></iframe>`;
        } else if (file.type.startsWith('image/')) {
            const fileURL = URL.createObjectURL(file);
            fileContent.innerHTML = `<h3>${file.name}</h3><img src="${fileURL}" style="max-width: 100%; height: auto;" alt="${file.name}"/>`;
        } else {
            fileContent.innerHTML = `<h3>${file.name}</h3><p>Unsupported file type</p>`;
        }
    });

    fileContainer.appendChild(fileName);
    fileContainer.appendChild(fileType);
    fileInfo.appendChild(fileContainer);

    document.querySelector('.search-bar').style.display = 'block'; 
    document.getElementById('file-upload').value = '';
});

// Function to show the Home section
function showHome() {
    document.querySelector('.main-content').style.display = 'none';
}
