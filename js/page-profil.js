import { getUser, getRepos, getCandidats, ajouterCandidat } from "./api.js";
import { inputUser } from "./page-recherche.js";
import { validerUsername } from "./validation.js";
import { messageErreur, afficherChargement, afficherErreur } from "./states.js";

// const users=inputUser.value;
const main = document.querySelector("#mainUser");
const etat = document.querySelector("#etat");
const sectionUser = document.querySelector("#section-user");
const avatar = document.querySelector("#avatar");
const login = document.querySelector("#login");
const name = document.querySelector("#name");
const bio = document.querySelector("#bio");
const location = document.querySelector("#location");
const created_at = document.querySelector("#created_at");
const public_repos = document.querySelector("#public_repos");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const btnProfil = document.querySelector("#btnProfil");
const spanRepos = document.querySelector("#spanRepos");
const nbRepos = document.querySelector("#nbRepos");
const btnAjout = document.querySelector("#btnAjout");
const msgShortlist = document.querySelector("#msgShortlist");

const infoUser = new URLSearchParams(window.location.search).get("username");
let donneesUser;
let donneesRepo;
// import { depos } from "./dépos.js";
// console.log(depos);
// console.log(donneesRepo);

inputUser.value = infoUser;

// console.log(donneesUser);

// console.log(donneesUser.id, donneesUser.name, donneesUser.public_repos);

function showUser() {
    avatar.setAttribute("src", donneesUser.avatar_url);
    avatar.setAttribute("alt", `Avatar de ${donneesUser.login}`);
    name.textContent = donneesUser.name || donneesUser.login;
    login.textContent = `@${donneesUser.login}`;
    bio.textContent = donneesUser.bio || "Aucune bio.";
    location.textContent = donneesUser.location || "Lieu non renseigné";
    const dateInscription = new Date(donneesUser.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
    created_at.textContent = `Membre depuis ${dateInscription}`;
    public_repos.textContent = donneesUser.public_repos;
    followers.textContent = donneesUser.followers;
    following.textContent = donneesUser.following;
    // btnProfil.setAttribute("href", `https://github.com/${donneesUser.login}`);
    btnProfil.addEventListener("click",()=>{
        window.open(`https://github.com/${donneesUser.login}`,"_blank","noopener,noreferrer");
    })
}

// function showRepos() {
//     donneesRepo.forEach(repo => {
//         spanRepos.insertAdjacentHTML("beforeend", `
//                 <article>
//                     <h2 id="repoName">${repo.name}</h2>
//                     <p id="description">${repo.description}</p>
//                     <span>
//                         <p id="language">${repo.language}</p>
//                         <p id="stargazers_count">${repo.stargazers_count}</p>
//                         <p id="forks_counts">${repo.forks_count}</p>
//                     </span>
//                     <p id="updated_at">${repo.updated_at}</p>
//                 </article>
//             `);
//         // spanRepos.appendChild(carts);
//     });
//     // for (let i = 0; i < donneesRepo.length; i++){
//     // const carts = document.createElement("div");
//     // carts.className = "grid grid-cols-1 md:grid-cols-2 gap-4"
//     // depos.forEach(repo => {
//     //     const carte = document.createElement("div");
//     //     carte.className = `bg-slate-800/20 border border-gray-800 rounded-xl p-4 hover:border-cyan-500/50 transition duration-300`;
//     //     const titrerepos = document.createElement("p");
//     //     titrerepos.className = "text-white font-bold text-lg mb-3";
//     //     titrerepos.innerHTML = `<i class="fa-regular fa-square text-cyan-500"></i> ${repo.name}`;
//     //     const description = document.createElement("p");
//     //     description.className = "text-gray-400 text-sm mb-4";
//     //     description.textContent = repo.description || "Aucune description.";
//     //     const tichnolge = document.createElement("div");
//     //     tichnolge.className = "flex items-center gap-4 mb-3";
//     //     const nomtichno = document.createElement("p");
//     //     nomtichno.className = "text-gray-300 text-sm";
//     //     nomtichno.innerHTML = ` <i class="fa-solid fa-circle text-xs"></i> ${repo.language || "Non précisé"} `;
//     //     const iconstichno1 = document.createElement("p");
//     //     iconstichno1.className = "text-yellow-400 text-sm";
//     //     iconstichno1.innerHTML = `<i class="fa-solid fa-star text-xs"></i> ${repo.stargazers_count} `;
//     //     const iconstichno2 = document.createElement("p");
//     //     iconstichno2.className = "text-cyan-400 text-sm";
//     //     iconstichno2.innerHTML = `<i class="fa-solid fa-code-fork text-xs"></i> ${repo.forks_count}`;
//     //     tichnolge.append(nomtichno, iconstichno1, iconstichno2);
//     //     const datemisrepos = document.createElement("p");
//     //     datemisrepos.className = "text-gray-500 text-xs font-medium";
//     //     const dates = new Date(repo.updated_at);
//     //     const today = new Date();
//     //     const difference = today - dates;
//     //     const jours = Math.floor(difference / (1000 * 60 * 60 * 24));
//     //     datemisrepos.textContent = `Mis à jour il y a ${jours} jours`;
//     //     carte.append(titrerepos, description, tichnolge, datemisrepos);
//     //     carts.append(carte);

//     // depos.insertAdjacentHTML("beforeend", `
//     //         <article>
//     //             <h2 id="repoName">${repo.name}</h2>
//     //             <p id="description">${repo.description}</p>
//     //             <span>
//     //                 <p id="language">${repo.language}</p>
//     //                 <p id="stargazers_count">${repo.stargazers_count}</p>
//     //                 <p id="forks_counts">${repo.forks_counts}</p>
//     //             </span>
//     //             <p id="updated_at">${repo.updated_at}</p>
//     //         </article>
//     //     `);
//     console.log("error")
//         // spanRepos.appendChild(carts);
// };

function afficherepos(liste) {
    const carts = document.createElement("div");
    carts.className = "grid grid-cols-1 md:grid-cols-2 gap-4";
    liste.forEach(repo => {
        const carte = document.createElement("div");
        carte.className = "bg-gradient-to-b from-indigo-700 to-blue-600 border-2 border-white rounded-lg p-4 hover:from-indigo-600 hover:to-blue-500";
        const titrerepos = document.createElement("p");
        titrerepos.className = "text-white font-bold text-lg mb-3";
        const iconeRepo = document.createElement("i");
        iconeRepo.className = "fa-regular fa-square text-cyan-200";
        titrerepos.append(iconeRepo, ` ${repo.name}`);
        const description = document.createElement("p");
        description.className = "text-gray-200 text-sm mb-4";
        description.textContent = repo.description || "Aucune description.";
        const tichnolge = document.createElement("div");
        tichnolge.className = "flex items-center gap-4 mb-3";
        const nomtichno = document.createElement("p");
        nomtichno.className = "text-white text-sm";
        const iconeLangage = document.createElement("i");
        iconeLangage.className = "fa-solid fa-circle text-xs";
        nomtichno.append(iconeLangage, ` ${repo.language || "Non précisé"}`);
        const iconstichno1 = document.createElement("p");
        iconstichno1.className = "text-yellow-400 text-sm";
        const iconeEtoile = document.createElement("i");
        iconeEtoile.className = "fa-solid fa-star text-xs";
        iconstichno1.append(iconeEtoile, ` ${repo.stargazers_count}`);
        const iconstichno2 = document.createElement("p");
        iconstichno2.className = "text-cyan-200 text-sm";
        const iconeFork = document.createElement("i");
        iconeFork.className = "fa-solid fa-code-fork text-xs";
        iconstichno2.append(iconeFork, ` ${repo.forks_count}`);
        tichnolge.append(nomtichno, iconstichno1, iconstichno2);
        const datemisrepos = document.createElement("p");
        datemisrepos.className = "text-gray-200 text-xs font-medium";
        const dates = new Date(repo.updated_at);
        const today = new Date();
        const difference = today - dates;
        const jours = Math.floor(difference / (1000 * 60 * 60 * 24));
        datemisrepos.textContent = `Mis à jour il y a ${jours} jours`;
        carte.append(titrerepos,description,tichnolge,datemisrepos);
        carts.append(carte);
    });
    return carts;
}

// Shortlist
function langagePrincipal() {
    const compte = {};
    donneesRepo.forEach(repo => {
        if (repo.language) compte[repo.language] = (compte[repo.language] || 0) + 1;
    });
    let langage = "Non précisé";
    let max = 0;
    for (const nom in compte) {
        if (compte[nom] > max) {
            max = compte[nom];
            langage = nom;
        }
    }
    return langage;
}

function dejaDansShortlist(candidats) {
    return candidats.some(c => c.login.toLowerCase() === donneesUser.login.toLowerCase());
}

async function verifierShortlist() {
    try {
        const candidats = await getCandidats();
        if (dejaDansShortlist(candidats)) {
            btnAjout.disabled = true;
            btnAjout.textContent = "✓ Déjà dans la shortlist";
        }
    } catch (error) {
        console.log(error);
    }
}

// Filtre

const boutonsLangage = document.querySelectorAll("#main-repos button");
const inputRecherche = document.querySelector("#inputRecherche");
const msgDepot = document.querySelector("#msgDepot");

let langageChoisi = "Tous";
boutonsLangage[0].classList.add("outline"); 

function filtrerRepo(){
    const texte = inputRecherche.value.trim().toLowerCase();
    return donneesRepo.filter(repo => {
        const bonLangage = langageChoisi === "Tous" || repo.language === langageChoisi;
        const bonNom = repo.name.toLowerCase().includes(texte);
        return bonLangage && bonNom;
    });
}

function mettreAJourRepos(){
    const liste = filtrerdRepo();
    spanRepos.textContent = "";
    msgDepot.textContent = "";
    nbRepos.textContent = liste.length;
    if (liste.length === 0){
        msgDepot.textContent = "Aucun dépôt ne correspond à votre recherche.";
    } else {
        spanRepos.append(afficherepos(liste));
    }
}

boutonsLangage.forEach(bouton => {
    bouton.addEventListener("click", () => {
        langageChoisi = bouton.textContent.trim();
        boutonsLangage.forEach(b => b.classList.remove("outline")); 
        bouton.classList.add("outline");                           
        mettreAJourRepos();
    });
});

inputRecherche.addEventListener("input", mettreAJourRepos);

btnAjout.addEventListener("click", async () => {
    msgShortlist.textContent = "";
    btnAjout.disabled = true;
    btnAjout.textContent = "Ajout en cours…";
    try {
        const candidats = await getCandidats();
        if (dejaDansShortlist(candidats)) {
            btnAjout.textContent = "✓ Déjà dans la shortlist";
            return;
        }
        await ajouterCandidat({
            login: donneesUser.login,
            name: donneesUser.name || donneesUser.login,
            avatar_url: donneesUser.avatar_url,
            html_url: donneesUser.html_url,
            language: langagePrincipal(),
            status: "À contacter",
            note: "",
            rating: 3,
            createdAt: new Date().toISOString()
        });
        btnAjout.textContent = "✓ Ajouté à la shortlist";
    } catch (error) {
        console.log(error);
        btnAjout.disabled = false;
        btnAjout.textContent = "☆ Ajouter à la shortlist";
        msgShortlist.textContent = error.status ? "L'ajout a échoué. Vérifiez l'adresse MockAPI dans js/config.js." : "Connexion impossible. Réessayez.";
    }
});

// Chargement de la page
async function chargerProfil() {
    sectionUser.classList.add("hidden");
    afficherChargement(etat);
    try {
        donneesUser = await getUser(infoUser);
        donneesRepo = await getRepos(infoUser);
        etat.textContent = "";
        showUser();
        nbRepos.textContent = donneesRepo.length;
        if (donneesRepo.length === 0) {
            spanRepos.textContent = "Ce développeur n'a aucun dépôt public.";
        } else {
            mettreAJourRepos();
        }
        sectionUser.classList.remove("hidden");
        verifierShortlist();
    } catch (error) {
        console.log(error);
        afficherErreur(etat, messageErreur(error), error.status === 404 ? null : chargerProfil);
    }
}

if (!infoUser || !validerUsername(infoUser)) {
    afficherErreur(etat, "Nom d'utilisateur invalide ou manquant. Lancez une nouvelle recherche.");
} else {
    chargerProfil();
}

// import { getUser } from "./api.js";
// const user = getUser("AIMANE-CHOUKRI");
// console.log(user);