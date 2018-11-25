from flask import Flask, render_template, request, redirect, url_for
import opencvService
from apscheduler.schedulers.background import BackgroundScheduler

# def backgroundPost():
#     #redirect(url_for('activityAnalysis'))
#     #return netChange

app = Flask(__name__)

@app.route('/activityAnalysis', methods=['POST', 'GET'])
def activityAnalysis():
    result = opencvService.triggerUpdate()
    netChange = opencvService.getNetChanges(result)
    return render_template("activityAnalysis.html", netChange=netChange)

sched = BackgroundScheduler(daemon=True)
sched.add_job(activityAnalysis,'interval',seconds=10)
sched.start()


@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run()
