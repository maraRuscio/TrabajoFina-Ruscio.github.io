//mi vector de jugadores
let misJugadores = [];
// mi clase jugadores con los datos que van a tener los elementos
class Jugador{
    constructor (id, nombre, apellido, goles, valInicial, valArquero, valCompas){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.goles = goles;
        this.valInicial = valInicial;
        this.valArquero = valArquero;
        this.valCompas = valCompas;
    }
}
//Cargo los jugadores de mi Json en el array de jugadores o del local storage
if(localStorage.getItem("misJugadores")){
    misJugadores = JSON.parse(localStorage.getItem("misJugadores"));
   } else{
        const listadoJugadores = "../JSon/jugadores.json" //guardo la dire de donde esta mi archivo"
        fetch(listadoJugadores)
            .then(respuesta => respuesta.json())
            .then(datos => {
                datos.forEach( jugador => {
                    const jugador1 = new Jugador (`${jugador.id}`,`${jugador.nombre}`,`${jugador.apellido}`, `${jugador.goles}`,`${jugador.valInicial}`,`${jugador.valArquero}`,`${jugador.valCompas}`);
                    misJugadores.push(jugador1);
                })
                 // localStorage.setItem("misJugadores", JSON.stringify(misJugadores));
                localStorage.setItem("misJugadores", JSON.stringify(misJugadores));
                mostrarjugador();
                mostrargoleadores();
                mostrartopten();
            })
            .catch(error => Swal.fire({
                title: "Tuvimos un error en la recuperacion del equipo",
                icon: error,
            }))
    };
  

  
let valorar = (plantel) => {
    plantel.valCompas> 0 ? plantel.valCompas = plantel.valCompas :  plantel.valCompas =plantel.valInicial;
};
//Muestro los jugadores de la lista
const mostrarjugador = () =>{
    const jugadores = document.getElementById("jugadores");
    jugadores.innerHTML = ``;
    let tabla =`<table class="table table-dark table-striped">
                <thead>
                    <tr id="tablajug">
                        <th class="fs-4" colspan="6">Los jugadores para el partido:</th>
                    </tr>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col" class="text-center">goles</th>
                        <th scope="col" class="text-center"># Rank</th>
                        <th scope="col" class="text-center"> Jugas? </th>
                        <th scope="col"class="text-center">En que equipo? </th>
                    </tr>
                </thead>`;
    misJugadores.forEach(plantel =>{
        valorar (plantel);
        tabla +=`<tr>
                    <td>${plantel.nombre}</td>    
                    <td>${plantel.apellido}</td>
                    <td class="text-center">${plantel.goles}</td>
                    <td class="text-center">${plantel.valCompas}</td>
                    <td class="text-center"><input type="checkbox" id="check${plantel.id}"></input></td>
                    <td class="text-center" id="rad${plantel.id}"></p></td>
                </tr>`;
    })
    tabla += `</table>`;
    jugadores.innerHTML = tabla;
//boton de chequear si juega el partido
misJugadores.forEach(plantel =>{    
const check = document.getElementById(`check${plantel.id}`);
    check.addEventListener(`click`, () => {
        if (check.checked) {
            const rad = document.getElementById(`rad${plantel.id}`);
            rad.innerHTML = `
        <input type="radio" name="${plantel.id}" id="r1${plantel.id}">1</input>
        <input type="radio" name="${plantel.id}" id="r2${plantel.id}">2</input>
        `;
        } else {
            const rad = document.getElementById(`rad${plantel.id}`);
            rad.innerHTML = ``;
        }
    });
})
    };
//cargo los goleadores 
const goleadores =document.getElementById("goleadores")
let plantelgol;
const ordJugadoresGol =() =>{
    plantelgol = [...misJugadores];
    plantelgol.sort(function(a,b){
        if (parseInt(b.goles) > parseInt(a.goles)) {
            return 1;
          }
          if (parseInt(b.goles) < parseInt(a.goles)) {
            return -1;
          }
          return 0;
        });
}

const mostrargoleadores =()=>{
    ordJugadoresGol();
    goleadores.innerHTML=``;
    let tabla = `<table class="table table-sm table-dark table-striped">
                    <thead>
                        <tr id="tablagol"><th class="fs-4" colspan="4">Los Goleadores</th>
                        </tr>
                        <tr>
                            <th class="text-center" scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col" class="text-center">goles</th>
                        </tr>
                    </thead>`;
    let rank = 1;
    plantelgol.forEach(plantel=>{
        if(plantel.goles>0 && rank<6){
            tabla += `
            <tr>
                <th class="text-center" scope="row">${rank}</th>
                <td>${plantel.nombre}</td>
                <td>${plantel.apellido}</td>
                <td class="text-center">${plantel.goles}</td>
            <tr>`;
            rank++;
        }
    });
    tabla += `</table>`;
    goleadores.innerHTML = tabla;
};



//los 10 mejores rankeados

const top10 = document.getElementById("top10");
let ranktopten;
const ordJugadoresRank =() =>{
ranktopten =[...misJugadores];
ranktopten.sort(function(a,b){
    if (parseInt(b.valCompas) > parseInt(a.valCompas)) {
        return 1;
      }
      if (parseInt(b.valCompas) < parseInt(a.valCompas)) {
        return -1;
      }
      return 0;
    });
};
    const mostrartopten =()=>{
        ordJugadoresRank();
        top10.innerHTML=``;
        let tabla = `<table class="table table-sm table-dark table-striped">
                    <thead>
                        <tr id="tabla10"><th class="fs-4" colspan="4">El top 10:</th>
                        </tr>
                        <tr>
                            <th scope="col" class="text-center">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col" class="text-center" >Rank</th>
                        </tr>
                    </thead>`

        let rank = 1;
        ranktopten.forEach(plantel=>{
            if(rank<11){
                tabla += `
            <tr>
                <td class="text-center">${rank}</td>
                <td>${plantel.nombre}</td>
                <td>${plantel.apellido}</td>
                <td class="text-center">${plantel.valCompas}</td>
            <tr>`;
            rank++;
            }
        });
        tabla += `</table>`
        top10.innerHTML = tabla;
    };


//funcion para cargar un jugador nuevo
function cargarjugador(nombre, apellido, valInicial){
    valInicial>10? valInicial=10 :valInicial = valInicial;
    const jugador1 = new Jugador (misJugadores.length+2, nombre, apellido, 0, valInicial,0,0);
    misJugadores.push(jugador1)
    localStorage.setItem("misJugadores", JSON.stringify(misJugadores));
    mostrarjugador();
    mostrartopten();
    mostrargoleadores();
}        

// funcionalidad boton cargar jugadores
const sumarJugador = document.getElementById("sumarJugador");
sumarJugador.addEventListener(`click`, () => {
    Swal.fire({
        title: 'Sumate al equipo!',
        html:
            '<input id="swal-nombre" class="swal2-input" placeholder="carga tu nombre"> <input id="swal-apellido" class="swal2-input" placeholder= "carga tu apellido"> <input id="swal-valI" class="swal2-input" placeholder= "del 1 al 10, que puntuación te darías?">',
        confirmButtonText:"Aceptar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if(result.isConfirmed){
            cargarjugador(document.getElementById(`swal-nombre`).value,document.getElementById(`swal-apellido`).value,parseInt(document.getElementById(`swal-valI`).value));
            Swal.fire({
                title: "ya sos parte del equipo",
                icon: "success",
                confirmButtonText:"Aceptar",
            })
        }
    })
});

//funcion para armar un equipo al azar
    const seArmo =document.getElementById("seArmo");
    seArmo.addEventListener(`click`, ()=>{
        Swal.fire({
            title: "Proximamente te ayudaremos a armar equipos mas parejos",
        })
    })

//armo array del partido
let partido = [];
const elPartido = () =>{
    partido= [];
    misJugadores.forEach( plantel =>{
    if( document.getElementById(`check${plantel.id}`).checked){
        partido.push(plantel);
       }
    });
 }
 const elFin = document.getElementById(`elFin`);
 elFin.addEventListener(`click`,() =>{
    elPartido();
    let valor = ``;
    partido.forEach(plantel =>{
        valor += `
            <p>${plantel.nombre}, ${plantel.apellido} <input type="text" id="cantGoles${plantel.id}" placeholder="cantidad de goles"></input> <input type="text" id="valoracionPares${plantel.id}" placeholder="como estuvo del 1 al 10"></input></P>  
            `;
        });

    Swal.fire({
        title: 'Se termino el partido a cargar las estadisticas!',
        html:
            `${valor}`,
        confirmButtonText:"Aceptar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
    }).then(result =>{
        if(result.isConfirmed){
            partido.forEach(plantel1 =>{
                actualizarValCompas( `${plantel1.id}`, parseInt(document.getElementById(`valoracionPares${plantel1.id}`).value) );
                sumaGoles(`${plantel1.id}`, parseInt(document.getElementById(`cantGoles${plantel1.id}`).value));
                });
                localStorage.setItem("misJugadores", JSON.stringify(misJugadores));
                mostrarjugador();
                mostrargoleadores();
                mostrartopten();
                Swal.fire({
                    title: "Gracias por actualizar las estadistica",
                    icon: "success",
                    confirmButtonText:"Aceptar",
                })
        }
    })   
});

//funcion para pormedir las valoraciones 
const sumaGoles =  (id, goles)=>{
    goles>0  ? goles = goles : goles=0;
   misJugadores.forEach(plantel =>{
    if(plantel.id == id){
        plantel.goles =parseInt(plantel.goles) + goles;
    }
   })    
};
const actualizarValCompas = (indice, val) =>{
    val>10? val=10 :val = val;
    val>0? val=val : val=0;
    misJugadores.forEach(plantel =>{
        if(plantel.id == indice && val!=0 ){
            plantel.valCompas = (parseInt(plantel.valCompas) + val) / 2;
            };
    })   
};
mostrarjugador();
mostrartopten();
mostrargoleadores();
