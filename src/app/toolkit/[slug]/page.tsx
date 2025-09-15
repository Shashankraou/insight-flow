import { notFound } from 'next/navigation';
import { getToolkitDataBySlug, toolkitPages } from '@/lib/toolkit-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

type ToolkitPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return toolkitPages.map(page => ({
    slug: page.slug,
  }));
}

export default function ToolkitPage({ params }: ToolkitPageProps) {
  const pageData = getToolkitDataBySlug(params.slug);

  if (!pageData) {
    notFound();
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <pageData.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">{pageData.title}</CardTitle>
              <CardDescription>Data Science Toolkit</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">{pageData.description}</p>
        </CardContent>
      </Card>
      
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Toolkit Explorer</h3>
        <p className="text-muted-foreground mb-4">Further tools and visualizations for this topic would be displayed here.</p>
        <div className="p-8 rounded-lg border-2 border-dashed border-border flex items-center justify-center min-h-64 bg-background">
          <div className="text-center text-muted-foreground">
            <pageData.icon className="mx-auto h-12 w-12 mb-4" />
            <p>Interactive Component for {pageData.shortTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
