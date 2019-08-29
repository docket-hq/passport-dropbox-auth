const mocha = require('mocha');
const should = require('should');
const DropboxStrategy = require('../index').Strategy;

describe( 'passport-dropbox-auth', function() {
    describe('module', function() {  
        it('should export class', function() {
            DropboxStrategy.Strategy.should.be.an.instanceOf(Object);
        })
    })
  });

describe('DropboxStrategy', function() {
    describe('strategy param tests', function () {
        it('should return false for passReqToCallback', function () {
            const strategy = new DropboxStrategy({
                clientID: 'ABC123',
                clientSecret: 'secret'
            }, function () { });

            strategy._passReqToCallback.should.equal(false);
        });

        it('should return true for passReqToCallback', function () {
            const strategy = new DropboxStrategy({
                clientID: 'ABC123',
                clientSecret: 'secret',
                passReqToCallback: true
            }, function () { });

            strategy._passReqToCallback.should.equal(true);
        });
    });
})