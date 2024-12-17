const passwordBox = document.getElementById("password");
const messageBox = document.getElementById("message");
const copyIcon = document.getElementById("copy-icon");
const popup = document.getElementById("popup");
const length = 12;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "1234567890";
const symbol = "@#$%&*()_+|}{[]></-=";
const allChars = upperCase + lowerCase + number + symbol;

function createPass() {
  passwordBox.value = "";
  passwordBox.type = "text";
  let password = "";
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += number[Math.floor(Math.random() * number.length)];
  password += symbol[Math.floor(Math.random() * symbol.length)];

  while (length > password.length) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  passwordBox.value = password;
  messageBox.style.display = "block";
  setTimeout(() => {
    passwordBox.type = "password";
  }, 1500);
}

function encrypt(text) {
  return btoa(text);
}

async function copyPassword() {
  const passwordField = document.getElementById("password");
  const encryptedPassword = encrypt(passwordField.value);
  try {
    await navigator.clipboard.writeText(encryptedPassword);
    copyIcon.src = "/assets/copiado.svg";
    copyIcon.alt = "Copiado";
    copyIcon.title = "Copiado";

    popup.style.display = "block";
    setTimeout(() => {
      popup.style.display = "none";
      passwordBox.value = "";
      passwordBox.type = "text";
      messageBox.style.display = "none";
      copyIcon.src = "/assets/copy.svg";
      copyIcon.alt = "Copiar";
      copyIcon.title = "Copiar";
    }, 3000);
  } catch (err) {
    console.error("Error al copiar la contraseña: ", err);
  }
}
