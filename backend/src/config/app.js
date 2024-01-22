import express from 'express'
import cors from 'cors'
import 'dotenv/config'

export default function setConfig(app) {
  // body parser
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // cors policy
  app.use(cors({
    origin: process.env.REACT_APP_URL,
    // origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  }))
}