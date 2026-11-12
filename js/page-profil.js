import { getUser } from "./api.js";
import { inputUser } from "./page-recherche.js";
// const users=inputUser.value;
const main = document.querySelector("#mainUser");
const avatar = document.querySelector("#avatar");
const login = document.querySelector("#login");
const name = document.querySelector("#name");
const bio = document.querySelector("#bio");
const location = document.querySelector("#location");
const created_at = document.querySelector("#created_at");
const public_repos = document.querySelector("#public_repos");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");

const infoUser = new URLSearchParams(window.location.search).get("username");
const donneesUser = await getUser(infoUser);

console.log(donneesRepo);

inputUser.value = infoUser;

// console.log(donneesUser);

// console.log(donneesUser.id, donneesUser.name, donneesUser.public_repos);

function showUser(){
    avatar.setAttribute("src",donneesUser.avatar_url);
    name.textContent = donneesUser.name;
    login.textContent = `@${donneesUser.login}`;
    bio.textContent = `"${donneesUser.bio}"`;
    location.textContent = donneesUser.location;
    created_at.textContent = `Membre depuis ${donneesUser.created_at}`;
    public_repos.textContent = donneesUser.public_repos;
    followers.textContent = donneesUser.followers;
    following.textContent = donneesUser.following;
}
showUser();

// import { getUser } from "./api.js";
// const user = getUser("AIMANE-CHOUKRI");
// console.log(user);