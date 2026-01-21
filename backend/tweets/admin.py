from django.contrib import admin
from .models import Tweet, Comment


@admin.register(Tweet)
class TweetAdmin(admin.ModelAdmin):
    list_display = ['id', 'author', 'content_preview', 'likes_count', 'created_at']
    list_filter = ['created_at']
    search_fields = ['content', 'author__email']
    readonly_fields = ['created_at']
    
    def content_preview(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Conteúdo'
    
    def likes_count(self, obj):
        return obj.likes.count()
    likes_count.short_description = 'Curtidas'


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'author', 'tweet_preview', 'content_preview', 'created_at']
    list_filter = ['created_at']
    search_fields = ['content', 'author__email']
    readonly_fields = ['created_at']
    
    def tweet_preview(self, obj):
        return f"Tweet #{obj.tweet.id}"
    tweet_preview.short_description = 'Tweet'
    
    def content_preview(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Comentário'
