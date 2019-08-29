
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const InternalOauthError = require('passport-oauth').InternalOAuthError;
const Dropbox = require('dropbox').Dropbox;
const fetch = require('isomorphic-fetch');

/**
 * Dropbox strategy
 * 
 * Options:
 *  - clientID
 *  - clientSecret
 *  - callbackURL
 *  <optional>
 *  - passReqToCallback (default false) - directs passport to send the request object 
 *                                        to the verfication callback
 * 
 * Examples:
 * 
 *  With request
 *      const strategy = new DropboxStrategy(
 *      {
 *          clientID: '<clientid>',
 *          clientSecret: '<clientSecret>',
 *          callbackURL: '<callbackURL>,
 *          passReqToCallback: true
 *      },
 *      async (request, accessToken, refreshToken, profile, done) => {
 *          done(null, <userId>);
 *      }
 * 
 * Without request
 *      const strategy = new DropboxStrategy(
 *      {
 *          clientID: '<clientid>',
 *          clientSecret: '<clientSecret>',
 *          callbackURL: '<callbackURL>,
 *          passReqToCallback: false
 *      },
 *      async (accessToken, refreshToken, profile, done) => {
 *          done(null, <userId>);
 *      }
 * 
 * Response object: Docker personal
 * 
 *      {
 *          "account_id": "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
 *          "name": {
 *              "given_name": "Franz",
 *              "surname": "Ferdinand",
 *              "familiar_name": "Franz",
 *              "display_name": "Franz Ferdinand (Personal)",
 *              "abbreviated_name": "FF"
 *          },
 *          "email": "franz@gmail.com",
 *          "email_verified": false,
 *          "disabled": false,
 *          "locale": "en",
 *          "referral_link": "https://db.tt/ZITNuhtI",
 *          "is_paired": false,
 *          "account_type": {
 *              ".tag": "basic"
 *          },
 *          "root_info": {
 *              ".tag": "user",
 *              "root_namespace_id": "3235641",
 *              "home_namespace_id": "3235641"
 *          },
 *          "profile_photo_url": "https://dl-web.dropbox.com/account_photo/get/dbaphid%3AAAHWGmIXV3sUuOmBfTz0wPsiqHUpBWvv3ZA?vers=1556069330102\u0026size=128x128",
 *          "country": "US"
 *      }
 * 
 *  Response Object: Docker for Business
 * 
 *      {
 *          "account_id": "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
 *          "name": {
 *              "given_name": "Franz",
 *              "surname": "Ferdinand",
 *              "familiar_name": "Franz",
 *              "display_name": "Franz Ferdinand (Personal)",
 *              "abbreviated_name": "FF"
 *          },
 *          "email": "franz@dropbox.com",
 *          "email_verified": true,
 *          "disabled": false,
 *          "locale": "en",
 *          "referral_link": "https://db.tt/ZITNuhtI",
 *          "is_paired": true,
 *          "account_type": {
 *              ".tag": "business"
 *          },
 *          "root_info": {
 *              ".tag": "user",
 *              "root_namespace_id": "3235641",
 *              "home_namespace_id": "3235641"
 *          },
 *          "country": "US",
 *          "team": {
 *              "id": "dbtid:AAFdgehTzw7WlXhZJsbGCLePe8RvQGYDr-I",
 *              "name": "Acme, Inc.",
 *              "sharing_policies": {
 *                  "shared_folder_member_policy": {
 *                      ".tag": "team"
 *                  },
 *                  "shared_folder_join_policy": {
 *                      ".tag": "from_anyone"
 *                  },
 *                  "shared_link_create_policy": {
 *                      ".tag": "team_only"
 *                  }
 *              },
 *              "office_addin_policy": {
 *                  ".tag": "disabled"
 *              }
 *          },
 *          "team_member_id": "dbmid:AAHhy7WsR0x-u4ZCqiDl5Fz5zvuL3kmspwU"
 *      }
 */
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
    async userProfile(accessToken, done) {
        const dbx = new Dropbox({ accessToken: accessToken, fetch: fetch });
        
        try {
            const response = await dbx.usersGetCurrentAccount();
            return done(null, response);
        } catch (e) {
            console.log(e);
            return done(new InternalOauthError('failed to fetch user profile', e));
        }
    }
}

module.exports = Strategy;