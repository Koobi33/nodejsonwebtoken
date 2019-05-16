$(document)
    .ready(function() {
        $('.ui.form')
            .form({
                fields: {
                    email: {
                        identifier  : 'email',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Введите e-mail'
                            },
                            {
                                type   : 'email',
                                prompt : 'Введите e-mail'
                            }
                        ]
                    },
                    password: {
                        identifier  : 'password',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Введите пароль'
                            },
                            {
                                type   : 'length[6]',
                                prompt : 'Ваш пароль должен содержать минимум 6 символов'
                            }
                        ]
                    }
                }
            })
        ;
    })
;