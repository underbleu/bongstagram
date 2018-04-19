from django.db import models
from bongstagram.users import models as user_models


class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True


class Image(TimeStampedModel):

    """ Image Model """

    file = models.ImageField()
    location = models.CharField(max_length=140)
    caption = models.TextField()
    creator = models.ForeignKey(
        user_models.User, # Create relationship between User and Image
        related_name='images', # Create backward relationship to User
        null=True,
        on_delete=models.PROTECT # required in Django 2.0
    )
    
    @property # Not DB, Just function
    def like_count(self):
        return self.likes.all().count() # 'likes': Backward relationship from Image Model

    def __str__(self):
        return '{} - {}'.format(self.location, self.caption)
    
    class Meta:
        ordering = ['-created_at']


class Comment(TimeStampedModel):

    """ Comment Model """

    message = models.TextField()
    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, null=True)
    image = models.ForeignKey(
        Image,
        related_name='comments', # 'comments': Backward relationship to Image Model
        null=True, 
        on_delete=models.PROTECT
    )
    
    def __str__(self):
        return self.message
        
    class Meta:
        ordering = ['-created_at']


class Like(TimeStampedModel):

    """ Like Model """

    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, null=True)
    image = models.ForeignKey(
        Image, 
        related_name='likes', # 'likes': Backward relationship to Image Model
        null=True, 
        on_delete=models.PROTECT
    )
    
    def __str__(self):
        return 'User: {} - Image Caption: {}'.format(self.creator.username, self.image.caption)