var stones = document.querySelectorAll(".stone");
stones.forEach((stone) => {
  stone.addEventListener("click", ()=>{
    stone.classList.toggle("active");
  })
})