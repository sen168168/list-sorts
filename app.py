from flask import Flask, render_template, request, jsonify
import random
import re
import sys
print("Starting app...", file=sys.stderr)

app = Flask(__name__)

def count_vowels(s):
    return sum(1 for c in s.lower() if c in 'aeiou')

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/sort", methods=["POST"])
def sort_lists():
    data = request.json
    results = []

    for entry in data:
        raw_items = entry["list"]
        method = entry["method"]

        # Clean up: remove "1.", "2." etc. from beginning
        items = [re.sub(r"^\s*\d+\.\s*", "", x).strip() for x in raw_items]

        try:
            items = [float(x) if x.replace('.', '', 1).lstrip('-').isdigit() else x for x in items]
        except:
            pass

        if method == "az":
            sorted_list = sorted(items, key=str)
        elif method == "za":
            sorted_list = sorted(items, key=str, reverse=True)
        elif method == "length↑":
            sorted_list = sorted(items, key=lambda x: len(str(x)))
        elif method == "length↓":
            sorted_list = sorted(items, key=lambda x: len(str(x)), reverse=True)
        elif method == "vowel↑":
            sorted_list = sorted(items, key=lambda x: count_vowels(str(x)))
        elif method == "vowel↓":
            sorted_list = sorted(items, key=lambda x: count_vowels(str(x)), reverse=True)
        elif method == "num↑":
            sorted_list = sorted(items, key=lambda x: float(x))
        elif method == "num↓":
            sorted_list = sorted(items, key=lambda x: float(x), reverse=True)
        elif method == "abs↑":
            sorted_list = sorted(items, key=lambda x: abs(float(x)))
        elif method == "abs↓":
            sorted_list = sorted(items, key=lambda x: abs(float(x)), reverse=True)
        elif method == "random":
            sorted_list = items[:]
            random.shuffle(sorted_list)
        else:
            sorted_list = items

        results.append(sorted_list)

    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)
