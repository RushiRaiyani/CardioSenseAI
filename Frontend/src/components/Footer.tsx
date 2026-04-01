import { Heart, Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-20 pb-10">
      <div className="pt-10 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 dark:text-zinc-500 text-sm">
            © 2026 CardioSense AI. All rights reserved.
          </p>
          <p className="text-zinc-400 dark:text-zinc-600 text-xs text-center md:text-right max-w-md">
            Disclaimer: CardioSense AI is a decision support tool and does not replace professional medical advice, diagnosis, or treatment.
          </p>
        </div>
    </footer>
  );
}
