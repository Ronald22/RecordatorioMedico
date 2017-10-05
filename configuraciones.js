exports.dbConfig = {
    userName: 'Ronald', // update me
    password: '1234', // update me
    server: 'localhost', // update me
    port: 1433,
    options: {
        database: 'RecordatorioMedico', //update me
        encrypt: true
    }
};

exports.webPort = process.env.PORT || 3000;
exports.httpMsgsFormat = "JSON";