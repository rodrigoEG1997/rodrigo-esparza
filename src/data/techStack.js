import aiImag from '../assets/images/tech_stack/ai.webp'
import lenguajesImag from '../assets/images/tech_stack/lenguajes.webp'
import backImag from '../assets/images/tech_stack/back.jpg'
import analytics from '../assets/images/tech_stack/analytics.jpeg'
import frontend from '../assets/images/tech_stack/frontend.jpeg'
import automation from '../assets/images/tech_stack/automation.jpg'
import devops from '../assets/images/tech_stack/devops.jpeg'

const experienceCards = [
  {
    title: 'AI & Machine Learning',
    subtitle: 'Models, LLMs & Intelligent Systems',
    image: aiImag,
    skills: [
      'Machine Learning',
      'Deep Learning',
      'NLP',
      'LLMs',
      'RAG Architecture',
      'Reinforcement Learning',
      'Neural Networks',
      'Sentiment Analysis',
      'Time Series Forecasting',
      'PyTorch',
      'TensorFlow',
      'Scikit-learn',
    ],
    highlights: [
      {
        title: 'AI Solution Development',
        description:
          'Designed and developed AI-driven solutions focused on solving real-world business challenges through scalable and practical implementations.',
      },
      {
        title: 'Model Engineering',
        description:
          'Built Machine Learning, Deep Learning, and NLP models from data exploration and preprocessing to training, evaluation, and deployment.',
      },
      {
        title: 'LLM & Generative AI',
        description:
          'Worked with Large Language Models, RAG architectures, and prompt engineering to create intelligent automation and conversational systems.',
      },
    ],
  },

  {
    title: 'Languages',
    subtitle: 'Python, SQL, JavaScript & more',
    image: lenguajesImag,
    skills: [
      'Python',
      'SQL',
      'JavaScript',
      'TypeScript',
      'Java',
      'C++',
      'C#',
      'Bash',
    ],
    highlights: [
      {
        title: 'Backend Programming',
        description:
          'Strong experience using Python and SQL for backend development, automation, data processing, and scalable application development.',
      },
      {
        title: 'Software Engineering Fundamentals',
        description:
          'Solid understanding of object-oriented programming, data structures, algorithms, and software optimization techniques.',
      },
      {
        title: 'Full-Stack Versatility',
        description:
          'Hands-on experience across frontend and backend technologies, enabling the development of complete end-to-end solutions.',
      },
    ],
  },

  {
    title: 'Backend Developer',
    subtitle: 'APIs, Databases & Architecture',
    image: backImag,
    skills: [
      'Django',
      'FastAPI',
      'RESTful APIs',
      'SQLAlchemy',
      'MySQL',
      'MongoDB',
      'SQL Server',
      'API Integration',
    ],
    highlights: [
      {
        title: 'Scalable Backend Systems',
        description:
          'Developed scalable backend architectures to support web applications, internal tools, and data-intensive systems.',
      },
      {
        title: 'API Development',
        description:
          'Designed and integrated RESTful APIs to connect frontend applications, databases, and third-party services efficiently.',
      },
      {
        title: 'System Architecture',
        description:
          'Focused on building maintainable and reliable systems with strong attention to performance, integration, and scalability.',
      },
    ],
  },

  {
    title: 'Data & Analytics',
    subtitle: 'Analysis, Visualization & BI',
    image: analytics,
    skills: [
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Tableau',
      'Matplotlib',
      'Seaborn',
      'Plotly',
      'Excel',
      'Power Query',
      'Data Visualization',
    ],
    highlights: [
      {
        title: 'Data Analysis',
        description:
          'Performed data collection, cleaning, transformation, and analysis to generate actionable business insights and strategic recommendations.',
      },
      {
        title: 'Visualization & Reporting',
        description:
          'Created dashboards, KPIs, and visual reports to monitor operational performance and support data-driven decision making.',
      },
      {
        title: 'Business Intelligence',
        description:
          'Translated complex datasets into clear visual narratives for both technical and non-technical stakeholders.',
      },
    ],
  },

  {
    title: 'Frontend Developer',
    subtitle: 'React, Angular & UI Design',
    image: frontend,
    skills: [
      'React',
      'Angular',
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'Responsive Design',
      'UI/UX',
    ],
    highlights: [
      {
        title: 'Modern Web Interfaces',
        description:
          'Built responsive and user-friendly interfaces focused on usability, performance, and clean user experiences.',
      },
      {
        title: 'Administrative Platforms',
        description:
          'Developed internal tools, dashboards, and administrative platforms integrated with backend services and APIs.',
      },
      {
        title: 'End-to-End Development',
        description:
          'Worked across the full development lifecycle, from frontend implementation to backend integration and deployment.',
      },
    ],
  },

  {
    title: 'Data Engineer and Automations',
    subtitle: 'ETL Pipelines & Workflow Automation',
    image: automation,
    skills: [
      'ETL Pipelines',
      'Data Pipelines',
      'Workflow Automation',
      'Web Scraping',
      'API Automation',
      'Office 365 Automation',
      'PySpark',
      'Dask',
      'Data Warehousing',
    ],
    highlights: [
      {
        title: 'ETL & Data Pipelines',
        description:
          'Designed and maintained ETL workflows and data pipelines for processing large-scale structured and unstructured data.',
      },
      {
        title: 'Process Automation',
        description:
          'Automated repetitive workflows including API integrations, file processing, data ingestion, and operational tasks.',
      },
      {
        title: 'Data Reliability',
        description:
          'Focused on ensuring data quality, integrity, and availability across multiple systems and business operations.',
      },
    ],
  },

  {
    title: 'Cloud & DevOps',
    subtitle: 'AWS, Azure & CI/CD',
    image: devops,
    skills: [
      'AWS',
      'Azure',
      'Git',
      'GitHub',
      'MLOps',
      'CI/CD',
      'Cloud Deployment',
      'Version Control',
      'Linux',
    ],
    highlights: [
      {
        title: 'Cloud Infrastructure',
        description:
          'Deployed applications, AI solutions, and data systems using cloud platforms such as AWS and Azure.',
      },
      {
        title: 'Version Control & Collaboration',
        description:
          'Used Git and GitHub extensively for source control, collaborative development, and project management workflows.',
      },
      {
        title: 'MLOps & Deployment',
        description:
          'Applied DevOps and MLOps practices including model versioning, deployment, monitoring, and continuous integration.',
      },
    ],
  },
];

export default experienceCards;
