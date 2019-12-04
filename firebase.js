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
                            <p class="card-text font-weight-bold">Guia Via Cargo: En instantes le informaremos el numero de guia Via Cargo</p>
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
                            <p class="card-text font-weight-bold">Guia Via Cargo: En instantes le informaremos el numero de guia Via Cargo</p>
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
                            <p class="card-text font-weight-bold">Guia Via Cargo: ${doc.data().via}</p>
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
                            <p class="card-text font-weight-bold">Guia Via Cargo: ${doc.data().via}</p>
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
    var producto = document.getElementById('producto').value;
    var fecha_compra = document.getElementById('fecha_compra').value;
    var venta = document.getElementById('selectvta').value;

    db.collection("seguimiento").add({
        name: nombre,
        punto_de_entrega: punto_de_entrega,
        bultos: bultos,
        status: select,
        via: via,
        guia_id: guia,
        producto: producto,
        fechacompra: fecha_compra,
        venta: venta
    })
    .then(function(docRef) {
        document.getElementById('nombre').value = '';
        document.getElementById('punto_de_entrega').value = '';
        document.getElementById('status').value = '';
        document.getElementById('via').value = '';
        document.getElementById('bultos').value = '';
        document.getElementById('guia').value = '';
        document.getElementById('producto').value = '';
        document.getElementById('fecha_compra').value = '';
        document.getElementById('selectvta').value = '';

    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
};

var data = document.getElementById('data'); 

function todos() {
    db.collection("seguimiento").orderBy("guia_id", "desc").onSnapshot((querySnapshot) => {
        data.innerHTML = '';
        querySnapshot.forEach((doc) => {    
            let pre = `
            <tr>
                <th scope="row">${doc.data().guia_id}</th>
                <td>${doc.data().fechacompra}</td>
                <td>${doc.data().venta}</td>
                <td class="font-weight-bold">${doc.data().name}</td>
                <td>${doc.data().producto}</td>
                <td>${doc.data().bultos}</td>
                <td>${doc.data().punto_de_entrega}</td>
                <td>${doc.data().via}</td>
                `   
            if (doc.data().status == 'Pedido Recibido') {
                data.innerHTML += `
                        ${pre}
                        <td class="bg-danger text-light">Pedido Recibido</td>
                        <td><button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}','${doc.data().producto}','${doc.data().fechacompra}','${doc.data().venta}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></td>
                    </tr>
                `
            }else if (doc.data().status == 'Pedido Despachado') {
                data.innerHTML += `
                        ${pre}
                        <td class="bg-primary text-light">Pedido Despachado</td>
                        <td><button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}','${doc.data().producto}','${doc.data().fechacompra}','${doc.data().venta}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></td>
                    </tr>
                `
            }else if (doc.data().status == 'En Viaje') {
                data.innerHTML += `
                        ${pre}
                        <td class="bg-info text-light">En Viaje</td>
                        <td><button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}','${doc.data().producto}','${doc.data().fechacompra}','${doc.data().venta}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></td>
                    </tr>
            
                `
            }else if (doc.data().status == 'En Agencia') {
                data.innerHTML += `
                        ${pre}
                        <td class="bg-warning text-light">En Agencia</td>
                        <td><button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}','${doc.data().producto}','${doc.data().fechacompra}','${doc.data().venta}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></td>
                    </tr>
            
                `
            }else if (doc.data().status == 'Entregado') {
                data.innerHTML += `
                        ${pre}  
                        <td class="bg-success text-light">Entregado</td>
                        <td><button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}','${doc.data().producto}','${doc.data().fechacompra}','${doc.data().venta}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></td>
                    </tr>
            
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

function editar(id, name, bultos, via, punto_de_entrega, guia_id, status, producto, fechacompra, venta){

    document.getElementById('guia').value = guia_id;    
    document.getElementById('nombre').value = name;
    document.getElementById('punto_de_entrega').value = punto_de_entrega;
    document.getElementById('select').value = status;
    document.getElementById('via').value = via;
    document.getElementById('bultos').value = bultos;
    document.getElementById('producto').value = producto;
    document.getElementById('fecha_compra').value = fechacompra;
    document.getElementById('selectvta').value = venta;

    var boton = document.getElementById('info');
    boton.innerHTML = 'Editar';

    boton.onclick = () => {

        var nombre = document.getElementById('nombre').value;
        var punto_de_entrega = document.getElementById('punto_de_entrega').value;
        var bultos = document.getElementById('bultos').value;
        var select = document.getElementById('select').value;
        var via = document.getElementById('via').value;
        var guia = document.getElementById('guia').value;
        var producto = document.getElementById('producto').value;
        var fecha_compra = document.getElementById('fecha_compra').value;
        var venta = document.getElementById('selectvta').value;


        return db.collection("seguimiento").doc(id).update({
            name: nombre,
            punto_de_entrega: punto_de_entrega,
            bultos: bultos,
            status: select,
            via: via,
            guia_id: guia,
            producto: producto,
            fechacompra: fecha_compra,
            venta: venta
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
            document.getElementById('producto').value = '';
            document.getElementById('fecha_compra').value = '';
            document.getElementById('selectvta').value = '';
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
    db.collection("seguimiento").where('status', '==', 'Pedido Recibido').orderBy("guia_id", "desc").onSnapshot((querySnapshot) => {
        data.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            data.innerHTML += `
            <tr>
                <th scope="row">${doc.data().guia_id}</th>
                <td>${doc.data().fechacompra}</td>
                <td>${doc.data().venta}</td>
                <td class="font-weight-bold">${doc.data().name}</td>
                <td>${doc.data().producto}</td>
                <td>${doc.data().bultos}</td>
                <td>${doc.data().punto_de_entrega}</td>
                <td>${doc.data().via}</td>
                <td class="bg-danger text-light">Pedido Recibido</td>
                <td><button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}','${doc.data().producto}','${doc.data().fechacompra}','${doc.data().venta}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></td>
            </tr>
            `
        });
    });
};
function despachadoBuscar() {
    db.collection("seguimiento").where('status', '==', 'Pedido Despachado').orderBy("guia_id", "desc").onSnapshot((querySnapshot) => {
        data.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            data.innerHTML += `
            <tr>
                <th scope="row">${doc.data().guia_id}</th>
                <td>${doc.data().fechacompra}</td>
                <td>${doc.data().venta}</td>
                <td class="font-weight-bold">${doc.data().name}</td>
                <td>${doc.data().producto}</td>
                <td>${doc.data().bultos}</td>
                <td>${doc.data().punto_de_entrega}</td>
                <td>${doc.data().via}</td>
                <td class="bg-primary text-light">Pedido Despachado</td>
                <td><button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}','${doc.data().producto}','${doc.data().fechacompra}','${doc.data().venta}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></td>
            </tr>
            `
        });
    });
};
function viajeBuscar() {
    db.collection("seguimiento").where('status', '==', 'En Viaje').orderBy("guia_id", "desc").onSnapshot((querySnapshot) => {
        data.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            data.innerHTML += `
            <tr>
                <th scope="row">${doc.data().guia_id}</th>
                <td>${doc.data().fechacompra}</td>
                <td>${doc.data().venta}</td>
                <td class="font-weight-bold">${doc.data().name}</td>
                <td>${doc.data().producto}</td>
                <td>${doc.data().bultos}</td>
                <td>${doc.data().punto_de_entrega}</td>
                <td>${doc.data().via}</td>
                <td class="bg-info text-light">En Viaje</td>
                <td><button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}','${doc.data().producto}','${doc.data().fechacompra}','${doc.data().venta}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></td>
            </tr>
            `
        });
    });
};
function agenciaBuscar() {
    db.collection("seguimiento").where('status', '==', 'En Agencia').orderBy("guia_id", "desc").onSnapshot((querySnapshot) => {
        data.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            data.innerHTML += `
            <tr>
                <th scope="row">${doc.data().guia_id}</th>
                <td>${doc.data().fechacompra}</td>
                <td>${doc.data().venta}</td>
                <td class="font-weight-bold">${doc.data().name}</td>
                <td>${doc.data().producto}</td>
                <td>${doc.data().bultos}</td>
                <td>${doc.data().punto_de_entrega}</td>
                <td>${doc.data().via}</td>
                <td class="bg-warning text-light">En Agencia</td>
                <td><button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}','${doc.data().producto}','${doc.data().fechacompra}','${doc.data().venta}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></td>
            </tr>
            `
        });
    });
};
function entregadoBuscar() {
    db.collection("seguimiento").where('status', '==', 'Entregado').orderBy("guia_id", "desc").onSnapshot((querySnapshot) => {
        data.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            data.innerHTML += `
            <tr>
                <th scope="row">${doc.data().guia_id}</th>
                <td>${doc.data().fechacompra}</td>
                <td>${doc.data().venta}</td>
                <td class="font-weight-bold">${doc.data().name}</td>
                <td>${doc.data().producto}</td>
                <td>${doc.data().bultos}</td>
                <td>${doc.data().punto_de_entrega}</td>
                <td>${doc.data().via}</td>
                <td class="bg-success text-light">Entregado</td>
                <td><button class="float-right but" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().bultos}','${doc.data().via}','${doc.data().punto_de_entrega}','${doc.data().guia_id}','${doc.data().status}','${doc.data().producto}','${doc.data().fechacompra}','${doc.data().venta}')"><i class="fas fa-edit icon"></i></button><button class="float-right but" onclick="eliminar('${doc.id}')"><i class="fas fa-trash icon"></i></button></td>
            </tr>
            `
        });
    });
};



