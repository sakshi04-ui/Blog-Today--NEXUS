document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".tool-button");
    const selects = document.querySelectorAll(".tool-select");
    const fileInput = document.getElementById("file-input");
    const insertUrlButton = document.getElementById("insert-url");
    const uploadFileButton = document.getElementById("upload-file");
    const saveButton = document.getElementById("save-button");
  
    // Toolbar button commands
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const command = button.getAttribute("data-command");
        if (command) {
          document.execCommand(command, false, null);
        }
      });
    });
  
    // Toolbar select dropdowns
    selects.forEach((select) => {
      select.addEventListener("change", () => {
        const command = select.getAttribute("data-command");
        const value = select.value;
        document.execCommand(command, false, value);
      });
    });
  
    // Insert image via URL
    insertUrlButton.addEventListener("click", () => {
      const url = prompt("Enter the image URL:");
      if (url) {
        insertResizedImage(url);
      }
    });
  
    // Upload image from file
    uploadFileButton.addEventListener("click", () => {
      fileInput.click();
    });
  
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          insertResizedImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  
    // Function to insert resized image
    function insertResizedImage(imageSrc) {
      const img = document.createElement("img");
      img.src = imageSrc;
      img.width = 150;
      img.height = 200;
      const editor = document.querySelector(".editor");
      editor.appendChild(img);
    }
  
    // Save blog functionality
    saveButton.addEventListener("click", () => {
      const title = document.querySelector(".editor-title").value;
      const content = document.querySelector(".editor").innerHTML;
  
      if (title.trim() === "") {
        alert("Title is required.");
        return;
      }
  
      const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      blogs.push({ title, content });
      localStorage.setItem("blogs", JSON.stringify(blogs));
  
      alert("Blog saved successfully!");
      window.location.href = "displayblog.html";
    });
  });
  
// Get the color picker toggle button and the color picker container
const colorPickerToggle = document.getElementById('color-picker-toggle');
const colorPickerContainer = document.querySelector('.color-picker-container');

// Toggle the visibility of the color picker when the button is clicked
colorPickerToggle.addEventListener('click', function() {
  // Toggle the display of the color picker container
  colorPickerContainer.style.display = colorPickerContainer.style.display === 'none' ? 'block' : 'none';
});

// Apply the selected color to the text
document.getElementById('text-color-picker').addEventListener('input', function(event) {
  document.execCommand('foreColor', false, event.target.value);
});
