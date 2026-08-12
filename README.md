# 🔳 QR Code Generator

A simple and responsive **QR Code Generator** built using **HTML, CSS, and JavaScript**.
Enter any text or URL and instantly generate a QR code.

## 🚀 Features

* 🔗 Generate QR codes from text or URLs
* ⚡ Instant QR code generation
* 📱 Responsive and user-friendly interface
* 🎨 Clean and simple UI
* 🔄 Automatically updates when input changes
* 🛡️ Supports special characters and URLs
* 🌐 Uses the QR Server API to generate QR codes

## 🛠️ Technologies Used

* **HTML5** – Structure of the application
* **CSS3** – Styling and responsive design
* **JavaScript** – QR code generation and interaction
* **QR Server API** – Generates the QR code image

## 📂 Project Structure

```text
QR-Code-Generator/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## ⚙️ How It Works

1. Enter text, a message, or a URL into the input field.
2. Click the **Generate QR Code** button.
3. JavaScript reads the entered value.
4. The value is sent to the QR Server API.
5. The generated QR code is displayed on the page.

## 🔗 QR Code API

This project uses the **QR Server API**:

```text
https://api.qrserver.com/v1/create-qr-code/
```

The QR code is generated using parameters such as:

```text
size=200x200
data=YOUR_TEXT
```


## ▶️ How to Run

### 1. Clone the repository

```bash
git clone https://github.com/your-username/qr-code-generator.git
```

### 2. Open the project

```bash
cd qr-code-generator
```

### 3. Run the project

Simply open:

```text
index.html
```

in your web browser.

You can also use **VS Code Live Server** for a better development experience.

## 📸 Preview

Add a screenshot of your project here:

```markdown
![QR Code Generator Preview](./preview.png)
```

## 🔮 Future Improvements

* 📥 Download generated QR code
* 🎨 Customize QR code colors
* 📐 Add different QR code sizes
* 🖼️ Add logo/image support
* 📊 Add QR code history
* 🌙 Add dark mode
* 📱 Improve mobile responsiveness

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Make your changes
4. Commit your changes

```bash
git add .
git commit -m "Add new feature"
```

5. Push the branch

```bash
git push origin feature/new-feature
```

6. Open a Pull Request

## 📄 License

Copyright © 2026 **Siddharth Gajbhare**

This project is created and maintained by **Siddharth Gajbhare**.

You are free to use, modify, and learn from this project for personal and educational purposes. Please give appropriate credit to the original author.

**Author:** Siddharth Gajbhare

---

### ⭐ If you like this project

Give the repository a **star ⭐** on GitHub and feel free to contribute!

**Made with ❤️ using HTML, CSS & JavaScript**
