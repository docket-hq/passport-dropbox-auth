
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const InternalOauthError = require('passport-oauth').InternalOAuthError;
const Dropbox = require('dropbox').Dropbox;
const fetch = require('isomorphic-fetch');

class Strategy extends OAuth2Strategy{
    constructor(options, verify) {
        options = options || {};
        options.authorizationURL = options.authorizationURL || 'https://www.dropbox.com/oauth2/authorize';
        options.tokenURL = options.tokenURL || 'https://api.dropboxapi.com/oauth2/token';
        super(options, verify);
        this.name = 'dropbox';
        this._passReqToCallback = options.passReqToCallback || false;
    }

    /**
     * returns user profile for passport
     * @param {*} accessToken 
     * @param {*} done 
     */
    userProfile(accessToken, done) {
        const dbx = new Dropbox({ accessToken: accessToken, fetch: fetch });
        
        try {
            const response = await dbx.usersGetAccount();
            console.log(response);
            return done(null, response);
        } catch (e) {
            return done(new InternalOauthError('failed to fetch user profile', e));
        }
    }
}



module.exports = Strategy;