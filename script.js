

const input = document.getElementById("input");
const list = document.getElementById("list");
const errorMsg = document.getElementById("errorMsg");

let allUsers = [];

function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            allUsers = data;
            renderUsers(allUsers);
        })
        .catch(function () {
            errorMsg.textContent = "Unable to connect to server";
        })
}

// ------------- Helpers --------------
function createUserItem(person) {
    const li = document.createElement("li");
    li.textContent = `${person.name} | `;
    const email = document.createElement("a");
    email.href = `mailto:${person.email}`;
    email.textContent = person.email;
    li.appendChild(email);
    const company = document.createTextNode(` - ${person.company.name}`);
    li.appendChild(company);
    const btn = document.createElement("button");
    btn.textContent = "More info";
    li.appendChild(btn);
    btn.addEventListener("click", function () {
        const info = li.querySelector(".info-btn");
        if (!info) {
            const p = document.createElement("p");
            p.classList.add("info-btn");
            p.textContent = `${person.phone} | ${person.website}`;
            li.appendChild(p);
            btn.textContent = "X";
        } else {
            info.remove();
            btn.textContent = "More info";
        }
    })
    return li;
}
// ----------------- Control functions ----------------
function renderUsers(usersArray) {
    list.innerHTML = "";
    usersArray.forEach(function (person) {
        const li = createUserItem(person);
        list.appendChild(li);
    })
}

function filterUsers() {
    const term = input.value.toLowerCase().trim();
    const filtered = allUsers.filter(function (person) {
        return (person.name.toLowerCase().includes(term) ||
            person.email.toLowerCase().includes(term) ||
            person.company.name.toLowerCase().includes(term));
    })
    renderUsers(filtered);
}

// --------------Listeners and calls ----------------------

input.addEventListener("input", filterUsers);

fetchUsers();
