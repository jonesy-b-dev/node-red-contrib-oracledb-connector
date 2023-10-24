module.exports = function(RED) {
    function OracleCredentials(config) {
        RED.nodes.createNode(this, config);
        this.username = config.username;
        this.password = config.password;
        this.connectionString = config.connectionString;
    }
    RED.nodes.registerType("oracleCredentials", OracleCredentials);
}