from django.contrib import admin
from universal_uploader_widget.admin import UniversalUploaderInline

from .. import models
from .. import forms

class ExampleModelPdfAdmin(UniversalUploaderInline):
    model = models.ExampleModelPdf
    fields = ['pdf']


class AnotherModalPdfsExampleAdmin(UniversalUploaderInline):
    model = models.AnotherModalPdfsExample
    fields = ['pdf']


class StackedPdfExampleAdmin(admin.StackedInline):
    model = models.StackedPdfExample
    form = forms.ExamplePdfInlineForm
    extra = 1


class ExamplePdfAdmin(admin.ModelAdmin):
    form = forms.ExamplePdfForm
    inlines = [
        StackedPdfExampleAdmin,
        ExampleModelPdfAdmin,
        AnotherModalPdfsExampleAdmin,
    ]


admin.site.register(models.ExamplePdfModel, ExamplePdfAdmin)
