# Annomate - Your Annotation Friend

![Annomate](./frontend/src/assets/mascot.png)

Annomate is a simple tool for annotating images with bounding boxes. Perfect for creating training datasets for machine learning models.

## Features
- 🖼️ Easy image upload via drag & drop
- 📦 Draw bounding boxes around areas of interest
- 🏷️ Label annotations as success or failure types
- 💾 Auto-saves your work
- 📤 Export annotations and images as a ready-to-use dataset

## Quick Start (Easiest Method)

1. Install [Node.js](https://nodejs.org/) - Download and install the "LTS" version
   - On the Node.js website, click the big "LTS" download button
   - Run the installer you downloaded
   - Follow the installation steps (accept all defaults)

2. Download this project (click the green "Code" button above and select "Download ZIP")

3. Extract the ZIP file to a folder on your computer

4. Start the app:
   - On Windows: Double-click `start-app.bat`
   - On Mac/Linux: Double-click `start-app.sh`
   - Wait for the app to start (it might take a minute the first time)
   - Your web browser will automatically open to the app

## Alternative Method (Using Terminal)

If the quick start method doesn't work, you can try the manual method:

### Prerequisites
You only need to install these once:
1. Install [Node.js](https://nodejs.org/) - Download and install the "LTS" version
   - On the Node.js website, click the big "LTS" download button
   - Run the installer you downloaded
   - Follow the installation steps (accept all defaults)

### Running the App

#### First Time Setup
1. Download this project (click the green "Code" button above and select "Download ZIP")
2. Extract the ZIP file to a folder on your computer
3. Open Terminal (Mac/Linux) or Command Prompt (Windows)
   - On Mac: Press Cmd+Space, type "Terminal", press Enter
   - On Windows: Press Windows key, type "cmd", press Enter
4. In the terminal/command prompt, navigate to the project folder:
   ```bash
   cd path/to/extracted/folder/annomate/frontend
   ```
5. Install the required packages (one-time setup):
   ```bash
   npm install
   ```
6. Start the app:
   ```bash
   npm run dev
   ```
7. Open your web browser and go to: http://localhost:5173

#### Running Again Later
After the first-time setup, you only need to:
1. Open Terminal/Command Prompt
2. Navigate to the project folder:
   ```bash
   cd path/to/extracted/folder/annomate/frontend
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
4. Open your web browser and go to: http://localhost:5173

## Using the App

1. **Upload Images**
   - Drag and drop your images onto the upload area
   - Or click to select files from your computer

2. **Create Annotations**
   - Click and drag to draw boxes around areas of interest
   - Select the appropriate label from the left sidebar
   - Use the toolbar to undo or clear annotations

3. **Download Dataset**
   - When finished, click "Complete"
   - Click "Download Annotations & Images"
   - You'll get a ZIP file containing:
     - All your annotated images
     - A CSV file with annotation coordinates and labels

The CSV file format is:
```
image_name,label,x,y,width,height
image_0.jpg,success,100,200,50,30
```

## Need Help?
If you run into any issues:
1. Make sure Node.js is installed correctly
2. Try closing and reopening your terminal/command prompt
3. Make sure you're in the correct folder (the `frontend` folder)
4. Try running `npm install` again
5. If using the startup scripts doesn't work, try the manual method using Terminal

## For Machine Learning
The exported dataset is ready for machine learning tasks:
- Images are in standard formats (jpg/png)
- CSV contains normalized coordinates
- Labels are consistent and machine-readable
