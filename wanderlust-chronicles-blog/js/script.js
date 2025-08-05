
function expandPost(button) {
  const article = button.closest(".blog-post-full");
  const fullStory = article.querySelector(".full-story");
  const icon = button.querySelector("i");

  if (fullStory.style.display === "none" || !fullStory.style.display) {
    fullStory.style.display = "block";
    button.innerHTML = 'Show Less <i class="fas fa-arrow-up"></i>';
    button.style.background = "#5a67d8";

    
    setTimeout(() => {
      fullStory.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  } else {
    fullStory.style.display = "none";
    button.innerHTML = 'Read Full Story <i class="fas fa-arrow-right"></i>';
    button.style.background = "";
  }
}


document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

   
    document.querySelectorAll(".nav-link").forEach((n) =>
      n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      })
    );
  }
});


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});


window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    }
  }
});


const newsletterForms = document.querySelectorAll(".newsletter-form");
newsletterForms.forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;

    
    if (validateEmail(email)) {
      
      showMessage(
        "Thanks for subscribing! You'll receive our latest travel stories soon.",
        "success"
      );
      this.reset();
    } else {
      showMessage("Please enter a valid email address.", "error");
    }
  });
});


const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    
    if (name && email && subject && message && validateEmail(email)) {
      
      showMessage(
        "Thanks for your message, " +
          name +
          "! I'll get back to you within 24-48 hours.",
        "success"
      );
      this.reset();
    } else {
      showMessage("Please fill in all fields with valid information.", "error");
    }
  });
}


const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach((question) => {
  question.addEventListener("click", function () {
    const answer = this.nextElementSibling;
    const icon = this.querySelector("i");

    
    faqQuestions.forEach((otherQuestion) => {
      if (otherQuestion !== this) {
        const otherAnswer = otherQuestion.nextElementSibling;
        const otherIcon = otherQuestion.querySelector("i");
        otherAnswer.classList.remove("active");
        otherIcon.style.transform = "rotate(0deg)";
      }
    });

    
    answer.classList.toggle("active");
    if (answer.classList.contains("active")) {
      icon.style.transform = "rotate(180deg)";
    } else {
      icon.style.transform = "rotate(0deg)";
    }
  });
});


const filterButtons = document.querySelectorAll(".filter-btn");
const blogPosts = document.querySelectorAll(".blog-post-full");

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    
    this.classList.add("active");

    const filterValue = this.textContent.toLowerCase().trim();

    blogPosts.forEach((post) => {
      const category = post.querySelector(".post-category");
      if (category) {
        const categoryText = category.textContent.toLowerCase().trim();

        if (filterValue === "all") {
          post.style.display = "block";
        } else if (
          (filterValue === "desert adventures" &&
            categoryText.includes("desert")) ||
          (filterValue === "city life" && categoryText.includes("city")) ||
          (filterValue === "horse adventures" && categoryText.includes("horse"))
        ) {
          post.style.display = "block";
          
          post.style.opacity = "0";
          setTimeout(() => {
            post.style.opacity = "1";
          }, 100);
        } else {
          post.style.display = "none";
        }
      }
    });
  });
});


function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".featured-post, .blog-post-full, .value-item"
  );

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}


document.addEventListener("DOMContentLoaded", function () {
  
  const elements = document.querySelectorAll(
    ".featured-post, .blog-post-full, .value-item"
  );
  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  
  window.addEventListener("scroll", animateOnScroll);
  
  animateOnScroll();
});


function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showMessage(message, type) {
  
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

  
  if (type === "success") {
    messageDiv.style.background = "#10b981";
  } else {
    messageDiv.style.background = "#ef4444";
  }

  
  document.body.appendChild(messageDiv);

  
  setTimeout(() => {
    messageDiv.style.transform = "translateX(0)";
  }, 100);

  
  setTimeout(() => {
    messageDiv.style.transform = "translateX(400px)";
    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 300);
  }, 5000);
}


function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}


document.addEventListener("DOMContentLoaded", lazyLoadImages);


document.addEventListener("DOMContentLoaded", function () {
  
  const posts = document.querySelectorAll(".featured-post, .blog-post-full");
  posts.forEach((post) => {
    post.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    post.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  
  const buttons = document.querySelectorAll(
    ".cta-btn, .btn-secondary, .submit-btn"
  );
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

      
      if (!document.querySelector("#ripple-styles")) {
        const style = document.createElement("style");
        style.id = "ripple-styles";
        style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
        document.head.appendChild(style);
      }

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});
