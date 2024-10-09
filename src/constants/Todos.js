export const Todos = [
  {
    id: 1,
    title: 'Complete Frontend Feature',
    description:
      'Finish implementing and testing the new user interface components for the shopping cart module.',
    deadline: '2024-10-15',
    isComplete: false,
    subtasks: [
      { id: 1, title: 'Design responsive UI for cart page', isComplete: false },
      {
        id: 2,
        title: 'Integrate API for product management',
        isComplete: false,
      },
    ],
  },
  {
    id: 2,
    title: 'Develop Q4 Marketing Campaign',
    description:
      'Create and launch a multi-channel marketing campaign for the Q4 product releases, focusing on social media, email, and PPC strategies.',
    deadline: '2024-11-01',
    isComplete: false,
    subtasks: [
      { id: 1, title: 'Define marketing goals and KPIs', isComplete: false },
      { id: 2, title: 'Conduct competitor analysis', isComplete: false },
      {
        id: 3,
        title: 'Prepare social media and email content',
        isComplete: false,
      },
    ],
  },
  {
    id: 3,
    title: 'Team Sprint Planning Meeting',
    description:
      'Organize a meeting with the development team to review progress, plan for the upcoming sprint, and assign tasks.',
    deadline: '2024-10-20',
    isComplete: true,
    subtasks: [
      { id: 1, title: 'Prepare sprint backlog', isComplete: true },
      {
        id: 2,
        title: 'Discuss task priorities with stakeholders',
        isComplete: true,
      },
    ],
  },
];
