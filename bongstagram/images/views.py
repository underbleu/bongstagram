from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from bongstagram.users import models as user_models
from bongstagram.users import serializers as user_serializers
from bongstagram.notifications import views as notification_views

class Images(APIView):
    
    def get(self, request, format=None):
        
        user = request.user
        
        following_users = user.following.all()
        
        image_list = []
        
        for following_user in following_users:
            
            user_images = following_user.images.all()[:2]
            
            for image in user_images:
                
                image_list.append(image)
        
        my_images = user.images.all()[:2]
        
        for image in my_images:
            
            image_list.append(image)
            
        sorted_images = sorted(image_list, key=lambda image: image.created_at, reverse=True)
        
        serializer = serializers.ImageSerializer(sorted_images, many=True, context={'request': request})
        
        return Response(serializer.data)
        
    def post(self, request, format=None):
        
        user = request.user
        
        serializer = serializers.InputImageSerializer(data=request.data)
        
        if serializer.is_valid():
            
            serializer.save(creator=user) # Image Model has creator
            
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
            
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LikeImage(APIView):
    
    def get(self, request, image_id, format=None):
        
        likes = models.Like.objects.filter(image__id=image_id)
        
        like_creators_ids = likes.values('creator_id') 
        
        users = user_models.User.objects.filter(id__in=like_creators_ids)
        
        serializer = user_serializers.ListUserSerializer(users, many=True, context={'request': request})
        
        return Response(data=serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request, image_id, format=None):
        
        user = request.user
        
        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        try: 
            preexisting_like = models.Like.objects.get(
                creator=user,
                image=found_image
            )
            
            return Response(status=status.HTTP_304_NOT_MODIFIED)
            
        except models.Like.DoesNotExist:
            new_like = models.Like.objects.create(
                creator=user,
                image=found_image
            )
            
            new_like.save() # Like
            
            # Create notification for like
            notification_views.create_notification(user, found_image.creator, 'like', found_image)
            
            return Response(status=status.HTTP_201_CREATED)


class UnLikeImage(APIView):
    
    def delete(self, request, image_id, format=None):
        
        user = request.user
        
        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        try:
            preexisting_like = models.Like.objects.get(
                creator=user,
                image=found_image
            )
            
            preexisting_like.delete()
            
            return Response(status.HTTP_202_ACCEPTED)
            
        except models.Like.DoesNotExist:
            
            return Response(status.HTTP_304_NOT_MODIFIED)

class CommentOnImage(APIView):
    
    def post(self, request, image_id, format=None):
        
        user = request.user
        
        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
            
        serializer = serializers.CommentSerializer(data=request.data)
        
        if serializer.is_valid():
            
            serializer.save(creator=user, image=found_image)
            
            # Create notification for comment
            notification_views.create_notification(
                user, found_image.creator,
                'comment',
                found_image,
                serializer.data['message'] # serializer.data = python object / request.data = json object
            )
            
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
            
        else:
            
            return Response(data=serializer.error, status=status.HTTP_400_BAD_REQUEST)



class Comment(APIView):
    
    def delete(self, request, comment_id, format=None):
        
        user = request.user
        
        try:
            comment = models.Comment.objects.get(id=comment_id, creator=user) # login한 유저의 댓글만 지울수 있도록 제한
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except models.Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class Search(APIView):
  
    def get(self, request, format=None):

        hashtags = request.query_params.get('hashtags', None)

        if hashtags is not None:

            hashtags = hashtags.split(",")

            images = models.Image.objects.filter(
                tags__name__in=hashtags).distinct()

            serializer = serializers.ImageSerializer(
                images, many=True, context={'request': request})

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        else:

            images = models.Image.objects.all()[:20]
            serializer = serializers.ImageSerializer(
                images, many=True, context={'request': request})
            return Response(data=serializer.data, status=status.HTTP_200_OK)


class ModerateComment(APIView):
    
    def delete(self, request, image_id, comment_id, format=None):
        
        user = request.user
        
        try:
            comment = models.Comment.objects.get(
                id=comment_id, image__id=image_id, image__creator=user)
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except models.Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ImageDetail(APIView):
    
    def find_own_image(self, image_id, user):
        
        try:
            image = models.Image.objects.get(id=image_id, creator=user) # Image update, delete -> only creator
            return image
        except models.Image.DoesNotExist:
            return None

    def get(self, request, image_id, format=None):
        
        try:
            # Image detail -> anyone
            image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = serializers.ImageSerializer(image, context={'request': request})
        
        return Response(data=serializer.data, status=status.HTTP_200_OK)
        
    
    def put(self, request, image_id, format=None):
        
        user = request.user
        
        image = self.find_own_image(image_id, user)
        
        if image is None:
            
            return Response(status=status.HTTP_400_BAD_REQUEST)
            
        serializer = serializers.InputImageSerializer(image, data=request.data, partial=True) # Update image object with request.data
        
        if serializer.is_valid():
            
            serializer.save(creator=user)
            
            return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)
        else:
            
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, image_id, format=None):
        
        user = request.user
        
        image = self.find_own_image(image_id, user)
        
        if image is None:
            
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        image.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)