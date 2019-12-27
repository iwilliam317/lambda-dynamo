const {dynamo} = require('./config')

exports.handler = async (event, context, callback) => {
    const params = {TableName: 'users'}

    try {
        const res = await dynamo.scan(params).promise()
        const items = res.Items.map(item => item) 
        console.log('adasd');
        
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