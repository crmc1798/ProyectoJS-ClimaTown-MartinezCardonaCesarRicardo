$(document).ready(function () {
    $('#myForm').submit(function (e) {
        const form = document.querySelector('form[id="myForm"]');
        const username = form.elements['fullname'].value;
        const userMail = form.elements['email_id'].value;
        const message = form.elements['message'].value;
        e.preventDefault();
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

