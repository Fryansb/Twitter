# tweet/serializers.py
from rest_framework import serializers
from .models import Tweet
from .models import Tweet, Comment
from django.contrib.auth import get_user_model

User = get_user_model()

class TweetSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    author_id = serializers.IntegerField(source='author.id', read_only=True)  # <- ID do autor
    timestamp = serializers.DateTimeField(source='created_at', read_only=True)
    is_following = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()  # contador de likes
    liked_by_me = serializers.SerializerMethodField()  # se o usuário curtiu
    replies_count = serializers.SerializerMethodField()  # contador de comentários
    retweets_count = serializers.SerializerMethodField()  # contador de retweets (sempre 0 por enquanto)
    handle = serializers.SerializerMethodField()  # handle do autor

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'username', 'author_id', 'timestamp', 'is_following', 
                  'likes_count', 'liked_by_me', 'replies_count', 'retweets_count', 'handle']

    def get_username(self, obj):
        return obj.author.email.split("@")[0]

    def get_handle(self, obj):
        return obj.author.email.split("@")[0]

    def get_is_following(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            return obj.author.followers.filter(id=request.user.id).exists()
        return False

    def get_likes_count(self, obj):
        return obj.likes.count()
    
    def get_liked_by_me(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False
    
    def get_replies_count(self, obj):
        return obj.comments.count()
    
    def get_retweets_count(self, obj):
        return 0  # funcionalidade não implementada ainda


class CommentSerializer(serializers.ModelSerializer):
    author_email = serializers.ReadOnlyField(source='author.email')

    class Meta:
        model = Comment
        fields = ['id', 'tweet', 'author', 'author_email', 'content', 'created_at']
        read_only_fields = ['author', 'author_email', 'created_at', 'tweet']

class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ['email', 'password', 'bio', 'avatar']

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance