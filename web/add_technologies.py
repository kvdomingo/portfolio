import os, sys
sys.path.append('.')
sys.path.append('..')

from dotenv import load_dotenv
load_dotenv()

import django
django.setup()

import json
from django.conf import settings
from web.models import Technology


def main():
    with open(
        os.path.join(
            settings.BASE_DIR,
            "frontend/static/frontend/js/components/Landing/Technologies.json",
        ),
        'r',
    ) as f:
        data = json.load(f)

    CATEGORY_CHOICES = [
        ('BE', 'Backend'),
        ('FE', 'Frontend'),
        ('DV', 'Data & Vis'),
        ('CI', 'CI/CD & Platforms'),
    ]

    CAT = {k: v for v, k in CATEGORY_CHOICES}

    for category in data:
        for dat in data[category]:
            obj = Technology.objects.create(
                category=CAT[category],
                alt=dat['alt'],
                url=dat['src'],
            )
            status = 'Created' if obj else 'Error at'
            print(f"{status} {str(obj)}")


if __name__ == '__main__':
    main()
