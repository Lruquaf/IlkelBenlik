//popup event
var popupViews = document.querySelectorAll(".popup");
var popupBtns = document.querySelectorAll(".btn-popup");
var closeBtns = document.querySelectorAll(".close-btn");



var popup = function(popupClick){
  popupViews[popupClick].classList.add("active");
}
//for Explore button
popupBtns.forEach((popupBtn, i) => {
  popupBtn.addEventListener("click" , ()=>{
    popup(i)
  });
});
//for close button
closeBtns.forEach((closeBtn)=>{
  closeBtn.addEventListener("click", ()=>{
    popupViews.forEach((popupView) =>{
      popupView.classList.remove("active");
    });
  });
});


