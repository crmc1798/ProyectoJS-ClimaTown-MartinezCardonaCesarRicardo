
$(document).ready(function () {
    $('#myForm').submit(function (e) {
        //se toman los valores obtenidos del dormulario y se asignan a constantes
        const form = document.querySelector('form[id="myForm"]');
        const username = form.elements['fullname'].value;
        const userMail = form.elements['email_id'].value;
        const message = form.elements['message'].value;
        e.preventDefault();
        //se mandan junto con la solicitud los valores pedidos por la api
        var data = {
            service_id: 'service_etcxqid',
            template_id: 'template_c70i4ya',
            user_id: 'zKVPiTRSbOSOG-orr',
            template_params: {
                from_name: username,
                email_id: userMail,
                message: message
            }
        };
        //en caso de que sea exitoso el envio del email se muestra un mensaje de exito en caso de lo contrario un mensaje de error
        $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json'
        }).done(function () {
            Swal.fire(
                'Correo enviado',
                'El correo se mando sin errores!',
                'success'
              );

        }).fail(function (error) {
            Swal.fire({
                title: 'Error',
                text: SON.stringify(error),
                icon: 'error',
                confirmButtonText: 'Continuar'
            });
        })
    })
})

