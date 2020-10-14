#!/bin/bash

python manage.py migrate
cd web || exit 1
python add_technologies.py
