exports.dbConfig = {
    userName: 'Ronald', // update me
    password: '1234', // update me
    server: '186.70.166.100', // update me
    port:49172,
    options: {
        database: 'RecordatorioMedico', //update me
        encrypt: true
    }
};

exports.webPort = process.env.PORT || 3000;
exports.httpMsgsFormat = "JSON";