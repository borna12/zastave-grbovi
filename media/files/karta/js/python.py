import json
import io
import locale
import icu
collator = icu.Collator.createInstance(icu.Locale('hr_HR.UTF-8'))
with io.open("podatci.json", "r", encoding="utf-8") as file:
    broken_database = json.load(file)
    broken_database.sort(key=lambda case: case["title"]) 

with io.open("podatci2.json", "w", encoding="utf-8") as file:
    json.dump(broken_database, file, indent=2, ensure_ascii=False)

print(broken_database)