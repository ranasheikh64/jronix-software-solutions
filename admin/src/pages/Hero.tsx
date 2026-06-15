import { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import apiClient from '../api/client';

export default function Hero() {
  const [data, setData] = useState({
    title: '',
    subtitle: '',
    words: [] as string[]
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await apiClient.get('/hero');
      if (res.data) {
        setData(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiClient.post('/hero', data);
      alert('Saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleAddWord = () => {
    setData({ ...data, words: [...data.words, ''] });
  };

  const handleUpdateWord = (index: number, value: string) => {
    const newWords = [...data.words];
    newWords[index] = value;
    setData({ ...data, words: newWords });
  };

  const handleRemoveWord = (index: number) => {
    const newWords = data.words.filter((_, i) => i !== index);
    setData({ ...data, words: newWords });
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Hero Section</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Subtitle</label>
          <textarea
            value={data.subtitle}
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 h-24"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-slate-400">Typewriter Words</label>
            <button
              onClick={handleAddWord}
              className="text-sm bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 transition"
            >
              <Plus size={14} /> Add Word
            </button>
          </div>
          
          <div className="space-y-3">
            {data.words.map((word, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={word}
                  onChange={(e) => handleUpdateWord(index, e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => handleRemoveWord(index)}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
