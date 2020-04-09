from cloudinary import CloudinaryImage
from cloudinary.api import resources
from datetime import datetime


def build_url(query):
    full = []
    for i, im in enumerate(query):
        query[i]['url'] = CloudinaryImage(im['url']).build_url(
            crop='scale',
            dpr='auto',
            width='auto',
            responsive=True,
            responsive_placeholder='blank',
            secure=True,
        )
        full.append(CloudinaryImage(im['url']).build_url(
            crop='scale',
            secure=True,
            width=1080,
        ))
    return zip(query, full)

def get_resources(path, order='date'):
    images = resources(
        prefix=path,
        type='upload',
        max_results=500,
        secure=True,
    )['resources']
    if order == 'date':
        images = sorted(images, key=lambda k: datetime.strptime(k['created_at'], "%Y-%m-%dT%H:%M:%SZ"), reverse=True)
    elif order == 'name':
        images = sorted(images, key=lambda k: k['public_id'])
    images = [{
        'url': i['public_id'],
        'width': i['width'],
        'height': i['height'],
    } for i in images]
    images = build_url(images)
    return images
