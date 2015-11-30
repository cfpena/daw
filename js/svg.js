$(function() {

        paper = new Raphael(document.getElementById('drawContainer'), 1000 , 1000);
        $("#entidadButton").click(drawEntidad);
        $("#cargarButton").click(uploadSvg);
});
function drawEntidad() {

     var c = paper.path("M 0 0 L 0 100 L 100 100 L 100 0 L 0 0 M 0 30 L 100 30 Z").attr({
             fill: "white",
             stroke: "black",
             opacity: 1,
             cursor: "move",

         });
    c.drag(move,start,up);
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
     alert(form_data);
    $.ajax({
                url: 'handleupload.php', // point to server-side PHP script 
                dataType: 'text',  // what to expect back from the PHP script, if anything
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function(php_script_response){
                    alert(php_script_response); // display response from the PHP script, if any
                }
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
