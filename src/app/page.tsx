import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function IntroPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-50">
          Welcome to InsightFlow
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          This application provides a powerful suite of tools for predictive maintenance.
          Monitor your machinery, analyze historical data, and predict failures before they happen.
        </p>
        <div className="mt-10">
          <Link href="/dashboard">
            <Button size="lg">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}