import { validerUsername } from "./validation.js";

export const inputUser = document.querySelector("#username");
export const btnRecherche = document.querySelector("#btnRecherche");
export let msgError = document.querySelector("#error");

export let username = "";

btnRecherche.addEventListener('click',(e)=>{
    e.preventDefault();
    username = inputUser.value.trim();
    if(!username){
        msgError.textContent = "Saisissez quelque chose";
        return;
    } else {
        msgError.textContent = "";
        if(!validerUsername(username)){
            msgError.textContent = "Nom d'utilisateur invalide (1-39 caractères, sans tiret au début ni à la fin.)";
            return;
        };
    };
    window.location.href = `profil.html?username=${encodeURIComponent(username)}`;
})

