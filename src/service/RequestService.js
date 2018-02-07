import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/';

class RequestService {

    static get(url, headers, params){
        return new Promise(
            resolve => {
                axios.get(url, {
                    headers,
                    params,
                    withCredentials: true
                }).then(
                    response => {
                        console.log('RESPONSE', response);
                        resolve(response.data);
                    }
                )
            }
        )
    }

    static getSchema() {
        return new Promise(
            resolve => {
                axios.get('/files').then(
                    response => resolve(response.data)
                )
            }
        )
    }

    static postSchema(data) {
        return new Promise(
            resolve => {
                axios({
                    method: 'post',
                    url: '/files',
                    headers: {
                        'Content-Type': 'application/xml',
                    },
                    data
                }).then(
                    response => {
                        console.log('RESP', response);
                        resolve(response)
                    }
                )
            }
        )
    }

    static post(url, headers, data, params){
        return new Promise(
            resolve => {
                axios.request({
                    method: 'post',
                    url,
                    withCredentials: true,
                    headers,
                    data,
                    params
                }).then(
                    response => {
                        console.log('RESPONSE', response);
                        resolve(response.data);
                    }
                )
            }
        )
    }
}

export default RequestService;