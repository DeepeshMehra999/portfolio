let pro=document.querySelectorAll("#pro");
let magicimg=document.getElementById("magic-img");
let mg=document.getElementById("mg");
console.log(magicimg)

pro.forEach((ele)=>{
  ele.addEventListener("mouseenter",()=>{
      magicimg.src=`${ele.getAttribute("path")}`;
mg.style.display="block"
})

ele.addEventListener("mouseleave",()=>{
mg.style.display="none"
})
})