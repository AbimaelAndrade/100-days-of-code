const handHours = document.querySelector('.hours');
const handMin = document.querySelector('.min');
const handSec = document.querySelector('.sec');

setInterval(() => {
  const now = new Date();
  const hours = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();

  const degSeg = ((sec / 60) * 360) + 90;
  const degMin = ((min / 60) * 360) + 90;
  const degHours = ((hours / 12) * 360) + 90;

  handHours.style.transform = `translateY(-5px) translateX(80px) rotate(${degHours}deg)`;
  handMin.style.transform = `translateY(-4px) translateX(50px) rotate(${degMin}deg)`;
  handSec.style.transform = `translateY(-2px) translateX(20px) rotate(${degSeg}deg)`;
}, 1000);