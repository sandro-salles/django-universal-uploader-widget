# Introduction

## Previews

### Simple Image Upload Widget

![Single File Uploader](./single.gif)

### Inline Multiple Images Upload

![Inline Multiple Images Upload](./multiple.gif)

## About

One of the things that i did't like in the **django-admin** is the arcaic appearance and usability of the forms, specially in the image upload, then i decided to create this plugin (for a use in a personal project, but i decided to publish here).

## Warning/Disclaimer

**Warning**: This was developed using the more recent version of django and i have not tested this with older django versions (because i created this for use in some recent projects). Is not my intentions to made this complete compatible with old versions of django, but if you want to try to use this with older versions of django and get some erros, please **contact-me** (or open a **issue** here) and we can talk about the errors and made this compatible to the version that you are geting errors.

## Install

### 1. Install using the pip:

```
pip install django-image-uploader-widget
```

### 2. Add this to the INSTALLED_APPS:

Go to your `settings.py` and add `universal_uploader_widget` to installed apps, then they like this:

```python
INSTALLED_APPS = [
    'my_app.apps.MyAppConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.forms',
    'universal_uploader_widget',
]
```

## Using for single Image File Uploader

### 1. Create the model in the models.py

```python
from django.db import models 

class ExampleModel(models.Model):
    image = models.ImageField('Image', null = True, blank = True)

    def __str__(self):
        return 'Example Model'

    class Meta:
        verbose_name = 'Example Model'
        verbose_name_plural = 'Example Models'
```

### 2. Create the form in the forms.py

```python
from django import forms
from universal_uploader_widget.widgets import ImageUploaderWidget

class ExampleForm(forms.ModelForm):

    class Meta:
        widgets = {
            'image': ImageUploaderWidget(),
        }
        fields = '__all__'
```

### 3. Create the admin in the admin.py

```python
from django.contrib import admin
from . import models
from . import forms

class ExampleAdmin(admin.ModelAdmin):
    form = forms.ExampleForm

admin.site.register(models.ExampleModel, ExampleAdmin)
```

## Using for multiple Image File Uploader Inline

This is designed to be used with a model to store **ONLY** the image. See a example:


### 1. The model in models.py

```python
from django.db import models

class ExampleModel(models.Model):
    image = models.ImageField('Image', null = True, blank = True)

    def __str__(self):
        return 'Example Model'

    class Meta:
        verbose_name = 'Example Model'
        verbose_name_plural = 'Example Models'

class ExampleModelImage(models.Model):
    example = models.ForeignKey(ExampleModel, on_delete = models.CASCADE)
    image = models.ImageField('Image')
```

**Note**: See that the **ExampleModelImage** is a model created to store only images, that are linked to the **ExampleModel**, like the photos of a product in a shop basic model.

### 2. Defining the inline editor in the admin.py

```python
from django.contrib import admin
from universal_uploader_widget.admin import ImageUploaderInline

from . import models
from . import forms

class ExampleModelImageAdmin(ImageUploaderInline):
    model = models.ExampleModelImage
    fields = ['image']

class ExampleAdmin(admin.ModelAdmin):
    form = forms.ExampleForm
    inlines = [ExampleModelImageAdmin]

admin.site.register(models.ExampleModel, ExampleAdmin)
```
