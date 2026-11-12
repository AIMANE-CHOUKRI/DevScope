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

const info = new URLSearchParams(window.location.search).get("username");
const donnees = await getUser(info);

inputUser.value = info;

// console.log(donnees);

// console.log(donnees.id, donnees.name, donnees.public_repos);

function showUser(){
    avatar.setAttribute("src",donnees.avatar_url);
    login.textContent = donnees.login;
    name.textContent = donnees.name;
    bio.textContent = donnees.bio;
    location.textContent = donnees.location;
    created_at.textContent = donnees.created_at;
    public_repos.textContent = donnees.public_repos;
    followers.textContent = donnees.followers;
    following.textContent = donnees.following;
}
showUser();

// import { getUser } from "./api.js";
// const user = getUser("AIMANE-CHOUKRI");
// console.log(user);