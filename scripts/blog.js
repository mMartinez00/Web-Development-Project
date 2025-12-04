const blogsSection = document.querySelector(".blog")

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

function loadBlogs(allBlogs) {

    const blogs = allBlogs.map((blog) => {

      const date = new Date(blog.date)
  
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
      }).format(date)


        return `
            <div class="blog__item">
              <div class="blog__image-box">
                <img class="blog__image" 
                     src="assets/images/falcons_logo.png"
                     alt="falcons logo">
              </div>

                      <div class="blog__content">
                <div class="blog__header">
                  <h2 class="blog__title">${blog.title}</h2>
                  <p class="blog__date"><strong>${formattedDate}</p>
                </div>

                        <p class="blog__text">
                  ${blog.text}
                </p>
              </div>
            </div>
            `
    }) 

    blogsSection.innerHTML = blogs.join("")
}

fetchBlogs().then((data) => loadBlogs(data))