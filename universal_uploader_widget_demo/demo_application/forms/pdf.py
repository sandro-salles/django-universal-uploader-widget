from django import forms

from universal_uploader_widget.widgets import PdfUploaderWidget


class ExamplePdfForm(forms.ModelForm):

    class Meta:
        widgets = {
            'pdf': PdfUploaderWidget(),
            'pdf2': PdfUploaderWidget(),
            'pdf3': PdfUploaderWidget(),
        }
        fields = '__all__'


class ExamplePdfInlineForm(forms.ModelForm):

    class Meta:
        widgets = {
            'pdf': PdfUploaderWidget(),
        }
