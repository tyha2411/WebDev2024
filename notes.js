document.addEventListener("DOMContentLoaded", function() {
    // Define formatting elements on toolbar
    var toolbarOptions = {
        container: [
        [{ "header": [1, 2, 3, 4, 5, 6, false] }],
        [{ "size": ["small", false, "large", "huge"] }],
        [{ "font": [] }],
        
        ["bold", "italic", "underline", "strike"],        
        ["code-block"],
           
        [{ "list": "bullet" }, { "list": "ordered" }],
        [{ "script": "sub"}, { "script": "super" }],      
        [{ "indent": "-1"}, { "indent": "+1" }],          

        [{ "color": [] }, { "background": [] }],          
        
        [{ "align": [] }],  
        ["link", "image"],                              
        ],
    }
    
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
        { class: ".ql-code-block", title: "Code Block" },
        { class: ".ql-list", title: "Bulleted list" },
        { class: ".ql-list.ql-ordered", title: "Numbered list" },
        { class: ".ql-list.ql-picker", title: "List" },
        { class: ".ql-script", title: "Subscript" },
        { class: ".ql-indent", title: "Outdent" },
        { class: ".ql-color", title: "Font Color" },
        { class: ".ql-background", title: "Background Color" },
        { class: ".ql-align", title: "Align" },
        { class: ".ql-link", title: "Link" },
        { class: ".ql-image", title: "Image" }
    ];

    // Set the tooltips for each button
    buttonOptions.forEach(function(option) {
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
});