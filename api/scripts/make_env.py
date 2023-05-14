import json
import re
from pathlib import Path

from loguru import logger
from mako.template import Template

from .get_secret_string import get_secret_string

BASE_DIR = Path(__file__).parent.parent

GCP_PROJECT = "my-projects-306716"


def make_env():
    template = Template(filename=str(BASE_DIR / "scripts" / "templates" / ".env.mako"))
    env = template.render(
        SECRET_KEY=get_secret_string("SECRET_KEY"),
        CLOUDINARY_API_KEY=get_secret_string("CLOUDINARY_API_KEY"),
        CLOUDINARY_API_SECRET=get_secret_string("CLOUDINARY_API_SECRET"),
        CLOUDINARY_CLOUD_NAME=get_secret_string("CLOUDINARY_CLOUD_NAME"),
        CLOUDINARY_ASSETS_LOCATION=get_secret_string("CLOUDINARY_ASSETS_LOCATION"),
        DATABASE_URL=get_secret_string("DATABASE_URL"),
        DJANGO_SUPERUSER_USERNAME=get_secret_string("SUPERUSER_USERNAME"),
        DJANGO_SUPERUSER_PASSWORD=get_secret_string("SUPERUSER_PASSWORD"),
        DJANGO_SUPERUSER_EMAIL=get_secret_string("SUPERUSER_EMAIL"),
    )
    credentials = get_secret_string("CLOUDSQL_PROXY_CREDENTIALS")

    envrc = []
    for line in env.split("\n"):
        if len(line) > 0 and not re.match(r"^\s+$", line):
            envrc.append(f"export {line}")
        else:
            envrc.append(line)

    with open(BASE_DIR / ".env", "w+") as f_env, open(
        BASE_DIR / ".envrc", "w+"
    ) as f_envrc, open(BASE_DIR / "credentials.json", "w+") as f_creds:
        f_env.write(env)
        f_envrc.writelines(envrc)
        json.dump(credentials, f_creds)
    logger.info("env ok")


if __name__ == "__main__":
    make_env()
