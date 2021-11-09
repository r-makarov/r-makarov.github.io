console.log('it works')

var toggler = document.querySelector('.toggle-switch');

toggler.onclick = function(){
  toggler.classList.toggle('active');
  document.body.classList.toggle("dark-mode")
}