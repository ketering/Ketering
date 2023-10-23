import {useNavigate} from 'react-router-dom';

/**
 * A class for making API requests with customizable headers.
 */
export default class ApiRequest {

    /**
     * Create a new instance of ApiRequest.
     * @param {string} method - The HTTP method for the request (GET, POST...).
     * @param {string} url - The URL for the API endpoint.
     * @param {*} [body=null] - The request body (optional).
     */
    constructor(method, url, body = null) {
        this.method = method;
        this.url = url;
        this.headers = new Headers();
        this.headers.append("Accept", "application/json");
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        this.requestOptions = {
            method: this.method,
            headers: this.headers,
            body: body,
            redirect: 'follow'
        };
    }

    /**
     * Append a custom header to the request.
     * @param {string} name - The name of the header.
     * @param {string} value - The value of the header.
     */
    appendHeader(name, value) {
        this.headers.append(name, value);
    }

    /**
     * Edit the value of an existing header.
     * @param {string} name - The name of the header to edit.
     * @param {string} newValue - The new value for the header.
     */
    editHeader(name, newValue) {
        this.headers.set(name, newValue);
    }

    sendRequest() {

        console.log(this)

        const response = fetch(this.url, this.requestOptions)
            .then(response => response.text())
            .catch(error => {
                console.log('error', error);
                throw error;
            });

        const checkResponse = async () => {
            const resp = await response;
            const jr = JSON.parse(resp);
            if (jr.message === 'Unauthenticated.') {
                localStorage.removeItem('token')
            }
        };

        checkResponse();

        return response;
    }
}
