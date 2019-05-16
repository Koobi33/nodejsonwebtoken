$(document)
    .ready(function() {
        $('.ui.form')
            .form({
                fields: {
                    name: {
                        identifier: 'name',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Пожалуйста, введите свое имя'
                            }
                        ]
                    },

                    email: {
                        identifier: 'email',
                        rules: [
                            {
                                type   : 'email',
                                prompt : 'Пожалуйста, введите E-mail адрес'
                            }
                        ]
                    },
                    // username: {
                    //     identifier: 'username',
                    //     rules: [
                    //         {
                    //             type   : 'empty',
                    //             prompt : 'Please enter a username'
                    //         }
                    //     ]
                    // },
                    password: {
                        identifier: 'password',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Пожалуйста, введите пароль',
                            },
                            {
                                type   : 'minLength[6]',
                                prompt : 'Пароль должен содержать минимум {ruleValue} симвлов'
                            },
                        ]
                    },

                    password2: {
                        identifier: 'password2',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Пожалуйста, введите пароль повтерно',
                            },
                            {
                                type: 'match[password]',
                                prompt : 'Пароли не совпадают',
                            },
                        ],
                    },

                    love1: {
                        identifier: 'love1',
                        rules: [
                            {
                                type   : 'checked',
                                prompt : 'А как же Ира?'
                            }
                        ]
                    },
                    love2: {
                        identifier: 'love2',
                        rules: [
                            {
                                type   : 'checked',
                                prompt : 'А как же Дима?'
                            }
                        ]
                    },
                    love3: {
                        identifier: 'love3',
                        rules: [
                            {
                                type   : 'checked',
                                prompt : 'А как же Никита?'
                            }
                        ]
                    },

                    terms: {
                        identifier: 'terms',
                        rules: [
                            {
                                type   : 'checked',
                                prompt : 'Подтвердите согласие на обработку данных'
                            }
                        ]
                    },
                }
            })
        ;
    })
;