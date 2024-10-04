const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () =>{
    container.classList.remove("sign-up-mode");
});

var modal = document.getElementById("password-reset-modal");

var btn = document.getElementById("forgot-password-link");

btn.onclick = function() {
  modal.style.display = "block";
}
