exports.dbConfig = {
	user: "sa",
	password: "ronald22",
	server: "RONALD",
	database: "RecordatorioMedico",
	port: 1433,
	options: {
        encrypt: true
    }
};

exports.webPort = process.env.PORT || 1337;
exports.httpMsgsFormat = "JSON";