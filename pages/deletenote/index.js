const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("noteId");

// console.log(noteId);

const updateNoteButton = document.querySelector(".create-note-button");

// const apiUrl = "http://localhost:8043";
const apiUrl = "https://murmuring-headland-76254.herokuapp.com";


const token = localStorage.getItem("jwt");

updateNoteButton.addEventListener("click", () => {
  // const content = document.querySelector(".create-note-input").value;
  // const heading = document.querySelector(".create-note-heading").value;

  if (token) {
    fetch(`${apiUrl}/notes/delete/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      // body: JSON.stringify({ content, heading }),
    })
      .then((res) => res.json())
      .then((data) => {
        // if (data.message) {
          location.href = "/pages/dashboard/dashboard.html";
        // }
      })
      .catch((err) => {
        alert("Error Creating Note!! Re-try....");
        console.log(err);
      });
  }
});
