firebase.initializeApp({
apiKey: "AIzaSyCbKnxwr6v_uZqKG7Y7Ndw1fJcOEpODec8",
authDomain: "seguimiento-css.firebaseapp.com",
databaseURL: "https://seguimiento-css.firebaseio.com",
projectId: "seguimiento-css",
storageBucket: "seguimiento-css.appspot.com",
messagingSenderId: "543702754642",
appId: "1:543702754642:web:c29f516065d314f79c468b",
measurementId: "G-77WGYZG30X",
});

var db = firebase.firestore();

// Script Index

var datos = document.getElementById('datos'); 
var btn = document.getElementById('button').addEventListener('click', datosShow);


function datosShow() {
    var seg = document.getElementById('seg').value;
    console.log(seg);

    db.collection("seguimiento").where('guia_id', '==', seg).onSnapshot((querySnapshot) => {
        datos.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            
            if (doc.data().status == 'Pedido Recibido') {
                datos.innerHTML += `
                <div class="card mt-5">
                    <h5 class="card-header bg-dark text-light">Numero de guía: ${doc.data().guia_id}</h5>
                    <div class="card-body">
                    <h5 class="card-title text-left font-weight-bold">${doc.data().name}</h5>
                    <div class="row">
                        <div class="col-sm-6">
                                <p class="card-text">Entrega en: ${doc.data().punto_de_entrega}</p>
                        </div>
                        <div class="col-sm-6">
                                <p class="text-right mb-2">Bultos: ${doc.data().bultos}</p>
                        </div>
                    </div>
                            <p class="status badge badge-danger p-3">Pedido Recibido</p>
                    </div>
                </div>
                `
            }else if (doc.data().status == 'Pedido Despachado') {
                datos.innerHTML += `
                <div class="card mt-5">
                    <h5 class="card-header bg-dark text-light">Numero de guía: ${doc.data().guia_id}</h5>
                    <div class="card-body">
                        <h5 class="card-title text-left font-weight-bold">${doc.data().name}</h5>
                        <div class="row">
                            <div class="col-sm-6">
                                    <p class="card-text">Entrega en: ${doc.data().punto_de_entrega}</p>
                            </div>
                            <div class="col-sm-6">
                                    <p class="text-right mb-2">Bultos: ${doc.data().bultos}</p>
                            </div>
                        </div>
                            <p class="status badge badge-primary p-3">Pedido Despachado  </p>
                    </div>
                </div>
                `
            }else if (doc.data().status == 'En Viaje') {
                datos.innerHTML += `
                <div class="card mt-5 ">
                    <h5 class="card-header bg-dark text-light">Numero de guía: ${doc.data().guia_id}</h5>
                    <div class="card-body">
                    <h5 class="card-title text-left font-weight-bold">${doc.data().name}</h5>
                    <div class="row">
                        <div class="col-sm-6">
                                <p class="card-text">Entrega en: ${doc.data().punto_de_entrega}</p>
                        </div>
                        <div class="col-sm-6">
                                <p class="text-right mb-2">Bultos: ${doc.data().bultos}</p>
                        </div>
                    </div>
                            
                            <p class="status badge badge-info p-3">En Viaje</p>
                    </div>
                </div>
                `
            }else if (doc.data().status == 'En Agencia') {
                datos.innerHTML += `
                <div class="card mt-5 ">
                    <h5 class="card-header bg-dark text-light">Numero de guía: ${doc.data().guia_id}</h5>
                    <div class="card-body">
                        <h5 class="card-title text-left font-weight-bold">${doc.data().name}</h5>
                        <div class="row">
                            <div class="col-sm-6">
                                    <p class="card-text">Entrega en: ${doc.data().punto_de_entrega}</p>
                            </div>
                            <div class="col-sm-6">
                                    <p class="text-right mb-2">Bultos: ${doc.data().bultos}</p>
                            </div>
                        </div>
                            <p class="card-text">Guia Via Cargo: ${doc.data().via}</p>
                            <p class="status badge badge-warning p-3">En Agencia</p>
                    </div>
                </div>
                `
            }else if (doc.data().status == 'Entregado') {
                datos.innerHTML += `
                <div class="card mt-5">
                    <h5 class="card-header bg-dark text-light">Numero de guía: ${doc.data().guia_id}</h5>
                    <div class="card-body">
                    <h5 class="card-title text-left font-weight-bold">${doc.data().name}</h5>
                    <div class="row">
                        <div class="col-sm-6">
                                <p class="card-text">Entrega en: ${doc.data().punto_de_entrega}</p>
                        </div>
                        <div class="col-sm-6">
                                <p class="text-right mb-2">Bultos: ${doc.data().bultos}</p>
                        </div>
                    </div>
                            <p class="status badge badge-success p-3">Entregado</p>
                    </div>
                </div>
                `
            }
            
        });
    });
};

// Script Add
var last = document.getElementById('last');
db.collection("seguimiento").orderBy("guia_id", "desc").limit(1).onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        last.innerHTML = `<span class="last mb-3 ml-3">Ultima Guia Agregada: ${doc.data().guia_id}</span>`;
    });
});


function guardar() {
    var nombre = document.getElementById('nombre').value;
    var punto_de_entrega = document.getElementById('punto_de_entrega').value;
    var bultos = document.getElementById('bultos').value;
    var select = document.getElementById('select').value;
    var via = document.getElementById('via').value;
    var guia = document.getElementById('guia').value;
    
   
    db.collection("seguimiento").add({
        name: nombre,
        punto_de_entrega: punto_de_entrega,
        bultos: bultos,
        status: select,
        via: via,
        guia_id: guia,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombre').value = '';
        document.getElementById('punto_de_entrega').value = '';
        document.getElementById('status').value = '';
        document.getElementById('via').value = '';
        document.getElementById('bultos').value = '';
        document.getElementById('guia').value = '';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
};

var data = document.getElementById('data'); 

function todos() {
    db.collection("seguimiento").onSnapshot((querySnapshot) => {
        data.innerHTML = '';
        querySnapshot.forEach((doc) => {        
            if (doc.data().status == 'Pedido Recibido') {
                data.innerHTML += `

                <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                    <div class="card">
                        <div class="card-header">
                        <h3 id="name">${doc.data().name}</h3>
                        </div>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><span id="guia">${doc.data().guia_id}</span></li>
                        <li class="list-group-item"><span class="font-weight-bold"> Bultos:</span> <span id="bultos">${doc.data().bultos}</span></li>
                        <li class="list-group-item"> <span class="font-weight-bold"> Punto de Entrega:</span> <span id="puntoDeEntrega">${doc.data().punto_de_entrega}</span></li>
                        <li class="list-group-item" id="guiaVia">${doc.data().via}</li>
                        <li class="badge badge-danger p-3" id="status">Pedido Recibido <button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></li>
                        </ul>
                    </div>
                </div> 
                `
            }else if (doc.data().status == 'Pedido Despachado') {
                data.innerHTML += `
                <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                    <div class="card">
                        <div class="card-header">
                        <h3 id="name">${doc.data().name}</h3>
                        </div>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><span id="guia">${doc.data().guia_id}</span></li>
                        <li class="list-group-item"><span class="font-weight-bold"> Bultos:</span> <span id="bultos">${doc.data().bultos}</span></li>
                        <li class="list-group-item"> <span class="font-weight-bold"> Punto de Entrega:</span> <span id="puntoDeEntrega">${doc.data().punto_de_entrega}</span></li>
                        <li class="list-group-item" id="guiaVia">${doc.data().via}</li>
                        <li class="badge badge-primary p-3" id="status">Pedido Despachado <button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></li>
                        </ul>
                    </div>
                </div>
                
                `
            }else if (doc.data().status == 'En Viaje') {
                data.innerHTML += `
                <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                    <div class="card">
                        <div class="card-header">
                        <h3 id="name">${doc.data().name}</h3>
                        </div>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item" id="guiaEdit"><span id="guia">${doc.data().guia_id}</span></li>
                        <li class="list-group-item"><span class="font-weight-bold"> Bultos:</span> <span id="bultos">${doc.data().bultos}</span></li>
                        <li class="list-group-item"> <span class="font-weight-bold"> Punto de Entrega:</span> <span id="puntoDeEntrega">${doc.data().punto_de_entrega}</span></li>
                        <li class="list-group-item" id="guiaVia">${doc.data().via}</li>
                        <li class="badge badge-info p-3" id="status">En Viaje <button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></li>
                        </ul>
                    </div>
                </div>
            
                `
            }else if (doc.data().status == 'En Agencia') {
                data.innerHTML += `
                <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                    <div class="card">
                        <div class="card-header">
                        <h3 id="name">${doc.data().name}</h3>
                        </div>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><span id="guia">${doc.data().guia_id}</span></li>
                        <li class="list-group-item"><span class="font-weight-bold"> Bultos:</span> <span id="bultos">${doc.data().bultos}</span></li>
                        <li class="list-group-item"> <span class="font-weight-bold"> Punto de Entrega:</span> <span id="puntoDeEntrega">${doc.data().punto_de_entrega}</span></li>
                        <li class="list-group-item" id="guiaVia">${doc.data().via}</li>
                        <li class="badge badge-warning p-3" id="status">En Agencia <button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></li>
                        </ul>
                    </div>
                </div>
            
                `
            }else if (doc.data().status == 'Entregado') {
                data.innerHTML += `
                <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                    <div class="card">
                        <div class="card-header">
                        <h3 id="name">${doc.data().name}</h3>
                        </div>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><span id="guiaid">${doc.data().guia_id}</span></li>
                        <li class="list-group-item"><span class="font-weight-bold"> Bultos:</span> <span id="bultos">${doc.data().bultos}</span></li>
                        <li class="list-group-item"> <span class="font-weight-bold"> Punto de Entrega:</span> <span id="puntoDeEntrega">${doc.data().punto_de_entrega}</span></li>
                        <li class="list-group-item" id="guiaVia">${doc.data().via}</li>
                        <li class="badge badge-success p-3" id="status">Entregado <button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></li>
                        </ul>
                    </div>
                </div>
            
                `
            }
            
        });
    });
};

todos();

function eliminar(id){
    db.collection("seguimiento").doc(id).delete().then(function() {
        console.log("Usuario Eliminado");
    }).catch(function(error) {
        console.error("Se ha Producido un error: ", error);
    });
};

function editar(id, name, bultos, via, punto_de_entrega, guia_id, status){
    document.getElementById('guia').value = guia_id;    
    document.getElementById('nombre').value = name;
    document.getElementById('punto_de_entrega').value = punto_de_entrega;
    document.getElementById('select').value = status;
    document.getElementById('via').value = via;
    document.getElementById('bultos').value = bultos;


    var boton = document.getElementById('info');
    boton.innerHTML = 'Editar';

    boton.onclick = () => {

        var nombre = document.getElementById('nombre').value;
        var punto_de_entrega = document.getElementById('punto_de_entrega').value;
        var bultos = document.getElementById('bultos').value;
        var select = document.getElementById('select').value;
        var via = document.getElementById('via').value;
        var guia = document.getElementById('guia').value;

        return db.collection("seguimiento").doc(id).update({
            name: nombre,
            punto_de_entrega: punto_de_entrega,
            bultos: bultos,
            status: select,
            via: via,
            guia_id: guia,
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Guardar';
            document.getElementById('nombre').value = '';
            document.getElementById('punto_de_entrega').value = '';
            document.getElementById('select').value = 'Pedido Recibido';
            document.getElementById('via').value = '';
            document.getElementById('bultos').value = '';
            document.getElementById('guia').value = '';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
}

//botones filtrar
var _recibido = document.getElementById('recibido').addEventListener('click', recibidoBuscar);
var _despachado = document.getElementById('despachado').addEventListener('click', despachadoBuscar);
var _viaje = document.getElementById('viaje').addEventListener('click', viajeBuscar);
var _agencia = document.getElementById('agencia').addEventListener('click', agenciaBuscar);
var _entregado = document.getElementById('entregado').addEventListener('click', entregadoBuscar);
var _todos = document.getElementById('todos').addEventListener('click', todos);

function recibidoBuscar() {
    db.collection("seguimiento").where('status', '==', 'Pedido Recibido').onSnapshot((querySnapshot) => {
        data.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            data.innerHTML += `
            <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                <div class="card">
                    <div class="card-header">
                      <h3 id="name">${doc.data().name}</h3>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item"><span id="guia">${doc.data().guia_id}</span></li>
                      <li class="list-group-item"><span class="font-weight-bold"> Bultos:</span> <span id="bultos">${doc.data().bultos}</span></li>
                      <li class="list-group-item"> <span class="font-weight-bold"> Punto de Entrega:</span> <span id="puntoDeEntrega">${doc.data().punto_de_entrega}</span></li>
                      <li class="list-group-item" id="guiaVia">${doc.data().via}</li>
                      <li class="badge badge-danger p-3" id="status">Pedido Recibido <button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></li>
                    </ul>
                </div>
            </div> 
            `
        });
    });
};
function despachadoBuscar() {
    db.collection("seguimiento").where('status', '==', 'Pedido Despachado').onSnapshot((querySnapshot) => {
        data.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            data.innerHTML += `
            <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                <div class="card">
                    <div class="card-header">
                    <h3 id="name">${doc.data().name}</h3>
                    </div>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item"><span id="guia">${doc.data().guia_id}</span></li>
                    <li class="list-group-item"><span class="font-weight-bold"> Bultos:</span> <span id="bultos">${doc.data().bultos}</span></li>
                    <li class="list-group-item"> <span class="font-weight-bold"> Punto de Entrega:</span> <span id="puntoDeEntrega">${doc.data().punto_de_entrega}</span></li>
                    <li class="list-group-item" id="guiaVia">${doc.data().via}</li>
                    <li class="badge badge-primary p-3" id="status">Pedido Despachado <button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></li>
                    </ul>
                </div>
            </div>
            `
        });
    });
};
function viajeBuscar() {
    db.collection("seguimiento").where('status', '==', 'En Viaje').onSnapshot((querySnapshot) => {
        data.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            data.innerHTML += `
            <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                <div class="card">
                    <div class="card-header">
                    <h3 id="name">${doc.data().name}</h3>
                    </div>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item" id="guiaEdit"><span id="guia">${doc.data().guia_id}</span></li>
                    <li class="list-group-item"><span class="font-weight-bold"> Bultos:</span> <span id="bultos">${doc.data().bultos}</span></li>
                    <li class="list-group-item"> <span class="font-weight-bold"> Punto de Entrega:</span> <span id="puntoDeEntrega">${doc.data().punto_de_entrega}</span></li>
                    <li class="list-group-item" id="guiaVia">${doc.data().via}</li>
                    <li class="badge badge-info p-3" id="status">En Viaje <button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></li>
                    </ul>
                </div>
            </div>
            `
        });
    });
};
function agenciaBuscar() {
    db.collection("seguimiento").where('status', '==', 'En Agencia').onSnapshot((querySnapshot) => {
        data.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            data.innerHTML += `
            <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                <div class="card">
                    <div class="card-header">
                    <h3 id="name">${doc.data().name}</h3>
                    </div>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item"><span id="guia">${doc.data().guia_id}</span></li>
                    <li class="list-group-item"><span class="font-weight-bold"> Bultos:</span> <span id="bultos">${doc.data().bultos}</span></li>
                    <li class="list-group-item"> <span class="font-weight-bold"> Punto de Entrega:</span> <span id="puntoDeEntrega">${doc.data().punto_de_entrega}</span></li>
                    <li class="list-group-item" id="guiaVia">${doc.data().via}</li>
                    <li class="badge badge-warning p-3" id="status">En Agencia <button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></li>
                    </ul>
                </div>
            </div>
            `
        });
    });
};
function entregadoBuscar() {
    db.collection("seguimiento").where('status', '==', 'Entregado').onSnapshot((querySnapshot) => {
        data.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            data.innerHTML += `
            <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                <div class="card">
                    <div class="card-header">
                    <h3 id="name">${doc.data().name}</h3>
                    </div>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item"><span id="guiaid">${doc.data().guia_id}</span></li>
                    <li class="list-group-item"><span class="font-weight-bold"> Bultos:</span> <span id="bultos">${doc.data().bultos}</span></li>
                    <li class="list-group-item"> <span class="font-weight-bold"> Punto de Entrega:</span> <span id="puntoDeEntrega">${doc.data().punto_de_entrega}</span></li>
                    <li class="list-group-item" id="guiaVia">${doc.data().via}</li>
                    <li class="badge badge-success p-3" id="status">Entregado <button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></li>
                    </ul>
                </div>
            </div>
            `
        });
    });
};



