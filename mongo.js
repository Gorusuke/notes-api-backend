const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI


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
