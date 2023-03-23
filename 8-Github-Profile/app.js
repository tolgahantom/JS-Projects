const APIURL = "https://api.github.com/users/";
const searhInput = document.querySelector(".search-input");
const container = document.querySelector(".container");

showPersonUI = (person) => {
  let infoCardEl = `
    <div class="info-card">
        <div class="person-img">
            <img
            src="${person.avatar_url}"
            />
        </div>
        <div class="person-detail">
            <div class="name">${person.name}</div>
            <div class="job">${person.type}</div>
           
            <div class="icons">
            <div class="view icon">
                <div class="icon-nums">${person.followers}</div>
                <p>Followers</p>
            </div>
            <div class="heart icon">
                <div class="icon-nums">${person.following}</div>
                <p>Following</p>
            </div>
            <div class="message icon">
                <div class="icon-nums">${person.public_repos}</div>
                <p>Repos</p>
            </div>
            </div>
        </div>
    </div>
  `;
  container.innerHTML += infoCardEl;
};

getPerson = async (nickname) => {
  let data = await (await fetch(APIURL + nickname)).json();
  if (data.message) {
    alert("Person not found");
    return;
  } else {
    showPersonUI(data);
  }
};

searhInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    if (searhInput.value == "") {
      alert("You must write nickname");
      return;
    }
    getPerson(searhInput.value);
    searhInput.value = "";
    e.preventDefault();
  }
});
