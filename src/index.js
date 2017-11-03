function requestUser () {
    /**
     *  Конструктор класса promise
        Принимает в качестве параметра функцию.
        которая в свою очередь принимает в качестве параметра два аргумента
        resolve - все хорошо
        reject - promise выполнился с ошибкой
     */
    const promise = new Promise(function (resolve, reject) {
        /**
         * Имитируем задержку сервера
         */
        setTimeout(function () {
            /**
             * Получаем id от сервера
             */
            const user = {
                name: 'Givi',
                id: 123
            };
            if (!user) {
                // если что то пошло не так
                return reject(new Error('Something wrong!!!'))
            }
            
            console.log('requestUser: ', 'get user id:', user);
            // успех
            resolve(user)
        }, 1200)
    });

    return promise;
}

function requestPayment(user) {
    const promise = new Promise(function (resolve, reject) {
        /**
         * Имитируем задержку сервера
         */
        setTimeout(function () {
            /**
             * Получаем оплату от сервера
             */
            const payment = {
                user: user.name,
                name: 'Privat24',
                quantity: 2000
            };

            console.log('requestpayment: ', 'get payment:', payment);
            if (!payment) {
                return reject(new Error('Something wrong!!!'))
            }

            resolve(payment)
        }, 2200)
    });

    return promise;
}

function requestCalculation(payment) {
    setTimeout(function () {
        const calculation = Math.round(Math.sqrt((Math.random() * payment.quantity)));
        console.log('requestcalculation: ', 'payment name:', payment.name, 'payment calculation:', calculation );
    }, 3000);
}


requestUser()
    .then(requestPayment)
    .then(requestCalculation)
    .catch();