$(function() {

        paper = new Raphael(document.getElementById('drawContainer'), 1000 , 1000);
        $("#entidadButton").click(drawEntidad);
        $("#cargarButton").click(uploadSvg);
});

Raphael.st.draggable = function() {
  var me = this,
      lx = 0,
      ly = 0,
      ox = 0,
      oy = 0,
      moveFnc = function(dx, dy) {
          lx = dx + ox;
          ly = dy + oy;
          me.transform('t' + lx + ',' + ly);
      },
      startFnc = function() {


        me.animate({"stroke-opacity": 0.2,"opacity":0.2}, 500);



      },
      endFnc = function() {
          ox = lx;
          oy = ly;
          me.animate({"stroke-opacity": 1,"opacity":1}, 500);
      };

  this.drag(moveFnc, startFnc, endFnc);
};
function drawEntidad() {
  var d = paper.path("M 0 0 L 0 120 L 120 120 L 120 0 L 0 0 Z").attr({
          opacity: 0,
          cursor: "default",
          fill: "white"
      });

     var c = paper.path("M 10 10 L 10 110 L 110 110 L 110 10 L 10 10 M 10 40 L 110 40 Z").attr({
             fill: "white",
             stroke: "black",
             opacity: 1,
             cursor: "move",

         });

    var t = paper.text(30,20,"Entidad");
    var a = paper.text(30,50,"Elemento");
    var b = paper.text(30,70,"Elemento");
    var set= paper.set();
    set.push(c,d,t,a,b);
    set.mouseover(function() {
      d.animate({"stroke": "black","stroke-opacity": 1,"cursor": "move"}, 500);
    });
    set.mouseout(function() {
      d.animate({"stroke": "black","stroke-opacity": 0,"cursor": "default"}, 500);
    });
    set.draggable();
    d.undrag();
    drawLine(d,set);
}

function drawLine(d,set){

         startLine = function () {
           d.ox = d.getBBox().x + d.getBBox().width;
           d.oy = d.getBBox().y + d.getBBox().height/2;
           console.log(d.getBBox());
           line = paper.path("M"+" "+d.ox+" "+d.oy);
           d.animate({"stroke-opacity": 0.2}, 500);
           set.push(line);

         },
         moveLine = function (dx, dy) {
           d.attr({
                      cx: d.ox + dx,
                      cy: d.oy + dy
                      });
         },
         move2Line = function () {
                   line.remove();
                    line = paper.path("M"+" "+d.ox+" "+d.oy+"L"+d.attr("cx")+" "+d.attr("cy"));
                    set.push(line);
                            },
         upLine = function () {
        d.drag(move2Line, start, up);
         d.animate({"stroke-opacity": 1}, 500);
         };
         d.drag(moveLine,startLine,upLine);

}
function drawPath(path){

  var c = paper.path(path).attr({
          fill: "white",
          stroke: "black",
          opacity: 1,
          cursor: "move",

      });
      c.drag(move,start,up);

z


}

function uploadSvg(){
  var input = ('<input type="file" id="file" style="display:none" />');
  $("#drawContainer").append(input);
  $("#file").change(function ()
   {
     var fileSelect = $("#file");
     var formData = new FormData();
     var file = fileSelect[0].files[0];
     formData.append("file",file);

    $.ajax({
                url: 'handleupload.php',
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: formData,
                type: 'post',
                success: function(response){
		    alert(response);
                    drawPath(response);

                }
     });

   });



  $("#file").click();


}




var start = function () {
this.odx = 0;
this.ody = 0;
this.animate({"stroke-opacity": 0.2}, 500);
},
move = function (dx, dy) {
this.translate(dx - this.odx, dy - this.ody);
this.odx = dx;
this.ody = dy;
},
up = function () {
this.animate({"stroke-opacity": 1}, 500);
};
