/**
 * Seed Script for "Openings" Project
 * Run with: npx ts-node seed.ts
 * Or: npx tsx seed.ts
 *
 * Make sure MONGODB_URI is set in your .env file before running.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// ─── Inline Schemas (copy from your models folder) ─────────────────────────

const UserSchema = new mongoose.Schema({
  clerkId: String,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  website: String,
  companyName: String,
  categories: [String],
  bio: String,
  post: String,
  age: Number,
  phone: String,
  gender: String,
  qualification: String,
  english_fluency: String,
  skills: [String],
  minSalary: Number,
  maxSalary: Number,
  salary_duration: String,
  experience: String,
  picture: String,
  role: String,
  isHired: Boolean,
  isAdmin: Boolean,
  mediaLinks: { linkedin: String, github: String },
  address: String,
  country: String,
  saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
  jobPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  joinedAt: { type: Date, default: Date.now },
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  subcategory: [
    {
      name: String,
      candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      job: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    },
  ],
  image: { url: { type: String, required: true }, public_id: String },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  job: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  createdOn: { type: Date, default: Date.now },
});

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: String,
  overview: { type: String, required: true },
  duration: { type: String, required: true },
  salary_duration: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  address: String,
  country: String,
  city: String,
  skills: [String],
  experience: { type: String, required: true },
  minSalary: Number,
  maxSalary: Number,
  industry: String,
  english_fluency: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createAt: { type: Date, default: Date.now },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const educationSchema = new mongoose.Schema({
  title: String, academy: String,
  yearStart: Number, yearEnd: Number, year: String, description: String,
});
const experienceSchema = new mongoose.Schema({
  title: String, company: String,
  yearStart: Number, yearEnd: Number, year: String, description: String,
});
const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  overview: String,
  videos: [{ title: String, videoId: String }],
  education: [educationSchema],
  skills: [String],
  experience: [experienceSchema],
  portfolio: [{ imageUrl: String, public_id: String }],
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { url: { type: String, required: true }, public_id: String },
  author: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const testimonialSchema = new mongoose.Schema({
  review_text: { type: String, required: true },
  review_star: { type: Number, required: true },
  desc: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { url: { type: String, required: true }, public_id: String },
});

const ContactFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: String,
  message: { type: String, required: true },
  isReply: Boolean,
  sentAt: { type: Date, default: Date.now },
});

const shareDataSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  shareAt: { type: Date, default: Date.now },
});

// ─── Models ────────────────────────────────────────────────────────────────

const User       = mongoose.models.User       || mongoose.model('User',       UserSchema);
const Category   = mongoose.models.Category   || mongoose.model('Category',   CategorySchema);
const Job        = mongoose.models.Job        || mongoose.model('Job',        jobSchema);
const Resume     = mongoose.models.Resume     || mongoose.model('Resume',     resumeSchema);
const Blog       = mongoose.models.Blog       || mongoose.model('Blog',       blogSchema);
const Testimonial= mongoose.models.Testimonial|| mongoose.model('Testimonial',testimonialSchema);
const Contact    = mongoose.models.Contact    || mongoose.model('Contact',    ContactFormSchema);
const ShareData  = mongoose.models.ShareData  || mongoose.model('ShareData',  shareDataSchema);

// ─── Seed Data ─────────────────────────────────────────────────────────────

async function seedCategories() {
  const categories = [
    {
      name: 'Technology',
      subcategory: [
        { name: 'Frontend Development' },
        { name: 'Backend Development' },
        { name: 'Full Stack Development' },
        { name: 'Mobile Development' },
        { name: 'DevOps & Cloud' },
        { name: 'Data Science & AI' },
      ],
      image: { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' },
    },
    {
      name: 'Design',
      subcategory: [
        { name: 'UI/UX Design' },
        { name: 'Graphic Design' },
        { name: 'Motion Design' },
        { name: 'Product Design' },
      ],
      image: { url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400' },
    },
    {
      name: 'Marketing',
      subcategory: [
        { name: 'Digital Marketing' },
        { name: 'Content Marketing' },
        { name: 'SEO & SEM' },
        { name: 'Social Media' },
      ],
      image: { url: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400' },
    },
    {
      name: 'Finance',
      subcategory: [
        { name: 'Accounting' },
        { name: 'Financial Analysis' },
        { name: 'Investment Banking' },
      ],
      image: { url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400' },
    },
    {
      name: 'Healthcare',
      subcategory: [
        { name: 'Nursing' },
        { name: 'Medical Research' },
        { name: 'Health Administration' },
      ],
      image: { url: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400' },
    },
    {
      name: 'Education',
      subcategory: [
        { name: 'Teaching' },
        { name: 'Curriculum Design' },
        { name: 'E-Learning' },
      ],
      image: { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400' },
    },
  ];

  await Category.insertMany(categories);
  console.log('✅ Categories seeded');
}

async function seedUsers() {
  // 1 Admin
  const admin = await User.create({
    clerkId: 'clerk_admin_001',
    name: 'Admin User',
    email: 'admin@openings.dev',
    role: 'admin',
    isAdmin: true,
    bio: 'Platform administrator.',
    picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    country: 'India',
    joinedAt: new Date(),
  });

  // 3 Employers
  const employers = await User.insertMany([
    {
      clerkId: 'clerk_emp_001',
      name: 'Priya Sharma',
      email: 'priya@techcorp.in',
      role: 'employer',
      companyName: 'TechCorp India',
      companySize: 250,
      bio: 'Hiring the best tech talent across India.',
      website: 'https://techcorp.in',
      picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
      country: 'India',
      address: 'Bengaluru, Karnataka',
      categories: ['Technology'],
      established: new Date('2015-03-10'),
      joinedAt: new Date(),
    },
    {
      clerkId: 'clerk_emp_002',
      name: 'Rohan Mehta',
      email: 'rohan@designstudio.io',
      role: 'employer',
      companyName: 'DesignStudio IO',
      companySize: 40,
      bio: 'We build beautiful digital products.',
      website: 'https://designstudio.io',
      picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohan',
      country: 'India',
      address: 'Mumbai, Maharashtra',
      categories: ['Design'],
      established: new Date('2019-06-01'),
      joinedAt: new Date(),
    },
    {
      clerkId: 'clerk_emp_003',
      name: 'Anjali Verma',
      email: 'anjali@growthmarketing.co',
      role: 'employer',
      companyName: 'Growth Marketing Co.',
      companySize: 80,
      bio: 'Performance marketing experts.',
      website: 'https://growthmarketing.co',
      picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali',
      country: 'India',
      address: 'Delhi, NCR',
      categories: ['Marketing'],
      established: new Date('2018-01-15'),
      joinedAt: new Date(),
    },
  ]);

  // 6 Candidates
  const candidates = await User.insertMany([
    {
      clerkId: 'clerk_cand_001',
      name: 'Arjun Singh',
      email: 'arjun.singh@gmail.com',
      role: 'candidate',
      bio: 'Passionate React developer with 3 years of experience building scalable web apps.',
      age: 26,
      gender: 'Male',
      phone: '+91 98765 00001',
      picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
      country: 'India',
      address: 'Pune, Maharashtra',
      skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      experience: '3 years',
      qualification: "Bachelor's in Computer Science",
      english_fluency: 'Fluent',
      minSalary: 800000,
      maxSalary: 1200000,
      salary_duration: 'yearly',
      categories: ['Technology'],
      mediaLinks: { linkedin: 'https://linkedin.com/in/arjunsingh', github: 'https://github.com/arjunsingh' },
      joinedAt: new Date(),
    },
    {
      clerkId: 'clerk_cand_002',
      name: 'Neha Patel',
      email: 'neha.patel@gmail.com',
      role: 'candidate',
      bio: 'UI/UX designer who loves crafting intuitive digital experiences.',
      age: 24,
      gender: 'Female',
      phone: '+91 98765 00002',
      picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha',
      country: 'India',
      address: 'Ahmedabad, Gujarat',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      experience: '2 years',
      qualification: "Bachelor's in Design",
      english_fluency: 'Fluent',
      minSalary: 600000,
      maxSalary: 900000,
      salary_duration: 'yearly',
      categories: ['Design'],
      mediaLinks: { linkedin: 'https://linkedin.com/in/nehapatel' },
      joinedAt: new Date(),
    },
    {
      clerkId: 'clerk_cand_003',
      name: 'Vikram Joshi',
      email: 'vikram.joshi@gmail.com',
      role: 'candidate',
      bio: 'Full-stack developer specialising in MERN stack and cloud deployments.',
      age: 29,
      gender: 'Male',
      phone: '+91 98765 00003',
      picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram',
      country: 'India',
      address: 'Hyderabad, Telangana',
      skills: ['Node.js', 'React', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL'],
      experience: '5 years',
      qualification: "Master's in Software Engineering",
      english_fluency: 'Fluent',
      minSalary: 1200000,
      maxSalary: 1800000,
      salary_duration: 'yearly',
      categories: ['Technology'],
      mediaLinks: { linkedin: 'https://linkedin.com/in/vikramjoshi', github: 'https://github.com/vikramjoshi' },
      joinedAt: new Date(),
    },
    {
      clerkId: 'clerk_cand_004',
      name: 'Sanya Kapoor',
      email: 'sanya.kapoor@gmail.com',
      role: 'candidate',
      bio: 'Digital marketer with a knack for viral content and data-driven campaigns.',
      age: 27,
      gender: 'Female',
      phone: '+91 98765 00004',
      picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sanya',
      country: 'India',
      address: 'Mumbai, Maharashtra',
      skills: ['Google Ads', 'Meta Ads', 'SEO', 'Content Strategy', 'Analytics'],
      experience: '4 years',
      qualification: "MBA in Marketing",
      english_fluency: 'Fluent',
      minSalary: 700000,
      maxSalary: 1100000,
      salary_duration: 'yearly',
      categories: ['Marketing'],
      mediaLinks: { linkedin: 'https://linkedin.com/in/sanyakapoor' },
      joinedAt: new Date(),
    },
    {
      clerkId: 'clerk_cand_005',
      name: 'Rahul Gupta',
      email: 'rahul.gupta@gmail.com',
      role: 'candidate',
      bio: 'Mobile developer building cross-platform apps with React Native and Flutter.',
      age: 25,
      gender: 'Male',
      phone: '+91 98765 00005',
      picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul',
      country: 'India',
      address: 'Chennai, Tamil Nadu',
      skills: ['React Native', 'Flutter', 'Firebase', 'Dart', 'iOS', 'Android'],
      experience: '2 years',
      qualification: "Bachelor's in Information Technology",
      english_fluency: 'Intermediate',
      minSalary: 600000,
      maxSalary: 1000000,
      salary_duration: 'yearly',
      categories: ['Technology'],
      mediaLinks: { github: 'https://github.com/rahulgupta' },
      joinedAt: new Date(),
    },
    {
      clerkId: 'clerk_cand_006',
      name: 'Divya Nair',
      email: 'divya.nair@gmail.com',
      role: 'candidate',
      bio: 'Data scientist with deep expertise in ML pipelines and NLP.',
      age: 28,
      gender: 'Female',
      phone: '+91 98765 00006',
      picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=divya',
      country: 'India',
      address: 'Bengaluru, Karnataka',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Spark', 'NLP'],
      experience: '4 years',
      qualification: "Master's in Data Science",
      english_fluency: 'Fluent',
      minSalary: 1500000,
      maxSalary: 2200000,
      salary_duration: 'yearly',
      categories: ['Technology'],
      mediaLinks: { linkedin: 'https://linkedin.com/in/divyanair', github: 'https://github.com/divyanair' },
      joinedAt: new Date(),
    },
  ]);

  console.log('✅ Users seeded (1 admin, 3 employers, 6 candidates)');
  return { admin, employers, candidates };
}

async function seedJobs(employers: any[]) {
  const jobs = await Job.insertMany([
    {
      title: 'Senior React Developer',
      company: 'TechCorp India',
      overview: 'We are looking for a Senior React Developer to join our growing product team. You will own frontend architecture, mentor juniors, and collaborate closely with design and backend teams to ship high-quality features.',
      duration: 'Full-time',
      salary_duration: 'yearly',
      category: 'Technology',
      location: 'Remote',
      country: 'India',
      city: 'Bengaluru',
      address: 'Bengaluru, Karnataka',
      skills: ['React', 'TypeScript', 'Redux', 'REST APIs', 'Jest'],
      experience: '3-5 years',
      minSalary: 1200000,
      maxSalary: 1800000,
      industry: 'Software',
      english_fluency: 'Fluent',
      createdBy: employers[0]._id,
    },
    {
      title: 'Node.js Backend Engineer',
      company: 'TechCorp India',
      overview: 'Join us as a Backend Engineer to design and build scalable RESTful APIs and microservices. You will work with MongoDB, Redis, and AWS to power our platform used by thousands of users daily.',
      duration: 'Full-time',
      salary_duration: 'yearly',
      category: 'Technology',
      location: 'Hybrid',
      country: 'India',
      city: 'Bengaluru',
      skills: ['Node.js', 'Express', 'MongoDB', 'Redis', 'AWS'],
      experience: '2-4 years',
      minSalary: 1000000,
      maxSalary: 1600000,
      industry: 'Software',
      english_fluency: 'Fluent',
      createdBy: employers[0]._id,
    },
    {
      title: 'UI/UX Designer',
      company: 'DesignStudio IO',
      overview: 'We need a creative UI/UX Designer to lead the design of web and mobile products. You will run user research, build wireframes and high-fidelity prototypes, and work side by side with engineers.',
      duration: 'Full-time',
      salary_duration: 'yearly',
      category: 'Design',
      location: 'On-site',
      country: 'India',
      city: 'Mumbai',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      experience: '2-4 years',
      minSalary: 700000,
      maxSalary: 1100000,
      industry: 'Design & Creative',
      english_fluency: 'Fluent',
      createdBy: employers[1]._id,
    },
    {
      title: 'Graphic Designer',
      company: 'DesignStudio IO',
      overview: 'Looking for a Graphic Designer to produce compelling visual content for branding, social media, and marketing campaigns. Strong typography and brand identity skills are a must.',
      duration: 'Part-time',
      salary_duration: 'monthly',
      category: 'Design',
      location: 'Remote',
      country: 'India',
      city: 'Mumbai',
      skills: ['Adobe Illustrator', 'Photoshop', 'Branding', 'Typography'],
      experience: '1-3 years',
      minSalary: 35000,
      maxSalary: 60000,
      industry: 'Design & Creative',
      english_fluency: 'Intermediate',
      createdBy: employers[1]._id,
    },
    {
      title: 'Digital Marketing Manager',
      company: 'Growth Marketing Co.',
      overview: 'Lead end-to-end digital marketing campaigns across Google, Meta, and LinkedIn. You will manage budgets, analyze performance data, and drive measurable growth for our clients.',
      duration: 'Full-time',
      salary_duration: 'yearly',
      category: 'Marketing',
      location: 'Hybrid',
      country: 'India',
      city: 'Delhi',
      skills: ['Google Ads', 'Meta Ads', 'SEO', 'Analytics', 'CRO'],
      experience: '3-5 years',
      minSalary: 900000,
      maxSalary: 1400000,
      industry: 'Marketing',
      english_fluency: 'Fluent',
      createdBy: employers[2]._id,
    },
    {
      title: 'SEO Specialist',
      company: 'Growth Marketing Co.',
      overview: 'We are seeking an SEO Specialist to audit websites, research keywords, optimise on-page content, and build high-quality backlinks. You will report directly to the Head of Marketing.',
      duration: 'Full-time',
      salary_duration: 'yearly',
      category: 'Marketing',
      location: 'Remote',
      country: 'India',
      city: 'Delhi',
      skills: ['SEO', 'Google Search Console', 'Ahrefs', 'Content Writing', 'Technical SEO'],
      experience: '1-3 years',
      minSalary: 500000,
      maxSalary: 800000,
      industry: 'Marketing',
      english_fluency: 'Fluent',
      createdBy: employers[2]._id,
    },
    {
      title: 'Data Scientist',
      company: 'TechCorp India',
      overview: 'Join our AI team to build machine learning models that power product recommendations, fraud detection, and user behaviour analysis. You will work with large datasets and deploy models to production.',
      duration: 'Full-time',
      salary_duration: 'yearly',
      category: 'Technology',
      location: 'Hybrid',
      country: 'India',
      city: 'Bengaluru',
      skills: ['Python', 'TensorFlow', 'SQL', 'Spark', 'NLP', 'MLflow'],
      experience: '3-6 years',
      minSalary: 1800000,
      maxSalary: 2800000,
      industry: 'Software',
      english_fluency: 'Fluent',
      createdBy: employers[0]._id,
    },
  ]);

  console.log('✅ Jobs seeded');
  return jobs;
}

async function seedResumes(candidates: any[]) {
  const resumes = await Resume.insertMany([
    {
      user: candidates[0]._id, // Arjun Singh
      overview: 'Frontend-focused full-stack developer with 3 years of experience. I love building clean, performant UIs and RESTful APIs that scale.',
      skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Git'],
      education: [
        { title: 'B.Tech Computer Science', academy: 'Pune University', yearStart: 2017, yearEnd: 2021, description: 'CGPA 8.4/10. Specialised in web technologies and databases.' },
      ],
      experience: [
        { title: 'Frontend Developer', company: 'WebSolutions Pvt Ltd', yearStart: 2021, yearEnd: 2023, description: 'Built React dashboards for logistics clients; improved load time by 40%.' },
        { title: 'React Developer', company: 'Freelance', yearStart: 2023, yearEnd: 2024, description: 'Delivered 10+ client projects using Next.js and TypeScript.' },
      ],
    },
    {
      user: candidates[1]._id, // Neha Patel
      overview: 'Product-minded UI/UX designer passionate about user research and design systems. I bridge the gap between aesthetics and usability.',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Usability Testing'],
      education: [
        { title: 'B.Des Visual Communication', academy: 'NID Ahmedabad', yearStart: 2018, yearEnd: 2022, description: 'Graduated with distinction. Final project focused on inclusive design.' },
      ],
      experience: [
        { title: 'UI Designer', company: 'Creative Labs', yearStart: 2022, yearEnd: 2024, description: 'Designed end-to-end flows for fintech mobile apps; increased onboarding completion by 25%.' },
      ],
    },
    {
      user: candidates[2]._id, // Vikram Joshi
      overview: 'Senior full-stack developer with 5 years of experience. Comfortable owning products from database schema to deployed cloud infrastructure.',
      skills: ['Node.js', 'React', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL', 'Kubernetes'],
      education: [
        { title: 'M.Tech Software Engineering', academy: 'IIT Hyderabad', yearStart: 2016, yearEnd: 2018, description: 'Research focus on distributed systems.' },
        { title: 'B.Tech Computer Science', academy: 'JNTU Hyderabad', yearStart: 2012, yearEnd: 2016, description: 'First class with distinction.' },
      ],
      experience: [
        { title: 'Full Stack Developer', company: 'Infosys', yearStart: 2018, yearEnd: 2021, description: 'Worked on large-scale banking applications using Java and React.' },
        { title: 'Senior Engineer', company: 'StartupXYZ', yearStart: 2021, yearEnd: 2024, description: 'Built the entire backend from scratch; scaled to 100k daily active users.' },
      ],
    },
  ]);

  // Link resumeId back to candidate users
  await User.findByIdAndUpdate(candidates[0]._id, { resumeId: resumes[0]._id });
  await User.findByIdAndUpdate(candidates[1]._id, { resumeId: resumes[1]._id });
  await User.findByIdAndUpdate(candidates[2]._id, { resumeId: resumes[2]._id });

  console.log('✅ Resumes seeded');
}

async function seedApplications(candidates: any[], jobs: any[]) {
  // Arjun applies to Senior React Developer and Node.js Backend Engineer
  await Job.findByIdAndUpdate(jobs[0]._id, { $push: { applicants: candidates[0]._id } });
  await Job.findByIdAndUpdate(jobs[1]._id, { $push: { applicants: candidates[0]._id } });
  await User.findByIdAndUpdate(candidates[0]._id, { $push: { appliedJobs: jobs[0]._id } });
  await User.findByIdAndUpdate(candidates[0]._id, { $push: { appliedJobs: jobs[1]._id } });

  // Neha applies to UI/UX Designer
  await Job.findByIdAndUpdate(jobs[2]._id, { $push: { applicants: candidates[1]._id } });
  await User.findByIdAndUpdate(candidates[1]._id, { $push: { appliedJobs: jobs[2]._id } });

  // Vikram applies to Node.js Backend Engineer and Data Scientist
  await Job.findByIdAndUpdate(jobs[1]._id, { $push: { applicants: candidates[2]._id } });
  await Job.findByIdAndUpdate(jobs[6]._id, { $push: { applicants: candidates[2]._id } });
  await User.findByIdAndUpdate(candidates[2]._id, { $push: { appliedJobs: jobs[1]._id } });
  await User.findByIdAndUpdate(candidates[2]._id, { $push: { appliedJobs: jobs[6]._id } });

  // Sanya applies to Digital Marketing Manager
  await Job.findByIdAndUpdate(jobs[4]._id, { $push: { applicants: candidates[3]._id } });
  await User.findByIdAndUpdate(candidates[3]._id, { $push: { appliedJobs: jobs[4]._id } });

  // Divya applies to Data Scientist
  await Job.findByIdAndUpdate(jobs[6]._id, { $push: { applicants: candidates[5]._id } });
  await User.findByIdAndUpdate(candidates[5]._id, { $push: { appliedJobs: jobs[6]._id } });

  console.log('✅ Job applications seeded');
}

async function seedBlogs() {
  await Blog.insertMany([
    {
      title: '10 Tips to Crack Your Next Tech Interview',
      content: `Landing a tech role at a top company requires more than just coding chops. Here are 10 proven tips to help you succeed.\n\n1. **Master the Fundamentals**: Data structures and algorithms remain the backbone of technical interviews. Revisit arrays, linked lists, trees, graphs, and dynamic programming.\n\n2. **Practice on a Whiteboard**: Many interviews still happen on whiteboards or shared editors. Practise writing code without IDE assistance.\n\n3. **Explain Your Thought Process**: Interviewers care as much about how you think as what you code. Narrate your reasoning aloud.\n\n4. **Study System Design**: Senior roles almost always include a system design round. Learn about load balancers, databases, caching, and microservices.\n\n5. **Prepare Behavioural Stories**: Use the STAR method to narrate past experiences around teamwork, conflict resolution, and leadership.\n\n6. **Mock Interviews**: Platforms like Pramp and interviewing.io let you practise with real engineers. Invaluable for reducing nerves.\n\n7. **Research the Company**: Know their product, recent news, and engineering blog posts. Show genuine interest.\n\n8. **Ask Great Questions**: Prepare thoughtful questions about the team, tech stack, and engineering culture.\n\n9. **Follow Up**: Send a brief thank-you email within 24 hours.\n\n10. **Embrace Rejection**: Every rejection is data. Ask for feedback and iterate.`,
      image: { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800' },
      author: 'Admin User',
      tags: ['Interview', 'Career', 'Tech', 'Tips'],
    },
    {
      title: 'How to Write a Resume That Gets Shortlisted',
      content: `Your resume is your first impression. Most recruiters spend less than 10 seconds scanning one. Here is how to make yours stand out.\n\n**Keep it to One Page**: Unless you have 10+ years of experience, aim for a single well-structured page.\n\n**Lead with a Strong Summary**: Two to three sentences that capture who you are, your key skills, and what you are looking for.\n\n**Quantify Your Impact**: "Improved API performance by 35%" is far stronger than "worked on backend optimisations."\n\n**Tailor for Every Role**: Mirror keywords from the job description. ATS systems often filter resumes before a human reads them.\n\n**Showcase Projects**: Side projects and open-source contributions demonstrate initiative and passion beyond your day job.\n\n**Design Matters**: Clean, readable formatting with consistent fonts and spacing signals professionalism. Avoid over-designed templates.\n\n**Proofread Obsessively**: A single typo can disqualify you. Have at least two other people review it.`,
      image: { url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800' },
      author: 'Admin User',
      tags: ['Resume', 'Career', 'Job Search'],
    },
    {
      title: 'Remote Work in 2025: What Employers Really Expect',
      content: `Remote work has matured from a pandemic necessity to a permanent fixture in the hiring landscape. But what do employers actually expect from remote candidates?\n\n**Self-Management is Non-Negotiable**: Working remotely means owning your schedule, meeting deadlines without daily check-ins, and proactively communicating blockers.\n\n**Communication Depth Over Frequency**: Over-communication matters in async environments. Write clear, well-structured updates so colleagues in different time zones stay aligned.\n\n**A Professional Setup**: A stable internet connection, decent camera, and quiet workspace are baseline expectations — not perks.\n\n**Trust is Built Through Output**: Remote employees are judged on deliverables, not hours at a desk. Focus on shipping quality work consistently.\n\n**Timezone Etiquette**: Be clear about your working hours and responsive during overlap windows with your team.\n\nCompanies that thrive with remote teams invest in strong documentation culture, async-first tools, and regular virtual touchpoints to preserve human connection.`,
      image: { url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800' },
      author: 'Admin User',
      tags: ['Remote Work', 'Career', 'Productivity'],
    },
  ]);

  console.log('✅ Blogs seeded');
}

async function seedTestimonials() {
  await Testimonial.insertMany([
    {
      review_text: 'Openings helped me land my dream frontend role in under 3 weeks. The platform is clean and the job matches were spot on!',
      review_star: 5,
      desc: 'Frontend Developer at TechCorp India',
      name: 'Arjun Singh',
      location: 'Pune, India',
      image: { url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun' },
    },
    {
      review_text: 'As a designer, finding relevant job listings is always a struggle. Openings got it right — every listing I saw was genuinely relevant to my profile.',
      review_star: 5,
      desc: 'UI/UX Designer at DesignStudio IO',
      name: 'Neha Patel',
      location: 'Ahmedabad, India',
      image: { url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha' },
    },
    {
      review_text: 'We hired three excellent engineers through Openings. The candidate profiles are detailed and the applicants are genuinely qualified.',
      review_star: 5,
      desc: 'CTO at TechCorp India',
      name: 'Priya Sharma',
      location: 'Bengaluru, India',
      image: { url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya' },
    },
    {
      review_text: 'Switched careers from marketing to data science. Openings was the only platform where I found companies willing to take a chance on career changers.',
      review_star: 4,
      desc: 'Data Scientist at TechCorp India',
      name: 'Divya Nair',
      location: 'Bengaluru, India',
      image: { url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=divya' },
    },
    {
      review_text: 'The platform made hiring so much simpler. I posted a job and had 20 relevant applications within 48 hours. Highly recommend for growing startups.',
      review_star: 5,
      desc: 'Founder at DesignStudio IO',
      name: 'Rohan Mehta',
      location: 'Mumbai, India',
      image: { url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohan' },
    },
  ]);

  console.log('✅ Testimonials seeded');
}

async function seedContacts() {
  await Contact.insertMany([
    {
      name: 'Arun Kumar',
      email: 'arun.kumar@gmail.com',
      subject: 'Partnership Inquiry',
      message: 'Hi, I run a recruitment agency and would love to explore a partnership with Openings. Could we schedule a call?',
      isReply: false,
    },
    {
      name: 'Meera Iyer',
      email: 'meera.iyer@outlook.com',
      subject: 'Issue with Job Application',
      message: 'I tried applying for the Senior React Developer role but kept getting a 500 error. Please look into this.',
      isReply: false,
    },
    {
      name: 'Suresh Rajan',
      email: 'suresh@rajan.in',
      subject: 'Feature Request',
      message: 'It would be great to have a salary insights page showing average pay by role and city. Would be very useful for candidates negotiating offers.',
      isReply: false,
    },
  ]);

  console.log('✅ Contact messages seeded');
}

async function seedShareData(employers: any[], candidates: any[]) {
  await ShareData.insertMany([
    {
      employeeId: employers[0]._id,
      candidates: [candidates[0]._id, candidates[2]._id, candidates[5]._id],
    },
    {
      employeeId: employers[1]._id,
      candidates: [candidates[1]._id],
    },
  ]);

  console.log('✅ ShareData seeded');
}

// ─── Main Runner ────────────────────────────────────────────────────────────

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌  MONGODB_URI is not set. Add it to your .env file.');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('🔌 Connected to MongoDB\n');

  // Drop existing collections for a clean seed
  const collections = ['users', 'categories', 'jobs', 'resumes', 'blogs', 'testimonials', 'contacts', 'sharedatas'];
  for (const col of collections) {
    try {
      await mongoose.connection.dropCollection(col);
      console.log(`🗑️  Dropped collection: ${col}`);
    } catch {
      // Collection may not exist yet — that's fine
    }
  }
  console.log('');

  await seedCategories();
  const { employers, candidates } = await seedUsers();
  const jobs = await seedJobs(employers);
  await seedResumes(candidates);
  await seedApplications(candidates, jobs);
  await seedBlogs();
  await seedTestimonials();
  await seedContacts();
  await seedShareData(employers, candidates);

  console.log('\n🎉  Seeding complete!');
  console.log('\n📋  Summary');
  console.log('   Categories  : 6');
  console.log('   Users       : 10  (1 admin · 3 employers · 6 candidates)');
  console.log('   Jobs        : 7');
  console.log('   Resumes     : 3');
  console.log('   Blogs       : 3');
  console.log('   Testimonials: 5');
  console.log('   Contacts    : 3');
  console.log('   ShareData   : 2');

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});