exports.dbConfig = {
    userName: 'sa', // update me
    password: 'ronald22', // update me
    server: 'RONALD\\RONALDCP', // update me
    port:49172,
    options: {
        database: 'RecordatorioMedico', //update me
        encrypt: true
    }
};

exports.webPort = process.env.PORT || 3000;
exports.httpMsgsFormat = "JSON";