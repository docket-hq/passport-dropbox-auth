[![CircleCI](https://circleci.com/gh/jnbarlow/passport-dropbox-auth.svg?style=shield)](https://circleci.com/gh/jnbarlow/passport-dropbox-auth)

# passport-dropbox-auth
Simple Drobpox strategy for passport that supports both personal Dropbox and Dropbox for Business (utilizing the Docker API for user information).

## Installation
```
npm install passport-dropbox-auth
```
## Usage
Aside from the standard required fields, this module allows to optionally have passport include the express request object into the verification function (through the first variable)

**Parameters:**
- **clientID** - Dropbox API Key
- **clientSecret** - Dropbox API Secret
- **callbackURL** - Oauth2 callback url (must match the callback in your Docker app)

**Optional Parameters**
- **passReqToCallback** - boolean to tell passport to send the request in the first parameter of the verification callback. Defaults to `false`

## Examples

**With request**
```
const DropboxStrategy = require('passport-dropbox-auth').Strategy;
const strategy = new DropboxStrategy(
{
    clientID: '<clientid>',
    clientSecret: '<clientSecret>',
    callbackURL: '<callbackURL>,
    passReqToCallback: true
},
async (request, accessToken, refreshToken, profile, done) => {
    done(null, <userId>);
}
```


**Without request**
```
const DropboxStrategy = require('passport-dropbox-auth').Strategy;
const strategy = new DropboxStrategy(
{
    clientID: '<clientid>',
    clientSecret: '<clientSecret>',
    callbackURL: '<callbackURL>,
    passReqToCallback: false //or omit this entirely
},
async (accessToken, refreshToken, profile, done) => {
    done(null, <userId>);
}
```
## Profile Responses
**Docker for Business**
```
{
    "account_id": "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
    "name": {
        "given_name": "Franz",
        "surname": "Ferdinand",
        "familiar_name": "Franz",
        "display_name": "Franz Ferdinand (Personal)",
        "abbreviated_name": "FF"
    },
    "email": "franz@dropbox.com",
    "email_verified": true,
    "disabled": false,
    "locale": "en",
    "referral_link": "https://db.tt/ZITNuhtI",
    "is_paired": true,
    "account_type": {
        ".tag": "business"
    },
    "root_info": {
        ".tag": "user",
        "root_namespace_id": "3235641",
        "home_namespace_id": "3235641"
    },
    "country": "US",
    "team": {
        "id": "dbtid:AAFdgehTzw7WlXhZJsbGCLePe8RvQGYDr-I",
        "name": "Acme, Inc.",
        "sharing_policies": {
            "shared_folder_member_policy": {
                ".tag": "team"
            },
            "shared_folder_join_policy": {
                ".tag": "from_anyone"
            },
            "shared_link_create_policy": {
                ".tag": "team_only"
            }
        },
        "office_addin_policy": {
            ".tag": "disabled"
        }
    },
    "team_member_id": "dbmid:AAHhy7WsR0x-u4ZCqiDl5Fz5zvuL3kmspwU"
}
```

**Docker Personal**
```
{
    "account_id": "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
    "name": {
        "given_name": "Franz",
        "surname": "Ferdinand",
        "familiar_name": "Franz",
        "display_name": "Franz Ferdinand (Personal)",
        "abbreviated_name": "FF"
    },
    "email": "franz@gmail.com",
    "email_verified": false,
    "disabled": false,
    "locale": "en",
    "referral_link": "https://db.tt/ZITNuhtI",
    "is_paired": false,
    "account_type": {
        ".tag": "basic"
    },
    "root_info": {
        ".tag": "user",
        "root_namespace_id": "3235641",
        "home_namespace_id": "3235641"
    },
    "profile_photo_url": "https://dl-web.dropbox.com/account_photo/get/dbaphid%3AAAHWGmIXV3sUuOmBfTz0wPsiqHUpBWvv3ZA?vers=1556069330102\u0026size=128x128",
    "country": "US"
}
```
