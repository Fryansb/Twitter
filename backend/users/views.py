# users/views.py
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import (
    UserSerializer,
    UserCreateSerializer,
    MyTokenObtainPairSerializer,
    UserUpdateSerializer
)
from rest_framework.permissions import AllowAny, IsAuthenticated

User = get_user_model()


# -------------------------------
# UserViewSet: lista/detalha usuários
# -------------------------------
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "create":  # criar usuário
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]  # outras ações exigem login


# -------------------------------
# Endpoint de cadastro (signup)
# -------------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = UserCreateSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(
            {'id': user.id, 'email': user.email},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------------------------
# Endpoint de autenticação JWT
# -------------------------------
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# -------------------------------
# Endpoint de perfil do usuário logado
# -------------------------------
@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def profile(request):
    """GET para ver o perfil e PATCH para atualizar"""
    user = request.user
    print(f"🔍 Profile request: {request.method} for user {user.email}")

    if request.method == 'GET':
        serializer = UserUpdateSerializer(user)
        print(f"📤 Sending profile data: {serializer.data}")
        return Response(serializer.data)

    if request.method == 'PATCH':
        print(f"📝 Update data received: {request.data}")
        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            print(f"✅ Profile updated successfully: {serializer.data}")
            return Response(serializer.data)
        print(f"❌ Validation errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------------------------
# Endpoint de seguir/desseguir
# -------------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_follow(request, user_id):
    """Segue ou desseguir outro usuário"""
    try:
        target_user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'detail': 'Usuário não encontrado.'}, status=404)

    if request.user == target_user:
        return Response({'detail': 'Você não pode seguir a si mesmo.'}, status=400)

    if target_user.followers.filter(id=request.user.id).exists():
        target_user.followers.remove(request.user)
        is_following = False
    else:
        target_user.followers.add(request.user)
        is_following = True

    return Response({
        'status': 'followed' if is_following else 'unfollowed',
        'is_following': is_following,
        'followers_count': target_user.followers.count()
    }, status=200)


# -------------------------------
# Endpoint de lista de seguidores e seguindo
# -------------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def followers_following(request):
    """Retorna lista de seguidores e quem o usuário está seguindo"""
    user = request.user
    
    # Lista de quem me segue (seguidores)
    followers = user.followers.all()
    followers_data = [{'id': u.id, 'email': u.email, 'username': u.email.split('@')[0]} for u in followers]
    
    # Lista de quem eu sigo (seguindo)
    following = user.following.all()
    following_data = [{'id': u.id, 'email': u.email, 'username': u.email.split('@')[0]} for u in following]
    
    return Response({
        'followers': followers_data,
        'followers_count': len(followers_data),
        'following': following_data,
        'following_count': len(following_data)
    }, status=200)


# -------------------------------
# Endpoint de busca de usuários por email
# -------------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_users(request):
    """Busca usuários por email (partial match)"""
    query = request.query_params.get('q', '').strip()
    
    if not query:
        return Response({'results': []}, status=200)
    
    # Busca usuários cujo email contém a query (case-insensitive)
    users = User.objects.filter(email__icontains=query).exclude(id=request.user.id)[:10]
    
    results = []
    for user in users:
        results.append({
            'id': user.id,
            'email': user.email,
            'username': user.email.split('@')[0],
            'bio': user.bio or '',
            'is_following': user.followers.filter(id=request.user.id).exists()
        })
    
    return Response({'results': results}, status=200)
