const cardContainer = document.querySelector(".card-container");
const logout = document.querySelector(".logout");
const createNoteButton = document.querySelector(".new-note");


// const apiUrl = "http://localhost:8043";
const apiUrl = "https://murmuring-headland-76254.herokuapp.com";


const token = localStorage.getItem("jwt");

logout.addEventListener("click", () => {
  localStorage.removeItem("jwt");
  location.href = "/";
});

let cardData = [];

createNoteButton.addEventListener("click", () => {
  location.href = "/pages/createNotes/createNotes.html";
});

const createNotes = (array) => {
  cardContainer.innerHTML = "";

  array.forEach((cardObj) => {
    const { heading, content } = cardObj;
    const id = cardObj.noteId;

    const card = document.createElement("div");
    card.classList.add("card");
    card.id = id;

    // const insideHtml = `<div class="card-header"><div class="card-heading">${heading}</div><div class="del-note"><img src="../../assets/delte.jpeg" alt="" /></div><a href="../updateNotes/updateNotes.html?noteId=${id}"><div class="edit-note"><img src="../../assets/edit-note.svg" alt="" /></div></a></div><div class="card-content">${content}</div>`;
    
    const insideHtml = `<div class="card-header"><div class="card-heading">${heading}</div><a href="../deletenote/deleteNote.html?noteId=${id}"><div class="del-note"><img src="../../assets/delte.jpeg" alt="" /></div></a><a href="../updateNotes/updateNotes.html?noteId=${id}"><div class="edit-note"><img src="../../assets/edit-note.svg" alt="" /></div></a></div><div class="card-content">${content}</div>`;
    // const insideHtml = `<div class="card-header"><div class="card-heading">${heading}</div>
    // <a href="../deletenote/deleteNote.html?noteId=${id}"><div class="edit-note"><img src="../../assets/edit-note.svg" alt="" /></div></a>
    // </div><div class="card-content">${content}</div>`;

    card.innerHTML = insideHtml;

    cardContainer.appendChild(card);
  });
};

const body = document.querySelector("body");
window.addEventListener("load", () => {
  body.classList.add("visible");

  if (token) {
    fetch(`${apiUrl}/notes/getallnotes`, {
      method: "GET",
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        cardData = data.data;
        createNotes(data.data);
      })
      .catch((err) => {
        alert("Error Fetching data");
        console.log(err);
      });
  }
});

  // location.href = "/pages/createNotes/createNotes.html";