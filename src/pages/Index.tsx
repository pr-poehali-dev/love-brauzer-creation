import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

interface HistoryItem {
  id: string;
  title: string;
  url: string;
  visitedAt: Date;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    { id: '1', title: 'Google', url: 'https://google.com' },
    { id: '2', title: 'YouTube', url: 'https://youtube.com' },
    { id: '3', title: 'GitHub', url: 'https://github.com' }
  ]);
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: '1', title: 'Wikipedia', url: 'https://wikipedia.org', visitedAt: new Date() },
    { id: '2', title: 'Stack Overflow', url: 'https://stackoverflow.com', visitedAt: new Date(Date.now() - 3600000) }
  ]);
  const [activeTab, setActiveTab] = useState('home');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        title: `Поиск: ${searchQuery}`,
        url: `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`,
        visitedAt: new Date()
      };
      setHistory(prev => [newHistoryItem, ...prev]);
      setSearchQuery('');
    }
  };

  const addBookmark = (title: string, url: string) => {
    const newBookmark: Bookmark = {
      id: Date.now().toString(),
      title,
      url
    };
    setBookmarks(prev => [...prev, newBookmark]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral/10 via-sky/10 to-mint/10">
      {/* Browser Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Browser Controls */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-coral"></div>
              <div className="w-3 h-3 rounded-full bg-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-mint"></div>
            </div>
            
            <div className="flex-1 max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Введите поисковый запрос или URL..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-16 text-lg rounded-2xl border-2 border-gray-200 focus:border-coral transition-all duration-300 bg-white/90"
                />
                <Icon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-coral hover:bg-coral/80 text-white rounded-xl"
                >
                  <Icon name="ArrowRight" size={16} />
                </Button>
              </form>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="rounded-xl">
                <Icon name="Download" size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-xl">
                <Icon name="Settings" size={18} />
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1">
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('home')}
              className="rounded-xl bg-gradient-to-r from-coral to-sky text-white hover:from-coral/80 hover:to-sky/80"
            >
              <Icon name="Home" size={16} className="mr-2" />
              Главная
            </Button>
            <Button
              variant={activeTab === 'bookmarks' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('bookmarks')}
              className={activeTab === 'bookmarks' ? 'bg-mint text-white hover:bg-mint/80 rounded-xl' : 'rounded-xl'}
            >
              <Icon name="Bookmark" size={16} className="mr-2" />
              Закладки
            </Button>
            <Button
              variant={activeTab === 'history' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('history')}
              className={activeTab === 'history' ? 'bg-yellow text-plum hover:bg-yellow/80 rounded-xl' : 'rounded-xl'}
            >
              <Icon name="History" size={16} className="mr-2" />
              История
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center py-16">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-coral via-sky to-mint bg-clip-text text-transparent mb-4">
                Love Brauzer
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Современный браузер с синхронизацией закладок и истории между всеми вашими устройствами
              </p>
            </div>

            {/* Quick Access */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-coral/5 to-coral/10 border-coral/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-coral/20 rounded-2xl">
                      <Icon name="Search" size={24} className="text-coral" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Умный поиск</h3>
                      <p className="text-sm text-gray-600">Мгновенные результаты</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-coral text-coral">Активно</Badge>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-sky/5 to-sky/10 border-sky/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-sky/20 rounded-2xl">
                      <Icon name="Sync" size={24} className="text-sky" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Синхронизация</h3>
                      <p className="text-sm text-gray-600">На всех устройствах</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-sky text-sky">Подключено</Badge>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-mint/5 to-mint/10 border-mint/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-mint/20 rounded-2xl">
                      <Icon name="Shield" size={24} className="text-mint" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Приватность</h3>
                      <p className="text-sm text-gray-600">Защищенный просмотр</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-mint text-mint">Защищено</Badge>
                </CardContent>
              </Card>
            </div>

            {/* Popular Bookmarks */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Популярные сайты</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {bookmarks.slice(0, 6).map((bookmark) => (
                  <Card key={bookmark.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-coral to-sky rounded-2xl mx-auto mb-3 flex items-center justify-center">
                        <Icon name="Globe" size={20} className="text-white" />
                      </div>
                      <h3 className="font-medium text-sm text-gray-800 truncate">{bookmark.title}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-800">Закладки</h2>
              <Button 
                onClick={() => addBookmark('Новая закладка', 'https://example.com')}
                className="bg-mint hover:bg-mint/80 text-white rounded-xl"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить
              </Button>
            </div>
            
            <div className="grid gap-4">
              {bookmarks.map((bookmark) => (
                <Card key={bookmark.id} className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-mint to-sky rounded-xl flex items-center justify-center">
                        <Icon name="Bookmark" size={16} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{bookmark.title}</h3>
                        <p className="text-sm text-gray-600">{bookmark.url}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeBookmark(bookmark.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">История просмотров</h2>
            
            <div className="grid gap-4">
              {history.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow to-coral rounded-xl flex items-center justify-center">
                        <Icon name="History" size={16} className="text-plum" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{item.url}</span>
                          <span>•</span>
                          <span>{item.visitedAt.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;