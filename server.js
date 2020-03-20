const express = require ('express');
const bodyParser = require ('body-parser');
const crypto = require ('crypto');

var app = express();
app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

var pandemics = [];

app.post("/createpandemic", function(req, res) {
  //Se recibe body y se asigna a la variable pandemia
  const { body: pandemia } = req;

  //Se crea ID autoincrementable
  const id = pandemias.length + 1;
  const newPandemia = {
      id,
      ...pandemia
  }

  pandemias.push(newPandemia);

  //Se retornan todas las pandemias
  res.send(pandemias);
});

app.post("/pandemicCountries", function(req, res) {
     //Se recibe ID de pandemia
     const { idPandemia } = req.params;

     //Se recibe body y se asigna a la variable pandemia
     const { body: pais } = req;
 
     const pandemia = pandemias.find((pandemia) => pandemia.id === Number(idPandemia));
     if (!pandemia) {
         res.send('ID de pandemia no existe');
     }
 
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
     res.send(pandemias);
});