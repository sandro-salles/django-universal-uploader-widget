from django import forms

from universal_uploader_widget.widgets import VideoUploaderWidget


class ExampleVideoForm(forms.ModelForm):

    class Meta:
        widgets = {
            'video': VideoUploaderWidget(),
            'video2': VideoUploaderWidget(),
            'video3': VideoUploaderWidget(),
        }
        fields = '__all__'


class ExampleVideoInlineForm(forms.ModelForm):

    class Meta:
        widgets = {
            'video': VideoUploaderWidget(),
        }
