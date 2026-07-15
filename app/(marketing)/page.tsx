import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-brandBlue">Income aur Caste Certificate Form Bharna Ab Aasaan</h1>
        <p className="mt-3 text-slate-700">Aadhaar aur documents upload kijiye. AI automatically details fill karega aur mistakes batayega.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/login" className="rounded-lg bg-brandBlue px-4 py-2 text-white">Start Free</Link>
          <Link href="/dashboard" className="rounded-lg border border-brandBlue px-4 py-2 text-brandBlue">Demo Dekhein</Link>
        </div>
      </section>
    </main>
  );
}
