from flask import Flask, render_template, request
import opencvService

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/activityAnalysis',methods = ['POST', 'GET'])
def activityAnalysis():
    #if request.method == 'POST':

    result = opencvService.triggerUpdate()
    netChange = opencvService.getNetChanges(result)

    return jsonify({'netChange':netChange})
    #return render_template("activityAnalysis.html",netChange=netChange)


if __name__ == '__main__':
    app.run()
