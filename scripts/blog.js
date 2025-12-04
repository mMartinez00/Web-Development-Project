const blogsSection = document.querySelector(".blog")
const BLOGS_PER_LOAD = 8;
let allBlogs = [];
let blogsLoadedCount = 0;
// Create load more button
const loadMoreBtn = document.createElement("button");
loadMoreBtn.className = "blog__load-more";
loadMoreBtn.innerText = "Load More Blogs";


async function fetchBlogs() {
     try {
        const response = await fetch("data/blogs.json");
        
        if(!response.ok) {
            alert("Error fetching data!")
            return;
        }

        const data = await response.json()
        
        return data;
        
    } catch (error) {
        console.log(error)
    }
}

function formatBlogDate(dateString) {
  const date = new Date(dateString)
  
  return new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    }).format(date)
}

function createBlogHTML(blog) {
  const formattedDate = formatBlogDate(blog.date)
 
  return `
      <div class="blog__item">
      <div class="blog__image-box">
        <img
          class="blog__image"
          src="assets/images/falcons_logo.png"
          alt="${blog.title}"
        >
      </div>

      <div class="blog__content">
        <div class="blog__header">
          <h2 class="blog__title">${blog.title}</h2>
          <p class="blog__date"><strong>${formattedDate}</strong></p>
        </div>

        <p class="blog__text">
          ${blog.text}
        </p>
      </div>
    </div>
      `
}

function renderNextBlogs() {
  const nextblogs = allBlogs.slice(
    blogsLoadedCount,
    blogsLoadedCount + BLOGS_PER_LOAD
  );

  if(nextblogs.length === 0) return;

  const blogsHTML = nextblogs.map(createBlogHTML).join("");

  // If button is already inside section, insert before it
  if(blogsSection.contains(loadMoreBtn)) {
    loadMoreBtn.insertAdjacentHTML("beforebegin", blogsHTML)
  } else {
    blogsSection.insertAdjacentHTML("beforeend", blogsHTML)
  }

  blogsLoadedCount += nextblogs.length

  // If everything is loaded rmeove button
  if(blogsLoadedCount >= allBlogs.length && blogsSection.contains(loadMoreBtn)) {
    loadMoreBtn.remove()
  }
}

function setupLoadMoreButton() {
  if(allBlogs.length > blogsLoadedCount && !blogsSection.contains(loadMoreBtn)) {
    blogsSection.appendChild(loadMoreBtn)
  }

  loadMoreBtn.addEventListener("click", () => {
    renderNextBlogs()
  })
}

async function initBlogs() {
  const data = await fetchBlogs();

  if(!data) return

  allBlogs = data

  // Initial chunk
  renderNextBlogs()

  // Show button if more remain
  setupLoadMoreButton()
}

function setupUpdateForm() {
  const form =  document.querySelector(".update__form");
  const emailInput = document.querySelector(".update__email");
  const modalContainer = document.querySelector(".modal__container");
  const subMessage = document.querySelector(".modal__message-sub");
  const modalOverlay = document.querySelector(".modal__overlay");
  let timeoutID;

  if(!form || !emailInput) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop page from reloading

    const email = emailInput.value.trim()
    if(!form || !emailInput || !modalContainer || !subMessage || !modalOverlay) return;

    subMessage.innerText = `You'll now recieve updates to: ${email}`

    // Show modal
    modalContainer.classList.remove("modal__container--hidden");

    // Clear input
    emailInput.value = "";

    // Hide modal after 1.75s
    timeoutID = setTimeout(() => {
      modalContainer.classList.add("modal__container--hidden");
    }, 2000);
  })

  // Dismiss overlay early
  modalOverlay.addEventListener("click", () => {
    modalContainer.classList.add("modal__container--hidden")
    clearTimeout(timeoutID);

  })
}

document.addEventListener("DOMContentLoaded", () => {
  initBlogs();
  setupUpdateForm();
})