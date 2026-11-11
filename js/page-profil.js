import { getUser } from "./api.js";
import { inputUser } from "./page-recherche.js";
// const users=inputUser.value;

const info = new URLSearchParams(window.location.search).get("username");
inputUser.value = info;
console.log(getUser(info));

// import { getUser } from "./api.js";
// const user = getUser("AIMANE-CHOUKRI");
// console.log(user);