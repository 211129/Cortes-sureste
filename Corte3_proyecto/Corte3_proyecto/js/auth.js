
function login () {
  var email =  document.getElementById("email").value;
  var password =  document.getElementById("password").value;
    // (A) GET FORM DATA
  var data = {"email":email, "password":password};
    // (B) INIT FETCH POST
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      if (result.status != 200) { throw new Error("Bad Server Response"); }
      return result.text();
    }).then((response) => {
      let pet = JSON.parse(response);
      Swal.fire({
        title: 'Querido usuario',
        text: pet.status,
        icon: 'info',
      })
      user(pet);
    }).catch((error) => { 
      Swal.fire({
        title: 'Querido usuario',
        text: 'Ingresa los datos correctamente',
        icon: 'error',
      })
     });
  return false;
}

function register () {
  var nombre =  document.getElementById("nombres").value;
  var apellidos =  document.getElementById("apellidos").value;
  var direccion =  document.getElementById("direccion").value;
  var ciudad=  document.getElementById("ciudad").value;
  var telefono =  document.getElementById("telefono").value;
  var email =  document.getElementById("email").value;
  var password =  document.getElementById("password").value;

  var data = {
    "nombres":nombre, "apellidos":apellidos,
    "direccion":direccion, "ciudad":ciudad,
    "telefono":telefono, 
    "email":email, "password":password
  };

  fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      if (result.status != 200) { throw new Error("Bad Server Response"); }
      return result.text();
    }).then((response) => {
      let pet = JSON.parse(response);
      Swal.fire({
        title: 'Querido usuario',
        text: pet.status,
        icon: 'info',
      })
      window.location.href = "login.html";
    }).catch((error) => { 
      Swal.fire({
        title: 'Querido usuario',
        text: 'Ingresa los datos correctamente',
        icon: 'error',
      })
     });
  return false;
}

function user(json){
  if (json.usuario) {
    window.localStorage.setItem('usuario',JSON.stringify(json.usuario));
    window.location.href = "index.html";
  }
}

function newuser(json){
  if (json.usuario) {
    window.localStorage.setItem('usuario',JSON.stringify(json.usuario));
    window.location.href = "index.html";
  }
}
