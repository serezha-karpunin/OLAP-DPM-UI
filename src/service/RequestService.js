import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/';
// axios.defaults.headers.common['Accept'] = '*';

class RequestService {
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

    static sendQuery(query){
        return new Promise(
            resolve => {
                axios.get('/mdx', {
                    params: {
                        query
                    }
                }).then(
                    response => {
                        console.log(response)
                        resolve(response.data);
                    }
                )
            }
        )
    }
}

export default RequestService;