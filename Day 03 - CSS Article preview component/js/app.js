const btnShare = document.querySelector('.share__button');
const shareContent = document.querySelector('.share__controlers');

btnShare.addEventListener('click', function(e){
  e.preventDefault();
  shareContent.classList.toggle('active');
});