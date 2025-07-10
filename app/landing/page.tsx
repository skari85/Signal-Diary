import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-amber-50 to-amber-100">
      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/signal-diary-logo.png"
              alt="Signal Diary Logo"
              width={120}
              height={120}
              className="mx-auto rounded-2xl shadow-lg"
              style={{ background: '#fef7ed' }}
            />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight drop-shadow-sm">
            Signal Diary
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Track your phone signal issues easily. Simple, private, and made for everyone.
          </p>
          <Link href="/">
            <button className="mt-2 px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white text-lg font-semibold rounded-xl shadow-md transition">
              Enter
            </button>
          </Link>
        </div>
      </main>
      <footer className="w-full py-6 bg-amber-50 border-t border-amber-200 text-center text-slate-500 text-sm flex flex-col gap-2 items-center">
        <div className="flex gap-4 justify-center">
          <Link href="/history" className="hover:underline">History</Link>
          <span>|</span>
          <Link href="/patterns" className="hover:underline">Patterns</Link>
          <span>|</span>
          <Link href="/export" className="hover:underline">Export</Link>
          <span>|</span>
          <Link href="/settings" className="hover:underline">Settings</Link>
        </div>
        <div>© {new Date().getFullYear()} Signal Diary</div>
      </footer>
    </div>
  )
} 