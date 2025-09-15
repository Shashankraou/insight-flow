'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { runHistoricalAnalysis } from './actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  predictionData: z.string().min(1, 'Prediction data cannot be empty.'),
  significanceLevel: z.coerce.number().min(0.001).max(0.999),
  minimumDataPoints: z.coerce.number().int().min(1),
});

type HistoricalAnalysisResult = {
  analysisResult: string;
  isSufficientData: boolean;
};

const exampleData = JSON.stringify([
    { "actual": 1, "predicted": 1 },
    { "actual": 0, "predicted": 1 },
    { "actual": 0, "predicted": 0 },
    { "actual": 1, "predicted": 0 },
  ], null, 2);

export default function HistoricalAnalysisPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const [result, setResult] = useState<HistoricalAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      predictionData: '',
      significanceLevel: 0.05,
      minimumDataPoints: 30,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const analysisResult = await runHistoricalAnalysis(values);
      setResult(analysisResult);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Historical Performance Analysis</CardTitle>
              <CardDescription>
                Evaluate model performance using historical prediction data. Provide data in JSON format.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="predictionData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prediction Data (JSON)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your JSON data here..."
                        className="min-h-[200px] font-mono"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                        An array of objects with 'actual' and 'predicted' keys.{" "}
                        <Button type="button" variant="link" size="sm" className="p-0 h-auto" onClick={() => form.setValue('predictionData', exampleData)}>
                            Load example
                        </Button>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="significanceLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Significance Level</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="minimumDataPoints"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Data Points</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Run Analysis
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="lg:col-span-1">
        <Card className="h-full sticky top-[76px]">
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {!isLoading && error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {!isLoading && result && (
              <Alert variant={result.isSufficientData ? 'default' : 'destructive'}>
                {result.isSufficientData ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                <AlertTitle>{result.isSufficientData ? 'Analysis Complete' : 'Warning'}</AlertTitle>
                <AlertDescription>
                  <pre className="whitespace-pre-wrap font-sans">{result.analysisResult}</pre>
                </AlertDescription>
              </Alert>
            )}
            {!isLoading && !result && !error && (
              <p className="text-sm text-muted-foreground">
                Results will be displayed here after running the analysis.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
