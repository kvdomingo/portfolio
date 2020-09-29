#!/bin/bash

python manage.py migrate
cd web || exit
python add_technologies.py
