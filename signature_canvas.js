

const fnLogo = () => {

  const eSignature = document.getElementById("signature");
  if (eSignature) {

    var c = eSignature.getContext("2d");
    eSignature.width = 399;
    eSignature.height = 300;
    eSignature.style.backgroundColor = "transparent";

    c.beginPath();
    c.strokeStyle = 'red';
    c.strokeStyle = "grey";
    c.strokeStyle = "pink";
    c.strokeStyle = "purple";
    c.strokeStyle = "hotpink";
    //    c.strokeStyle = "white";

    c.strokeStyle = "black"


    const bodyElement = document.getElementsByTagName('body')
    if (bodyElement[0].classList.contains('body__black')) {
      // purple
      c.strokeStyle = "#AE57FF";
    } else if (bodyElement[0].classList.contains('body__sun-gym')) {
      // purple
      c.strokeStyle = "#AE57FF"
    } else if (bodyElement[0].classList.contains('body__the-visual-dome')) {
      c.strokeStyle = "hotpink";
    } else if (bodyElement[0].classList.contains('body__irina-rimes')) {
      c.strokeStyle = "white";
    } else if (bodyElement[0].classList.contains('body__love-story')) {
      c.strokeStyle = "white";
    } else if (bodyElement[0].classList.contains('body__the-neon-demon')) {
      c.strokeStyle = "white";
    } else if (bodyElement[0].classList.contains('body__kowloon')) {
      c.strokeStyle = "white";
    } else if (bodyElement[0].classList.contains('body__the-white-lotus')) {
      c.strokeStyle = "#ebdac0";
    }

    c.lineCap = "round";
    c.lineWidth = 13;

    //       X   Y 
    // F
    c.moveTo(10, 25);
    c.lineTo(60, 25);
    c.moveTo(10, 65);
    c.lineTo(10, 115);
    c.moveTo(10, 65);
    c.lineTo(60, 65);

    // R
    c.moveTo(90, 25);
    c.lineTo(120, 25);

    c.moveTo(90, 65);
    c.arc(120, 45, 20, 1.5, Math.PI * 1.5, true); // Outer circle

    c.moveTo(90, 65);
    c.lineTo(160, 135);

    // A
    c.moveTo(215, 25);
    c.lineTo(260, 115);

    // N
    c.moveTo(280, 75);
    c.lineTo(320, 165);

    // K
    c.moveTo(340, 120);
    c.lineTo(390, 75);
    c.moveTo(340, 120);
    c.lineTo(390, 165);

    // V
    c.moveTo(10, 145);
    c.lineTo(95, 265);
    c.moveTo(95, 265);
    c.lineTo(215, 25);

    // O
    c.moveTo(255, 225);
    c.arc(215, 225, 40, 0, Math.PI * 2, true); // Outer circle


    c.stroke();
    c.closePath();
  } // end draw function  
}

fnLogo();
