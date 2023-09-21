const nav = document.querySelector(".navigation-nav");
const nav_links = nav.querySelectorAll(".navigation-item");
const burger = document.querySelector(".navigation-burger");
const bg = document.querySelector(".navigation-background");
var delayInMilliseconds = 650;


burger.addEventListener("click", () => {
  bg.classList.toggle("bg-open");
  nav.classList.toggle("nav-open");
  burger.classList.toggle("toggle");
  console.log("clicked burger");

  
  nav_links.forEach(point => {
    point.addEventListener("click", () => {
      bg.classList.toggle("bg-open");
      nav.classList.toggle("nav-open");
      burger.classList.toggle("toggle");
      console.log("clicked item");
      
      setTimeout(function() {
        location.reload();
      }, delayInMilliseconds);
    })
  });
});