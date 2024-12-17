// Caesar Cipher Functions
function caesarCipher(text, shift, action) {
    if (!text || isNaN(shift)) return "";
  
    const shiftAmount = action === "decrypt" ? -shift : shift;
    const adjustedShift = (shiftAmount % 26 + 26) % 26; // Adjust for negative shifts
    let result = "";
  
    for (let char of text) {
      if (char.match(/[a-z]/i)) {
        const base = char === char.toUpperCase() ? 65 : 97;
        result += String.fromCharCode(((char.charCodeAt(0) - base + adjustedShift) % 26) + base);
      } else {
        result += char; // Keep non-alphabetic characters unchanged
      }
    }
    return result;
  }
  
  // Encrypt Function
  function encryptText() {
    const text = document.getElementById("inputText").value;
    const shift = parseInt(document.getElementById("shiftValue").value);
    const encryptedText = caesarCipher(text, shift, "encrypt");
    document.getElementById("resultText").value = encryptedText; // Display the result in the input box
  }
  
  // Decrypt Function
  function decryptText() {
    const text = document.getElementById("inputText").value;
    const shift = parseInt(document.getElementById("shiftValue").value);
    const decryptedText = caesarCipher(text, shift, "decrypt");
    document.getElementById("resultText").value = decryptedText; // Display the result in the input box
  }
  