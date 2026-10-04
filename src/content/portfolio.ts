// ✏️ All the words on the portfolio sections live here.
// Everything below is PLACEHOLDER text — replace it with your real details.

export const links = {
  github: "https://github.com/Ananya-Cheri",
  linkedin: "https://www.linkedin.com/in/ananya-cheripally-5119131aa/",
  email: "ananyacheripally2003@gmail.com",
  resume: "/Ananya-Cheripally-Resume.pdf",
};

export const about = {
  heading: ["A little", "about me"],
  tagline: ["Data Engineering", "Python", "SQL", "ETL", "Data Analytics"],
  paragraphs: [
    "I'm Ananya, a Master of Computer Science (Data Science and AI) student from the University of Sydney, completing my coursework in November 2026. I enjoy turning raw data into something a team can rely on, and explaining it in plain language to the people who use it.",
    "I'm a quick learner who thrives in a team: I ask good questions, pick up new tools fast and care about doing things properly. I'm looking for a graduate or junior role in data engineering or analytics in Australia.",
  ],
  facts: [
    { label: "Based in", value: "Sydney, NSW" },
    { label: "Studying", value: "MCS (Data Science & AI) · USYD" },
    { label: "Open to", value: "Graduate & junior data roles" },
    { label: "Fuelled by", value: "Coffee ☕" },
  ],
};

export const skills = [
  {
    group: "Data Engineering",
    icon: "pipeline",
    blurb: "Building Python ETL pipelines that load CSV, Excel and JSON data into relational databases, with data quality checks and reconciliation.",
    items: ["Python", "SQL", "ETL", "Data Validation", "Data Quality", "Data Integration"],
  },
  {
    group: "Databases & Modelling",
    icon: "database",
    blurb: "Designing relational schemas from ER models and automating business rules with PL/pgSQL functions and triggers.",
    items: ["PostgreSQL", "MySQL", "PL/pgSQL", "ER Modelling", "Query Optimisation"],
  },
  {
    group: "Data Analysis & ML",
    icon: "analysis",
    blurb: "Cleaning and exploring datasets, engineering features and comparing classification models.",
    items: ["Pandas", "NumPy", "scikit-learn", "Seaborn", "Excel", "Machine Learning"],
  },
] as const;

export const tools = [
  "Python", "SQL", "PostgreSQL", "MySQL", "SQLite", "Pandas", "NumPy", "scikit-learn", "Seaborn", "psycopg2",
  "ETL", "Data Validation", "Data Quality", "Query Optimisation", "Excel", "Tableau", "Git", "GitHub",
  "VS Code", "Jupyter Notebook", "Postman", "Agile",
];

export const projectCategories = ["All", "Data Engineering", "Databases", "Machine Learning"] as const;
export type ProjectCategory = Exclude<(typeof projectCategories)[number], "All">;

export const projectsIntro = "University and industry projects in data engineering, databases and machine learning.";

export const projects: {
  category: ProjectCategory;
  title: string;
  context: string;
  summary: string;
  stats: { value: string; label: string }[];
  tags: string[];
  link: string;
}[] = [
  {
    category: "Machine Learning",
    title: "Predicting High-Priority Crime Threats in NSW",
    context: "University of Sydney · Group project · 2025",
    summary:
      "Transformed 30 years of NSW BOCSAR crime data across 60+ offence subcategories from wide monthly time series into a model-ready dataset, normalising counts to rates per 100,000 population. Engineered trend features (5-year slope, momentum, volatility, peak year) and compared five classifiers (Random Forest, SVM, Logistic Regression, Naive Bayes, Decision Tree), with Random Forest and SVM reaching ~95% accuracy.",
    stats: [
      { value: "30", label: "years of data" },
      { value: "60+", label: "offence subcategories" },
      { value: "~95%", label: "accuracy" },
    ],
    tags: ["Python", "Pandas", "scikit-learn", "Random Forest", "SVM"],
    link: "",
  },
  {
    category: "Databases",
    title: "Car Dealership Database System",
    context: "University of Sydney · Group project",
    summary:
      "Built a 12-table PostgreSQL database from ER and relational models, enforcing data integrity with primary/foreign keys, CHECK constraints and cascading rules. Developed PL/pgSQL functions and triggers to automate business rules, including sale price calculation, vehicle status updates, option limits and payment completion tracking. Implemented a Python (psycopg2) feature to update car sale records with input validation and parameterised SQL queries, and performed end-to-end application testing.",
    stats: [
      { value: "12", label: "tables" },
      { value: "PL/pgSQL", label: "triggers" },
      { value: "Parameterised", label: "SQL" },
    ],
    tags: ["PostgreSQL", "PL/pgSQL", "Python", "psycopg2", "ER Modelling"],
    link: "",
  },
  {
    category: "Machine Learning",
    title: "Forest Cover Classification & Diabetes Risk Analysis",
    context: "University of Sydney · Pair project · Mar 2025 — May 2025",
    summary:
      "Cleaned and explored a health survey dataset using Pandas and Seaborn (deduplication, missing-value imputation, range validation) to analyse diabetes risk factors. Built an SVM (RBF kernel) classifier in scikit-learn to predict forest cover types, applying feature scaling, one-hot encoding, PCA, class weighting and RandomizedSearchCV with stratified cross-validation, achieving 67% test accuracy.",
    stats: [
      { value: "67%", label: "test accuracy" },
      { value: "SVM", label: "RBF kernel" },
      { value: "Stratified", label: "cross-validation" },
    ],
    tags: ["Python", "Pandas", "Seaborn", "scikit-learn", "SVM", "PCA"],
    link: "",
  },
  {
    category: "Data Engineering",
    title: "RideThe15 — Rideshare & Carpooling Platform",
    context: "SAAC IT Solutions · Software Engineer (Part-time)",
    summary:
      "Built data-processing workflows and operational dashboards and scorecards with daily, weekly and monthly trend analysis for a rideshare and carpooling platform.",
    stats: [
      { value: "Daily", label: "trend analysis" },
      { value: "Weekly", label: "trend analysis" },
      { value: "Monthly", label: "trend analysis" },
    ],
    tags: ["Python", "SQL", "Pandas", "Dashboards"],
    link: "",
  },
  {
    category: "Data Engineering",
    title: "Wood Management System — Timber Depot Operations & Billing",
    context: "SAAC IT Solutions · Business Analyst Intern",
    summary:
      "Supported purchase, sales, stock and pricing requirements for a multi-depot billing system, validating master data and transaction reports.",
    stats: [
      { value: "Multi-depot", label: "billing" },
      { value: "Master", label: "data validation" },
      { value: "Transaction", label: "reports" },
    ],
    tags: ["Requirements Analysis", "Data Validation", "UAT", "Postman"],
    link: "",
  },
];

export const experience = [
  {
    when: "Feb 2023 — Jan 2025",
    title: "Software Engineer (Part-time)",
    org: "SAAC IT Solutions Pvt Ltd",
    place: "Hyderabad, India",
    points: [
      "Developed and maintained Python ETL pipelines to extract, transform and load CSV, Excel and JSON data into PostgreSQL and MySQL databases for business reporting.",
      "Wrote SQL queries to validate data loads, reconcile record counts and generate business reports.",
      "Automated recurring data processing and reporting workflows with Python (Pandas), reducing manual spreadsheet preparation.",
      "Built data quality checks (duplicates, nulls, consistency, reconciliation) and resolved failed loads by tracing root causes through execution logs.",
      "Worked in Agile sprints with code reviews and Git/GitHub pull requests, and documented ETL workflows and database changes.",
    ],
    project: {
      name: "RideThe15 — Rideshare & Carpooling Platform",
      detail: "Built data-processing workflows and operational dashboards and scorecards with daily, weekly and monthly trend analysis.",
    },
    tags: ["Python", "Pandas", "SQL", "PostgreSQL", "MySQL", "ETL", "Git", "Agile"],
  },
  {
    when: "Jul 2022 — Jan 2023",
    title: "Business Analyst Intern",
    org: "SAAC IT Solutions Pvt Ltd",
    place: "Hyderabad, India",
    points: [
      "Gathered, analysed and documented business requirements, translating operational processes into structured functional requirements.",
      "Developed Python automation scripts to process inventory, sales and customer data from Excel, CSV and other structured sources.",
      "Created reusable validation scripts (Pandas, NumPy) to detect missing values, duplicates and formatting issues, and validated imported records in SQLite and PostgreSQL databases.",
      "Prepared functional and UAT test scenarios, performed API testing with Postman, and documented workflows and user guides.",
    ],
    project: {
      name: "Wood Management System — Timber Depot Operations & Billing",
      detail: "Supported purchase, sales, stock and pricing requirements for a multi-depot billing system, validating master data and transaction reports.",
    },
    tags: ["Python", "Pandas", "NumPy", "SQLite", "PostgreSQL", "Postman", "UAT"],
  },
];

export const education = [
  {
    when: "Feb 2025 — Present",
    title: "Master of Computer Science (Data Science and AI)",
    org: "University of Sydney",
    place: "Sydney, Australia",
    note: "Coursework completion: November 2026 · Degree conferral: 2027",
  },
  {
    when: "Mar 2020 — Jun 2024",
    title: "Bachelor of Technology — Computer Science Engineering",
    org: "Gokaraju Rangaraju Institute of Engineering and Technology (GRIET)",
    place: "Hyderabad, India",
  },
];

export const achievements = [
  {
    name: "Sydney Scholars India Scholarship (2025)",
    detail: "Awarded by the University of Sydney for academic performance, leadership and community engagement.",
  },
];

// ✏️ Paste each certificate's link into `url` to make it clickable.
export const certifications = [
  { name: "Azure Databricks Fundamentals", url: "https://www.coursera.org/account/accomplishments/verify/68LBQNDMWNSR" },
  { name: "Tableau Visualization & Design", url: "https://www.coursera.org/account/accomplishments/verify/9E5A0NQJ5AQ7" },
  { name: "What Is Generative AI?", url: "https://www.linkedin.com/learning/certificates/e58f2fe9b28a011d0079d443dafaae3e3df3cb890c503a26ef53c519bb96d945" },
];

export const leadership = [
  {
    when: "May 2025 — Jul 2025",
    title: "Volunteer — Professor Harry Messel International Science School",
    org: "University of Sydney",
    points: ["Supported students and international participants with activities, logistics and day-to-day queries during the academic program."],
  },
  {
    when: "Mar 2023 — Apr 2024",
    title: "Secretary — IEEE Computer Society Student Chapter",
    org: "GRIET",
    points: ["Coordinated technical workshops, student and faculty communications, event documentation and engagement activities."],
  },
];
