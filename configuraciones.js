exports.dbConfig = {
    userName: 'sa', // update me
    password: 'ronald22', // update me
    server: 192.168.0.13, // update me
    port:49172,
    options: {
        database: 'RecordatorioMedico', //update me
        encrypt: true
    }
};

exports.webPort = process.env.PORT || 3000;
exports.httpMsgsFormat = "JSON";