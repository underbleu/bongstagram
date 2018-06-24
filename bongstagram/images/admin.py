from django.contrib import admin
from . import models

@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):
    
    list_display_links = (
        'file',
    )
    
    search_fields = (
        'location',
        'caption'
    )
    
    list_filter = (
        'location',
        'creator',
    )
    
    list_display = (
        'id',
        'file',
        'creator',
        'created_at',
        'photoToken',
        'txHash',
        'copyrightIssue',
        'originalOwner',
        'prevOwner',
        'currentOwner'
        # 'updated_at',
        # 'location',
        # 'caption',
    )

@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    
    list_display = (
        'id',
        'message',
        'creator',
        'image',
        'created_at',
        'updated_at',
    )

@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    
    list_display = (
        'id',
        'creator',
        'image',
        'created_at',
        'updated_at',
    )