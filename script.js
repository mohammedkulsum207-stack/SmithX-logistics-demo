const destinationData = {
  Nairobi: {
    distance: "25 km",
    eta: "1–2 days"
  },

  Dubai: {
    distance: "4,100 km",
    eta: "2–5 days"
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


let deliveryTimer;


/* =========================
   ADD TO CART
========================= */

function addToCart() {

  const destinationSelect =
    document.getElementById("destinationSelect");

  const destination =
    destinationSelect.value;

  const data =
    destinationData[destination];

  const transition =
    document.getElementById("logisticsTransition");

  document.getElementById("routeDestination")
    .textContent = destination;

  document.getElementById("cardDestination")
    .textContent = destination;

  document.getElementById("deliveryDistance")
    .textContent = data.distance;

  document.getElementById("deliveryTime")
    .textContent = data.eta;


  /* Reset animation */

  transition.classList.remove("active");

  void transition.offsetWidth;


  /* Start cinematic sequence */

  transition.classList.add("active");

  document.body.style.overflow = "hidden";


  animateDeliveryProgress();
}


/* =========================
   DELIVERY PROGRESS
========================= */

function animateDeliveryProgress() {

  const progress =
    document.getElementById("deliveryProgress");

  const percent =
    document.getElementById("progressPercent");


  clearInterval(deliveryTimer);


  progress.style.transition = "none";
  progress.style.width = "0%";

  percent.textContent = "0%";


  requestAnimationFrame(() => {

    progress.style.transition =
      "width 3s linear";

    progress.style.width = "100%";

  });


  let value = 0;


  deliveryTimer = setInterval(() => {

    value++;

    percent.textContent =
      `${Math.min(value, 100)}%`;


    if (value >= 100) {

      clearInterval(deliveryTimer);

    }

  }, 30);

}


/* =========================
   CLOSE TRANSITION
========================= */

function closeLogisticsTransition() {

  const transition =
    document.getElementById("logisticsTransition");

  transition.classList.remove("active");

  document.body.style.overflow = "";

  clearInterval(deliveryTimer);
}


/* =========================
   TRACK SHIPMENT
========================= */

function trackShipment() {

  const input =
    document.getElementById("trackingInput");

  const result =
    document.getElementById("trackingResult");

  const trackingNumber =
    input.value.trim();


  if (!trackingNumber) {

    result.textContent =
      "Enter a tracking number.";

    return;
  }


  result.textContent =
    `Shipment ${trackingNumber} located in the SmithX logistics network.`;

}


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      closeLogisticsTransition();

    }

  }
);
