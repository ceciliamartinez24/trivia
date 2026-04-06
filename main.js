let preguntasTodas = []
let categoriaSelec
let nivelSelec 

fetch("trivia.json")
.then(response => response.json())
.then(data => {
    categorias = data.categorias
    mostrarCategorias()
})
.catch(error=> {
    document.getElementById("error").textContent = "Error"
})

function mostrarCategorias (){

    const contenedorCat = document.getElementById("categorias")
    contenedorCat.innerHTML = ""

    categorias.forEach(cat => {
        const boton = document.createElement("button")
        boton.textContent = cat.nombre

        boton.addEventListener("click",() => {
        categoriaSelec = cat 
        mostrarNiveles()
    })
    contenedorCat.appendChild(boton)
    })
    document.getElementById("dificultad").style.display = "block"
}

function mostrarNiveles(){
    const contenedorDific = document.getElementById("btnNiveles")
    contenedorDific.innerHTML = ""

    const niveles = ["facil","medio","dificil"]
    
    niveles.forEach(nivel=> {
        const boton = document.createElement("button")
        boton.textContent = nivel

        boton.addEventListener("click",() => {
            nivelSelec = nivel
            iniciarJuego()
        })
        contenedorDific.appendChild(boton)
    })
}

function iniciarJuego (){
    document.getElementById("inicio").style.display = "none"
    document.getElementById("juego").style.display = "block"

    const preguntas = categoriaSelec.preguntas

    const preguntasMezcladas = preguntas.sort(()=> Math.random() -0.5)
    const preguntasJuego = preguntasMezcladas.slice(0,5)
console.log(preguntasJuego)
}

