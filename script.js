if (window.innerWidth >= 991) {
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
  document.querySelector("#desk").addEventListener("click", function () {
    locoScroll.scrollTo("#main");
  });
}
// if (window.innerWidth === 1024) {
//   var tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".slides:nth-child(5) ",
//       scrub: 3,
//       start: "105% 0%",
//       end: "120% 0%",
//       scroller: "#main",

//     }
//   });

//   tl.from(".sidebar", {
//       opacity: 0
//     })
//     .from(".sidebar h1, .elem", {
//       x: 600,
//       stagger: 1,
//       ease: "expo.ease"
//     })
//     .from(".box", {
//       opacity: 0
//     });
// } else if (window.innerWidth > 1024) {
//   var tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".slides:nth-child(5) ",
//       scrub: 3,
//       start: "180% 0%",
//       end: "200% 0%",
//       scroller: "#main",

//     }
//   });

//   tl.from(".sidebar", {
//       opacity: 0
//     })
//     .from(".sidebar h1, .elem", {
//       x: 600,
//       stagger: 1,
//       ease: "expo.ease"
//     })
//     .from(".box", {
//       opacity: 0
//     });
// }
else {
  // document.querySelector("#mob").addEventListener("click", function () {
  //   const page1Element = document.querySelector("#page1");

  //   if (page1Element) {
  //     page1Element.scrollIntoView({ behavior: "smooth" });
  //   }
  // });

}

// document.querySelector("#mob").addEventListener("click", function () {
//   const page1Element = document.querySelector("#page1");

//   if (page1Element) {
//     page1Element.scrollIntoView({ behavior: "smooth" });
//   }
// });

// section horizontal scroll
function scrollpage() {
  let sections = gsap.utils.toArray(".slides");

  let scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none", // <-- IMPORTANT!
    scrollTrigger: {
      trigger: ".section",
      pin: true,
      scroller: "#main",
      scrub: 0.1,
      //snap: directionalSnap(1 / (sections.length - 1)),
      end: "+=3000",
    },
  });

  function m() {
    ScrollTrigger.matchMedia({
      "(max-width:991px)": () => {
        let triggers = ScrollTrigger.getAll();
        triggers.forEach((trigger) => {
          trigger.kill();
        });
      },
    });
  }

  window.addEventListener("resize", m());
  window.addEventListener("mousemove", m());
}
scrollpage();
// section1 svg rotatiomn
function rotate() {
  gsap.to(".svg", {
    scrollTrigger: {
      trigger: ".slides:nth-child(1) ",
      scrub: 3,
      start: "bottom 98%%",
      end: "center 10%",
      scroller: "#main",
    },
    rotate: "180deg",
  });
}
rotate();
// section1 swiper
function slide1() {
  var swiper = new Swiper(".mySwiper", {
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
}
slide1();

// section2 swiper
function slide2() {
  var swiper = new Swiper("#main .swiper-1", {
    direction: "vertical",
    loop: true,

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
    },
  });
  var swiper = new Swiper("#main .swiper-2", {
    centeredSlides: true,
    loop: true,

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
    },
  });
}
slide2();

function slidethird() {
  var clutter = "";
  var imgPop = document.querySelector("#imgpop");

  document
    .querySelectorAll(".slides:nth-child(3) img")
    .forEach(function (elem) {
      elem.addEventListener("click", function () {
        console.log(elem.getAttribute("data-img"));
        imgPop.style.display = "flex";
        // document.querySelector("#main").style.pointerEvents = "none"
        clutter = `  <div class="cent" style="background-image: url(${elem.getAttribute(
          "data-img"
        )});">
      <div id="cross">
        <i class="ri-close-circle-fill"></i>
      </div>
      <div class="cover" >
        <h1>${elem.getAttribute("data-name")}</h1>
        <p>${elem.getAttribute("data-p")}</p>
        <button>
          <a href='${elem.getAttribute("data-link")}'>View Details
            <img src="./assests/trending_flat_FILL0_wght400_GRAD0_opsz48.png" alt="">
            <img id="leftwhite" src="./assests/right.svg" alt="">
          </a>
        </button>
      </div>
    </div>`;

        imgPop.innerHTML = clutter;

        // Add an event listener to the "cross" element to close the container
        var cross = document.querySelector("#cross");
        cross.addEventListener("click", function () {
          imgPop.style.display = "none";
          // document.querySelector("#main").style.pointerEvents = "all"
        });
      });
    });

  var swiper6 = new Swiper(".swiper-6", {
    grabCursor: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-6 .swiper-button-next",
      prevEl: ".swiper-6 .swiper-button-prev",
    },
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        origin: "left center",
        translate: ["-5%", 0, -200],
        rotate: [0, 100, 0],
      },
      next: {
        origin: "right center",
        translate: ["5%", 0, -200],
        rotate: [0, -100, 0],
      },
    },
  });

  var swiper7 = new Swiper(".swiper-7", {
    grabCursor: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-7 .swiper-button-next",
      prevEl: ".swiper-7 .swiper-button-prev",
    },
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        origin: "left center",
        translate: ["-5%", 0, -200],
        rotate: [0, 100, 0],
      },
      next: {
        origin: "right center",
        translate: ["5%", 0, -200],
        rotate: [0, -100, 0],
      },
    },
  });
  var swiper8 = new Swiper(".swiper-8", {
    grabCursor: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-8 .swiper-button-next",
      prevEl: ".swiper-8 .swiper-button-prev",
    },
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        origin: "left center",
        translate: ["-5%", 0, -200],
        rotate: [0, 100, 0],
      },
      next: {
        origin: "right center",
        translate: ["5%", 0, -200],
        rotate: [0, -100, 0],
      },
    },
  });
}

slidethird();


var flag = 0
document.querySelector(".menu").addEventListener("click",()=>{
  if(flag === 0){
    gsap.to("#line1",{
      transform:"rotate(48deg) translateY(5px)"
    })
    gsap.to("#line2",{
      transform:"rotate(-48deg) translateY(-12px) translateX(5px)"
    })
    var tl = gsap.timeline()
    tl.to("#navigation",{
      clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration:.5,
      
    })
    tl.from("#navigation a",{
      opacity:0,
      y:20,
      stagger:.2,
      onComplete:()=>{
        flag = 1
      }
    })
  }
  else{
    gsap.to("#line1",{
      transform:"rotate(0deg) translateY(0px)"
    })
    gsap.to("#line2",{
      transform:"rotate(0deg) translateY(0px) translateX(0px)"
    })
    var tl = gsap.timeline()
    tl.to("#navigation a",{
      opacity:0,
      y:-20
    })
    tl.to("#navigation",{
      width:"0%",
      clipPath:"polygon(0 0, 0 0, 0 100%, 0% 100%)",
      duration:.5,
      onComplete:()=>{
        gsap.to("#navigation",{
          width:"100%"
        })
        gsap.to("#navigation a",{
          opacity:1,
          y:20
        })
        flag = 0
      }
    })
   
  }

})
var value = 0
document.querySelector(".mobilemenu").addEventListener("click",()=>{
  if(value === 0){
    gsap.to("#line1",{
      transform:"rotate(48deg) translateY(0px)"
    })
    gsap.to("#line2",{
      transform:"rotate(-48deg) translateY(-6px) translateX(5px)"
    })
    var tl = gsap.timeline()
    tl.to("#navigation",{
      clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration:.5,
     
    })
    tl.from("#navigation a",{
      opacity:0,
      y:20,
      stagger:.2,
      onComplete:()=>{
        value = 1
      }
    })

  }
  else{
    gsap.to("#line1",{
      transform:"rotate(0deg) translateY(0px)"
    })
    gsap.to("#line2",{
      transform:"rotate(0deg) translateY(0px) translateX(0px)"
    })
    var tl = gsap.timeline()
    tl.to("#navigation a",{
      opacity:0,
      y:-20
    })
    tl.to("#navigation",{
      width:"0%",
      clipPath:"polygon(0 0, 0 0, 0 100%, 0% 100%)",
      duration:.5,
      onComplete:()=>{
        gsap.to("#navigation",{
          width:"100%"
        })
        gsap.to("#navigation a",{
          opacity:1,
          y:20
        })
        value = 0
      }
    })
 
  }

})