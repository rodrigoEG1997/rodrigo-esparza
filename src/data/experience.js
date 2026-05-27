import itesm from '../assets/background/titles/Bachelor_Computer_Science.pdf';
import nci from '../assets/background/titles/Master_AI.pdf';
import miu from '../assets/background/titles/Title_Corporative_Finance.pdf';


import nci_1 from '../assets/background/nci_1.jpg';
import nci_2 from '../assets/background/nci_2.png';
import unir_1 from '../assets/background/unir_1.jpg';
import unir_2 from '../assets/background/UNIR_2.jpeg';
import miu_1 from '../assets/background/miu_1.jpg';
import miu_2 from '../assets/background/miu_2.webp';
import itesm_1 from '../assets/background/itesm_1.webp';
import itesm_2 from '../assets/background/itesm_2.png';

import dycsi_1 from '../assets/background/dycsi_1.jpg';
import gravitad_1 from '../assets/background/gravitad_1.jpeg';
import ternium_1 from '../assets/background/ternium_1.png';
import masttro_1 from '../assets/background/masttro_1.png';


export const experience = [
  {
    id: 1,
    role: 'AI Consultant',
    company: 'GRAVITAD',
    company_description: "GRAVITAD is a technology and digital solutions company focused on developing innovative software products, automation systems, and data-driven platforms that help businesses improve operational efficiency and accelerate digital transformation",
    location: 'Remote — Dublin, Ireland',
    period: 'Dec 2024 – Dec 2025',
    description: [
      'Designed technology architectures and logical workflows for 10+ startup projects, ensuring scalable and efficient AI integration.',
      'Selected appropriate AI algorithms and defined necessary implementation variables to optimize feature performance and business outcomes.',
      'Identified potential risks, improvement opportunities, and business ideas leveraging AI, delivering comprehensive technology plans for seamless adoption.',
    ],
    url: "https://gravitad.com/",
    images: [gravitad_1]
  },
  {
    id: 2,
    role: 'Data Engineer/Solution Engineer',
    company: 'MASTTRO',
    company_description: "MASTTRO is a global wealth management technology company that provides a centralized platform for ultra-high-net-worth families and financial advisors to aggregate, visualize, and manage complex financial data across multiple institutions and assets",
    location: 'Monterrey, Mexico',
    period: 'Jan 2021 – Jan 2024',
    description: [
      'Daily extraction of information from 50+ APIs serving over 1,000 users, retrieving up-to-date data and inserting it into the database efficiently.',
      'Designed and executed ETL pipelines to process 1+ million files daily in multiple formats (.txt, .json, .csv).',
      'Automated Office 365 email workflows to handle 50+ customer emails daily with attachments, ingesting data into the database seamlessly.',
      'Developed 100+ RESTful API services to support web application frontend, ensuring reliable and scalable data delivery.',
    ],
    url: "https://masttro.com",
    images: [masttro_1]
  },
  {
    id: 3,
    role: 'Backend Developer',
    company: 'TERNIUM',
    company_description: "TERNIUM is one of the leading steel manufacturing companies in the Americas, producing high-quality steel products for industries such as construction, automotive, energy, and infrastructure, while focusing on industrial innovation and operational excellence",
    location: 'Monterrey, Mexico',
    period: 'Aug 2018 – Dec 2018',
    visualPeriod: 'Jan 2018 – Dec 2018',
    paletteMix: 0.88,
    description: [
      'Designed and developed Django/Python APIs to provide real-time location tracking for 1,000+ industrial workers using CISCO Network infrastructure.',
      'Architected and implemented both NoSQL (MongoDB) and SQL (MySQL) databases, managing over 1 million daily inserts while optimizing performance.',
    ],
    url: "https://www.ternium.com/",
    images: [ternium_1]
  },
  {
    id: 4,
    role: 'Full Stack Developer',
    company: 'DYCSI',
    company_description: "DYCSI is a technology consulting and software development company specialized in digital transformation, data analytics, artificial intelligence, and enterprise solutions that help organizations optimize processes and improve business performance",
    location: 'Monterrey, Mexico',
    period: 'Jan 2019 – Jan 2020',
    description: [
      'Developed frontend (Mendix/HTML/CSS/JS) and backend (Django/Python/MySQL) for a banking loan application serving 1,000+ customers.',
      'Implemented ML algorithms (Random Forest, Decision Tree) to predict loan repayments and provide personalized recommendations.',
      'Applied K-Means clustering to segment clients, automating targeted marketing campaigns and improving customer engagement.',
      'Created KPIs and real-time visualizations to monitor the performance of 5,000+ processes, enabling data-driven decision-making.',
    ],
    url: "https://dycsi.net/",
    images: [dycsi_1]
  },
];

export const education = [
  {
    degree: "MSc Artificial Intelligence",
    school: "National College of Ireland",
    location: "Dublin, Ireland",
    period: "2024 – 2025",
    about: "Focused on building intelligent systems using machine learning, data analytics, and automation to improve decision-making and optimize processes. Main tools include Python, TensorFlow, scikit-learn, and Pandas.",
    modules: [
    "Foundations of Artificial Intelligence",
    "Programming for Artificial Intelligence",
    "Data Analytics for Artificial Intelligence",
    "Data Governance and Ethics",
    "Engineering and Evaluating Artificial Intelligence Systems",
    "Intelligent Agents and Process Automation",
    "Artificial Intelligence Driven Decision Making",
    "Machine Learning",
    "Emergent Artificial Intelligence Technologies and Sustainability"
],
    url: "https://www.ncirl.ie/",
    title: nci,
    images: [nci_1, nci_2]
  },
  {
    degree: "MSc Business & Management",
    school: "Universidad Internacional de la Rioja",
    location: "La Rioja, Spain",
    period: "2023 – 2025",
    about: "Focused on business strategy, operations, marketing, and digital transformation to improve organizational growth and efficiency. Includes project management, business analytics, and digital business models.",
    modules: [
    "Strategic Management",
    "Innovation Business Transformation",
    "Operations and Logistics Management",
    "Management Control and Budgeting",
    "Finance in a Digital Environment",
    "Comprehensive Marketing",
    "Sales Force Management",
    "Talent Development",
    "Business Plan Development in a Digital Environment"
],
    url: "https://www.unir.net/",
    title: "",
    images: [unir_1, unir_2]
  },
  {
    degree: "Corporate Finance",
    school: "City University Miami",
    location: "Miami, United States",
    period: "2024",
    about: "Focused on financial analysis, risk management, corporate financing, and investment decision-making. Main tools include financial modeling, Excel, and quantitative analysis.",
    modules: [
    "Corporate Financial Analysis",
    "Risk in Business Management",
    "Risk in Financial Decision-Making",
    "Internal Corporate Financing",
    "External Corporate Financing",
    "Short-Term Financing Instruments",
    "Long-Term Financing Instruments",
    "Optimal Capital Structure",
    "Alternative Financing",
    "New Challenges in Financial Distribution"
],
    url: "https://miuniversity.edu/en/",
    title: miu,
    images: [miu_1, miu_2]
  },
  {
    degree: "BSc Computer Science",
    school: "Tecnológico de Monterrey",
    location: "Monterrey, Mexico",
    period: "2015 – 2020",
    about: "Focused on software development, algorithms, system architecture, cybersecurity, and data science. Main technologies include Python, JavaScript, SQL, React, Linux, and cloud-based tools.",
    modules: [
    "Data Structures",
    "Algorithm Analysis and Design",
    "Operating Systems",
    "Computer Organization",
    "Software Engineering Fundamentals",
    "Software Design and Architecture",
    "Object-Oriented Programming",
    "Advanced Programming",
    "Programming Languages",
    "Web Application Development",
    "Embedded Systems",
    "Compiler Design",
    "Machine Learning",
    "Data Science",
    "Networking Fundamentals",
    "Cybersecurity",
    "Intelligent Systems",
    "Business Intelligence Project"
],
    url: "https://tec.mx",
    title: itesm,
    images: [itesm_1, itesm_2]
  },
];