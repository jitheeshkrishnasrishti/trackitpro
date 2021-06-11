$(".mobile-menu-icon").click(function(){
  $(".side-menu").toggleClass("mobile-sidebar");
});


window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}


$(".menu-bar").click(function(){
  $(".side-menu").toggleClass("mobile-sidebar");
    
});


$(".close-btn").click(function(){
  $(".side-menu").toggleClass("mobile-sidebar");
    
});