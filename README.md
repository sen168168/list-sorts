# ListSorting


Simple web app to sort lists with options for A-Z, Z-A, and Random order. Supports input in comma-separated format or numbered vertical lists, preserving the original format in the output.

---

## Features

- Input multiple lists separated by s blank line
- Detects list format (comma-separated or numbered vertical)
- Sort options: A-Z, Z-A, Random
- Optional toggle to show or hide numbering in the sorted output
- Uses Flask backend with Python for sorting logic
- Simple and clean UI with JavaScript controls

---

## How to Use

1. Enter your lists in the input box:
   - Comma-separated: `apple, banana, cherry`
   - Vertically:  
     ```
     apple
     banana
     cherry
     ```
2. Select sorting method for each list.
3. Click **Confirm** to sort.
4. Use the checkbox to toggle numbering in the results.

---

## Running Locally

Make sure you have Python and Flask installed:

```bash
pip install flask
```

then run it

```bash
python app.py
```
lastly open your browser and visit it locally: http://localhost:5000

