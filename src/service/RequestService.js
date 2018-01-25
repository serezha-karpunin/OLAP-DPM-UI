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
                    },
                    withCredentials: true
                }).then(
                    response => {
                        console.log(response)
                        resolve(response.data);
                    }
                )
            }
        )
    }
    static sendOtherQuery(query){
        return new Promise(
            resolve => {
                axios.get('/mdx2', {
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

    static executeCommand(command){
        console.log('THING', command)
        return new Promise(
            resolve => {

                axios.request({
                    method: 'post',
                    url: '/execute',
                    withCredentials: true,
                    data: command

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