from ordered_model.serializers import OrderedModelSerializer

from .models import Project


class ProjectSerializer(OrderedModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
