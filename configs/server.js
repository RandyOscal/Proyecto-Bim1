'use strict'

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import multer from "multer";
import { dbConnection } from "./mongo.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import categoryRoutes from "../src/category/category.routes.js"
import productRoutes from "../src/product/product.routes.js"
import cartRoutes from "../src/cart/cart.routes.js"
import AddUserAdmin from "../src/auth/auth.controller.js"
import AddCategory from "../src/category/category.controller.js"
import { swaggerDocs, swaggerUi } from "./swagger.js"

const upload = multer()

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(upload.none())
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
    }));
        app.use(morgan("dev"))
        app.use(apiLimiter)
    }

    const routes = (app) => {
        app.use("/gestionSupermarket/v1/auth", authRoutes)
        app.use("/gestionSupermarket/v1/user", userRoutes)
        app.use("/gestionSupermarket/v1/category", categoryRoutes)
        app.use("/gestionSupermarket/v1/product", productRoutes)
        app.use("/gestionSupermarket/v1/cart", cartRoutes)
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    }

const conectarDB = async () => {
    try {
        await dbConnection()
    } catch (err) {
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try {
        middlewares(app)
        conectarDB()
        routes(app)
        AddUserAdmin()
        AddCategory()
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    } catch (err) {
        console.log(`Server init failed: ${err}`)
    }
}

