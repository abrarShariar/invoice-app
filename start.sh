#!/bin/bash

# script to kick start the frontend, node-api and mongoDB

until
    nohup mongod &
    nohup npm start --prefix ./frontend &
    nohup npm start --prefix ./node-api &
do
    "Trying again"
done