import { useTheme } from '../context/ThemeContext';

const THEMES = [
  { id: 'pastel', label: '🌸 Pastel' },
  { id: 'earth', label: '🌿 Earth' },
  { id: 'dark-slate', label: '🌙 Slate' },
  { id: 'dark-forest', label: '🌲 Forest' },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <select 
      value={theme} 
      onChange={(e) => setTheme(e.target.value)}
      className="glass text-theme-text-main px-4 py-1.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-theme-primary cursor-pointer appearance-none text-center"
      style={{ backgroundImage: 'none' }} // Remove default select arrow for cleaner look
    >
      {THEMES.map(t => (
        <option key={t.id} value={t.id} className="text-black bg-white">{t.label}</option>
      ))}
    </select>
  );
}
