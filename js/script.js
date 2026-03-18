// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener("click", function(e) {
e.preventDefault();
document.querySelector(this.getAttribute("href"))
.scrollIntoView({ behavior: "smooth" });
});
});

// Contact form
document.getElementById("contactForm").addEventListener("submit", function(e){
e.preventDefault();
alert("Thanks! We'll get back to you.");
});