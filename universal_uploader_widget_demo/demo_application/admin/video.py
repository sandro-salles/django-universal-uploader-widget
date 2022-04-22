from django.contrib import admin
from universal_uploader_widget.admin import UniversalUploaderInline

from .. import models
from .. import forms

class ExampleModelVideoAdmin(UniversalUploaderInline):
    model = models.ExampleModelVideo
    fields = ['video']


class AnotherModalVideosExampleAdmin(UniversalUploaderInline):
    model = models.AnotherModalVideosExample
    fields = ['video']


class StackedVideoExampleAdmin(admin.StackedInline):
    model = models.StackedVideoExample
    form = forms.ExampleVideoInlineForm
    extra = 1


class ExampleVideoAdmin(admin.ModelAdmin):
    form = forms.ExampleVideoForm
    inlines = [
        StackedVideoExampleAdmin,
        ExampleModelVideoAdmin,
        AnotherModalVideosExampleAdmin,
    ]


admin.site.register(models.ExampleVideoModel, ExampleVideoAdmin)
