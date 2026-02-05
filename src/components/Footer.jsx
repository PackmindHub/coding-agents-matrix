export default function Footer() {
  return (
    <div className="mt-8 text-center">
      <div className="inline-block">
        <p className="text-slate-500 text-sm font-light tracking-wider">
          Powered by <a
            href="https://packmind.com?utm_source=coding-agent-matrix"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            Packmind
          </a>
        </p>
        <div className="mt-2 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      </div>
    </div>
  )
}
