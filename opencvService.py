import json
from datetime import datetime
import opencvController
import time
from random import *

current_time = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
startTime=time.time()

json_body = [
    {
        "measurement": "BB",
        "time": current_time,
        "fields": {
            "netChange": randint(1, 100),
        }
    }
]

def getDateAndTime(value, points):
    lstDates = []
    for point in points:
        lstDates.append(point['time'].split('T'))

    if value == "date":
        return lstDates

    return lstDates


def getNetChanges(points):
    lstNetChanges = []
    for point in points:
        lstNetChanges.append(point['netChange'])

    return lstNetChanges[-1]


def triggerUpdate():
    opencvController.sendData(json_body)
    res = opencvController.getResponse()
    points = res.get_points()
    return points


'''def activityUpdate():
    while True:
        triggerUpdate()
        time.sleep(5.0)
'''
print(getDateAndTime("", triggerUpdate()))


