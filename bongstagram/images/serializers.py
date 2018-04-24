from rest_framework import serializers
from . import models
from bongstagram.users import models as user_model

class SmallImageSerializer(serializers.ModelSerializer):
    
    """ Userd for notifications"""
    
    class Meta:
        model = models.Image
        fields = (
            'file',
        )


class UserProfileImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Image
        fields = (
            'id',
            'file',
            'like_count',
            'comment_count'
        )


class FeedUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = user_model.User
        fields = (
            'username',
            'profile_image',
        )


class CommentSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)
    
    class Meta:
        model = models.Comment
        fields = (
            'id',
            'message',
            'creator'
        )


class LikeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Like
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    
    comments = CommentSerializer(many=True) # comments: backward relationship from Comment Model
    creator = FeedUserSerializer()
    
    class Meta:
        model = models.Image
        fields = (
            'id',
            'file',
            'location',
            'caption',
            'comments',
            'like_count', # property of Image Model
            'creator'
        )