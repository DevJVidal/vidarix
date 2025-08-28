export default function Footer() {
  return (
    <footer className="p-5 text-center text-gray-400 mt-10 relative">
      &copy; 2025 Vidarix. Todos os direitos reservados.

      {/* Bolha minimalista */}
      <div className="absolute -top-4 right-4 bg-white/10 text-gray-300 px-3 py-1 rounded-full backdrop-blur-sm text-sm font-medium">
        🧑🏻‍💻 Desenvolvido por Janderson Vidal
      </div>
    </footer>
  );
}
