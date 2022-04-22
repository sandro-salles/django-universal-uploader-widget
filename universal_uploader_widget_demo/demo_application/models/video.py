from django.db import models


class ExampleVideoModel(models.Model):
    video = models.FileField('Video', null=True, blank=True)

    video2 = models.FileField('Video 2')

    video3 = models.FileField('Video 3', null=True, blank=True)

    def __str__(self):
        return 'Example Video Model'

    class Meta:
        verbose_name = 'Example Video Model'
        verbose_name_plural = 'Example Video Models'


class ExampleModelVideo(models.Model):
    example = models.ForeignKey(ExampleVideoModel, on_delete=models.CASCADE)
    video = models.FileField('Video')


class AnotherModalVideosExample(models.Model):
    example = models.ForeignKey(ExampleVideoModel, on_delete=models.CASCADE)
    video = models.FileField('Video')


class StackedVideoExample(models.Model):
    example = models.ForeignKey(ExampleVideoModel, on_delete=models.CASCADE)
    title = models.CharField('Example', max_length=100)
    text = models.TextField('Text')
    video = models.ImageField('Video')
