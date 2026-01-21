import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { API_ENDPOINTS } from '../config/api';

export function Profile() {
  const { token } = useAuth();
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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
    fetchProfile();
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
    <div className="flex justify-center bg-black text-white py-16">
      <div className="w-full max-w-md bg-[#16181c] rounded-2xl p-6 shadow-lg border border-gray-800">
        <h2 className="text-xl font-bold mb-4 text-center text-white">Meu Perfil</h2>
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
    </div>
  );
}
