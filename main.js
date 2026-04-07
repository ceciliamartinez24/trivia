let preguntasTodas = []
let categoriaSelec
let nivelSelec 
let preguntasJuego = []
let indiceActual = 0
let correctas = 0
let incorrectas = 0
let noRespondidas = 0


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
        document.getElementById("inicio").style.display = "none"
        mostrarNiveles()
    })
    contenedorCat.appendChild(boton)
    })
}

function mostrarNiveles(){
    const contenedorDific = document.getElementById("btnNiveles")
    contenedorDific.innerHTML = ""

    const niveles = ["facil","medio","dificil"]
    
    niveles.forEach(nivel=> {
        const botonNiveles = document.createElement("button")
        botonNiveles.textContent = nivel

        botonNiveles.addEventListener("click",() => {
            nivelSelec = nivel
            iniciarJuego()
        })
        contenedorDific.appendChild(botonNiveles)
    })
    document.getElementById("dificultad").style.display = "block"
}

function iniciarJuego (){
    document.getElementById("dificultad").style.display = "none"
    document.getElementById("juego").style.display = "block"

    const preguntas = categoriaSelec.preguntas

    const preguntasMezcladas = preguntas.sort(()=> Math.random() -0.5)
    preguntasJuego = preguntasMezcladas.slice(0,5)
    indiceActual = 0
    mostrarPreguntas()
}

function mostrarPreguntas (){
    const preguntaActual = preguntasJuego[indiceActual]
    document.getElementById("pregunta").textContent = preguntaActual.pregunta
    
    const opciones = [
        preguntaActual.correcta,
        ...preguntaActual.incorrectas
    ]

    const opcionesMezcladas = opciones.sort(() => Math.random() -0.5)

    const contenedorOpc = document.getElementById("opciones")
        contenedorOpc.innerHTML = ""
    
    opcionesMezcladas.forEach(op=>{
        const botonOpciones = document.createElement("button")
        botonOpciones.textContent = op

        botonOpciones.addEventListener("click", ()=>{
            const esCorrecta = op === preguntaActual.correcta

            if (esCorrecta){
                alert("Correcto! =D")
                correctas++
            } else {
                alert("incorrecta =( ")
                incorrectas++
            }
        })
        contenedorOpc.appendChild(botonOpciones)
    })

    indiceActual++
    siguientePregunta()
}

function siguientePregunta() {

    if (indiceActual < preguntasJuego.length){
        mostrarPreguntas()
    } else {
        mostrarResultados()
    }
}

function mostrarResultados() {
    //document.getElementById("juego").style.display = "none"
    document.getElementById("resultados").style.display = "block"

    document.getElementById("correctas").textContent = "Correctas: " + correctas
    document.getElementById("incorrectas").textContent = "Incorrectas: " + incorrectas
    document.getElementById("noRespondidas").textContent = "No respondidas: " + noRespondidas

}