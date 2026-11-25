// EDIT THIS FILE with your real details, then run:  npm run seed
// Anything marked CHANGE ME is a placeholder.

exports.profile = {
  name: 'Mahesh Kumar',
  headline: 'Video editor and B.Tech CSE student',
  tagline: 'I cut stories in the edit bay and build things on the web.',
  about: [
    'I am a second-year B.Tech Computer Science student from Hisar, Haryana. I enjoy turning ideas into working websites, and I am learning full-stack development with JavaScript, Node.js and MongoDB.',
    'Before code, there was the timeline. I edit videos and reels, and that eye for pacing, colour and detail is what I bring to every interface I build.',
    'I am looking for an internship where I can learn from a team, ship real features and keep growing as a developer.',
  ],
  location: 'Hisar, Haryana, India',
  email: 'maheshbhaduu@gmail.com',
  photoUrl: '/images/profile.jpg',
  resumeUrl: '', // CHANGE ME: e.g. '/resume.pdf' after adding the file to public/
  openTo: 'Open to internships',
  socials: {
    linkedin: 'https://www.linkedin.com/in/mahesh-kumar-581895332/',
    github: 'https://github.com/Mahesh-Kumar-Bhadu',
  },
  experience: [
    {
      role: 'Freelance video editor',
      org: 'Startup (short-form content)',
      note: 'Edited short-form videos for a startup, using DaVinci Resolve.',
    },
  ],
  education: [
    {
      degree: 'B.Tech, Computer Science and Engineering',
      institute: 'Guru Jambeshwar University of Science and Technology, Hisar',
      year: '2nd year, ongoing',
      note: 'Revising data structures in C++ and web development (JavaScript, React, Node.js, MongoDB).',
    },
  ],
};

exports.projects = [
  {
    title: 'Netflix UI Clone',
    description: 'A responsive front-end recreation of the Netflix landing and browse experience.',
    tech: ['HTML', 'CSS'],
    repoUrl: 'https://github.com/Mahesh-Kumar-Bhadu/My-Netflix-UI',
    liveUrl: '', // CHANGE ME
    featured: true,
    order: 1,
  },
  {
    title: 'Amazon UI Clone',
    description: 'A shopping-site front end with product grids, header navigation and a responsive layout.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    repoUrl: '',
    liveUrl: '',
    featured: true,
    order: 2,
  },
  {
    title: 'Spotify Frontend', // CHANGE ME: paste your Spotify repo link below
    description: 'A Spotify-inspired music player interface with playlists and a player bar.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    repoUrl: '',
    liveUrl: '',
    featured: true,
    order: 3,
  },
  {
    title: 'React Todo App',
    description: 'A todo app with add, edit and delete, a Done list, saved todos in the browser and a daily reset of routine tasks.',
    tech: ['React', 'Vite', 'Tailwind CSS'],
    repoUrl: '', // CHANGE ME: paste your mytodo repo link
    liveUrl: '',
    featured: false,
    order: 4,
  },
  {
    title: 'This Portfolio',
    description: 'Full-stack portfolio with an Express REST API, MongoDB storage, a validated contact form and email delivery.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JavaScript'],
    repoUrl: '',
    liveUrl: '',
    featured: true,
    order: 5,
  },
];

// level is 0 to 100. Be honest, it is shown as a bar length.
exports.skills = [
  { name: 'C', category: 'Programming', level: 65, order: 1 },
  { name: 'C++', category: 'Programming', level: 65, order: 2 },
  { name: 'JavaScript', category: 'Programming', level: 60, order: 3 },
  { name: 'HTML and CSS', category: 'Web', level: 75, order: 4 },
  { name: 'React', category: 'Web', level: 55, order: 5 },
  { name: 'Node.js', category: 'Web', level: 50, order: 6 },
  { name: 'MongoDB', category: 'Web', level: 50, order: 7 },
  { name: 'Video editing', category: 'Editing', level: 80, order: 8 }, // CHANGE ME
  { name: 'Colour grading', category: 'Editing', level: 65, order: 9 }, // CHANGE ME
  { name: 'Reels and short-form', category: 'Editing', level: 80, order: 10 }, // CHANGE ME
];

// Your editing work. Add thumbnails to public/images/ and set the path.
exports.edits = [
  {
    title: 'Cinematic travel reel', // CHANGE ME
    type: 'Reel',
    description: 'Beat-synced cuts, speed ramps and a warm colour grade.',
    tools: ['DaVinci Resolve'], // CHANGE ME
    thumbnail: '',
    order: 1,
  },
  {
    title: 'Event highlight', // CHANGE ME
    type: 'Highlight video',
    description: 'A fast recap built around the best moments and music.',
    tools: ['DaVinci Resolve'],
    thumbnail: '',
    order: 2,
  },
  {
    title: 'Colour grade study', // CHANGE ME
    type: 'Colour grade',
    description: 'Before and after grading practice on raw footage.',
    tools: ['DaVinci Resolve'],
    thumbnail: '',
    order: 3,
  },
];
