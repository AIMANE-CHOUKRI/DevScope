import { getCandidats, modifierCandidat, supprimerCandidat } from "./api.js";
import { afficherChargement, afficherErreur, afficherVide } from "./states.js";

const etat = document.querySelector("#etat");
const compteur = document.querySelector("#compteur");
const listeCandidats = document.querySelector("#listeCandidats");
const champRecherche = document.querySelector("#rechercheCandidat");
const choixTri = document.querySelector("#choixTri");
const boutonsFiltre = document.querySelectorAll(".btnFiltre");
const msgAction = document.querySelector("#msgAction");

const modal = document.querySelector("#modalModif");
const formModif = document.querySelector("#formModif");
const modalNom = document.querySelector("#modalNom");
const modalStatut = document.querySelector("#modalStatut");
const modalNote = document.querySelector("#modalNote");
const modalCommentaire = document.querySelector("#modalCommentaire");
const erreurModal = document.querySelector("#erreurModal");
const btnEnregistrer = document.querySelector("#btnEnregistrer");

let candidats = [];
let statutActif = "Tous";
let candidatModifie = null;


function creerCarte(candidat) {
    const carte = document.createElement("article");
    carte.className = "flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-gradient-to-b from-indigo-700 to-blue-600 border-2 border-white rounded-lg p-3";

    const gauche = document.createElement("div");
    gauche.className = "flex items-center gap-3";
    const avatar = document.createElement("img");
    avatar.src = candidat.avatar_url;
    avatar.alt = `Avatar de ${candidat.login}`;
    avatar.className = "h-16 w-16 border-2 border-white rounded-full";
    const infos = document.createElement("div");
    const nom = document.createElement("h2");
    nom.className = "text-xl font-semibold";
    nom.textContent = candidat.name || candidat.login;
    const ligneLogin = document.createElement("p");
    ligneLogin.textContent = `@${candidat.login} `;
    const langage = document.createElement("span");
    langage.className = "bg-blue-950 rounded-lg px-2 text-sm";
    langage.textContent = candidat.language || "Non précisé";
    ligneLogin.append(langage);
    const note = document.createElement("p");
    note.className = "italic text-gray-200";
    note.textContent = candidat.note || "Aucune note.";
    const dateAjout = document.createElement("p");
    dateAjout.className = "text-sm text-gray-200";
    dateAjout.textContent = `Ajouté le ${new Date(candidat.createdAt).toLocaleDateString("fr-FR")}`;
    infos.append(nom, ligneLogin, note, dateAjout);
    gauche.append(avatar, infos);

    const droite = document.createElement("div");
    droite.className = "flex flex-wrap items-center gap-3";
    const rating = candidat.rating || 0;
    const etoiles = document.createElement("p");
    etoiles.className = "text-xl text-yellow-300";
    etoiles.textContent = "★".repeat(rating) + "☆".repeat(5 - rating);
    const statut = document.createElement("span");
    statut.className = "bg-blue-950 rounded-lg p-2 text-xs";
    statut.textContent = candidat.status;
    const btnModifier = document.createElement("button");
    btnModifier.className = "bg-blue-950 hover:outline text-white p-2 rounded-lg";
    btnModifier.textContent = "Modifier";
    btnModifier.addEventListener("click", () => ouvrirModal(candidat));
    const btnSupprimer = document.createElement("button");
    btnSupprimer.className = "bg-blue-950 hover:outline text-red-300 p-2 rounded-lg";
    btnSupprimer.textContent = "Supprimer";
    btnSupprimer.addEventListener("click", () => supprimer(candidat, btnSupprimer));
    droite.append(etoiles, statut, btnModifier, btnSupprimer);

    carte.append(gauche, droite);
    return carte;
}

function afficher() {
    compteur.textContent = `${candidats.length} candidat(s) dans votre shortlist`;
    listeCandidats.replaceChildren();
    etat.textContent = "";

    if (candidats.length === 0) {
        afficherVide(etat, "Votre shortlist est vide. Analysez un développeur pour l'ajouter.", "index.html", "Lancer une recherche");
        return;
    }

    const texte = champRecherche.value.trim().toLowerCase();
    const trouves = candidats.filter(c =>
        (statutActif === "Tous" || c.status === statutActif) &&
        ((c.name || "").toLowerCase().includes(texte) || c.login.toLowerCase().includes(texte))
    );

    if (trouves.length === 0) {
        etat.textContent = "Aucun candidat ne correspond à votre recherche.";
        return;
    }
    trier(trouves).forEach(c => listeCandidats.append(creerCarte(c)));
}
function ouvrirModal(candidat) {
    candidatModifie = candidat;
    modalNom.textContent = candidat.name || candidat.login;
    modalStatut.value = candidat.status;
    modalNote.value = candidat.rating || 3;
    modalCommentaire.value = candidat.note || "";
    erreurModal.textContent = "";
    modal.showModal();
}

formModif.addEventListener("submit", async (e) => {
    e.preventDefault();
    erreurModal.textContent = "";
    btnEnregistrer.disabled = true;
    btnEnregistrer.textContent = "Enregistrement…";
    try {
        const misAJour = await modifierCandidat(candidatModifie.id, {
            ...candidatModifie,
            status: modalStatut.value,
            rating: Number(modalNote.value),
            note: modalCommentaire.value.trim()
        });
        candidats = candidats.map(c => c.id === misAJour.id ? misAJour : c);
        modal.close();
        afficher();
    } catch (error) {
        console.log(error);
        erreurModal.textContent = "L'enregistrement a échoué. Réessayez.";
    }
    btnEnregistrer.disabled = false;
    btnEnregistrer.textContent = "✓ Enregistrer";
});

document.querySelector("#btnAnnuler").addEventListener("click", () => modal.close());

