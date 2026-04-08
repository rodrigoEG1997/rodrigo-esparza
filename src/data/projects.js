const projects = [
  {
    id: 1,
    title: 'NLP & Deep Q-Network for Stock Trading',
    subtitle: 'MSc AI Thesis',
    description:
      'Real-time NLP pipeline that analyses international financial news and forecasts market impact, integrated with a Deep Q-Network reinforcement learning agent for autonomous trading decisions.',
    impact: 'End-to-end system combining NER, sentiment analysis, and custom financial impact models with an RL agent for market decision-making.',
    tags: ['Python', 'spaCy', 'Transformers', 'PyTorch', 'Reinforcement Learning', 'NLP', 'MySQL'],
    github: null,
    demo: null,
    featured: true,
  },
  {
    id: 2,
    title: 'LLM AI Chatbot for Customer Service',
    subtitle: 'MASTTRO — Production System',
    description:
      'Architected and deployed a production-grade LLM chatbot capable of handling over 1 million requests per second, significantly reducing customer service response times.',
    impact: 'Handled 1M+ requests/second in production, dramatically improving service efficiency and responsiveness at scale.',
    tags: ['LLMs', 'RAG', 'Python', 'API Design', 'Azure'],
    github: null,
    demo: null,
    featured: true,
  },
  {
    id: 3,
    title: 'Sales Overlap Analysis System',
    subtitle: 'Arca Continental',
    description:
      'Machine learning system to detect market cannibalization across branches using location data, inventory records, and sales history — surfacing actionable distribution strategies.',
    impact: '10% reduction in financial losses from expired products and improved inventory management across all branches.',
    tags: ['Python', 'scikit-learn', 'Clustering', 'SQL Server', 'Pandas', 'Matplotlib'],
    github: null,
    demo: null,
    featured: true,
  },
  {
    id: 4,
    title: 'Personal Finance Simulator',
    subtitle: 'Educational Web App',
    description:
      'Interactive financial simulation game used in university personal finance courses. Players make daily financial decisions across scenarios; administrators configure outcomes and probabilities.',
    impact: 'Deployed in active academic use, teaching financial literacy to students through gamified scenario-based learning.',
    tags: ['Angular', 'Django', 'MySQL', 'Azure', 'Python'],
    github: null,
    demo: null,
    featured: false,
  },
  {
    id: 5,
    title: 'COVID-19 Economic Impact Analysis',
    subtitle: 'Data Analytics Project',
    description:
      'Comprehensive data warehouse and interactive Tableau dashboard analysing the economic impact of COVID-19 on Mexico versus global peers, covering the top 20 Mexican companies and 5 international benchmarks.',
    impact: 'Integrated national and global datasets into a unified warehouse powering multi-dimensional economic trend analysis.',
    tags: ['Python', 'MySQL', 'Tableau', 'ETL', 'Data Warehousing'],
    github: null,
    demo: null,
    featured: false,
  },
];

export default projects;
