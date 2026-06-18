const saveBtn = document.getElementById("saveBtn");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notesContainer = document.getElementById("notesContainer");

// Load notes safely
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// DISPLAY NOTE (clean + correct)
function displayNote(noteData, index) {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <h3>${noteData.title}</h3>
        <p>${noteData.content}</p>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
    `;

    const deleteBtn = note.querySelector(".deleteBtn");
    const editBtn = note.querySelector(".editBtn");

    // DELETE
    deleteBtn.addEventListener("click", function () {
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        renderNotes();
    });

    // EDIT
    editBtn.addEventListener("click", function () {
        titleInput.value = noteData.title;
        contentInput.value = noteData.content;

        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        renderNotes();
    });

    notesContainer.appendChild(note);
}

// RENDER ALL NOTES
function renderNotes() {
    notesContainer.innerHTML = "";
    notes.forEach((note, index) => {
        displayNote(note, index);
    });
}

// Load saved notes on start
renderNotes();

// SAVE NEW NOTE
saveBtn.addEventListener("click", function () {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title === "" || content === "") {
        alert("Please fill in both fields.");
        return;
    }

    const noteData = {
        title: title,
        content: content
    };

    notes.push(noteData);
    localStorage.setItem("notes", JSON.stringify(notes));

    renderNotes();

    titleInput.value = "";
    contentInput.value = "";
});