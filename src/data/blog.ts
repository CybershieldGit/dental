export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "truth-about-gum-disease",
    category: "Oral Health",
    title: "The Truth About Gum Disease",
    excerpt: "Gum disease affects millions worldwide, yet many don't recognize the early warning signs. Learn what causes gum disease and how to protect yourself.",
    content: `
      Gum disease, also known as periodontal disease, is one of the most common dental conditions affecting adults globally. It begins silently — often with no pain — making it easy to overlook until significant damage has occurred.

      ### What Causes Gum Disease?
      The primary cause is bacterial plaque — a sticky film that constantly forms on your teeth. When plaque isn't removed through regular brushing and flossing, it hardens into tartar (calculus), which can only be removed by a dental professional.

      ### Early Warning Signs
      - Red, swollen, or tender gums
      - Bleeding when brushing or flossing
      - Persistent bad breath
      - Receding gum lines
      - Loose or shifting teeth

      ### Prevention is Key
      The best defense against gum disease is a consistent oral hygiene routine combined with regular professional cleanings. At AnjMohi Dental Clinic, we use advanced ultrasonic scaling and AI-powered diagnostic tools to detect gum disease at its earliest stages.

      ### Treatment Options
      From deep scaling and root planing to laser-assisted gum therapy, modern dentistry offers effective, minimally invasive treatments that can halt and even reverse gum disease progression.
    `,
    readTime: "4 min read",
    date: "August 15, 2026",
    author: "Dr. Karan Anand",
    image: "/images/blog-gum-disease.jpg",
    tags: ["Oral Health", "Prevention", "Gum Disease"],
  },
  {
    slug: "precision-diagnostics-with-ai",
    category: "Technology",
    title: "Precision Diagnostics with AI & CBCT",
    excerpt: "Discover how artificial intelligence and 3D cone beam imaging are revolutionizing the way we diagnose and plan dental treatments.",
    content: `
      The integration of artificial intelligence into dental diagnostics represents a paradigm shift in how we approach patient care. At AnjMohi Dental Clinic, we've embraced these technologies to deliver unprecedented precision in treatment planning.

      ### 3D CBCT Scanning
      Cone Beam Computed Tomography provides a complete three-dimensional view of your jaw, teeth, nerves, and sinuses. Unlike traditional X-rays, CBCT scans reveal hidden pathologies, precise bone density measurements, and anatomical structures critical for procedures like dental implants.

      ### AI-Powered Analysis
      Our AI diagnostic systems can detect early-stage cavities, periapical infections, and bone loss patterns that might escape even experienced clinicians. The software analyzes thousands of data points in seconds, providing a comprehensive diagnostic report.

      ### The Patient Benefit
      This combination of AI and 3D imaging means:
      - Earlier detection of dental issues
      - More accurate treatment planning
      - Reduced treatment time and costs
      - Better long-term outcomes

      ### Looking Forward
      As AI technology continues to evolve, we anticipate even more sophisticated diagnostic capabilities, including predictive analytics that can forecast potential dental issues before they develop.
    `,
    readTime: "5 min read",
    date: "July 28, 2026",
    author: "Dr. Aparna Ghosh",
    image: "/images/blog-ai-diagnostics.jpg",
    tags: ["Technology", "AI", "Diagnostics"],
  },
  {
    slug: "navigating-your-invisalign-journey",
    category: "Orthodontics",
    title: "Navigating Your Invisalign Journey",
    excerpt: "Everything you need to know about clear aligners — from your first consultation to your final smile reveal. A complete patient guide.",
    content: `
      Clear aligners have transformed orthodontic treatment, offering adults and teens a discreet way to achieve beautifully aligned teeth. Here's what to expect on your Invisalign journey at AnjMohi Dental Clinic.

      ### Initial Consultation
      Your journey begins with a comprehensive digital scan of your teeth using our 3D intraoral scanner — no messy impressions needed. We'll create a virtual simulation showing how your teeth will move at each stage.

      ### Your Custom Treatment Plan
      Using advanced orthodontic software, we design a precise treatment plan that maps the movement of each tooth. You'll see your projected results before treatment even begins.

      ### Wearing Your Aligners
      Each set of custom-made aligners is worn for 7-14 days before progressing to the next. You'll wear them for 20-22 hours daily, removing them only to eat, drink, brush, and floss.

      ### Life with Aligners
      One of the biggest advantages of clear aligners is how seamlessly they fit into your lifestyle. They're virtually invisible, comfortable, and won't restrict your diet.

      ### The Final Reveal
      Treatment typically takes 6-18 months depending on complexity. Once completed, we provide custom retainers to maintain your new smile for life.
    `,
    readTime: "6 min read",
    date: "July 10, 2026",
    author: "Dr. Kevin Mathew",
    image: "/images/blog-invisalign.jpg",
    tags: ["Orthodontics", "Aligners", "Invisalign"],
  },
  {
    slug: "importance-of-regular-dental-checkups",
    category: "Prevention",
    title: "Why Regular Dental Checkups Save More Than Your Smile",
    excerpt: "Regular dental visits do far more than keep your teeth clean. Learn how routine checkups can detect systemic health issues early.",
    content: `
      Many people view dental checkups as optional — something to schedule only when a problem arises. However, regular dental visits are one of the most important investments you can make in your overall health.

      ### Beyond Clean Teeth
      During a routine checkup, your dentist examines far more than just your teeth. Oral health screenings can reveal early signs of:
      - Diabetes (gum inflammation patterns)
      - Heart disease (bacterial connections)
      - Vitamin deficiencies (oral tissue changes)
      - Oral cancer (lesions and tissue abnormalities)

      ### The 6-Month Rule
      Dental professionals recommend checkups every six months. This interval is optimal for:
      - Removing plaque and tartar buildup
      - Catching cavities before they need complex treatment
      - Monitoring gum health
      - Updating dental X-rays as needed

      ### What Happens During a Checkup?
      At AnjMohi Dental Clinic, our comprehensive checkups include digital X-rays, intraoral camera examination, periodontal assessment, oral cancer screening, and professional cleaning — all in a comfortable, stress-free environment.

      ### The Cost of Skipping
      Preventive care is significantly less expensive than restorative treatment. A simple filling costs a fraction of a root canal or crown. Regular visits help you avoid costly emergency procedures.
    `,
    readTime: "4 min read",
    date: "June 22, 2026",
    author: "Dr. Prathap Shanker",
    image: "/images/blog-dental-checkup.jpg",
    tags: ["Prevention", "Health", "Checkups"],
  },
];
