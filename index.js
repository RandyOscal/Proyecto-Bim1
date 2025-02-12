import { config } from "dotenv"
import { initServer } from "./configs/server.js"

config()
initServer()

console.log("estoy ejecutando este archivo")