const automations = [
  {
    id: 1,
    title: 'Lead Qualification Pipeline',
    description:
      'Automatically scores and routes inbound leads based on form data, enriches contact records via API, and notifies the sales team in Slack with a structured summary.',
    tools: ['Make.com', 'HubSpot', 'Slack', 'Clearbit'],
    category: 'Sales',
    status: 'production',
    impact: 'Reduced manual qualification time by 80%',
    featured: true,
  },
  {
    id: 2,
    title: 'Content Repurposing Workflow',
    description:
      'Takes a long-form article, summarizes it with an LLM, generates social media variants for LinkedIn and Twitter, and schedules posts through Buffer.',
    tools: ['Make.com', 'OpenAI', 'Buffer', 'Notion'],
    category: 'Marketing',
    status: 'production',
    impact: '3× content output with the same team',
    featured: true,
  },
  {
    id: 3,
    title: 'Invoice & Expense Tracker',
    description:
      'Parses incoming PDF invoices from Gmail, extracts line items using document AI, and logs them into a Google Sheet with automatic category tagging.',
    tools: ['Make.com', 'Google Workspace', 'Document AI'],
    category: 'Finance',
    status: 'production',
    impact: 'Eliminated 4 hours of manual data entry per week',
    featured: false,
  },
  {
    id: 4,
    title: 'Onboarding Email Sequence',
    description:
      "Triggers a personalised drip email sequence when a new user signs up, adapting messaging based on the user's selected role and activity in the first 48 hours.",
    tools: ['Make.com', 'Brevo', 'Supabase'],
    category: 'Growth',
    status: 'prototype',
    impact: 'Increased 7-day retention by 22%',
    featured: false,
  },
];

export default automations;
