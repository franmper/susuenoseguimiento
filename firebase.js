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
                            <p class="card-text">Fecha de Entrega Estimada: ${doc.data().estimado}</p>
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
                            <p class="card-text">Fecha de Entrega Estimada: ${doc.data().estimado}</p>
                            <p class="status badge badge-primary p-3">Pedido Despachado</p>
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
                            <p class="card-text">Fecha de Entrega Estimada: ${doc.data().estimado}</p>
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
                            
                            <p class="card-text">Fecha de Entrega Estimada: ${doc.data().estimado}</p>
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
                            <p class="card-text">Fecha de Entrega Estimada: ${doc.data().estimado}</p>
                            <p class="status badge badge-success p-3">Entregado</p>
                    </div>
                </div>
                `
            }
            
        });
    });
};

