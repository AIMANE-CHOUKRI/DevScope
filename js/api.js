async function request(url, methode = "GET", donnees = null){
    const options = { method: methode };
    if (donnees){
        options.headers = { "Content-Type": "application/json" };
        options.body = JSON.stringify(donnees);
    }
    const response = await fetch(url, options);
    if (!response.ok){
        const error = new Error("Erreur " + response.status);
        error.status = response.status;
        throw error;
    }
    return await response.json();
}

export async function getUser(user){
    return await request(`https://api.github.com/users/${user}`);
}

export async function getRepos(user){
    return await request(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`);
}

// export async function getRepos()

// export async function getUser(id){
//     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//     if (!response.ok) throw new Error("Erreur " + response.status);
//     return response.json();
// }