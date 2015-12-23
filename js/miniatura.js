$(document).ready(function(){


          var divCaja = $("<div>", {class: "panel panel-default col-sm-3 box"});

          var divNombre = $("<div>", {class: "panel-heading"});
          divCaja.append(divCaja);

          var titulo = $("<h3>", {class: "panel-title text-center"});
          titulo.html("1");
          divNombre.append(titulo);

          var divImagen = $("<div>", {class:"panel-body"});
          divCaja.append(divImagen);

          var imagen = $("<img>", {class: "imgPanel", src: "img/diagrama1.PNG", align:"middle"});
          divImagen.append(imagen);

          $("#divPrincipal").append(divCaja);
      }
);

/*
$.ajax({
    url:'../saves/1.txt',
    async: false,
    success: function(){
        //file exists
        var divCaja = $("<div>", {class: "panel panel-default col-sm-3 box"});

        var divNombre = $("<div>", {class: "panel-heading"});
        divCaja.append(divCaja);

        var titulo = $("<h3>", {class: "panel-title text-center"});
        titulo.html("1");
        divNombre.append(titulo);

        var divImagen = $("<div>", {class:"panel-body"});
        divCaja.append(divImagen);

        var imagen = $("<img>", {class: "imgPanel", src: "img/diagrama1.PNG", align:"middle"});
        divImagen.append(imagen);

        $("#divPrincipal").append(divCaja);
    }
});*/
