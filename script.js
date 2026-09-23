const destinations = {
  Dubai: {
    distance: "4,100 km",
    eta: "2–5 days"
  },

  Nairobi: {
    distance: "25 km",
    eta: "1–2 days"
  },

  London: {
    distance: "6,850 km",
    eta: "4–7 days"
  },

  "New York": {
    distance: "11,800 km",
    eta: "5–9 days"
  },

  Singapore: {
    distance: "7,300 km",
    eta: "5–8 days"
  }
};


let progressTimer;


/* --------------------------------
   SCROLL REVEAL
-------------------------------- */

const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


document.querySelectorAll(".reveal")
  .forEach(element => {
    revealObserver.observe(element);
  });


/* --------------------------------
   NUMBER COUNTERS
-------------------------------- */

const counterObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.count);

      let current = 0;

      const duration = 1600;
      const start = performance.now();

      function update(now) {

        const progress = Math.min(
          (now - start) / duration,
          1
        );

        const eased =
          1 - Math.pow(1 - progress, 3);

        current = Math.floor(target * eased);

        element.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          element.textContent = target;
        }

      }

      requestAnimationFrame(update);

      counterObserver.unobserve(element);

    });

  },
  {
    threshold: .7
  }
);


document.querySelectorAll("[data-count]")
  .forEach(element => {
    counterObserver.observe(element);
  });


/* --------------------------------
   START SHIPMENT
-------------------------------- */

function startShipment() {

  const destination =
    document.getElementById(
      "destinationSelect"
    ).value;

  const data =
    destinations[destination];

  const overlay =
    document.getElementById(
      "logisticsTransition"
    );


  document.getElementById(
    "routeDestination"
  ).textContent = destination.toUpperCase();


  document.getElementById(
    "cardDestination"
  ).textContent = destination;


  document.getElementById(
    "deliveryDistance"
  ).textContent = data.distance;


  document.getElementById(
    "deliveryTime"
  ).textContent = data.eta;


  const progress =
    document.getElementById(
      "deliveryProgress"
    );

  const percent =
    document.getElementById(
      "progressPercent"
    );


  progress.style.transition = "none";
  progress.style.width = "0%";
  percent.textContent = "0%";


  overlay.classList.remove("active");

  void overlay.offsetWidth;

  overlay.classList.add("active");

  document.body.style.overflow = "hidden";


  startProgress();
}


/* --------------------------------
   LIVE PROGRESS
-------------------------------- */

function startProgress() {

  clearInterval(progressTimer);

  const bar =
    document.getElementById(
      "deliveryProgress"
    );

  const percentage =
    document.getElementById(
      "progressPercent"
    );

  let value = 0;


  setTimeout(() => {

    bar.style.transition =
      "width 3.8s cubic-bezier(.22,.61,.36,1)";

    bar.style.width = "100%";

  }, 100);


  progressTimer = setInterval(() => {

    value++;

    percentage.textContent =
      value + "%";


    if (value >= 100) {

      clearInterval(progressTimer);

    }

  }, 38);
}


/* --------------------------------
   CLOSE ANIMATION
-------------------------------- */

function closeLogisticsTransition() {

  const overlay =
    document.getElementById(
      "logisticsTransition"
    );

  overlay.classList.remove("active");

  document.body.style.overflow = "";

  clearInterval(progressTimer);
}


/* --------------------------------
   TRACKING
-------------------------------- */

function trackShipment() {

  const input =
    document.getElementById(
      "trackingInput"
    );

  const result =
    document.getElementById(
      "trackingResult"
    );


  const trackingNumber =
    input.value.trim();


  if (!trackingNumber) {

    result.innerHTML =
      "Please enter a tracking number.";

    return;

  }


  result.innerHTML = `
    Shipment <strong>${escapeHTML(
      trackingNumber
    )}</strong> has entered the
    SmithX logistics network.

    <br>

    Status:
    <span>In Transit</span>

    <br>

    AI Route:
    <strong>Optimizing</strong>
  `;

}


/* --------------------------------
   SAFE HTML
-------------------------------- */

function escapeHTML(value) {

  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* --------------------------------
   NAVIGATION
-------------------------------- */

function scrollToTracking() {

  document
    .getElementById("tracking")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* --------------------------------
   ESCAPE KEY
-------------------------------- */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeLogisticsTransition();

    }

  }
);


/* --------------------------------
   MOUSE PARALLAX
-------------------------------- */

const planet =
  document.querySelector(".planet");

document.addEventListener(
  "mousemove",
  event => {

    if (!planet) return;

    const x =
      (event.clientX /
        window.innerWidth - .5) * 10;

    const y =
      (event.clientY /
        window.innerHeight - .5) * -10;


    planet.style.transform =
      `translateY(${y}px)
       rotateY(${x}deg)`;

  }
);


/* --------------------------------
   ACTIVE NAVIGATION
-------------------------------- */

const sections =
  document.querySelectorAll(
    "section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".navbar nav a"
  );


const navObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting)
          return;


        navLinks.forEach(link => {

          link.classList.remove(
            "active"
          );

        });


        const active =
          document.querySelector(
            `.navbar nav a[href="#${entry.target.id}"]`
          );


        if (active) {

          active.classList.add(
            "active"
          );

        }

      });

    },
    {
      threshold: .5
    }
  );


sections.forEach(section => {
  navObserver.observe(section);
});
