from flask import Flask, render_template, send_file
from datetime import datetime, timezone
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html', current_year=datetime.now(timezone.utc).year)

@app.route('/resume')
def resume():
    # Place your resume PDF as 'resume.pdf' in the root portfolio folder
    resume_path = os.path.join(os.path.dirname(__file__), 'resume.pdf')
    if os.path.exists(resume_path):
        return send_file(resume_path, as_attachment=False)
    else:
        return "<h2 style='color:white;text-align:center;margin-top:50px;font-family:sans-serif;'>Resume PDF not found.<br>Place your resume.pdf in the portfolio folder.</h2>", 404

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
