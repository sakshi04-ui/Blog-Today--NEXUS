document.addEventListener("DOMContentLoaded", () => {
    const blogContainer = document.getElementById("blog-container");
    const noBlogsMessage = document.getElementById("no-blogs-message");
    const createBlogButton = document.getElementById("create-blog-button");
  
    // Load blogs from localStorage
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  
    // Render blogs
    function renderBlogs() {
      blogContainer.innerHTML = "";
      if (blogs.length === 0) {
        noBlogsMessage.style.display = "block";
      } else {
        noBlogsMessage.style.display = "none";
        blogs.forEach((blog, index) => {
          const card = document.createElement("div");
          card.className = "blog-card";
          card.dataset.index = index;
          card.innerHTML = `<span class=\"blog-title\">${blog.title}</span>`;
          card.addEventListener("click", () => openBlog(index));
          blogContainer.appendChild(card);
        });
      }
    }
  
    // Open blog
    function openBlog(index) {
      localStorage.setItem("currentBlog", JSON.stringify(blogs[index]));
      window.location.href = "blogview.html";
    }
  
    // Navigate to editor
    createBlogButton.addEventListener("click", () => {
      window.location.href = "editor.html";
    });
  
    renderBlogs();
  });

  function viewBlog(title, content) {
    const blog = {
      title: title,
      content: content
    };

    // Save the blog data in localStorage
    localStorage.setItem("currentBlog", JSON.stringify(blog));

    // Redirect to the blog view page
    window.location.href = "blogview.html";
  }

  // Delete blog function
  function deleteBlog(index) {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.splice(index, 1); // Remove the blog from the array

    // Save the updated blog list back to localStorage
    localStorage.setItem("blogs", JSON.stringify(blogs));

    // Reload the page to reflect the changes
    window.location.reload();
  }