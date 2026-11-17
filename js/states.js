export function messageErreur(error){
    if (!error.status) return "Connexion impossible. Vérifiez votre connexion internet.";
    if (error.status === 404) return "Aucun développeur trouvé. Vérifiez le nom d'utilisateur et réessayez.";
    if (error.status === 403 || error.status === 429) return "Limite de requêtes GitHub atteinte. Réessayez dans quelques minutes.";
    return "Le serveur a un problème (erreur " + error.status + "). Réessayez plus tard.";
}

    }
}
