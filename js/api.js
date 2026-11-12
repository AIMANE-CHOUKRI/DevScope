export async function getUser(user){
    // const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const response = await fetch(`https://api.github.com/users/${user}`);
    if (!response.ok) throw new Error("Erreur " + response.status);
    return await response.json();
}

// export async function getRepos()

// export async function getUser(id){
//     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//     if (!response.ok) throw new Error("Erreur " + response.status);
//     return response.json();
// }