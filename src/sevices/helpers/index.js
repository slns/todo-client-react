import axios from 'axios';

export class cancelRequestAxios {
    constructor() {
        // refference to API call
        this.cancel_resquest = null;
    }

    // Cancel API call if refference is there and create a new cancelToken for new API call 
    cancelAndCreateToken = () => {
        if (this.cancel_resquest) {
            this.cancel_resquest.cancel();
        }
        this.cancel_resquest = axios.CancelToken.source();
    }

    // reset Cancel token
    resetCancelToken = () => {
        this.cancel_resquest = null;
    }
}