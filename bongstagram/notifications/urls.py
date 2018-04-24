from django.conf.urls import url
from . import views

app_name = "notifications" # Django 2.0 need it.
urlpatterns = [
    url(
        regex=r"^$",
        view=views.Notifications.as_view(),
        name="notifications"
    ),
]