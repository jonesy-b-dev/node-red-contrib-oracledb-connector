const oracledb = require('oracledb');

module.exports = function(RED) {
    function OracleConnector(config) 
    {
        RED.nodes.createNode(this, config);
        var node = this;
        this.connectionData = RED.nodes.getNode(config.connection)

        node.on('input', async function(msg) {
            // Read configuration from config object or credentials
            const dbconfig = {
                username: this.connectionData.username,
                password: this.connectionData.password,
                connectString: this.connectionData.connectionString
            };

            node.warn(dbconfig);
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

    RED.nodes.registerType('oracle-connector', OracleConnector)
};