#!/usr/bin/env python
import os
from setuptools import setup, find_packages

f = open(os.path.join(os.path.dirname(__file__), 'README.md'))
readme = f.read()
f.close()

setup(
    name='django-universal-uploader-widget',
    version='0.2.1',
    description='Simple Universal Uploader Widget for Django-Admin',
    long_description=readme,
    long_description_content_type='text/markdown',
    author='Sandro Salles',
    author_email='sandro@snippet.com.br',
    url='https://github.com/sandro-salles/django-universal-uploader-widget',
    license='MIT',
    packages=find_packages(
        exclude=("universal_uploader_widget_demo.*",
                 "universal_uploader_widget_demo", )
    ),
    include_package_data=True,
    zip_safe=False,
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Environment :: Web Environment',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
    ],
    keywords='django,admin,widget,universal,uploader',
)
