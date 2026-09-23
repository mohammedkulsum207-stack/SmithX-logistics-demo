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


/* ==========================
   ADD TO CART
========================== */

function addToCart() {

  const destination =
    document.getElementById("destinationSelect").value;

  const data =
    destinations[destination];

  const overlay =
    document.getElementById("logisticsTransition");


  /* Destination */

  document.getElementById("routeDestination")
    .textContent = destination;

  document.getElementById("cardDestination")
    .textContent = destination;


  /* Distance */

  document.getElementById("deliveryDistance")
    .textContent = data.distance;


  /* ETA */

  document.getElementById("deliveryTime")
    .textContent = data.eta;


  /* Reset animation */

  overlay.classList.remove("active");

  document.getElementById("deliveryProgress").style.width = "0%";

  document.getElementById("progressPercent").textContent = "0%";


  /*
    Force browser to reset animation
  */

  void overlay.offsetWidth;


  /* Open cinematic screen */

  overlay.classList.add("active");

  document.body.style.overflow = "hidden";


  /* Start progress */

  startProgress();

}


/* ==========================
   PROGRESS
========================== */

function startProgress() {

  clearInterval(progressTimer);

  const bar =
    document.getElementById("deliveryProgress");

  const percentage =
    document.getElementById("progressPercent");


  let value = 0;


  bar.style.transition = "none";
  bar.style.width = "0%";


  setTimeout(() => {

    bar.style.transition =
      "width 3s linear";

    bar.style.width = "100%";

  }, 50);


  progressTimer = setInterval(() => {

    value += 1;

    percentage.textContent =
      value + "%";


    if (value >= 100) {

      clearInterval(progressTimer);

    }

  }, 30);

}


/* ==========================
   CLOSE
========================== */

function closeLogisticsTransition() {

  const overlay =
    document.getElementById("logisticsTransition");

  overlay.classList.remove("active");

  document.body.style.overflow = "";

  clearInterval(progressTimer);

}


/* ==========================
   TRACK SHIPMENT
========================== */

function trackShipment() {

  const input =
    document.getElementById("trackingInput");

  const result =
    document.getElementById("trackingResult");


  const trackingNumber =
    input.value.trim();


  if (!trackingNumber) {

    result.textContent =
      "Please enter a tracking number.";

    return;

  }


  result.innerHTML =
    `
      Shipment <strong>${trackingNumber}</strong>
      has been received by the SmithX network.
      <br>
      Status: <span style="color:#8dffba">
      In Transit
      </span>
    `;

}


/* ==========================
   ESCAPE
========================== */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      closeLogisticsTransition();

    }

  }
);
