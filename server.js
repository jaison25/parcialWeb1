const express = require ('express');
const bodyParser = require ('body-parser');
const crypto = require ('crypto');
const arreglo = require ('./arreglo');

var app = express();
app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.listen(3000, () => {
  console.log('Corriendo en http://localhost:3000');
});


app.post("/createpandemic", function(req, res) {
  //Se recibe body y se asigna a la variable pandemia
  const pandemia  = req.body;

  //Se crea ID autoincrementable
  const id = arreglo.length + 1;
  const newPandemia = {
      id,
      ...pandemia
  }

  arreglo.push(newPandemia);

 
  res.send(arreglo);
});

app.post("/pandemicCountries/:id", function(req, res) {
     const id = req.params.id;

     //Se recibe body y se asigna a la variable pandemia
     const pais = req.body;
 
     const pandemia = arreglo.find((pandemia) => pandemia.id === parseInt(id));
 
     //Se busca país por nombre
     let datoPais = pandemia.paises.find((objPais) => objPais.nombre.toLocaleLowerCase() === pais.nombre.toLocaleLowerCase());
     
     //Si existe el país, se actualiza
     if (datoPais) {
         const indexPais = pandemia.paises.findIndex((objPais) => objPais.nombre.toLocaleLowerCase() === pais.nombre.toLocaleLowerCase());
         pandemia.paises[indexPais] = {
             ...datoPais,
             ...pais
 
         }
     }
     //Si no existe el país, se crea
     else {
 
         //Se crea ID autoincrementable
         const idPais = pandemia.paises.length + 1;
 
         //Se crea nuevo objeto de país
         const newPais = {
             id: idPais,
             ...pais
         }
 
         //Se inserta país a la pandemia
         pandemia.paises.push(newPais);
     }
 
     //Se retornan la pandemia con el nuevo país
     res.send(arreglo);
});

app.get("/consultar-pais/:idPandemia", (req, res) => {
  //Se recibe ID de pandemia
  const  idPandemia  = req.params.idPandemia;

  const pandemia = arreglo.find((pandemia) => pandemia.id === Number(idPandemia));
  if (!pandemia) {
      res.send('ID de pandemia no existe');
  }


  //Se retornan los paises de la pandemia
  res.send(pandemia.paises);

});