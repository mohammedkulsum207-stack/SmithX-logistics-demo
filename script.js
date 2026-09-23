"use strict";


/* =========================
   DESTINATIONS
========================= */

const destinations = {

  Dubai:{
    distance:"4,100 km",
    eta:"2–5 days"
  },

  Nairobi:{
    distance:"25 km",
    eta:"1–2 days"
  },

  London:{
    distance:"6,850 km",
    eta:"4–7 days"
  },

  "New York":{
    distance:"11,800 km",
    eta:"5–9 days"
  },

  Singapore:{
    distance:"7,300 km",
    eta:"5–8 days"
  }

};


/* =========================
   SCROLL ANIMATION
========================= */

function setupReveal(){

  const elements =
    document.querySelectorAll(".reveal");

  const observer =
    new IntersectionObserver(

      function(entries){

        entries.forEach(function(entry){

          if(entry.isIntersecting){

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

          }

        });

      },

      {
        threshold:0.08
      }

    );


  elements.forEach(function(element){

    observer.observe(element);

  });

}


/* =========================
   COUNTERS
========================= */

function setupCounters(){

  const counters =
    document.querySelectorAll(".counter");


  counters.forEach(function(counter){

    const target =
      Number(counter.dataset.target);

    counter.textContent = "0";

    let started = false;


    function animate(){

      if(started) return;

      started = true;

      const duration = 1600;
      const start = performance.now();


      function frame(now){

        const progress =
          Math.min(
            (now - start) / duration,
            1
          );


        const eased =
          1 - Math.pow(1 - progress,3);


        counter.textContent =
          Math.floor(target * eased);


        if(progress < 1){

          requestAnimationFrame(frame);

        }else{

          counter.textContent = target;

        }

      }


      requestAnimationFrame(frame);

    }


    const observer =
      new IntersectionObserver(

        function(entries){

          if(entries[0].isIntersecting){

            animate();

            observer.disconnect();

          }

        },

        {
          threshold:.5
        }

      );


    observer.observe(counter);

  });

}


/* =========================
   SHIPMENT
========================= */

let progressTimer = null;


function openShipment(){

  const select =
    document.getElementById("destination");


  const destination =
    select ? select.value : "Dubai";


  const data =
    destinations[destination];


  document.getElementById(
    "routeDestination"
  ).textContent =
    destination.toUpperCase();


  document.getElementById(
    "deliveryDestination"
  ).textContent =
    destination;


  document.getElementById(
    "distance"
  ).textContent =
    data.distance;


  document.getElementById(
    "eta"
  ).textContent =
    data.eta;


  const overlay =
    document.getElementById(
      "shipmentOverlay"
    );


  const progress =
    document.getElementById(
      "progress"
    );


  const percent =
    document.getElementById(
      "percent"
    );


  clearInterval(progressTimer);


  progress.style.transition = "none";
  progress.style.width = "0%";

  percent.textContent = "0%";


  overlay.classList.remove("active");


  /*
    Forces browser to restart
    the truck animation.
  */
  void overlay.offsetWidth;


  overlay.classList.add("active");


  document.body.style.overflow =
    "hidden";


  let value = 0;


  setTimeout(function(){

    progress.style.transition =
      "width 4s linear";

    progress.style.width =
      "100%";

  },100);


  progressTimer =
    setInterval(function(){

      value++;

      percent.textContent =
        value + "%";


      if(value >= 100){

        clearInterval(progressTimer);

      }

    },40);

}


/* =========================
   CLOSE SHIPMENT
========================= */

function closeShipment(){

  const overlay =
    document.getElementById(
      "shipmentOverlay"
    );


  overlay.classList.remove("active");

  document.body.style.overflow =
    "";


  clearInterval(progressTimer);

}


/* =========================
   TRACKING
========================= */

function trackShipment(){

  const input =
    document.getElementById(
      "trackingNumber"
    );


  const result =
    document.getElementById(
      "trackingResult"
    );


  const value =
    input.value.trim();


  if(!value){

    result.innerHTML =
      "Please enter a tracking number.";

    return;

  }


  result.innerHTML = `
    Shipment <strong>${escapeHTML(value)}</strong>
    has entered the SmithX network.
    <br>
    Status:
    <span>In Transit</span>
    <br>
    AI Route:
    <strong>Optimizing</strong>
  `;

}


/* =========================
   SECURITY
========================= */

function escapeHTML(value){

  return value
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

}


/* =========================
   SCROLL TRACKING
========================= */

function goTracking(){

  document
    .getElementById("tracking")
    .scrollIntoView({
      behavior:"smooth"
    });

}


/* =========================
   ESC KEY
========================= */

document.addEventListener(
  "keydown",
  function(event){

    if(event.key === "Escape"){

      closeShipment();

    }

  }
);


/* =========================
   START EVERYTHING
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function(){

    setupReveal();

    setupCounters();

  }
);
