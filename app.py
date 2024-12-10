from flask import Flask, request, render_template, redirect, url_for
from flask.signals import request_started
import shutil
import datetime
from datetime import datetime
import os


app = Flask(__name__)
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Store carousel data
carousel_data = []

#clear images before start
if(os.path.exists(UPLOAD_FOLDER)):
    for name in os.listdir(UPLOAD_FOLDER):
        path=os.path.join(UPLOAD_FOLDER, name)
        os.remove(path)
else:
    os.makedirs(UPLOAD_FOLDER)



@app.route('/')
def index():
    return render_template('index_carousell.html', carousel_data=carousel_data)

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the uploaded file
        image = request.files['image']
        #
        caption = request.form.get('caption', '')
        text = request.form.get('text', '')

        if image:
            # Save the image
            
            filepath=save_file(image)

            # Add to carousel data
            carousel_data.append({'image_url': filepath, 'caption': caption, 'text': text})

        return redirect(url_for('index'))
    return render_template('index_carousell_input.html', carousel_data=carousel_data)

@app.route('/edit_slide/<int:slide_index>', methods=['POST'])
def edit_slide(slide_index):
    if 0 <= slide_index < len(carousel_data):
        carousel_data[slide_index]['caption'] = request.form.get('caption', '')
        carousel_data[slide_index]['text'] = request.form.get('text', '')
    return redirect(url_for('upload'))

@app.route('/delete_slide/<int:slide_index>', methods=['POST'])
def delete_slide(slide_index):
    if 0 <= slide_index < len(carousel_data):
        image=carousel_data[slide_index]['image_url']
        if os.path.exists(image):
            os.remove(image)
        del carousel_data[slide_index]
    return redirect(url_for('upload'))

@app.route('/move_slide/<int:slide_index>/<direction>', methods=['POST'])
def move_slide(slide_index, direction):
    if direction == 'up' and slide_index>0:
        carousel_data[slide_index], carousel_data[slide_index - 1] = carousel_data[slide_index - 1], carousel_data[slide_index]
    elif direction == 'down' and slide_index < len(carousel_data) - 1:
        carousel_data[slide_index], carousel_data[slide_index + 1] = carousel_data[slide_index + 1], carousel_data[slide_index]
    elif slide_index==0 and direction=='up' or slide_index== len(carousel_data)-1 and direction=='down':
        carousel_data[0], carousel_data[len(carousel_data)-1] = carousel_data[len(carousel_data)-1], carousel_data[0]
    return redirect(url_for('upload'))

def save_file(image):
    
    filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{image.filename}"
    
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    image.save(filepath)
    print("image saved")
    if not os.path.exists(filepath):
        print("not properly")
    else:
        ("image also exists!")
    return filepath

@app.route('/clear_uploads', methods=['POST'])
def clear_uploads():
    shutil.rmtree(UPLOAD_FOLDER)
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    return "Uploads cleared", 200

@app.route('/<string:page>')
def page(page):
    try:
        return render_template(page)
    except Exception:
        return "Page not found", 404

#request_started.connect(clear_images_on_start_to_declutter, app)
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)

