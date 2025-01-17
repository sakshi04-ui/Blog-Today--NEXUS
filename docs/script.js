// Select DOM elements related to the menu
const openMenuBtn = document.querySelector('#openMenuBtn'); // Button to open menu
const closeMenuBtn = document.querySelector('#closeMenuBtn'); // Button to close menu
const menu = document.querySelector('#menu'); // The actual menu element

// Event listener to open the menu when the open button is clicked
openMenuBtn.addEventListener('click', () => {
  handleViewTransition(openMenu); // Apply transition to open the menu
});

// Event listener to close the menu when the close button is clicked
closeMenuBtn.addEventListener('click', () => {
  handleViewTransition(closeMenu); // Apply transition to close the menu
});

// Close the menu when the Escape key is pressed
function handleCloseWithESC(e) {
  if (e.key == 'Escape') { // If Escape key is pressed
    handleViewTransition(closeMenu); // Close the menu
  }
}

// Open the menu and set focus to the close button
function openMenu() {
  menu.classList.add('open'); // Add 'open' class to display the menu
  closeMenuBtn.focus(); // Focus on the close button
  window.addEventListener('keyup', handleCloseWithESC); // Add ESC key event listener
}

// Close the menu and reset focus to the open button
function closeMenu() {
  menu.classList.remove('open'); // Remove 'open' class to hide the menu
  openMenuBtn.focus(); // Focus back to the open menu button
  window.removeEventListener('keyup', handleCloseWithESC); // Remove ESC key event listener
}

// Handle transition animations for changing views
function handleViewTransition(updateDom) {
  if (!document.startViewTransition) updateDom(); // For browsers without view transition support
  else document.startViewTransition(() => updateDom()); // For browsers with view transition support
}

// Close the menu when a navigation link is clicked
document.querySelectorAll('.NavLink').forEach((link) => {
  link.addEventListener('click', () => handleViewTransition(closeMenu)); // Close menu after clicking a link
});

// Scroll Animation

let scrollDirection; // Variable to store scroll direction
const nav = document.querySelector('.Navbar'); // Navbar element

// Detect scroll direction and add it to the body for animations
document.addEventListener(
  'scroll',
  (e) => {
    const st = window.pageYOffset || document.documentElement.scrollTop; // Current scroll position
    const direction = st > e.target.lastScrollTop ? 'down' : 'up'; // Determine scroll direction (up or down)
    if (Math.abs(st - e.target.lastScrollTop) > 5) // Only update scroll direction if the scroll amount is significant
      document.body.setAttribute('scroll-direction', direction); // Set scroll direction as an attribute on the body
    scrollDirection = direction; // Store the scroll direction
    e.target.lastScrollTop = st <= 0 ? 0 : st; // Update last scroll position for comparison
  },
  {
    passive: true, // Event listener option to improve performance
  }
);

// Add animation effect when elements are revealed during scrolling
function addRevealEffect(elements) {
  const observer = new IntersectionObserver(
    (entries) => {
      let revealClass; // Class to be added for reveal effect
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealClass = scrollDirection === 'up' ? 'reveal-up' : 'reveal-down'; // Add class based on scroll direction
          entry.target.classList.add(revealClass); // Add reveal class to element
        } else {
          entry.target.className = 'subject'; // Reset class when element is not in view
        }
      });
    },
    { threshold: 0.1 } // Trigger reveal when 10% of the element is visible
  );

  elements.forEach((element) => {
    observer.observe(element); // Observe each element for reveal effect
  });
}

// Select all elements to reveal and apply the effect
const elementsToReveal = document.querySelectorAll('.subject');
addRevealEffect(elementsToReveal);

// About Text Replace (Dynamic Text Animation)

const NORMAL_PLAYBACK_RATE = 200; // Normal playback rate for text animation
const REDUCED_PLAYBACK_RATE = 1000; // Reduced playback rate for users with motion sensitivity

let rate = NORMAL_PLAYBACK_RATE; // Default rate

// Check if the user prefers reduced motion and adjust the rate
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mediaQuery.matches) rate = REDUCED_PLAYBACK_RATE; // Set the reduced playback rate if preferred

// List of words related to blogging to animate
const words = [
    'content',
    'creativity',
    'writing',
    'ideas',
    'inspiration',
    'community',
    'engagement',
    'storytelling',
    'posts',
    'feedback',
    'growth',
    'branding',
];

// Call the function to animate the words in the target element
textReplace(words, 'target-word', rate);

// Function to animate the text in the target element
function textReplace(words, targetElement, rate) {
  let wordIndex = 0; // Start with the first word

  const randomWordElement = document.getElementById(targetElement); // Get the target element to display words

  // Function to change the word with animation
  const changeWordWithAnimation = () => {
    randomWordElement.style.opacity = 0; // Fade out the current word
    setTimeout(function () {
      wordIndex = (wordIndex + 1) % words.length; // Move to the next word
      randomWordElement.textContent = words[wordIndex]; // Update the text content with the new word
      randomWordElement.style.opacity = 1; // Fade in the new word
    }, 50); // Delay before fading in the new word
  };

  const interval = setInterval(changeWordWithAnimation, rate); // Set the interval to change words based on the rate
}


// Redirect function: Dashboard.html
function redirectTo(url) {
    window.location.href = url;
}

// BloggingSchedule Section
function displayTimetable() {
  const scheduleData = localStorage.getItem("weeklySchedule");
  const scheduleContent = document.getElementById("plan-content");
  const createBtn = document.getElementById("create-schedule-btn");

  if (scheduleData) {
      const schedule = JSON.parse(scheduleData);

      const creationDate = schedule.date || new Date().toLocaleDateString();
      let content = `
          <p><strong>Created on:</strong> ${creationDate}</p>
          <table>
              <thead>
                  <tr>
                      <th>Day</th>
                      <th>Task</th>
                      <th>Focus Area</th>
                  </tr>
              </thead>
              <tbody>`;

      for (let i = 0; i < 7; i++) {
          content += `
              <tr>
                  <td>${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][i]}</td>
                  <td>${schedule.tasks[i] || "No Task"}</td>
                  <td>${schedule.focusAreas[i] || "No Focus Area"}</td>
              </tr>`;
      }

      content += `</tbody>
          </table>
          <div id="action-buttons">
              <button onclick="editTimetable()">Edit</button>
              <button onclick="deleteTimetable()">Delete</button>
          </div>`;

      scheduleContent.innerHTML = content;
      createBtn.style.display = "none";
  } else {
      scheduleContent.innerHTML = "<p>No timetable created yet.</p>";
      createBtn.style.display = "block";
  }
}

function showForm(edit = false) {
  const scheduleData = edit ? JSON.parse(localStorage.getItem("weeklySchedule")) : { tasks: [], focusAreas: [] };
  const scheduleContent = document.getElementById("plan-content");

  let formContent = `
      <div id="form-card">
          <table>
              <tr>
                  <th>Day</th>
                  <th>Task</th>
                  <th>Focus Area</th>
              </tr>`;

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  days.forEach((day, i) => {
      formContent += `
          <tr>
              <td>${day}</td>
              <td><input type="text" id="task-${day.toLowerCase()}" placeholder="Enter Task" value="${scheduleData.tasks[i] || ""}"></td>
              <td><input type="text" id="focus-${day.toLowerCase()}" placeholder="Enter Focus Area" value="${scheduleData.focusAreas[i] || ""}"></td>
          </tr>`;
  });

  formContent += `</table>
      </div>
      <div id="form-buttons">
          <button onclick="saveTimetable()">Save</button>
          <button onclick="displayTimetable()">Cancel</button>
      </div>`;

  scheduleContent.innerHTML = formContent;
}

function saveTimetable() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const tasks = days.map(day => document.getElementById(`task-${day.toLowerCase()}`).value);
  const focusAreas = days.map(day => document.getElementById(`focus-${day.toLowerCase()}`).value);

  const schedule = { tasks, focusAreas, date: new Date().toLocaleDateString() };

  // Save schedule to localStorage
  localStorage.setItem("weeklySchedule", JSON.stringify(schedule));

  // Redirect to same page to display schedule
  displayTimetable();
}

function deleteTimetable() {
  localStorage.removeItem("weeklySchedule");
  displayTimetable();
}

function editTimetable() {
  showForm(true);
}

displayTimetable();
