const mongoose = require('mongoose')
require('dotenv').config()

const {MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV} = process.env

const connectionString = NODE_ENV === 'test' 
	? MONGO_DB_URI_TEST
	: MONGO_DB_URI

// console.info(connectionString)

if(!connectionString){
	console.error('Recuerda que tienes que tener un archiivo .env con las variables de entorno definidas y el MONGO_DB_URI que servira de connection string. En las clases usamos MongoDB atlas pero puedes utilizar cualquier base de datos de MongoDB (local incluso)')
}


// Conexion a mongodb
mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}).then(() => {
		console.info('Database connected')
	}).catch((error) => {
		console.error(error)
	})
