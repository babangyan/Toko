var developmentDatabase = {
    postgres: {
    host: 'ec2-54-247-103-43.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'ddfgncd5j40oav',
    user: 'wqyaxmlxfuulhm',
    password: '4dad3085894c732b154f0f72ed1fd710d3b91f9bce432f313f41a48fbeb20904'
    }
    }
    
    var connectionString ="wqyaxmlxfuulhm:4dad3085894c732b154f0f72ed1fd710d3b91f9bce432f313f41a48fbeb20904@ec2-54-247-103-43.eu-west-1.compute.amazonaws.com:5432/ddfgncd5j40oav?ssl=true";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }