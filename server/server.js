'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');

var authentication = new MasterCardAPI.OAuth(consumerKey, keyStorePath, keyAlias, keyPassword);
MasterCardAPI.init({
        sandbox: true,
        authentication: authentication
});

const dynamo = new doc.DynamoDB();
const Request = require('request');

exports.handler = (event, context, callback) => {

        const done = (err, res) => callback(null, {
                statusCode: err ? '400' : '200',
                body: err ? err.message : JSON.stringify(res),
                headers: {
                        'Content-Type': 'application/json',
                },
        });

        let cb = (err, res) => callback(null, {
                statusCode: err ? '400' : '200',
                body: err ? err.message : JSON.stringify(res),
                headers: {
                        'Content-Type': 'application/json',
                },
        });

        let p = event.queryStringParameters;

        switch (p.action) {
                case 'registerHost':
                        registerHost(
                                        p.name, /* primary key */
                                        Number.parseFloat(p.spendingLimit), /* dolla dolla bills yo */
                                        p.merchants, /* comma-separated lists are probably parsed automatically */
                                        p.geoCenter.split(/,/).map(Number.parseFloat), /* takes lat/long as 'lat,long' */
                                        Number.parseFloat(p.geoRange), /* furlongs or kilometers */
                                        Number.parseInt(p.until), /* unix timestamp */
                                        cb);
                        break;
                case 'registerUser':
                        registerUser(
                                        p.name,
                                        p.password, /* plaintext bc 24 hours */
                                        p.pan, /* also not ideal, at least we're tokenizing lel */
                                        cb);
                        /* 'ENDPOINT/registerUser?name=Sterling Archer&password=Guest&pan=0' */
                        break;
                case 'associateUser':
                        associateUser(p.user, p.host, cb);
                        break;
                case 'getHosts':
                        /* lists hosts FOR A SPECIFIC USERNAME */
                        getHosts(p.user, cb);
                        /* 'ENDPOINT/getHosts?user=Sterling Archer' */
                        /* Returns as JSON array, possibly empty */
                        break;
                default:
                        done(new Error(`Unsupported method "${event.httpMethod}"`));
        }
};

var registerHost(name, spendingLimit, merchants, geoCenter, geoRange, until, cb) {
        let params = {
                'TableName': 'Hosts',
                'Item': {
                        'Name': name,
                        'SpendingLimit': spendingLimit,
                        'Merchants': merchants,
                        'GeoCenter': geoCenter,
                        'GeoRange': geoRange,
                        'Until': until
                }
        }
        dynamo.putItem(
                        params,
                        cb
                      );
}

var registerUser = function(name, password, pan, cb) {
        let params = {
                'TableName': 'Users',
                'Item': {
                        'Name': name,
                        'Password': password,
                        'Token': getToken(pan)
                }
        }
        dynamo.putItem(
                        params,
                        cb
                      );
}

var getToken = function(pan, params = undefined) {
        if (params) {
                /* TODO: allocate a new (user x merchant token, disposable in nature) */
        } else {
                /* Get a (user) card-on-file token */

        }
}

var associateUser(user, host, cb) {
        let params = {
                'TableName': 'Hosts',
                'Key': { 'Name': host }
        };
        dynamo.getItem(params, (err, hostReal) => {
                if (err) {
                        /* lel */
                } else {
                        let params = {
                                'TableName': 'Assoc',
                                'Item': {
                                        'User': user
                                }
                        };
                        dynamo.getItem(params, (err, assocReal) => {
                                if (err) {
                                        let params = {
                                                'TableName': 'Assoc',
                                                'Item': {
                                                        'User': user,
                                                        'Hosts': [host],
                                                        'Balance': hostReal.SpendingLimit
                                                }
                                        };
                                        dynamo.putItem(params, cb);
                                } else {
                                        let params = {
                                                'TableName': 'Assoc',
                                                'Key': {'User': user},
                                                'Item': {
                                                        'User': user,
                                                        'Hosts': [host, ...assocReal.Hosts],
                                                        'Balance': hostReal.SpendingLimit
                                                }
                                        };
                                        dynamo.updateItem(params, cb);
                                };
                        });
                }
        })
}

var getHosts = function(user, cb) {
        let params = {
                'TableName': 'Assoc',
                'Key': { 'User': user }
        };
        dynamo.getItem(params, (err, assocReal) => {
                if (err) {
                        cb([]);
                } else {
                        cb(assocReal.Hosts);
                }
        })
}
