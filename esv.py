import json
import requests
import time


def add_params(url, params):
    url += "?"
    for key in params:
        url += "{}={}&".format(key, params[key])
    return url.strip("&")


def clean_str(text):
    replacements = {
        "\n": "",
        "h2": "h4",
        "<a ": "<a target=\"_blank\" "
    }
    for key in replacements:
        text = text.replace(key, replacements[key])
    return text


with open("esv.key") as f:
    api_key = f.read()

url = "https://api.esv.org/v3/passage/html/"
tms_json_file = "docs/tms.json"

with open(tms_json_file) as f:
    tms = json.load(f)

for c in tms["categories"]:
    for t in c["topics"]:
        for v in t["verses"]:
            print(v["verse"])
            r = requests.get(
                add_params(url, {
                    "q": v["verse"].replace(" ", "+"),
                    "include-headings": "false",
                    "include-footnotes": "false",
                    "include-short-copyright": "false"
                }),
                headers={"Authorization": api_key}
            )
            v["text"] = clean_str(" ".join(json.loads(r.text)["passages"]))
            time.sleep(1) # to prevent 427 request-throttling errors

with open(tms_json_file, "w") as f:
    json.dump(tms, f, indent=3)
