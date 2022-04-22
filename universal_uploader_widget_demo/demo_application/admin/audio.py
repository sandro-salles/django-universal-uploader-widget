from django.contrib import admin
from universal_uploader_widget.admin import UniversalUploaderInline

from .. import models
from .. import forms

class ExampleModelAudioAdmin(UniversalUploaderInline):
    model = models.ExampleModelAudio
    fields = ['audio']


class AnotherModalAudiosExampleAdmin(UniversalUploaderInline):
    model = models.AnotherModalAudiosExample
    fields = ['audio']


class StackedAudioExampleAdmin(admin.StackedInline):
    model = models.StackedAudioExample
    form = forms.ExampleAudioInlineForm
    extra = 1


class ExampleAudioAdmin(admin.ModelAdmin):
    form = forms.ExampleAudioForm
    inlines = [
        StackedAudioExampleAdmin,
        ExampleModelAudioAdmin,
        AnotherModalAudiosExampleAdmin,
    ]


admin.site.register(models.ExampleAudioModel, ExampleAudioAdmin)
