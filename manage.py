#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "universal_uploader_widget_demo.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)