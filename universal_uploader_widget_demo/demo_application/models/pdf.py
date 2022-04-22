from django.db import models


class ExamplePdfModel(models.Model):
    pdf = models.FileField('Pdf', null=True, blank=True)

    pdf2 = models.FileField('Pdf 2')

    pdf3 = models.FileField('Pdf 3', null=True, blank=True)

    def __str__(self):
        return 'Example Pdf Model'

    class Meta:
        verbose_name = 'Example Pdf Model'
        verbose_name_plural = 'Example Pdf Models'


class ExampleModelPdf(models.Model):
    example = models.ForeignKey(ExamplePdfModel, on_delete=models.CASCADE)
    pdf = models.FileField('Pdf')


class AnotherModalPdfsExample(models.Model):
    example = models.ForeignKey(ExamplePdfModel, on_delete=models.CASCADE)
    pdf = models.FileField('Pdf')


class StackedPdfExample(models.Model):
    example = models.ForeignKey(ExamplePdfModel, on_delete=models.CASCADE)
    title = models.CharField('Example', max_length=100)
    text = models.TextField('Text')
    pdf = models.ImageField('Pdf')
