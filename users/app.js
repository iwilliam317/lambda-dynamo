const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const dynamo = new AWS.DynamoDB.DocumentClient();


const generateUserId = () => (Math.floor(Math.random()*1000).toString())

exports.handler = (event, context, callback) => {
    const TableName = 'users';
    const {params} = event
    const {name, email} = params
    const Item = {user_id: generateUserId(), name, email}
    
    dynamo.put({TableName, Item}, (err, data) => {
        
        if (err){
            console.log(`ERROR: ${err}`);
            callback(err, null)
        }
        else {
            const response = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Origin': '*',
                }
            }
            console.log(`SUCCESS: ${data}`);
            
            callback(null, response)
        }
    })
};
