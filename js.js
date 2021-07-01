function retiro() {
  var Cantidad = parseFloat(document.getElementById("cantidad").value);
  var Solucion = document.getElementById("solucion");

  //Billetes
  var cien = 100;
  var cincuenta = 50;

  var dies = 10;
  var veinte = 20;

  //Contadores
  var ContCien = 0;
  var ContCincuenta = 0;
  var ContVeinte = 0;

  var ContDies = 0;

  if (Cantidad % 10) {
    console.log("error");
    alert("Cantidad de retiro (" + Cantidad + ") No valida.");
  } else {
    while (Cantidad > 0) {
      if (Cantidad >= cien) {
        Cantidad = Cantidad - cien;
        ContCien++;
      } else if (Cantidad >= cincuenta) {
        Cantidad = Cantidad - cincuenta;
        ContCincuenta++;
      } else if (Cantidad >= veinte) {
        Cantidad = Cantidad - veinte;
        ContVeinte++;
      } else if (Cantidad >= dies) {
        Cantidad = Cantidad - dies;
        ContDies++;
      }
    }

    Solucion.innerHTML = "";

    if (ContCien != 0)
      Solucion.innerHTML +=
        "<hr>Billete de 100:<img src='img/cien.jpg'>  X " + ContCien;
    if (ContCincuenta != 0)
      Solucion.innerHTML +=
        "<hr></br> Billete de 50: <img src='img/cincuenta.jpg'>  X " +
        ContCincuenta;
    if (ContVeinte != 0)
      Solucion.innerHTML +=
        "<hr></br>Billete de 20: <img src='img/veinte.jpg'>  X  " + ContVeinte;
    if (ContDies != 0)
      Solucion.innerHTML +=
        "<hr></br> Billete de 10: <img src='img/diez.jpg'>  X  " + ContDies;
  }
}

function mochila() {
  var Cantidad2 = parseFloat(document.getElementById("cantidad2").value);
  var CapacidadMaletaMax = parseFloat(
    document.getElementById("Capacidad").value
  );
  var Solucion2 = document.getElementById("solucion2");

  let Articulos = [];
  let PesoArticulos = [];
  let ValorArticulos = [];

  for (var i = 1; i <= Cantidad2; i++) {
    Articulos.push(prompt("Nombre de el articulo " + i + " :"));
    PesoArticulos.push(prompt("Peso de el articulo " + i + " :"));
    ValorArticulos.push(prompt("Valor de el articulo " + i + " :"));
  }

  // [g, n, a, y, v]
  // [1, 1, 2, 4, 12]
  // [2, 1, 2, 10, 4]

  //{"A","B","C","D","E","F"}
  //{ 1,  2,  4,  5,  7,  8}
  //{ 2,  5,  6,  10, 13, 16}
  //sol:

  console.log("Articulos");
  console.log(Articulos);
  console.log("PesoArticulos");
  console.log(PesoArticulos);
  console.log("ValorArticulos");
  console.log(ValorArticulos);

  console.log("CapacidadMaletaMax");
  console.log(CapacidadMaletaMax);

  //Ordenando en base al peso de los articulos de menor a mayor

  var TemporalPeso = 0;
  var TemporalValor;
  var TemporalArticulo;

  for (let i = 0; i < PesoArticulos.length; i++) {
    for (let j = 1; j < PesoArticulos.length - i; j++) {
      if (parseInt(PesoArticulos[j - 1]) > parseInt(PesoArticulos[j])) {
        TemporalPeso = parseInt(PesoArticulos[j - 1]);
        TemporalValor = ValorArticulos[j - 1];
        TemporalArticulo = Articulos[j - 1];

        PesoArticulos[j - 1] = parseInt(PesoArticulos[j]);
        ValorArticulos[j - 1] = ValorArticulos[j];
        Articulos[j - 1] = Articulos[j];

        PesoArticulos[j] = parseInt(TemporalPeso);
        ValorArticulos[j] = TemporalValor;
        Articulos[j] = TemporalArticulo;
      }
    }
  }

  // Arrays Solucion
  let SolucionGanancias = [];
  let SolucionArticulos = [];

  // Caso 0 inicial
  for (let i = 0; i < CapacidadMaletaMax + 1; i++) {
    SolucionGanancias.push(0);
  }
  // Caso "" inicial
  for (let i = 0; i < CapacidadMaletaMax + 1; i++) {
    SolucionArticulos.push("");
  }

  // logic
  var GananciaAnterior;
  var VolumenAticuloI;
  var GananciaArticuloI = 0;
  var CapacidadRestante = 0;

  for (var Articulo = 1; Articulo <= ValorArticulos.length; Articulo++) {
    for (
      var CapacidadMaletaI = CapacidadMaletaMax;
      CapacidadMaletaI >= 1;
      CapacidadMaletaI--
    ) {
      GananciaAnterior = SolucionGanancias[CapacidadMaletaI]; // Ganancia anterior
      VolumenAticuloI = PesoArticulos[Articulo - 1]; // volumen del articulo en cuestion

      if (CapacidadMaletaI >= VolumenAticuloI) {
        GananciaArticuloI = parseInt(ValorArticulos[Articulo - 1]); // Ganancia del articulo en cuestion
        CapacidadRestante = CapacidadMaletaI - VolumenAticuloI; // Posicion de la sumatoria de ganancias anteriores posibles
        GananciaArticuloI =
          GananciaArticuloI + parseInt(SolucionGanancias[CapacidadRestante]);
      } else {
        GananciaArticuloI = 0; // El articulo no cabe en la maleta
      }

      SolucionGanancias[CapacidadMaletaI] = parseInt(
        Math.max(GananciaAnterior, GananciaArticuloI)
      ); // Ganancia anterior vs (Ganancia del articulo I + suma posible)

      if (GananciaArticuloI >= GananciaAnterior) {
        SolucionArticulos[CapacidadMaletaI] = Articulos[Articulo - 1] + ","; //Nomnre Articulo en cuestion
        SolucionArticulos[CapacidadMaletaI] +=
          SolucionArticulos[CapacidadRestante]; // le sumamos la solucion de articulo(s) anteriores posibles
      } else {
        SolucionArticulos[CapacidadMaletaI] =
          SolucionArticulos[CapacidadMaletaI]; // Agregamos la solucion de articulo(s) anterior
      }
    }
    console.log("Tabla");
    console.log("Solucion Ganancias :");
    console.log(SolucionGanancias);
    console.log("Solucion Articulos :");
    console.log(SolucionArticulos);
  }

  console.log("Solucion");
  console.log("Solucion Ganancias: " + SolucionGanancias[CapacidadMaletaMax]);
  console.log("Solucion Articulos: " + SolucionArticulos[CapacidadMaletaMax]);

  Solucion2.innerHTML += "";
  Solucion2.innerHTML +=
    "Articulos: " +
    Articulos +
    "</br>Peso: " +
    PesoArticulos +
    "</br>Valor: " +
    ValorArticulos +
    "</br>CapacidadMaletaMax: " +
    CapacidadMaletaMax;
  solucion2.innerHTML += "</br><h2>Solucion</h2>";
  Solucion2.innerHTML +=
    "Ganacia Max: " + SolucionGanancias[CapacidadMaletaMax];
  Solucion2.innerHTML +=
    "</br>Con los articulos: " + SolucionArticulos[CapacidadMaletaMax];
}
