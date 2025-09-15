import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-6 h-6", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/>
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
      <path d="M12 2v2"/>
      <path d="M12 22v-2"/>
      <path d="m17 7 1.6-1.6"/>
      <path d="m5.4 18.6 1.6-1.6"/>
      <path d="M22 12h-2"/>
      <path d="M4 12H2"/>
      <path d="m18.6 18.6-1.6-1.6"/>
      <path d="m7 7-1.6-1.6"/>
    </svg>
);
