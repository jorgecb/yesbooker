export function HaderAccess() {
    const user = JSON.parse(localStorage.getItem('usuarios') || '{}');

    if (user && user.token) {
    return{ 'Authorization': 'token ' + user.token };
    } else {
        return {};
    }

}

  
