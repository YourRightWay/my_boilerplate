import { callApi } from './utils'

function makeRequest() {
    return callApi('https://next.json-generator.com/api/json/get/41vKPcSRQ', {
        method: 'GET'
    }).then(function (result) {
        return result;
    }).catch(function (error) {
        throw new Error(`'https://lesson-4a0eb.firebaseio.com' ${'\n'} ${error}`);
    })
}

const promiseTrigger = true;
function getSomeThink(data) {
    console.info('getSomeThink', 'data: ', data)

    const promise = new Promise(function (resolve, reject) {
        if(!promiseTrigger) return reject(new Error('Wrong!!!'));
        resolve({ test: data });
    });
    
    return promise;
}

function getData (data) {
    setTimeout(function () {
        console.log('test', data);
    }, 4000);
}

makeRequest()
    .then(getSomeThink)
    .then(getData)
    
    
  

  



