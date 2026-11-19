export function messageErreur(error){
    if (!error.status) return "Connexion impossible. Vérifiez votre connexion internet.";
    if (error.status === 404) return "Aucun développeur trouvé. Vérifiez le nom d'utilisateur et réessayez.";
    if (error.status === 403 || error.status === 429) return "Limite de requêtes GitHub atteinte. Réessayez dans quelques minutes.";
    return "Le serveur a un problème (erreur " + error.status + "). Réessayez plus tard.";
}

export function afficherChargement(zone){
    zone.textContent = "Chargement…";
}

export function afficherErreur(zone, message, retry = null){
    zone.textContent = message;
    if (retry){
        const bouton = document.createElement("button");
        bouton.className = "bg-blue-950 text-white p-2 rounded-lg ml-3";
        bouton.textContent = "Réessayer";
        bouton.addEventListener("click", retry);
        zone.append(bouton);
    }
}

export function afficherVide(zone, message, lien = null, texteLien = ""){
    zone.textContent = message;
    if (lien){
        const a = document.createElement("a");
        a.href = lien;
        a.className = "bg-green-500 hover:bg-green-400 text-white p-2 rounded-lg ml-3";
        a.textContent = texteLien;
        zone.append(a);
    }
}
