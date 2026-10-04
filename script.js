/* =========================
   ELEMENTS
========================= */

const wrapper =
  document.querySelector(".wrapper");

const qrInput =
  document.querySelector("#qrInput");

const generateBtn =
  document.querySelector(".generate-btn");

const qrImg =
  document.querySelector("#qrImage");

const downloadBtn =
  document.querySelector(".download-btn");

const copyBtn =
  document.querySelector(".copy-btn");

const clearBtn =
  document.querySelector(".clear-btn");

const sizeSelect =
  document.querySelector("#size");

const colorPicker =
  document.querySelector("#qrColor");

const bgColorPicker =
  document.querySelector("#bgColor");

const fileNameInput =
  document.querySelector("#fileName");

const placeholder =
  document.querySelector("#placeholder");

const status =
  document.querySelector("#status");

const charCount =
  document.querySelector("#charCount");

const qrContainer =
  document.querySelector("#qrContainer");

const themeBtn =
  document.querySelector("#themeBtn");

const historyList =
  document.querySelector("#historyList");

const clearHistoryBtn =
  document.querySelector("#clearHistoryBtn");

const typeButtons =
  document.querySelectorAll(".type-btn");


/* =========================
   VARIABLES
========================= */

let currentQR = "";

let currentText = "";

let currentType = "url";


let history =
  JSON.parse(
    localStorage.getItem("qrHistory") || "[]"
  );


/* =========================
   STATUS
========================= */

function setStatus(
  message,
  error = false
) {

  status.textContent =
    message;

  status.classList.toggle(
    "error",
    error
  );

}


/* =========================
   CHARACTER COUNTER
========================= */

function updateCounter() {

  charCount.textContent =
    `${qrInput.value.length} / 1000`;

}


/* =========================
   VALIDATION
========================= */

function validateInput(value) {

  if (!value) {

    return "Please enter a URL or text.";

  }


  /* URL */

  if (currentType === "url") {

    try {

      const url =
        new URL(value);


      if (
        !["http:", "https:"]
          .includes(url.protocol)
      ) {

        throw new Error();

      }

    }

    catch {

      return (
        "Enter a valid URL, e.g. https://example.com"
      );

    }

  }


  /* EMAIL */

  if (
    currentType === "email" &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(value)
  ) {

    return (
      "Enter a valid email address."
    );

  }


  /* PHONE */

  if (
    currentType === "phone" &&
    !/^[+\d\s().-]{7,20}$/
      .test(value)
  ) {

    return (
      "Enter a valid phone number."
    );

  }


  return "";

}


/* =========================
   QR DATA
========================= */

function getQRData(value) {

  if (currentType === "email") {

    return `mailto:${value}`;

  }


  if (currentType === "phone") {

    return `tel:${value}`;

  }


  return value;

}


/* =========================
   GENERATE QR
========================= */

function generateQRCode() {

  const value =
    qrInput.value.trim();


  const error =
    validateInput(value);


  if (error) {

    setStatus(
      error,
      true
    );

    qrInput.focus();

    return;

  }


  const data =
    getQRData(value);


  currentText =
    data;


  const size =
    Number(sizeSelect.value);


  const color =
    colorPicker.value
      .replace("#", "");


  const background =
    bgColorPicker.value
      .replace("#", "");


  const params =
    new URLSearchParams({

      size:
        `${size}x${size}`,

      color:
        color,

      bgcolor:
        background,

      format:
        "png",

      data:
        data

    });


  currentQR =
    `https://api.qrserver.com/v1/create-qr-code/?${params}`;


  generateBtn.disabled =
    true;


  generateBtn.textContent =
    "Generating...";


  qrContainer.classList.add(
    "loading"
  );


  setStatus(
    "Creating your QR code..."
  );


  /* QR LOAD */

  qrImg.onload =
    () => {

      qrContainer.classList.remove(
        "loading"
      );


      wrapper.classList.add(
        "active"
      );


      qrImg.style.display =
        "block";


      placeholder.style.display =
        "none";


      generateBtn.disabled =
        false;


      generateBtn.textContent =
        "⚡ Generate QR Code";


      downloadBtn.disabled =
        false;


      copyBtn.disabled =
        false;


      setStatus(
        "✓ QR code generated successfully."
      );


      saveHistory(value);

    };


  /* QR ERROR */

  qrImg.onerror =
    () => {

      qrContainer.classList.remove(
        "loading"
      );


      generateBtn.disabled =
        false;


      generateBtn.textContent =
        "⚡ Generate QR Code";


      setStatus(
        "Unable to generate QR code.",
        true
      );

    };


  qrImg.src =
    currentQR;

}


/* =========================
   GENERATE BUTTON
========================= */

generateBtn.addEventListener(
  "click",
  generateQRCode
);


/* =========================
   ENTER KEY
========================= */

qrInput.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Enter"
    ) {

      generateQRCode();

    }

  }
);


/* =========================
   CHARACTER COUNTER
========================= */

qrInput.addEventListener(
  "input",
  updateCounter
);


/* =========================
   QR TYPES
========================= */

typeButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        typeButtons.forEach(
          btn =>
            btn.classList.remove(
              "active"
            )
        );


        button.classList.add(
          "active"
        );


        currentType =
          button.dataset.type;


        const placeholders = {

          url:
            "https://example.com",

          text:
            "Enter any text here...",

          email:
            "example@email.com",

          phone:
            "+91 9876543210"

        };


        qrInput.placeholder =
          placeholders[currentType];


        qrInput.focus();

      }
    );

  }
);


/* =========================
   AUTO REGENERATE
========================= */

[
  sizeSelect,
  colorPicker,
  bgColorPicker
]
.forEach(
  control => {

    control.addEventListener(
      "change",
      () => {

        if (
          qrInput.value.trim()
        ) {

          generateQRCode();

        }

      }
    );

  }
);


/* =========================
   DOWNLOAD
========================= */

downloadBtn.addEventListener(
  "click",
  async () => {

    if (!currentQR) {

      return;

    }


    try {

      setStatus(
        "Preparing download..."
      );


      const response =
        await fetch(currentQR);


      if (!response.ok) {

        throw new Error();

      }


      const blob =
        await response.blob();


      const url =
        URL.createObjectURL(
          blob
        );


      const link =
        document.createElement(
          "a"
        );


      let fileName =
        fileNameInput.value.trim();


      if (!fileName) {

        fileName =
          "my-qr-code";

      }


      fileName =
        fileName.replace(
          /[\\/:*?"<>|]/g,
          "-"
        );


      link.href =
        url;


      link.download =
        `${fileName}.png`;


      document.body.appendChild(
        link
      );


      link.click();


      link.remove();


      URL.revokeObjectURL(
        url
      );


      setStatus(
        "✓ QR code downloaded."
      );

    }

    catch {

      window.open(
        currentQR,
        "_blank"
      );


      setStatus(
        "QR opened in a new tab. Right-click it to save."
      );

    }

  }
);


/* =========================
   COPY
========================= */

copyBtn.addEventListener(
  "click",
  async () => {

    if (!currentText) {

      return;

    }


    try {

      await navigator
        .clipboard
        .writeText(
          currentText
        );


      setStatus(
        "✓ QR content copied."
      );

    }

    catch {

      setStatus(
        "Unable to copy content.",
        true
      );

    }

  }
);


/* =========================
   CLEAR
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


    currentQR =
      "";

    currentText =
      "";


    downloadBtn.disabled =
      true;


    copyBtn.disabled =
      true;


    generateBtn.disabled =
      false;


    generateBtn.textContent =
      "⚡ Generate QR Code";


    setStatus("");


    updateCounter();


    qrInput.focus();

  }
);


/* =========================
   HISTORY
========================= */

function saveHistory(value) {

  const item = {

    text:
      value,

    type:
      currentType

  };


  history = [

    item,

    ...history.filter(
      x =>
        x.text !== value
    )

  ].slice(0, 6);


  localStorage.setItem(
    "qrHistory",
    JSON.stringify(history)
  );


  renderHistory();

}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(value) {

  return value.replace(
    /[&<>"']/g,
    character => {

      return {

        "&":
          "&amp;",

        "<":
          "&lt;",

        ">":
          "&gt;",

        '"':
          "&quot;",

        "'":
          "&#039;"

      }[character];

    }
  );

}


/* =========================
   RENDER HISTORY
========================= */

function renderHistory() {

  if (
    !history.length
  ) {

    historyList.innerHTML =
      `
      <p class="empty-history">
        No QR codes generated yet.
      </p>
      `;

    return;

  }


  historyList.innerHTML =
    history
      .map(
        (item, index) => {

          let icon = "📝";


          if (
            item.type === "url"
          ) {

            icon = "🔗";

          }

          else if (
            item.type === "email"
          ) {

            icon = "✉";

          }

          else if (
            item.type === "phone"
          ) {

            icon = "📞";

          }


          return `

          <div class="history-item">

            <span>
              ${icon}
            </span>

            <span
              class="history-text"
            >
              ${escapeHTML(
                item.text
              )}
            </span>

            <button
              type="button"
              data-index="${index}"
            >
              Use
            </button>

          </div>

          `;

        }
      )
      .join("");

}


/* =========================
   USE HISTORY
========================= */

historyList.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "button[data-index]"
      );


    if (!button) {

      return;

    }


    const item =
      history[
        Number(
          button.dataset.index
        )
      ];


    qrInput.value =
      item.text;


    currentType =
      item.type;


    typeButtons.forEach(
      btn => {

        btn.classList.toggle(
          "active",
          btn.dataset.type ===
            currentType
        );

      }
    );


    updateCounter();


    generateQRCode();

  }
);


/* =========================
   CLEAR HISTORY
========================= */

clearHistoryBtn.addEventListener(
  "click",
  () => {

    history = [];


    localStorage.removeItem(
      "qrHistory"
    );


    renderHistory();


    setStatus(
      "History cleared."
    );

  }
);


/* =========================
   DARK / LIGHT MODE
========================= */

const savedTheme =
  localStorage.getItem(
    "qrTheme"
  );


if (
  savedTheme === "light"
) {

  document.body.classList.add(
    "light"
  );


  themeBtn.textContent =
    "☀";

}


themeBtn.addEventListener(
  "click",
  () => {

    document.body.classList.toggle(
      "light"
    );


    const isLight =
      document.body.classList.contains(
        "light"
      );


    localStorage.setItem(
      "qrTheme",
      isLight
        ? "light"
        : "dark"
    );


    themeBtn.textContent =
      isLight
        ? "☀"
        : "☾";

  }
);


/* =========================
   INITIALIZE
========================= */

updateCounter();

renderHistory();
