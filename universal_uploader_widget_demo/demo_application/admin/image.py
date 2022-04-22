from django.contrib import admin
from universal_uploader_widget.admin import UniversalUploaderInline

from .. import models
from .. import forms


class ExampleModelImageAdmin(UniversalUploaderInline):
    model = models.ExampleModelImage
    fields = ['image']


class AnotherModalImagesExampleAdmin(UniversalUploaderInline):
    model = models.AnotherModalImagesExample
    fields = ['image']


class StackedExampleAdmin(admin.StackedInline):
    model = models.StackedExample
    form = forms.ExampleInlineForm
    extra = 1


class ExampleAdmin(admin.ModelAdmin):
    form = forms.ExampleForm
    inlines = [
        StackedExampleAdmin,
        ExampleModelImageAdmin,
        AnotherModalImagesExampleAdmin,
    ]


admin.site.register(models.ExampleModel, ExampleAdmin)
