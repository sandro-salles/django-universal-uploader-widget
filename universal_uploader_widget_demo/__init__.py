import os

from django.core.wsgi import get_wsgi_application

"""
WSGI config for universal_uploader_widget_demo project.
It exposes the WSGI callable as a module-level variable named ``application``.
For more information on this file, see
https://docs.djangoproject.com/en/1.6/howto/deployment/wsgi/
"""


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "universal_uploader_widget_demo.settings")

application = get_wsgi_application()