exports.dbConfig = {
	user: "sa",
	password: "ronald22",
	server: "RONALDCP",
	database: "RecordatorioMedico",
	port: 1433,
	options: {
        encrypt: true
    }
};

exports.webPort = process.env.PORT || 3000;
exports.httpMsgsFormat = "JSON";