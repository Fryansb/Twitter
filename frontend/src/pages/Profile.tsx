import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { API_ENDPOINTS } from '../config/api';
import { Layout } from '../components/Layout';

interface UserInfo {
  id: number;
  email: string;
  username: string;
}

export function Profile() {
  const { token } = useAuth();
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [followers, setFollowers] = useState<UserInfo[]>([]);
  const [following, setFollowing] = useState<UserInfo[]>([]);
  const [activeTab, setActiveTab] = useState<'edit' | 'connections'>('edit');

  console.log('🔍 Profile component - token:', token ? token.substring(0, 20) + '...' : 'null');

  useEffect(() => {
    async function fetchProfile() {
      if (!token) {
        console.log('❌ Token não encontrado!');
        return;
      }
      console.log('🔍 Buscando perfil com token:', token.substring(0, 20) + '...');
      
      try {
        const resp = await fetch(API_ENDPOINTS.PROFILE, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log('📡 Response status:', resp.status);
        
        if (resp.ok) {
          const data = await resp.json();
          console.log('✅ Dados do perfil:', data);
          setEmail(data.email);
          setBio(data.bio || '');
        } else {
          const errorData = await resp.json();
          console.log('❌ Erro ao buscar perfil:', errorData);
        }
      } catch (error) {
        console.error('❌ Erro na requisição:', error);
      }
    }

    async function fetchConnections() {
      if (!token) return;
      
      try {
        const resp = await fetch(API_ENDPOINTS.FOLLOWERS_FOLLOWING, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (resp.ok) {
          const data = await resp.json();
          setFollowers(data.followers || []);
          setFollowing(data.following || []);
        }
      } catch (error) {
        console.error('Erro ao buscar conexões:', error);
      }
    }

    fetchProfile();
    fetchConnections();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    
    console.log('📝 Enviando dados do perfil...');
    console.log('Token:', token.substring(0, 20) + '...');
    console.log('API URL:', API_ENDPOINTS.PROFILE);
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('bio', bio);
    if (password) formData.append('password', password);
    if (avatar) formData.append('avatar', avatar);

    console.log('FormData entries:');
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const resp = await fetch(API_ENDPOINTS.PROFILE, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      console.log('Response status:', resp.status);
      
      if (resp.ok) {
        const data = await resp.json();
        console.log('Sucesso:', data);
        setMessage('Perfil atualizado com sucesso!');
      } else {
        const errorData = await resp.json();
        console.log('Erro:', errorData);
        setMessage('Erro: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMessage('Erro de conexão: ' + error);
    }
  };

  return (
    <Layout>
      <div className="border-b border-gray-800 p-4">
        <h2 className="text-xl font-bold text-white">Perfil</h2>
        
        {/* Tabs */}
        <div className="flex mt-4 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'edit'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-500'
            }`}
          >
            Editar Perfil
          </button>
          <button
            onClick={() => setActiveTab('connections')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'connections'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-500'
            }`}
          >
            Conexões
          </button>
        </div>
      </div>

      {/* Conteúdo das Tabs */}
      <div className="p-4">
        {activeTab === 'edit' ? (
          <div className="max-w-md mx-auto">
            {message && (
              <p className="text-center text-sm text-green-500 mb-3">{message}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-gray-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="E-mail"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Bio</label>
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full bg-transparent border border-gray-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-blue-500 outline-none resize-none h-24"
                  placeholder="Bio"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Nova senha</label>
                <input
                  type="password"
                  placeholder="Nova senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-transparent border border-gray-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Avatar</label>
                <input
                  type="file"
                  onChange={e => setAvatar(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition-all duration-200"
              >
                Salvar
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Seguidores */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">
                  Seguidores ({followers.length})
                </h3>
                <div className="space-y-3">
                  {followers.length === 0 ? (
                    <p className="text-gray-500">Nenhum seguidor ainda</p>
                  ) : (
                    followers.map(user => (
                      <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-900 rounded-lg">
                        <img
                          src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg"
                          alt={user.username}
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-white">{user.username}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Seguindo */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">
                  Seguindo ({following.length})
                </h3>
                <div className="space-y-3">
                  {following.length === 0 ? (
                    <p className="text-gray-500">Você ainda não segue ninguém</p>
                  ) : (
                    following.map(user => (
                      <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-900 rounded-lg">
                        <img
                          src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg"
                          alt={user.username}
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-white">{user.username}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
