const {ipcRenderer} = require('electron');

$(document).ready(function(){
  console.log('ready');

  $('#browse-button').on('click', function(){
      console.log('browse-button');
      $('#log-area').text('');
      ipcRenderer.send('browse-button');
  });

  $('#user-checkbox').on('click', () => {
    console.log('user-checkbox clicked');

    if($("#user-checkbox:checked").val() === "on") {
      $('#user-select').attr("disabled", null);
    } else {
      $('#user-select').attr("disabled", "disabled");
    }
  });

  ipcRenderer.on('set-seleted-file', function(event, arg){
    console.log('set selected file to ' + arg);
    $("#selected-file").val(arg);
    $("#open-folder").attr("disabled", null);
  });

  ipcRenderer.on('log-message', function(event, message){
    console.log('log-message: ' + message);
    $('#log-area').append(message + '\n');

    var psconsole = $('#log-area');
    if(psconsole.length) {
      psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height())
    }
  });
  
});