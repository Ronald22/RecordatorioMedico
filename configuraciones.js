exports.dbConfig = {
    userName: 'sa', // update me
    password: 'ronald22', // update me
    server: 'localhost', // update me
    port: 1433,
    options: {
        database: 'RecordatorioMedico', //update me
        encrypt: true
    }
};

exports.webPort = process.env.PORT || 3000;
exports.httpMsgsFormat = "JSON";