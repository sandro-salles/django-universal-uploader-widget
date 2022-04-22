from django.db import models


class ExampleAudioModel(models.Model):
    audio = models.FileField('Audio', null=True, blank=True)

    audio2 = models.FileField('Audio 2')

    audio3 = models.FileField('Audio 3', null=True, blank=True)

    def __str__(self):
        return 'Example Audio Model'

    class Meta:
        verbose_name = 'Example Audio Model'
        verbose_name_plural = 'Example Audio Models'


class ExampleModelAudio(models.Model):
    example = models.ForeignKey(ExampleAudioModel, on_delete=models.CASCADE)
    audio = models.FileField('Audio')


class AnotherModalAudiosExample(models.Model):
    example = models.ForeignKey(ExampleAudioModel, on_delete=models.CASCADE)
    audio = models.FileField('Audio')


class StackedAudioExample(models.Model):
    example = models.ForeignKey(ExampleAudioModel, on_delete=models.CASCADE)
    title = models.CharField('Example', max_length=100)
    text = models.TextField('Text')
    audio = models.ImageField('Audio')
