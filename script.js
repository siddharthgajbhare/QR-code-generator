const wrapper = document.querySelector(".wrapper");

const qrInput = wrapper.querySelector(".form input");
const generateBtn = wrapper.querySelector(".form button");
const qrImg = wrapper.querySelector(".qr-code img");

const downloadBtn = wrapper.querySelector(".download-btn");
const copyBtn = wrapper.querySelector(".copy-btn");
const clearBtn = wrapper.querySelector(".clear-btn");

const sizeSelect = document.querySelector("#size");
const colorPicker = document.querySelector("#qrColor");

const placeholder = document.querySelector("#placeholder");
const status = document.querySelector("#status");


let preValue = "";
let currentQR = "";
let currentText = "";


/* =========================
   Generate QR Code
========================= */

function generateQRCode() {

  const qrValue = qrInput.value.trim();


  if (!qrValue) {

    status.textContent =
      "Please enter a URL or text.";

    qrInput.focus();

    return;
  }


  // Don't generate the exact same QR again
  if (preValue === qrValue && currentQR) {
    return;
  }


  preValue = qrValue;
  currentText = qrValue;


  // Loading state
  generateBtn.innerText =
    "Generating QR Code...";

  generateBtn.disabled = true;


  const size =
    sizeSelect.value;


  const color =
    colorPicker.value.replace("#", "");


  currentQR =
    `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&color=${color}&data=${encodeURIComponent(qrValue)}`;


  // Generate QR
  qrImg.src = currentQR;


  // When QR loads
  qrImg.addEventListener(
    "load",
    () => {

      wrapper.classList.add("active");

      qrImg.style.display = "block";

      placeholder.style.display = "none";


      generateBtn.innerText =
        "Generate QR Code";

      generateBtn.disabled = false;


      downloadBtn.disabled = false;

      copyBtn.disabled = false;


      status.textContent =
        "✓ QR code generated successfully.";

    },
    { once: true }
  );


  // If QR fails
  qrImg.addEventListener(
    "error",
    () => {

      generateBtn.innerText =
        "Generate QR Code";

      generateBtn.disabled = false;


      status.textContent =
        "Unable to generate QR code.";

    },
    { once: true }
  );

}


/* =========================
   Generate Button
========================= */

generateBtn.addEventListener(
  "click",
  generateQRCode
);


/* =========================
   Enter Key
========================= */

qrInput.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {
      generateQRCode();
    }

  }
);


/* =========================
   Input
========================= */

qrInput.addEventListener(
  "keyup",
  () => {

    const value =
      qrInput.value.trim();


    if (!value) {

      wrapper.classList.remove("active");


      qrImg.src = "";

      qrImg.style.display =
        "none";


      placeholder.style.display =
        "block";


      preValue = "";

      currentQR = "";

      currentText = "";


      downloadBtn.disabled =
        true;

      copyBtn.disabled =
        true;


      status.textContent = "";
    }

  }
);


/* =========================
   Download QR
========================= */

downloadBtn.addEventListener(
  "click",
  async () => {

    if (!currentQR) {
      return;
    }


    try {

      status.textContent =
        "Preparing download...";


      const response =
        await fetch(currentQR);


      if (!response.ok) {
        throw new Error(
          "Download failed"
        );
      }


      const blob =
        await response.blob();


      const url =
        URL.createObjectURL(blob);


      const link =
        document.createElement("a");


      link.href = url;

      link.download =
        "qr-code.png";


      document.body.appendChild(link);

      link.click();

      link.remove();


      URL.revokeObjectURL(url);


      status.textContent =
        "✓ QR code downloaded.";

    }

    catch (error) {

      status.textContent =
        "Download failed. Please try again.";

    }

  }
);


/* =========================
   Copy Text
========================= */

copyBtn.addEventListener(
  "click",
  async () => {

    if (!currentText) {
      return;
    }


    try {

      await navigator.clipboard
        .writeText(currentText);


      status.textContent =
        "✓ Text copied to clipboard.";

    }

    catch (error) {

      status.textContent =
        "Unable to copy text.";

    }

  }
);


/* =========================
   Clear
========================= */

clearBtn.addEventListener(
  "click",
  () => {

    qrInput.value = "";


    qrImg.src = "";

    qrImg.style.display =
      "none";


    placeholder.style.display =
      "block";


    wrapper.classList.remove(
      "active"
    );


    preValue = "";

    currentQR = "";

    currentText = "";


    generateBtn.innerText =
      "⚡ Generate QR Code";

    generateBtn.disabled =
      false;


    downloadBtn.disabled =
      true;

    copyBtn.disabled =
      true;


    status.textContent = "";


    qrInput.focus();

  }
);


/* =========================
   Size Change
========================= */

sizeSelect.addEventListener(
  "change",
  () => {

    if (qrInput.value.trim()) {

      // Allow regeneration
      preValue = "";

      generateQRCode();

    }

  }
);


/* =========================
   Color Change
========================= */

colorPicker.addEventListener(
  "change",
  () => {

    if (qrInput.value.trim()) {

      // Allow regeneration
      preValue = "";

      generateQRCode();

    }

  }
);
