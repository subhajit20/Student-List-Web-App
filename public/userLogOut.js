let logout = document.getElementById("logout");

logout.addEventListener("click", () => {
    let document = prompt("Do yount to log out");
    if (document === yes) {
        res.clearCookies("jwtToken")
    } else if (document === "no") {
        return false
    }
})