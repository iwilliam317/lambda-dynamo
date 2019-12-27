const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient()
AWS.config.update({region: 'eu-west-1'})


exports.handler = async (event, context, callback) => {
    try {

        const items = await dynamo.scan({TableName: 'users'}).promise()
        items.Items.forEach(async (item) => {
            dynamo.delete({TableName: 'users', Key: {
                'user_id': `${item.user_id}`
              }}, function(err, data) {
                if (err) console.log(err);
                else console.log(data);
              });
            
        })
        callback(null, items.Items)
    } catch (error) {
        callback(error)
    }
}