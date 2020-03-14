import express from "express";
import bodyParser from "body-parser";
import crypto from "crypto";

var app = express();
app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

var pandemias = [];

app.post("/crearPandemia", function(req, res) {
  var pandemia = {
    nombre: req.body.nombre,
    sintoma: req.body.sintoma,
    recomendaciones: req.body.recomendaciones,
    enCurso: req.body.enCurso,
    paises: req.body.paises
  };
  pandemia.id = crypto.randomBytes(20).toString("hex");
  pandemias.push(pandemia);
  res.json(pandemia);
});

app.post("/paises", function(req, res) {
  let paises = pandemias.filter(
    pandemia => pandemia.id == req.body.id
  );
  let paisContagio = [];
  paises.map(pandemia => {
    console.log(pandemia);
    paisContagio.push(pandemia.countries);
  });
  res.json(paises);
});

app.post("/actulizarPais", function(req, res) {
  let pandemicsquery = pandemics.filter(pandemic => pandemic.id == req.body.id);
  if (pandemicsquery.length == 0) {
    return res.json(`no se encontro ningun pais con el codigo ${req.body.id}`);
  }
  let newPandemics = pandemics.filter(pandemic => pandemic.id != req.body.id);
  let pandemic = pandemicsquery[0];
  let countriespandemicsquery = [];

  let countries = [];
  pandemicsCountries.map(pandemic => {
    console.log(pandemic);
    countries.push(pandemic.countries);
  });
  res.json(paises);
});

const server = app.listen(app.get("port"), () => {
  console.log("serve on port", app.get("port"));
});