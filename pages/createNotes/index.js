const createNoteButton = document.querySelector(".create-note-button");

// const apiUrl = "http://localhost:8043";
const apiUrl = "https://murmuring-headland-76254.herokuapp.com";


const token = localStorage.getItem("jwt");

createNoteButton.addEventListener("click", () => {
  const content = document.querySelector(".create-note-input").value;
  const heading = document.querySelector(".create-note-heading").value;
  

  if (token) {
    fetch(`${apiUrl}/notes/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ content, heading }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.message);
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