from rest_framework import serializers
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)
from . import models
from bongstagram.users import models as user_model

class SmallImageSerializer(serializers.ModelSerializer):
    
    """ Used for notifications"""
    
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


class ImageSerializer(TaggitSerializer, serializers.ModelSerializer):
    
    comments = CommentSerializer(many=True) # comments: backward relationship from Comment Model
    creator = FeedUserSerializer()
    tags = TagListSerializerField()
    is_liked = serializers.SerializerMethodField()
    
    class Meta:
        model = models.Image
        fields = (
            'id',
            'file',
            'location',
            'caption',
            'comments',
            'like_count', # property of Image Model
            'comment_count',
            'creator',
            'tags',
            'natural_time',
            'is_liked',
            'photoToken'
        )
        
    def get_is_liked(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            try:
                models.Like.objects.get(creator__id=request.user.id, image__id=obj.id)
                return True
            except models.Like.DoesNotExist:
                return False
        return False


class InputImageSerializer(serializers.ModelSerializer):
    # for Image update
    class Meta:
        model = models.Image
        fields = (
            'id',
            'file',
            'location',
            'caption',
            'photoToken'
        )