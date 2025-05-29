$(document).ready(function (){
  $.ajax({
        url: 'http://localhost:8787/set-cookie',
        method: 'GET',
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
          console.log(data)  
        },
        error: function(xhr, status, error) {
            
        }
    })
});