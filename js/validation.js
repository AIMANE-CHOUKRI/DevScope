export const regexUser = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

export function validerUsername(username){
    const user = username.trim();
    if (!regexUser.test(user)){
        return false;
    }
    return true;
}