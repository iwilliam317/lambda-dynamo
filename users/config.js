const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient()
AWS.config.update({region: 'eu-west-1'})

module.exports = {dynamo}