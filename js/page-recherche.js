
export const inputUser = document.querySelector("#username");
export const btnRecherche = document.querySelector("#btnRecherche");
export let msgError = document.querySelector("#error");

let valueUser = "";

export const regexUser = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

export function validerUsername(username){
    const user = username.trim();
    if (user.length < 1 || user.length > 39 || !regexUser.test(user)){
        return false;
    }
    return true;
}

btnRecherche.addEventListener('click',()=>{
    valueUser = inputUser.value.trim();
    if(!valueUser){
        msgError.textContent = "Saisissez quelque chose";
    } else {
        msgError.textContent = "";
        if(!validerUsername(valueUser)){
            msgError.textContent = "Nom d'utilisateur invalide (1-39 caractères, sans tiret au début ni à la fin.)";
        };
    }
})

