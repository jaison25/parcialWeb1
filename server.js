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

var pandemics = [];

app.post("/createpandemic", function(req, res) {
  var pandemic = {
    name: req.body.name,
    symptom: req.body.symptom,
    recomendations: req.body.recomendations,
    inCurse: req.body.inCurse,
    countries: req.body.countries
  };
  pandemic.id = crypto.randomBytes(20).toString("hex");
  pandemics.push(pandemic);
  res.json(pandemic);
});

app.post("/pandemicCountries", function(req, res) {
  let pandemicsCountries = pandemics.filter(
    pandemic => pandemic.id == req.body.id
  );
  let countries = [];
  pandemicsCountries.map(pandemic => {
    console.log(pandemic);
    countries.push(pandemic.countries);
  });
  res.json(countries);
});

app.post("/updateCountryData", function(req, res) {
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
  res.json(countries);
});

const server = app.listen(app.get("port"), () => {
  console.log("serve on port", app.get("port"));
});