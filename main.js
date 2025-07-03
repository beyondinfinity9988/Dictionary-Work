const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", Display);

function Display() {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                  <span>EX)</span>  ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
}

var isFirstPlay = true;

function playSound() {
    var word = document.getElementById("inp-word").value;
    var msg = new SpeechSynthesisUtterance();
    msg.text = word;

    if (isFirstPlay) {
        msg.rate = 0.1;
        msg.volume = 1.0;
        isFirstPlay = false;
    } else {
        msg.rate = 0.1;
        msg.volume = 1.0;
        isFirstPlay = true;
    }

    window.speechSynthesis.speak(msg);
}

btn.addEventListener('click', test_error);

function test_error() {
    var word = document.getElementById("inp-word").value;
    var msg = new SpeechSynthesisUtterance();
    if (word === "") {
        msg.text = "Couldn't Find The Word please Type correct word ";

    }
    msg.rate = 0.5;
    msg.volume = 1.0;
    window.speechSynthesis.speak(msg);
}
// Adding style for footer 
// let copyr = document.getElementById("copyright");
// copyr.style.fontSize = "25px";
// copyr.style.position = "absolute";
// copyr.style.bottom = "5px";
// copyr.style.right = "40%";

// let link = document.getElementById("lin");
// link.style.textDecoration = "none";
let copyr = document.getElementById("copyright");
let link = document.getElementById("lin");

// Basic styling (applied once)
copyr.style.fontSize = "25px";
copyr.style.position = "absolute";
copyr.style.bottom = "5px";
link.style.textDecoration = "none";

// Function to apply responsive styles
function adjustFooter() {
    const width = window.innerWidth;

    if (width <= 480) {  // Mobile screens
        copyr.style.fontSize = "14px";
        copyr.style.right = "10%";
        copyr.style.textAlign = "center";
        copyr.style.left = "10%";  // Optional: center horizontally
    } 
    else if (width <= 768) { // Tablet screens
        copyr.style.fontSize = "18px";
        copyr.style.right = "20%";
        copyr.style.left = "";
    } 
    else {  // Desktop screens
        copyr.style.fontSize = "25px";
        copyr.style.right = "40%";
        copyr.style.left = "";
    }
}

// Run on page load
adjustFooter();
window.addEventListener("resize", adjustFooter);



