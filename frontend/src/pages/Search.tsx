import { useState } from 'react';
import { Search as SearchIcon, UserPlus, UserMinus } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useAuth } from '../hooks/useAuth';
import API_BASE_URL from '../config/api';

interface SearchResult {
  id: number;
  email: string;
  username: string;
  bio: string;
  is_following: boolean;
}

export function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !token) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/search/?q=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erro ao buscar usuários');
      
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId: number) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/users/toggle-follow/${userId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Erro ao seguir/desseguir');

      // Atualiza o estado local
      setResults(results.map(user => 
        user.id === userId 
          ? { ...user, is_following: !user.is_following }
          : user
      ));
    } catch (error) {
      console.error('Erro ao seguir/desseguir:', error);
    }
  };

  return (
    <Layout>
      <div className="border-b border-gray-800 p-4">
        <h2 className="text-xl font-bold text-white">Buscar Usuários</h2>
      </div>

      <div className="p-4">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por email..."
              className="w-full bg-gray-900 text-white rounded-full py-3 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 disabled:opacity-50"
            >
              <SearchIcon size={20} />
            </button>
          </div>
        </form>

        {loading && (
          <div className="text-center text-gray-500 py-8">
            Buscando...
          </div>
        )}

        {!loading && results.length === 0 && query && (
          <div className="text-center text-gray-500 py-8">
            Nenhum usuário encontrado para "{query}"
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-4">
            {results.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg"
                    alt={user.username}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <div className="font-bold text-white">{user.username}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                    {user.bio && (
                      <div className="text-sm text-gray-400 mt-1">{user.bio}</div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleFollow(user.id)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                    user.is_following
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {user.is_following ? (
                    <>
                      <UserMinus size={16} />
                      <span>Seguindo</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      <span>Seguir</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
