import tradingBotImg from '../assets/automation/projects/trading_bot.jpg';
import nlpImg from '../assets/automation/projects/DQN.jpg';
import dqn_project from '../assets/automation/projects/dqn_project.png';

import chatbot from '../assets/automation/projects/chatbot.jpeg';
import chatbotArch from '../assets/automation/projects/chatbot_arch.jpg';
import chatbotImg from '../assets/automation/projects/chat_llm.png';

import automationImg from '../assets/automation/projects/automation.webp';
import etlAutomation from '../assets/automation/projects/ETL_automation.jpg';
import etlArch from '../assets/automation/projects/ETL_arch.png';

import finance from '../assets/automation/projects/finance_simulator.png';
import finance_title from '../assets/automation/projects/finance.jpeg';
import finance_arch from '../assets/automation/projects/financial_web.jpg';

import iot from '../assets/automation/projects/iot.jpg';
import iot_sim from '../assets/automation/projects/iot_simulator.png';
import iot_arch from '../assets/automation/projects/iot_arch.jpg';


const projects = [
  {
    id: 1,
    title: 'NLP & Deep Q-Network for Stock Trading',
    profile_image: tradingBotImg,
    images: [
      nlpImg,
      dqn_project,
    ],
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
    profile_image: chatbot,
    images: [
      chatbotArch,
      chatbotImg,
    ],
    subtitle: 'Masttro',
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
  title: 'ETL Automation for Financial Data',
  profile_image: automationImg,
  images: [
    etlAutomation,
    etlArch,
  ],
  subtitle: 'Masttro',
  description:
    'Selenium-based ETL automation built to fetch, consolidate, and load client financial data from external financial portals into a centralized database for visualization within Masttro’s wealth management platform.',
  impact:
    'Reduced manual data collection effort, improved data consolidation accuracy, and enabled faster visualization of client financial information in a single platform.',
  tags: ['Python', 'Selenium', 'ETL', 'SQL Server', 'Automation', 'Data Extraction'],
  github: null,
  demo: null,
  featured: true,
},
  {
    id: 4,
    title: 'Personal Finance Simulator',
    profile_image: finance_title,
    images: [
      finance_arch,
      finance,
    ],
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
  title: 'IoT Worker Tracking & Safety Monitoring System',
  profile_image: iot,
  images: [
    iot_arch,
    iot_sim,
  ],
  subtitle: 'Ternium',
  description:
    'Implemented a real-time IoT worker tracking system using wearable chips and a centralized dashboard that allowed managers to monitor worker locations, detect unauthorized zone entry, and improve operational safety within hazardous steel manufacturing environments.',
  impact:
    'Improved worker safety by enabling real-time monitoring and instant alerts for restricted zone access, reducing accident risks in high-temperature steel production facilities.',
  tags: ['Python', 'IoT', 'Real-Time Tracking', 'Django', 'MySQL', 'Wearable Technology'],
  github: null,
  demo: null,
  featured: true,
},
];

export default projects;
