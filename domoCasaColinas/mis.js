 
var topico = "domo/techo/estado01";
var topico2 = "domo/techo/1";
var topico3 = "domo/techo/estadoLluvia";

const element = document.getElementById("seccion");
const estado=document.getElementById("check").textContent;
toggle = document.querySelector('.toggle input');


// Create a client instance: Broker, Port, Websocket Path, Client ID
client = new Paho.MQTT.Client("mqtt.ecologiaendomotica.com", Number(8083), "clientIdPagDomo");
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
// connect the client
client.connect({onSuccess:onConnect});

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe(topico);
  client.subscribe(topico3);

  message = new Paho.MQTT.Message("Hello");
  message.destinationName = topico;
  client.send(message); 
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);  
  
    if (message.payloadString == "Abierto"){
        //document.getElementById("check2").checked = false;
        console.log("console abierto");
        element.className = "portfolio-block block-intro-on";
        document.getElementById('check').innerHTML= 'Abierto';
        document.getElementById("check2").checked = true;
/*      var message = new Paho.MQTT.Message("Message Payload off");
        message.destinationName = topico;
        message.retained = true;
        client.send(message);


 */

            
    }
    else if(message.payloadString =="Cerrado"){
        //document.getElementById('onoffcheck').click();        
        console.log("console cerrado");
        element.className = "portfolio-block block-intro";
        document.getElementById('check').innerHTML= 'Cerrado';
        document.getElementById("check2").checked = false;
/*         var message = new Paho.MQTT.Message("Message Payload on");
        message.destinationName = topico;
        message.retained = true;
        client.send(message); */


    }
    else if(message.payloadString =="No lluvia"){
        //document.getElementById('onoffcheck').click();        
        console.log(" console No lluvia ");
        document.getElementById('check3').innerHTML= 'No está lloviendo';
      
    }
    else if(message.payloadString =="Lloviendo"){
        //document.getElementById('onoffcheck').click();        
        console.log(" console lluvia ");
        document.getElementById('check3').innerHTML= 'Está lloviendo';
      
    }

}


toggle.addEventListener('click', () => {  
onOff = toggle.parentNode.querySelector('.onoff') ;          
onOff.textContent = toggle.checked ? 'Abierto' : 'Cerrado';

    if(onOff.textContent=='Abierto'){
        console.log('Abierto');
        $.ajax({url:'Abierto'});
      var message = new Paho.MQTT.Message("1");
        message.destinationName = topico2;
        message.retained = true;
        client.send(message); 

    }else{
        console.log('Cerrado');
        $.ajax({url:'Cerrado'}) ; 
        var message = new Paho.MQTT.Message("1");
        message.destinationName = topico2;
        message.retained = true;
        client.send(message);              
    }

    if(element.className == "portfolio-block block-intro"){
        element.className = "portfolio-block block-intro-on";
    }else if(element.className == "portfolio-block block-intro-on"){
        element.className = "portfolio-block block-intro";
    }

});






