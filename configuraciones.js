exports.dbConfig = {
	user: "sa",
	password: "ronald22",
	server: "192.168.0.13\\RONALDCP",
	database: "RecordatorioMedico",
	port: 1433,
	options: {
        encrypt: true
    }
};

exports.webPort = process.env.PORT || 3000;
exports.httpMsgsFormat = "JSON";