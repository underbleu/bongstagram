from django.conf.urls import url
from . import views

app_name = "images" # Django 2.0 need it.
urlpatterns = [
    url(
        regex=r"^$",
        view=views.Feed.as_view(),
        name="feed"
    ),
    url(
        regex=r"^(?P<image_id>\w+)/like/$",
        view=views.LikeImage.as_view(),
        name="like_image"
    ),
    url(
        regex=r"^(?P<image_id>\w+)/unlike/$",
        view=views.UnLikeImage.as_view(),
        name="unlike_image"
    ),
    url(
        regex=r"^(?P<image_id>\w+)/comments/$",
        view=views.CommentOnImage.as_view(),
        name="comment_image"
    ),
    url(
        regex=r"^(?P<image_id>\w+)/comments/(?P<comment_id>[0-9]+)/$",
        view=views.ModerateComment.as_view(),
        name="moderate_comment"
    ),
    url(
        regex=r"^comments/(?P<comment_id>[0-9]+)/$",
        view=views.Comment.as_view(),
        name="comment"
    ),
    url(
        regex=r"^search/$",
        view=views.Search.as_view(),
        name='search'
    )
]