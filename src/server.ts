import { AppDataSource,ensureDbExists } from "./data-source"
import express from 'express'
import { usersRoutes } from './users/users.routes'
import  errorHandler  from './_middleware/error-handler'

const app = express()
const port = process.env.PORT as unknown as number || 7000

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))



//db initilization
ensureDbExists()
    .then(() => {
        AppDataSource.initialize()
    .then( () => {
     console.log("Database connected")})
    .catch(error => console.log(error))})

//routes
app.use('/users', usersRoutes)

//global error handler
app.use(errorHandler)

//start server
app.listen(port, () => {
    console.log(`Server started at http://localhost:7000`)
})
