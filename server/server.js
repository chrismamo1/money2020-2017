'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');
const modo_pkg = require('modo');
const modoCreds = {
        key: 'uxSHXqjfPG9fGi3u5vpq1DKPAhjZS0_b',
        secret: 'LschYY_dWBMAIUMK82u3-dBTtaaLdaWozwiAg9k4QOHFHC_ZzNF0m0oC5BiVEhjK', 
};
const modo = new modo_pkg.Modo({
        api_url: "api.sbx.gomo.do",
        base: "/api_v2",
}, modoCreds);

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

var createChargeCard = function(user, merchant, amount, providerCard, userCard, cb) {
        // User: {'name': string, 'modo_id': string}
        // Merchant: {'name': string, 'modo_id': string}
        // Amount: int (in pennies!)
        // Provider card: {'pan': string, 'exp_month': int, 'exp_year': int, 'cvv': int, 'name': string}
        // User card: {'pan': string, 'exp_month': int, 'exp_year': int, 'cvv': int, 'name': string}
        // Open provider card -- TODO only if we don't have it on file already!
        let provider_card_vault_id = openCard(providerCard.name, providerCard.pan, providerCard.exp_month, providerCard.exp_year, providerCard.cvv).response_data[0].vault_id;
        let user_card_vault_id = openCard(userCard.name, userCard.pan, userCard.exp_month, userCard.exp_year, userCard.cvv).response_data[0].vault_id;
        let gc_params = {
                'user_id': user.modo_id,
                'amount': amount,
                'description': 'mint OPEN_CARDx2 to GIFT_CARD',
                'inputs': [
                        {
                                'account_type': 'Card1',
                                'instrument_id': provider_card_vault_id,
                                'max_amount': amount
                        },
                        {
                                'account_type': 'Card2',
                                'instrument_id': user_card_vault_id,
                        },
                ],
                'outputs': [
                        {
                                'account_type': 'GiftCard',
                                'qualifier': '{"merchant_id": "' + merchant.modo_id + '"}',
                        }
                ],
                'auto_operate': true
        };
        let gift_card_vault_id = modo.query('/coin/mint', gc_params, null).response_data[0].vault_id;
}

var openCard = function(name, pan, exp_month, exp_year, cvv) {
        return modo._getKey("OPEN_CARD").then((key) => {
            return modo.query('/vault/add', {
                'vault_type': 'OPEN_CARD',
                'description': 'vault/add a json_to_be_encrypted credit card',
                'json_to_be_encrypted': JSON.stringify({
                    'pan': pan,
                    'exp_month': exp_month,
                    'exp_year': exp_year,
                    'name': name,
                    'cvv': cvv
                })
            }, null);
        };
    }

