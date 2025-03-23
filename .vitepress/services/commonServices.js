import { appConfig } from "./appConfig";


// FunctionResponse

function FunctionResponse(success, message = null, data = null) {
    this.success = success;
    this.message = message;
    this.data = data;
}

function FailedResponse(message) {
    return new FunctionResponse(false, message);
}


// JWTServices

function JwtServices() {
    this.authKey = "auth";
    this.authenticateUrl = appConfig.authenticateUrl;

    this.getJwtBody = function() {
        let auth = localStorage.getItem(this.authKey);

        if ((auth != null) && (auth.split('.').length >= 3)) return JSON.parse(atob(auth.split('.')[1]));

        return null;
    }

    this.authenticate = async function (userCredentialsModel) {

        return await fetch(this.authenticateUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userCredentialsModel),
        }).then(async response => {
            let jwt = await response.text();
            
            if (response.status === 200 && jwt.trim() !== '')
            {
                console.info('Authentication success; set localstorage item with key', this.authKey);
                localStorage.setItem(this.authKey, jwt);
                return new FunctionResponse([true,undefined,jwt]);
            }

            console.info('Authentication failed.');
            return FailedResponse('Authentication failed.');
            //return new FunctionResponse([false, 'Authentication failed.', null]);
            // //return new FunctionResponse([false,,'aaa']);
            // return {
            //     success: false,
            //     message: 'Authentication failed.'
            // };

        }).catch (reason => {
            // Prefer object literals over tuples -- [getFirstValue(), getSecondValue()]
            // That's not to say that object literals are perfect; a strongly-typed struct would still be preferable
            // But with tuples there is no clear way to distinguish what is the intention of each of the values
            
            console.warn(reason.toLocaleString());
            return FailedResponse(reason.toLocaleString());
            //return new FunctionResponse([false, reason.toLocaleString(), null]);
            // return {
            //     success: false,
            //     message: reason.toLocaleString()
            // };
        });
    }

    this.refreshToken = async function () {
        let auth = localStorage.getItem(this.authKey);

        if (auth === null) return FailedResponse('No token to refresh.');

        return await fetch(this.authenticateUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: auth,
        }).then(async response => {
            let jwt = await response.text();
        
            if (response.status === 200 && jwt.trim() !== '')
            {
                console.info('Refreshing token success; set localstorage item with key', this.authKey);
                localStorage.setItem(this.authKey, jwt);
                return new FunctionResponse([true,undefined,jwt]);
            }

            console.info('Refreshing token failed.');
            return FailedResponse('Refreshing token failed.');
        }).catch(reason => {
            console.warn(reason.toLocaleString());
            return FailedResponse(reason.toLocaleString());
        });

    }

    this.clearJwt = function() {
        console.info('Remove localstorage item with key', this.authKey);
        localStorage.removeItem(this.authKey);
    }

    this.hasExpiredJwt = function() {

        let jwtBody = this.getJwtBody();

        if ((jwtBody === null) || (!('exp' in jwtBody))) return true;
        // if (jwtBody && 'exp' in jwtBody) return false;
        
        let jwtExpiry = new Date(0);
        jwtExpiry.setUTCSeconds(jwtBody['exp']);

        return jwtExpiry <= new Date();
    }

    this.nearingExpiry = function(tolerance = 5 * 60) {
        let jwtBody = this.getJwtBody();

        if ((jwtBody === null) || (!('exp' in jwtBody))) return true;
        
        let jwtExpiry = new Date(0);
        jwtExpiry.setUTCSeconds(jwtBody['exp'] - tolerance);

        //console.log('Nearing expiry', jwtExpiry <= new Date(), jwtExpiry, new Date());
        return jwtExpiry <= new Date();
    }

    this.hasValidToken = function() {
        if (this.hasExpiredJwt()) return false;

        if (this.nearingExpiry()) {
            console.log('Jwt nearing expiry; refreshing token...');
            let response = this.refreshToken();
    
            if (!(Object.getOwnPropertyNames(response).includes('success') && response.success)) {
                console.warn('Unable to refresh token');
                return false;
            } else {
                return true;
            }
        }

        return true;
    }

    this.getJwtSubject = function() {

        if (this.hasExpiredJwt()) return null;

        let jwtBody = this.getJwtBody();

        // if (jwtBody === null) return null;
        // return jwtBody['sub'] ?? null;
        // A terse form of above 2 lines
        return jwtBody && jwtBody['sub'] || null;

        // if (jwtBody === null) return null;
        // let auth = localStorage.getItem(this.authKey);
        // if ((auth != null) && (auth.split('.').length >= 3))
        // {
        //     let jwtBody = JSON.parse(atob(auth.split('.')[1]));
        //     let jwtExpiry = new Date(0); 
        //     jwtExpiry.setUTCSeconds(jwtBody['exp']);
        //     if (jwtExpiry > new Date()) return jwtBody['sub'] ?? null;
        // }
        // return null;
    }
    
}


export { JwtServices, FunctionResponse, FailedResponse };
