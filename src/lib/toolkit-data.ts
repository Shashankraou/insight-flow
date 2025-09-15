import { BarChart2, TestTube2, FlaskConical, Sigma, FileText, Network, ThumbsUp, AreaChart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ToolkitPage {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: LucideIcon;
}

export const toolkitPages: ToolkitPage[] = [
  {
    slug: 'exploratory-data-analysis',
    title: 'T1: Exploratory Data Analysis (EDA)',
    shortTitle: 'EDA',
    description: 'Explore and visualize data to summarize its main characteristics. This involves using graphical techniques and statistical methods to discover patterns, spot anomalies, and check assumptions before formal modeling.',
    icon: BarChart2,
  },
  {
    slug: 'statistical-sampling',
    title: 'T2: Statistical Sampling & Confidence Intervals',
    shortTitle: 'Sampling',
    description: 'Learn techniques for selecting a subset of individuals from a statistical population to estimate characteristics of the whole population. Understand concepts like random sampling, bias, and bootstrapping to construct confidence intervals.',
    icon: TestTube2,
  },
  {
    slug: 'hypothesis-testing',
    title: 'T3: Hypothesis Testing & A/B Testing',
    shortTitle: 'Hypothesis Testing',
    description: 'Conduct statistical tests to determine if there is enough evidence in a sample of data to infer that a certain condition is true for the entire population. This includes t-tests, p-values, and methods for A/B testing.',
    icon: FlaskConical,
  },
  {
    slug: 'probability-distributions',
    title: 'T4: Probability Distributions',
    shortTitle: 'Probability',
    description: 'Study key probability distributions like Normal, Binomial, and Poisson. Understand their properties and applications in statistical inference and modeling real-world phenomena.',
    icon: Sigma,
  },
  {
    slug: 'text-data-analysis',
    title: 'T5: Text Data Processing & Analysis',
    shortTitle: 'Text Analysis',
    description: 'Implement techniques to process and analyze unstructured text data. This covers n-gram models, topic modeling with Gibbs sampling, word clouds, and an introduction to recurrent neural networks for text.',
    icon: FileText,
  },
  {
    slug: 'network-analysis',
    title: 'T6: Network Analysis',
    shortTitle: 'Network Analysis',
    description: 'Analyze complex networks using graph theory. Concepts include betweenness centrality, eigenvector centrality, and PageRank to understand relationships and importance within a network.',
    icon: Network,
  },
  {
    slug: 'recommender-systems',
    title: 'T7: Recommender Systems',
    shortTitle: 'Recommenders',
    description: 'Build systems that predict user preferences. Methods include collaborative filtering, matrix factorization, and popularity-based recommendations to provide personalized suggestions.',
    icon: ThumbsUp,
  },
  {
    slug: 'time-series-analysis',
    title: 'T8: Time Series Analysis & Forecasting',
    shortTitle: 'Time Series',
    description: 'Analyze and forecast time-ordered data points. Techniques include decomposition to identify components like trend and seasonality, autocorrelation analysis, and moving average models.',
    icon: AreaChart,
  },
];

export const getToolkitDataBySlug = (slug: string): ToolkitPage | undefined => {
  return toolkitPages.find(p => p.slug === slug);
};
