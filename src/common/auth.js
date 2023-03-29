const logout = () => {
    localStorage.removeItem("aimeId");
    console.log("Logged out");
}

const isLoggedIn = () => {
    return localStorage.getItem("aimeId") !== null;
}

const getAimeId = () => {
    return localStorage.getItem("aimeId");
}

export default {
    logout,
    isLoggedIn,
    getAimeId,
}