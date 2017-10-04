exports.dbConfig = {
	user: "sa",
	password: "ronald22",
<<<<<<< HEAD
	server: "RONALD\\RONALDCP",
=======
	server: "localhost\\RONALDCP",
>>>>>>> parent of 094d2e7... version 0.6
	database: "RecordatorioMedico",
	port: 1433,
	options: {
        encrypt: true
    }
};

exports.webPort = process.env.PORT || 3000;
exports.httpMsgsFormat = "JSON";