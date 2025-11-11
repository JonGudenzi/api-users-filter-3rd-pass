const input = document.getElementById("input");
const list = document.getElementById("list");
const errorMsg = document.getElementById("errorMsg");
const clearBtn = document.getElementById("clearBtn");
const resultsMsg = document.getElementById("resultsMsg");

let allUsers = [];

function fetchUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      allUsers = data;
      const renderStorage = localStorage.getItem("searchTerm");
      if (renderStorage !== null) {
        input.value = renderStorage;
        filterUsers();
      } else {
        renderUsers(allUsers);
      }
      errorMsg.textContent = "";
    })
    .catch(function () {
      errorMsg.textContent = "Unable to connect to server";
    });
}

// ------------------- Helpers --------------
function createUserItem(person) {
  const li = document.createElement("li");
  li.textContent = `${person.name} | `;
  const email = document.createElement("a");
  email.href = `mailto:${person.email}`;
  email.textContent = person.email;
  li.appendChild(email);
  const company = document.createTextNode(` - ${person.company.name}`);
  li.appendChild(company);
  moreInfoButton(li, person);
  return li;
}

function moreInfoButton(li, person) {
  const btn = document.createElement("button");
  btn.textContent = "More info";
  li.appendChild(btn);
  btn.addEventListener("click", function () {
    const info = li.querySelector(".extra-info");
    if (!info) {
      moreInfoContent(li, person);
      btn.textContent = "X";
    } else {
      info.remove();
      btn.textContent = "More info";
    }
  });
}

function moreInfoContent(li, person) {
  const p = document.createElement("p");
  p.classList.add("extra-info");
  p.textContent = `Phone: ${person.phone}\nWebsite: ${person.website}\n${person.company.catchPhrase}`;
  li.appendChild(p);
}

// --------------------- Control functions ----------------
function renderUsers(usersArray) {
  list.innerHTML = "";
  if (usersArray.length === 1) {
    resultsMsg.textContent = usersArray.length + " user found";
  } else {
    resultsMsg.textContent = usersArray.length + " users found";
  }
  usersArray.forEach(function (person) {
    const li = createUserItem(person);
    list.appendChild(li);
  });
}

function filterUsers() {
  const term = input.value.toLowerCase().trim();
  const filtered = allUsers.filter(function (person) {
    return (
      person.name.toLowerCase().includes(term) ||
      person.email.toLowerCase().includes(term) ||
      person.company.name.toLowerCase().includes(term)
    );
  });
  renderUsers(filtered);
}

// -------------------Listeners and calls ----------------------

input.addEventListener("input", filterUsers);

clearBtn.addEventListener("click", function () {
  input.value = "";
  errorMsg.textContent = "";
  localStorage.removeItem("searchTerm");
  renderUsers(allUsers);
});

fetchUsers();
