// Modo color
const bColor = document.getElementById("bColor");

bColor.addEventListener("click", () => {
    document.body.classList.remove("river");
    document.body.classList.remove("boca");
    document.body.classList.remove("dark");
    document.body.classList.add("body");
    localStorage.setItem("modo", "body");
    }
);
//Modo BYN
const bByn = document.getElementById("bByn");

bByn.addEventListener("click", () => {
    document.body.classList.remove("river");
    document.body.classList.remove("boca");
    document.body.classList.remove("body");
    document.body.classList.add("dark");
    localStorage.setItem("modo", "dark");

}
);
//Modo Boca

const bBoca = document.getElementById("bBoca");

bBoca.addEventListener("click", () => {
    document.body.classList.remove("river");
    document.body.classList.remove("dark");
    document.body.classList.remove("body");
    document.body.classList.add("boca");
    localStorage.setItem("modo", "boca");

}
);

//Modo River
const bRiver = document.getElementById("bRiver");

bRiver.addEventListener("click", () => {
    document.body.classList.remove("boca");
    document.body.classList.remove("dark");
    document.body.classList.remove("body");
    document.body.classList.add("river");
    localStorage.setItem("modo", "river");
}
);

//Recuperamos el modo del localStorage: 
const modo = localStorage.getItem("modo");
if(modo === "dark") {
    document.body.classList.remove("body");
    document.body.classList.add("dark");       
}if(modo === "boca"){
    document.body.classList.remove("body");
    document.body.classList.add("boca");
} if(modo === "river"){
    document.body.classList.remove("body");
    document.body.classList.add("river");
}else {
    document.body.classList.add("body");

};