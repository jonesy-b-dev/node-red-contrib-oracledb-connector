const oracledb = require('oracledb');

module.exports = function(RED) {
    function OracleConnector(config) 
    {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', async function(msg) {
            // Read configuration from config object or credentials
            const dbconfig = {
                user: config.username,
                password: config.password,
                connectString: config.connectionStr
            };
            node.warn(dbconfig)
            // Multiline SQL query from the input message
            var sqlQuery = msg.payload;
            let connection;
            try 
            {
                // Connect to Oracle database
                connection = await oracledb.getConnection(dbconfig);
                
                // Execute the multiline SQL query
                connection.execute(sqlQuery, [], function(err, result) {
                    if (err) 
                    {
                        node.error(err.message, msg);
                    } 
                    else 
                    {
                        msg.payload = result.rows;
                        node.send(msg);
                    }
                });
            } 
            catch (error) 
            {
                node.error(error.message, msg);
            } 
            finally 
            {
                if (connection) 
                {
                    try 
                    {
                        await connection.close();
                    } 
                    catch (err) 
                    {
                        node.error(err.message, msg);
                    }
                }
            }
        });
    }

    RED.nodes.registerType('oracle-connector', OracleConnector, {
        credentials: 
        {
            username: { type: 'text' },
            password: { type: 'password' },
            connectionStr: { type: 'text' }
        }
    });
};