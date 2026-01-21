#!/usr/bin/env python
"""
Script para criar superusuário automaticamente no deploy
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'twitter_clone.settings')
django.setup()

from users.models import User

ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@twitter.com')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123456')

if not User.objects.filter(email=ADMIN_EMAIL).exists():
    User.objects.create_superuser(
        email=ADMIN_EMAIL,
        password=ADMIN_PASSWORD
    )
    print(f'✅ Superusuário criado: {ADMIN_EMAIL}')
else:
    print(f'ℹ️  Superusuário já existe: {ADMIN_EMAIL}')
