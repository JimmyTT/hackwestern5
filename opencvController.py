import json
import requests
from datetime import datetime
from influxdb import InfluxDBClient

current_time = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
host = 'hackwestern5.purplelettuce.net'
port = 8086
username = 'influxadmin'
password = 'DragonBoard'
database = 'dbtest'
client = InfluxDBClient(host, port, username, password, database);

#POST
def sendData(jsonBody):
    client.write_points(jsonBody, 's', database)

#GET
def getResponse():
    response = client.query('SELECT * FROM "BB"')
    return response

    #client.create_database('dbtest')




