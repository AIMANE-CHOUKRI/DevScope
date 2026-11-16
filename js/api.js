export async function getUser(user){
    // const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const response = await fetch(`https://api.github.com/users/${user}`);
    if (!response.ok) throw new Error("Erreur User " + response.status);
    return await response.json();
}

export async function getRepos(user){
    const response = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`);
    if (!response.ok) throw new Error("Erreur Repo " + response.status);
    return await response.json();
}

// export async function getRepos()

// export async function getUser(id){
//     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//     if (!response.ok) throw new Error("Erreur " + response.status);
//     return response.json();
// }