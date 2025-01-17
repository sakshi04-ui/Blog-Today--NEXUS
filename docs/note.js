// Retrieve notes from localStorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// References to DOM elements
const noNotesMessage = document.getElementById('no-notes');
const notesContainer = document.getElementById('notes-container');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeBtn = document.getElementById('close-btn');

// Function to display notes
function displayNotes() {
  if (notes.length === 0) {
    noNotesMessage.style.display = 'block';
  } else {
    noNotesMessage.style.display = 'none';
  }

  notesContainer.innerHTML = ''; // Clear existing notes

  notes.forEach((note, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.backgroundColor = note.color || '#e0f2f1'; // Use note's color if available

    // Truncate description for preview
    const truncatedDescription = note.description.length > 50 ? note.description.slice(0, 50) + "..." : note.description;

    card.innerHTML = `
      <h3>${note.title}</h3>
      <p class="card-description">${truncatedDescription}</p>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;

    // Add click event to open modal with full note details
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) return; // Ignore clicks on the delete button
      modalTitle.textContent = note.title;
      modalDescription.textContent = note.description;
      modal.style.display = 'flex'; // Show modal
    });

    // Add delete functionality
    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent triggering the modal
      deleteNote(index);
    });

    notesContainer.appendChild(card);
  });
}

// Function to delete a note
function deleteNote(index) {
  notes.splice(index, 1); // Remove the note from the array
  localStorage.setItem('notes', JSON.stringify(notes)); // Update localStorage
  displayNotes(); // Refresh the display
}

// Close modal logic
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Display notes on page load
displayNotes();
