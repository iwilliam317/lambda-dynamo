const { dynamo } = require('./config')

exports.handler = async (event, context, callback) => {
    const params = { TableName: 'users', KeyConditionExpression: "#user_id = :user_id",
    ExpressionAttributeNames:{
        "#user_id": "user_id"
    },
    ExpressionAttributeValues: {
        ":user_id": '269'
    } }

    try {
        const res = await dynamo.query(params).promise()
        const items= res.Items.map(item => item)

        const response = {
            statusCode: 200,
            quantity: items.length || [],
            items
        }
        callback(null, response)
    } catch (error) {
        callback(error)
    }
}