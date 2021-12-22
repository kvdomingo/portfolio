from csv import reader
from svip.models import BlogPost


with open("./static/svip/data/blog186.csv", "r", encoding="utf-8") as f:
    data = reader(f, delimiter=",")
    for row in data:
        head = [
            "created",
            "modified",
            "subject_id",
            "title",
            "body",
            "cover",
            "slug",
            "status",
            "keywords",
        ]
        data_dict = dict((head, data[1:]))
        b = BlogPost(**data_dict)
        b.save()
        print(f"Uploaded {b}")
