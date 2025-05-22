import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <Link href="/">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-300 cursor-pointer">
          🎬 Movie House
        </h1>
      </Link>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="px-4 py-2 text-sm rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:opacity-80 transition"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>
  );
}
