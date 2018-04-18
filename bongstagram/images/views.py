from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers

class ListAllImages(APIView):

    def get(self, request, format=None): # GET method
        
        all_images = models.Image.objects.all() # DB에 있는 모든 이미지 가져오기
        
        serializer = serializers.ImageSerializer(all_images, many=True) # python -> json 오브젝트로 변환하여 data에 저장
        
        return Response(data=serializer.data)


class ListAllComments(APIView):
    
    def get(self, request, format=None):
        
        all_comments = models.Comment.objects.all()
        
        serializer = serializers.CommentSerializer(all_comments, many=True)
        
        return Response(data=serializer.data)


class ListAllLikes(APIView):
    
    def get(self, request, format=None):
        
        all_likes = models.Like.objects.all()
        
        serializer = serializers.LikeSerializer(all_likes, many=True)
        
        return Response(data = serializer.data)