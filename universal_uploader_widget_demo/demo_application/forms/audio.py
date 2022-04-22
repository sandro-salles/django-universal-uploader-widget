from django import forms

from universal_uploader_widget.widgets import AudioUploaderWidget


class ExampleAudioForm(forms.ModelForm):

    class Meta:
        widgets = {
            'audio': AudioUploaderWidget(),
            'audio2': AudioUploaderWidget(),
            'audio3': AudioUploaderWidget(),
        }
        fields = '__all__'


class ExampleAudioInlineForm(forms.ModelForm):

    class Meta:
        widgets = {
            'audio': AudioUploaderWidget(),
        }
