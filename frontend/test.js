const axios = require('axios');
async function getResponse(){
    const baseUrl = 'http://192.168.1.100:8000/'
    const response = await axios.get(baseUrl + 'products');
    const jsonResponse = response.data;
    console.log(jsonResponse)
    for(const product in jsonResponse){
        console.log(jsonResponse[product]);
      }
}

getResponse();
