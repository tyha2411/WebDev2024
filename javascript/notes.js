document.addEventListener("DOMContentLoaded", () => {
    // Initialize font size
    const fontSize = ["8px", "9px", "10px", "12px", "14px", "15px", "16px", "18px", "20px", "24px", "30px", "36px", "48px", "64px", "72px", "96px"];
    var size = Quill.import("attributors/style/size");
    size.whitelist = fontSize;
    Quill.register(size, true);
    
    // Define formatting elements on toolbar
    var toolbarOptions = [
        [{ "header": [1, 2, 3, false] }],
        [{ "size": fontSize }],
        [{ "font": [] }],
        ["bold", "italic", "underline", "strike"],        
        ["code-block", "blockquote"],
        [{ "list": "bullet" }, { "list": "ordered" }],
        [{ "script": "sub"}, { "script": "super" }],      
        [{ "indent": "-1"}, { "indent": "+1" }],         
        [{ "color": [] }, { "background": [] }],          
        [{ "align": [] }],  
        ["link", "image"],       
        ["clean"]
    ];
    
    // Initialize the Quill editor with the toolbar options
    var quill = new Quill(".note-editor", {
        theme: "snow",
        modules: {
            toolbar: toolbarOptions
        }
    });
    
    // Add a class for styling the toolbar
    var toolbar = document.querySelector(".ql-toolbar");
    toolbar.classList.add("toolbar");

    // Add tooltip to toolbar buttons
    var buttonOptions = [
        { class: ".ql-header", title: "Heading level" },
        { class: ".ql-font", title: "Font family" },
        { class: ".ql-size", title: "Font size" },
        { class: ".ql-bold", title: "Bold" },
        { class: ".ql-italic", title: "Italic" },
        { class: ".ql-underline", title: "Underline" },
        { class: ".ql-strike", title: "Strike" },
        { class: ".ql-code-block", title: "Code block" },
        { class: ".ql-blockquote", title: "Block quote" },
        { class: ".ql-list", title: "Bulleted list" },
        { class: ".ql-list.ql-ordered", title: "Numbered list" },
        { class: ".ql-list.ql-picker", title: "List" },
        { class: ".ql-script", title: "Subscript" },
        { class: ".ql-indent", title: "Outdent" },
        { class: ".ql-color", title: "Font color" },
        { class: ".ql-background", title: "Background color" },
        { class: ".ql-align", title: "Align" },
        { class: ".ql-link", title: "Link" },
        { class: ".ql-image", title: "Image" },
        { class: ".ql-clean", title: "Clear formatting" }
    ];

    // Set the tooltips for each button
    buttonOptions.forEach((option) => {
        var button = toolbar.querySelector(option.class + " .ql-picker-label");
        if (!button) {
            button = toolbar.querySelector(option.class);
        }
        if (button) {
            button.setAttribute("title", option.title);
        }
    });

    // Add tooltip for numbered list
    var numberedList = toolbar.querySelector(".ql-list[value='ordered']");
    if (numberedList) {
        numberedList.setAttribute("title", "Numbered list");
    }

    // Add tooltip for subscript
    var subScript = toolbar.querySelector(".ql-script[value='super']");
    if (subScript) {
        subScript.setAttribute("title", "Superscript");
    }

    // Add tooltip for outdent
    var outDent = toolbar.querySelector(".ql-indent[value='+1']");
    if (outDent) {
        outDent.setAttribute("title", "Indent");
    }

    // Set default font size
    quill.format("size", "15px");
    
    // Remove the word "px" in font size
    document.querySelectorAll(".ql-picker.ql-size .ql-picker-label").forEach((label) => {
        label.setAttribute("data-value", label.getAttribute("data-value").replace("8px", "15"));
    });
    document.querySelectorAll(".ql-picker.ql-size .ql-picker-item").forEach((item) => {
        item.setAttribute("data-value", item.getAttribute("data-value").replace("px", ""));
    });

    // Add "Expand/Collapse" button
    const toolbarUpper = document.querySelector(".toolbar-upper");
    var expandCollapseBtn = document.createElement("div");
    expandCollapseBtn.classList.add("expand-btn");
    expandCollapseBtn.innerHTML = `<span class="material-symbols-outlined">open_in_full</span>`;
    toolbarUpper.appendChild(expandCollapseBtn);

    tippy(expandCollapseBtn, {
        content: "Expand note",
        delay: [200, 200],
    });

    expandCollapseBtn.addEventListener("click", () => {
        document.querySelector(".editor-wrapper").classList.toggle("fullscreen");
        const icon = expandCollapseBtn.querySelector(".material-symbols-outlined");
        if (icon.textContent === "open_in_full") {
            icon.textContent = "close_fullscreen";
            expandCollapseBtn._tippy.setContent("Collapse note");
        } else {
            icon.textContent = "open_in_full";
            expandCollapseBtn._tippy.setContent("Expand note");
        }
    });

    // Add "SHARE" button
    var shareDeleteBtn = document.createElement("div");
    shareDeleteBtn.classList.add("share-delete-btn");
    shareDeleteBtn.innerHTML = `
    <div class="share-btn">Share</div>
    <div class="deleteBtn material-symbols-outlined">delete</div>
    `;
    toolbarUpper.appendChild(shareDeleteBtn);
    const deleteBtn = document.querySelector(".deleteBtn");
    tippy(deleteBtn, {
        content: "Move to Trash",
        delay: [200, 200],
    });

    // Add pop-up which will show up when clicking the "SHARE" button
    var popupBox = document.createElement("div");
    popupBox.classList.add("popup-box");
    popupBox.innerHTML = `
        <div class="popup-header">
            <p>Share</p>
            <span class="material-symbols-outlined popup-close-btn">close</span>
        </div>
        <div class="popup-body">
            <div class="invite-field">
                <div class="input-field">
                    <input id="share-input" value="" placeholder="Enter name or email">
                    <div class="link-option">
                        <select class="permission-select">
                            <option data-display="Can edit and invite">Can edit and invite</option>
                            <option data-display="Can edit">Can edit</option>
                            <option data-display="Can view">Can view</option>
                        </select>
                        <div class="update-text-permission">Can edit and invite</div>
                        <div class="arrow-dropdown"></div>
                    </div>
                </div>
                <button class="invite-btn">Invite</button>
            </div>
            <p>People with access</p>
            <p class="access-number">1</p>
            <div class="info">
                <div class="personal-info">
                    <div class="avatar">U</div>
                    <div class="name-email">
                        <p>Username - You</p>
                        <p class="email">username@gmail.com</p>
                    </div>
                </div>
                <div class="role">Owner</div>
            </div>
            <p>General access</p>
            <div class="general-access">
                <div class="access-status">
                    <div class="status-icon">
                        <span class="material-symbols-outlined">lock</span>
                    </div>
                    <div class="status-text">Restricted</div>
                </div>
                <div class="access-option">
                    <select class="permission-link">
                        <option access-display="Restricted" data-display="Restricted access">Restricted access</option>
                        <option access-display="Anyone with the link" data-display="Can view">Anyone with the link can view</option>
                        <option access-display="Anyone with the link" data-display="Can edit">Anyone with the link can edit</option>
                    </select>
                    <div class="update-text-link">Restricted access</div>
                    <div class="arrow-dropdown"></div>
                </div>
            </div>
            <button class="copy-link-btn">
                <span class="material-symbols-outlined">link</span>Copy link
            </button>
        </div>
    `;
    document.body.appendChild(popupBox);

    // Add element to darken the background behind the pop-up
    var overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    // Get element in the pop-up
    const shareInput = document.getElementById("share-input");
    const closeBtn = document.querySelector(".popup-close-btn");
    const permissionSelect = document.querySelector(".permission-select");
    const permissionLink = document.querySelector(".permission-link");
    const updateTextPermission = document.querySelector(".update-text-permission");
    const updateTextLink = document.querySelector(".update-text-link");
    const statusText = document.querySelector(".status-text");
    const statusIcon = document.querySelector(".status-icon span.material-symbols-outlined");

    // Show pop-up when clicking the "SHARE" button
    const shareBtn = document.querySelector(".share-btn");
    tippy(shareBtn , {
        content: "Share note",
        delay: [200, 200],
    });
    shareBtn.addEventListener("click", () => {
        popupBox.classList.add("show");
        overlay.classList.add("show");
        setTimeout(() => shareInput.focus(), 100);
    });
    
    // Close pop-up when clicking the close button
    closeBtn.addEventListener("click", () => {
        popupBox.classList.remove("show");
        overlay.classList.remove("show");       
    });

    // Adjust "permission-select" width based on selected option text length 
    permissionSelect.addEventListener("change", () => {
        const selectedIndex = permissionSelect.selectedIndex;
        const selectedOption = permissionSelect.options[selectedIndex];
        const selectedText = selectedOption.getAttribute("data-display");

        updateTextPermission.innerText = selectedText;
    });

    // Update display text for "permission-link"
    permissionLink.addEventListener("change", () => {
        const selectedIndex = permissionLink.selectedIndex;
        const selectedOption = permissionLink.options[selectedIndex];
        const selectedText = selectedOption.getAttribute("data-display");
        const accessStatusText = selectedOption.getAttribute("access-display");

        updateTextLink.innerText = selectedText;
        statusText.innerText = accessStatusText;

        if (selectedIndex === 1 || selectedIndex === 2) {
            statusIcon.innerText = "language";
        } else {
            statusIcon.innerText = "lock";
        }
    });

    // Add new note when clicking "create-note"
    const editorWrapper = document.querySelector(".editor-wrapper");
    const noteBar = document.querySelector(".note-bar");
    const createNote = document.querySelector(".create-note");
    const noteNumber = document.querySelector(".note-number");
    
    createNote.addEventListener("click", () => {
        const activeNote = document.querySelector(".note-element.active");
        if (activeNote) {
            activeNote.classList.remove("active");
        }
       
        const newNoteElement = document.createElement("div");
        newNoteElement.classList.add("note-element", "active");
        newNoteElement.innerHTML = `
        <p class="title">Untitled</p>
        <p class="created-time">Just now</p>
        `;
       
        newNoteElement.addEventListener("click", () => {
            const activeNote = document.querySelector(".note-element.active");
                if (activeNote) {
                    activeNote.classList.remove("active");
                }
                newNoteElement.classList.add("active");
        });
        
        noteBar.insertBefore(newNoteElement, noteBar.firstChild);

        const noteCount = noteBar.querySelectorAll(".note-element").length;
        if (noteCount === 1) {
            noteNumber.textContent = "1 note";
        } else {
            noteNumber.textContent = `${noteCount} notes`;
        }

       if (noteCount > 0) {
        editorWrapper.classList.add("flex");
       } else {
        editorWrapper.classList.remove("flex");
       }
    });
});