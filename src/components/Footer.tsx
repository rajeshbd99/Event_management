// src/components/Footer.tsx
"use client";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200/60">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500">© {new Date().getFullYear()} Event Management — Built with ❤️</div>
        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}
