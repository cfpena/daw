

$(function() {


  $("#cargarButton").click(uploadSvg);
  jsPlumb.ready(drawEntidad);
    $("#guardar").click(function(){
      var data = $("#drawContainer").html();
      $.ajax({
    url: 'handlesave.php',
    type: 'POST',
    data: { data: data },
    success: function(result) {
        alert('the data was successfully sent to the server');
    }
});


    });
});

// Subir archivo al servidor
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

// Diagramas
function drawEntidad() {

  var i = 0;

  $('#entidadButton').click(function(e) {



    var titletext = prompt("Ingrese el titulo");

    var newState = $('<div>').attr('id', 'state' + i).addClass('item');

    var title = $('<div>').addClass('title').text(titletext);

    var items = $('<div>').addClass('items');

    var addRow = function () {

      var content  = $('<div>').attr('id','c' + i).addClass('div-table').text('');
      var nombre= $('<div>').addClass('div-table-col').text('id');
      var tipo= $('<div>').addClass('div-table-col').text('int');
      var pk= $('<div>').addClass('div-table-col').text('pk');
      var x2= $('<div>').attr('id',i).addClass('div-table-col').text('X');

      content.append(nombre);
      content.append(tipo);
      content.append(pk);
      content.append(x2);

      x2.click(function(e){
        var item = $(this).attr('id');
        $('#c' + item).remove();
        e.stopPropagation();
      });

      nombre.click(function(e){
        var text = prompt("Ingrese nombre");
        nombre.text(text);
        e.stopPropagation();
      });
      tipo.click(function(e){
        var text = prompt("Ingrese tipo");
        tipo.text(text);
        e.stopPropagation();
      });
      pk.click(function(e){
        var text = prompt("Ingrese Key");
        pk.text(text);
        e.stopPropagation();
      });



      items.append(content);
    };

    var x= $('<div>').addClass('x').text('X');


    var connect = $('<div>').addClass('connect').text('*');

    var mas  = $('<div>').attr('id',i).addClass('mas').text('+');

    newState.css({
      'top': 10,
      'left': 10
    });

    jsPlumb.makeTarget(newState, {
      anchor: 'Continuous'
    });

    jsPlumb.draggable(newState, {
      containment: 'Continuous'
    });

    jsPlumb.makeSource(connect, {
      parent: newState,
      anchor: 'Continuous'
    });





    title.append(x);


    x.click(function(e){
      jsPlumb.detachAllConnections(newState);
      newState.remove();
      e.stopPropagation();
    });

    title.click(function(e){
      var text = prompt("Ingrese titulo");
      title.text(text);
      e.stopPropagation();
    });
    mas.click(function(e){
      addRow();
      e.stopPropagation();
    });



    newState.append(connect);
    newState.append(title);
    newState.append(items);
    addRow();
    newState.append(mas);



    $('#drawContainer').append(newState);

    i++;
  });

}

function saveFlowchart(){
            var nodes = []
            $(".node").each(function (idx, elem) {
            var $elem = $(elem);
            var endpoints = jsPlumb.getEndpoints($elem.attr('id'));
            console.log('endpoints of '+$elem.attr('id'));
            console.log(endpoints);
                nodes.push({
                    blockId: $elem.attr('id'),
                    nodetype: $elem.attr('data-nodetype'),
                    positionX: parseInt($elem.css("left"), 10),
                    positionY: parseInt($elem.css("top"), 10)
                });
            });
            var connections = [];
            $.each(jsPlumb.getConnections(), function (idx, connection) {
                connections.push({
                    connectionId: connection.id,
                    pageSourceId: connection.sourceId,
                    pageTargetId: connection.targetId
                });
            });

            var flowChart = {};
            flowChart.nodes = nodes;
            flowChart.connections = connections;
            flowChart.numberOfElements = numberOfElements;

            var flowChartJson = JSON.stringify(flowChart);
            //console.log(flowChartJson);

            alert(flowChartJson);
        }


        function loadFlowchart(){
                    var flowChartJson = $('#jsonOutput').val();
                    var flowChart = JSON.parse(flowChartJson);
                    var nodes = flowChart.nodes;
                    $.each(nodes, function( index, elem ) {
                        if(elem.nodetype === 'startpoint'){
                            repositionElement('startpoint', elem.positionX, elem.positionY);
                        }else if(elem.nodetype === 'endpoint'){
                            repositionElement('endpoint', elem.positionX, elem.positionY);
                        }else if(elem.nodetype === 'task'){
                            var id = addTask(elem.blockId);
                            repositionElement(id, elem.positionX, elem.positionY);
                        }else if(elem.nodetype === 'decision'){
                            var id = addDecision(elem.blockId);
                            repositionElement(id, elem.positionX, elem.positionY);
                        }else{

                        }
                    });

                    var connections = flowChart.connections;
                    $.each(connections, function( index, elem ) {
                         var connection1 = jsPlumb.connect({
                            source: elem.pageSourceId,
                            target: elem.pageTargetId,
                            anchors: ["BottomCenter", [0.75, 0, 0, -1]]

                        });
                    });

                    numberOfElements = flowChart.numberOfElements;
                }
