const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://Gorusuke:joseandres123@cluster0.seojk.mongodb.net/App'


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
