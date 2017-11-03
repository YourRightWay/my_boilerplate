function requestUser () {
    setTimeout(function () {
        console.log('requestUser: ', 'id:', 123 );
        const id = 123;
        requestPayment (id)
    }, 1200)
}

function requestPayment (userId) {
    setTimeout(function () {
        console.log('requestPayment: ', 'userId:', userId )
        if (userId) {
            const payment = {
                name: 'Privat24',
                quantity: 2000
            };
            requestCalculation(payment);
        }
    }, 500)
}

function requestCalculation (payment) {
    setTimeout(function () {
        const calculation = Math.round(Math.sqrt((Math.random() * payment.quantity)));
        console.log('requestcalculation: ', 'payment name:', payment.name, 'payment calculation:', calculation );
    }, 2200)
}

requestUser();