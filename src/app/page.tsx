'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function IntroPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <motion.div
        className="text-center max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-50"
          variants={itemVariants}
        >
          Welcome to InsightFlow
        </motion.h1>
        <motion.p
          className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          variants={itemVariants}
        >
          This application provides a powerful suite of tools for predictive maintenance.
          Monitor your machinery, analyze historical data, and predict failures before they happen.
        </motion.p>
        <motion.div
          className="mt-10"
          variants={itemVariants}
        >
          <Link href="/dashboard">
            <Button size="lg">
              Go to Dashboard
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}