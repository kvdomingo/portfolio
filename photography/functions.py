from datetime import datetime
from typing import Any

from cloudinary import CloudinaryImage
from cloudinary.api import resources


def build_url(public_id: str) -> str:
    return CloudinaryImage(public_id).build_url(
        crop="scale",
        dpr="auto",
        width="auto",
        responsive=True,
        responsive_placeholder="blank",
        secure=True,
    )


def get_resources(path: str, order="date") -> list[dict[str, Any]]:
    images = resources(prefix=path, type="upload", max_results=500, secure=True)["resources"]
    if order == "date":
        images = sorted(
            images,
            key=lambda k: datetime.strptime(k["created_at"], "%Y-%m-%dT%H:%M:%SZ"),
            reverse=True,
        )
    images = [
        {
            "url": build_url(i["public_id"]),
            "publicId": i["public_id"],
            "width": i["width"],
            "height": i["height"],
        }
        for i in images
    ]
    return images
