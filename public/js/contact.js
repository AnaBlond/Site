$(function() {
    $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },

        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "https://mandrillapp.com/api/1.0/messages/send.json",
                type: "POST",
                data: {
                    'key': 'DblqQoWAVF7YJtLawPZe-g',
                    'message': {
                        'from_email': email,
                        'from_name': name,
                        'headers': {
                            'Reply-To': email
                    },
                    'subject': 'Contato Sensor Bus',
                    'html': '<p><label>Nome: </label>'+ name +'</p><p><label>Mensagem: </label>'+ message +'</p>',
                    'text': ' ',
                    'to': [
                        {
                            'email': 'projeto@sensorbus.org',
                            'name': 'Projeto Sensor Bus',
                            'type': 'to'
                        }]
                    }
                },

                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Sua mensagem foi enviada com sucesso. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Desculpa " + name + ", o servidor de e-mail não está respondendo. Por favor, tente enviar novamente!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },

        filter: function() {
            return $(this).is(":visible");
        },
    });
});