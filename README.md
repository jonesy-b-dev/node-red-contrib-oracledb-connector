# node-red-contrib-oracledb-connector
A Node-Red node to connect to a Oracle database and run SQL queries with it 

# Installation
Project is not yet on npm.

# How to use
After adding the node to the flow you have 3 fields in the node
* Username: username of the db
* Password: password of the db
* Connection string: simple connection string in the format of `(ip:port/serviceName)`
The SQL you want to run must be provided through `msg.payload` 

# What's new?
* Initial relaese
  
# Known issues
* Only basic connections are supported (no TNS or anything)
