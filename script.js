"use strict";

const links = document.querySelectorAll(`.link`);
const btnUnderlines = document.querySelectorAll(`.underline`);
const projectImgs = [...document.querySelectorAll(".project-img")];
const projectSection = document.querySelector(".projects");
const body = document.querySelector("body");
const blur = document.querySelector(".blur-div");

const linkUnderline = function (link) {
  link.addEventListener("mouseover", function () {
    this.nextElementSibling.classList.add("underline-active");
  });

  link.addEventListener("mouseleave", function () {
    this.nextElementSibling.classList.remove("underline-active");
  });
};

links.forEach((link) => linkUnderline(link));

projectImgs.forEach((img) => {
  img.addEventListener("click", function (e) {
    body.style.overflow = "hidden";
    // document.querySelector("project-popup").remove();
    const title =
      e.target.parentElement.parentElement.querySelector(
        ".project-title"
      ).innerText;
    const html = `
      
      <div class="project-popup">
      <div class="popup">
      <button class="close-btn">
      <ion-icon
      name="close-circle-outline"
      class="close-icon"
      size="small"
      ></ion-icon>
      </button>
      <h3 class="popup-title">${title}</h3>
      <div class="project-img--container popup-img--container">
      <img src="${e.target.getAttribute(
        "src"
      )}" alt="${title}" class="project-img popup-img" />
        </div>
        <p class="popup-description">
        ${e.target.dataset.description}
        </p>
        <div class="button-div popup-link">
        <a href="${e.target.dataset.link}" class="link">Check It Out</a>
        <div class="underline underline-div"></div>
        </div>
        </div>
        </div>
        
        `;
    projectSection.insertAdjacentHTML("beforeend", html);
    blur.classList.add("blur");

    const popup = document.querySelector(".project-popup");
    const link = popup.querySelector(".link");
    linkUnderline(link);
    const popupSlide = function () {
      popup.classList.add("project-popup--active");
    };
    const deletePopup = function () {
      body.style.overflow = "visible";
      blur.classList.remove("blur");
      popup.remove();
    };
    blur.addEventListener("click", deletePopup);

    const closeBtn = document.querySelector(".close-btn");
    closeBtn.addEventListener("click", function () {
      popup.classList.remove("project-popup--active");
      setTimeout(deletePopup, 100);
    });

    setTimeout(popupSlide, 100);
  });
});

const dropdownBtn = document.querySelector(".dropdown-btn");
const closeDropdown = document.querySelector(".close-btn--dropdown");
const dropdown = document.querySelector(".dropdown");
const dropdownLinks = [...document.querySelectorAll(".nav-link--dropdown")];
const nav = document.querySelector(".nav");

dropdownBtn.addEventListener("click", function () {
  dropdown.classList.add("dropdown-active");
  body.style.overflow = "hidden";
});
closeDropdown.addEventListener("click", function () {
  dropdown.classList.remove("dropdown-active");
  body.style.overflow = "visible";
});
dropdownLinks.forEach((link) =>
  link.addEventListener("click", function () {
    dropdown.classList.remove("dropdown-active");
    body.style.overflow = "visible";
  })
);

let prevScroll = 0;
document.addEventListener("scroll", function (e) {
  const currScroll = window.scrollY;
  if (currScroll > prevScroll) {
    prevScroll = currScroll;
    nav.classList.add("nav--hide");
  } else {
    prevScroll = currScroll;
    nav.classList.remove("nav--hide");
  }
});
