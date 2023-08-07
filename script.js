if (window.innerWidth >= 768) {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    multiplier: 0.3,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
  document.querySelector("#desk").addEventListener("click",function(){
    locoScroll.scrollTo('#main')
  })

} 
if (window.innerWidth === 1024) {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".slides:nth-child(5) ",
      scrub: 3,
      start: "105% 0%",
      end: "120% 0%",
      scroller: "#main",

    }
  });

  tl.from(".sidebar", {
      opacity: 0
    })
    .from(".sidebar h1, .elem", {
      x: 600,
      stagger: 1,
      ease: "expo.ease"
    })
    .from(".box", {
      opacity: 0
    });
} else if (window.innerWidth > 1024) {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".slides:nth-child(5) ",
      scrub: 3,
      start: "180% 0%",
      end: "200% 0%",
      scroller: "#main",

    }
  });

  tl.from(".sidebar", {
      opacity: 0
    })
    .from(".sidebar h1, .elem", {
      x: 600,
      stagger: 1,
      ease: "expo.ease"
    })
    .from(".box", {
      opacity: 0
    });
}



else{
  document.querySelector("#mob").addEventListener("click",function(){
    const page1Element = document.querySelector("#page1");

    if (page1Element) {
      page1Element.scrollIntoView({ behavior: "smooth" });
    }
  })
}

document.querySelector("#mob").addEventListener("click",function(){
  const page1Element = document.querySelector("#page1");

  if (page1Element) {
    page1Element.scrollIntoView({ behavior: "smooth" });
  }
})

// section horizontal scroll 
function sceoll(){
  let sections = gsap.utils.toArray(".slides");

let scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none", // <-- IMPORTANT!
    scrollTrigger: {
      trigger: ".section",
      pin: true,
      scroller:"#main",
      scrub: 0.1,
      //snap: directionalSnap(1 / (sections.length - 1)),
      end: "+=3000"
    }
  });

function m(){
    ScrollTrigger.matchMedia({
        "(max-width:768px)":()=>{                                                                                                                                                                                           
            let triggers = ScrollTrigger.getAll();
    triggers.forEach( trigger => {			
      trigger.kill();
    });
        }
      })
}

  window.addEventListener("resize",m())
  window.addEventListener("mousemove",m())
}
sceoll()
// section1 svg rotatiomn 
function rotate(){
  gsap.to(".svg",{
    scrollTrigger:{
      trigger:".slides:nth-child(1) ",
      scrub:3,
      start: "bottom 98%%",
      end: "center 10%",
      scroller:"#main"
    },
    rotate:"180deg"
  })  
  
}
rotate()
// section1 swiper
function slide1(){

  var swiper = new Swiper(".mySwiper", {

    centeredSlides: true,
    loop:true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
     
    },
  
  });
}
slide1()

// section2 swiper
function slide2(){
  var swiper = new Swiper(".swiper-1", {
    direction: "vertical",
    loop:true,
   
  
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
     
    },
    navigation: {
      nextEl: "#right",
      prevEl: "#left",
    },
    pagination: {
      el: ".swiper-pagination-fraction",
      type: "fraction",
    }
  });
  var swiper = new Swiper(".swiper-2", {
 
    centeredSlides: true,
    loop:true,
  
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
     
    },
    navigation: {
      nextEl: "#right",
      prevEl: "#left",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    }
  });
}
slide2()
