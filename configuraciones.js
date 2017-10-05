exports.dbConfig = {
    userName: 'Ronald', // update me
    password: '1234', // update me
    server: 'RonaldR', // update me
    port:49172,
    options: {
        database: 'RecordatorioMedico', //update me
        encrypt: true
    }
};

exports.webPort = process.env.PORT || 3000;
exports.httpMsgsFormat = "JSON";