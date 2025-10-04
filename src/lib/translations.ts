export type Language = 'en' | 'ar';

export interface Translations {
  // Navigation
  home: string;
  about: string;
  services: string;
  projects: string;
  gallery: string;
  blog: string;
  contact: string;
  admin: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  getStarted: string;
  learnMore: string;
  
  // About Section
  aboutTitle: string;
  aboutSubtitle: string;
  aboutDescription: string;
  ourStory: string;
  ourMission: string;
  ourVision: string;
  
  // Services Section
  servicesTitle: string;
  servicesSubtitle: string;
  servicesDescription: string;
  viewAllServices: string;
  
  // Services Page Specific
  servicesPageTitle: string;
  loadingServices: string;
  
  // Projects Section
  projectsTitle: string;
  projectsSubtitle: string;
  projectsDescription: string;
  viewAllProjects: string;
  
  // Gallery Section
  galleryTitle: string;
  gallerySubtitle: string;
  galleryDescription: string;
  
  // Blog Section
  blogTitle: string;
  blogSubtitle: string;
  blogDescription: string;
  readMore: string;
  viewAllBlogs: string;
  
  // Blog Page Specific
  blogPageTitle: string;
  blogPageSubtitle: string;
  stayUpdated: string;
  newsletterDescription: string;
  yourEmailAddress: string;
  subscribe: string;
  
  // Contact Section
  contactTitle: string;
  contactSubtitle: string;
  contactDescription: string;
  contactInfo: string;
  location: string;
  phone: string;
  email: string;
  sendMessage: string;
  yourName: string;
  yourEmail: string;
  yourMessage: string;
  
  // Footer
  footerDescription: string;
  quickLinks: string;
  contactUs: string;
  followUs: string;
  allRightsReserved: string;
  companyName: string;
  designedBy: string;
  
  // Footer Services
  luxuryCeilingDesign: string;
  decorativePatterns: string;
  modernArchitecture: string;
  traditionalCoffered: string;
  vaultedCeilings: string;
  
  // Gallery Page
  galleryPageTitle: string;
  galleryPageSubtitle: string;
  readyToTransform: string;
  transformDescription: string;
  startYourProject: string;
  
  // Category Names
  stretchCeiling: string;
  acoustic: string;
  acousticPanels: string;
  woodWool: string;
  fiberOptic: string;
  fiberOpticCeiling: string;
  mirrorStretchCeiling: string;
  glossyStretchCeiling: string;
  printedStretchCeiling: string;
  translucentStretchCeiling: string;
  general: string;
  
  // Admin Panel
  adminLogin: string;
  adminDashboard: string;
  adminAccess: string;
  login: string;
  logout: string;
  adminEmail: string;
  password: string;
  dashboard: string;
  blogs: string;
  addNew: string;
  edit: string;
  delete: string;
  save: string;
  cancel: string;
  title: string;
  description: string;
  content: string;
  excerpt: string;
  author: string;
  image: string;
  featured: string;
  yes: string;
  no: string;
  loading: string;
  error: string;
  success: string;
  confirmDelete: string;
  deleteConfirmation: string;
  maxBlogsReached: string;
  maxBlogsMessage: string;
  noBlogPostsAvailable: string;
  checkBackLater: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    projects: 'Projects',
    gallery: 'Gallery',
    blog: 'Blog',
    contact: 'Contact',
    admin: 'Admin',
    
    // Hero Section
    heroTitle: 'Transform Your Space',
    heroSubtitle: 'Professional Ceiling Solutions',
    heroDescription: 'We specialize in creating stunning ceiling designs that elevate your interior spaces with unmatched quality and craftsmanship.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    
    // About Section
    aboutTitle: 'About Us',
    aboutSubtitle: 'Excellence in Ceiling Design',
    aboutDescription: 'With years of experience in the industry, we have established ourselves as leaders in ceiling design and installation.',
    ourStory: 'Our Story',
    ourMission: 'Our Mission',
    ourVision: 'Our Vision',
    
    // Services Section
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Comprehensive Ceiling Solutions',
    servicesDescription: 'From design to installation, we offer a complete range of ceiling services tailored to your needs.',
    viewAllServices: 'View All Services',
    
    // Services Page Specific
    servicesPageTitle: 'OUR SERVICES',
    loadingServices: 'Loading services...',
    
    // Projects Section
    projectsTitle: 'Our Projects',
    projectsSubtitle: 'Showcasing Excellence',
    projectsDescription: 'Explore our portfolio of completed projects and see the quality of our work.',
    viewAllProjects: 'View All Projects',
    
    // Gallery Section
    galleryTitle: 'Gallery',
    gallerySubtitle: 'Visual Excellence',
    galleryDescription: 'Browse through our collection of ceiling designs and installations.',
    
    // Blog Section
    blogTitle: 'Latest News',
    blogSubtitle: 'Stay Updated',
    blogDescription: 'Read our latest articles about ceiling trends, tips, and industry insights.',
    readMore: 'Read More',
    viewAllBlogs: 'View All Blogs',
    
    // Blog Page Specific
    blogPageTitle: 'BLOG',
    blogPageSubtitle: 'Insights, tips, and inspiration for ceiling design',
    stayUpdated: 'Stay Updated',
    newsletterDescription: 'Subscribe to our newsletter for the latest ceiling design trends, tips, and project showcases.',
    yourEmailAddress: 'Your email address',
    subscribe: 'Subscribe',
    
    // Contact Section
    contactTitle: 'Contact Us',
    contactSubtitle: 'Get In Touch',
    contactDescription: 'Ready to transform your space? Contact us today for a consultation.',
    contactInfo: 'Contact Information',
    location: 'Location',
    phone: 'Phone',
    email: 'Email',
    sendMessage: 'Send Message',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourMessage: 'Your Message',
    
    // Footer
    footerDescription: 'Professional ceiling solutions for your home and business. Transform your space with our expert design and installation services.',
    quickLinks: 'Quick Links',
    contactUs: 'Contact Us',
    followUs: 'Follow Us',
    allRightsReserved: 'All rights reserved.',
    companyName: 'CeilingsArt',
    designedBy: 'Designed by',
    
    // Footer Services
    luxuryCeilingDesign: 'Luxury Ceiling Design',
    decorativePatterns: 'Decorative Patterns',
    modernArchitecture: 'Modern Architecture',
    traditionalCoffered: 'Traditional Coffered',
    vaultedCeilings: 'Vaulted Ceilings',
    
    // Gallery Page
    galleryPageTitle: 'GALLERY',
    galleryPageSubtitle: 'Explore our portfolio of exceptional ceiling designs',
    readyToTransform: 'Ready to Transform Your Space?',
    transformDescription: 'Let us create a custom ceiling design that reflects your unique style and vision.',
    startYourProject: 'Start Your Project',
    
    // Category Names
    stretchCeiling: 'Stretch Ceiling',
    acoustic: 'Acoustic',
    acousticPanels: 'Acoustic Panels',
    woodWool: 'Wood Wool',
    fiberOptic: 'Fiber Optic',
    fiberOpticCeiling: 'Fiber Optic Ceiling',
    mirrorStretchCeiling: 'Mirror Stretch Ceiling',
    glossyStretchCeiling: 'Glossy Stretch Ceiling',
    printedStretchCeiling: 'Printed Stretch Ceiling',
    translucentStretchCeiling: 'Translucent Stretch Ceiling',
    general: 'General',
    
    // Admin Panel
    adminLogin: 'Admin Login',
    adminDashboard: 'Admin Dashboard',
    adminAccess: 'Admin Access',
    login: 'Login',
    logout: 'Logout',
    adminEmail: 'Email',
    password: 'Password',
    dashboard: 'Dashboard',
    blogs: 'Blogs',
    addNew: 'Add New',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    title: 'Title',
    description: 'Description',
    content: 'Content',
    excerpt: 'Excerpt',
    author: 'Author',
    image: 'Image',
    featured: 'Featured',
    yes: 'Yes',
    no: 'No',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    confirmDelete: 'Confirm Delete',
    deleteConfirmation: 'Are you sure you want to delete this item?',
    maxBlogsReached: 'Maximum Blogs Reached',
    maxBlogsMessage: 'Maximum of 8 blogs reached. Please delete an old blog to create a new one.',
    noBlogPostsAvailable: 'No blog posts available',
    checkBackLater: 'Check back later for new content!',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'من نحن',
    services: 'الخدمات',
    projects: 'المشاريع',
    gallery: 'المعرض',
    blog: 'المدونة',
    contact: 'اتصل بنا',
    admin: 'الإدارة',
    
    // Hero Section
    heroTitle: 'حول مساحتك',
    heroSubtitle: 'حلول الأسقف المهنية',
    heroDescription: 'نحن متخصصون في إنشاء تصاميم أسقف مذهلة ترفع من مستوى مساحاتك الداخلية بجودة وحرفية لا مثيل لها.',
    getStarted: 'ابدأ الآن',
    learnMore: 'اعرف المزيد',
    
    // About Section
    aboutTitle: 'من نحن',
    aboutSubtitle: 'التميز في تصميم الأسقف',
    aboutDescription: 'مع سنوات من الخبرة في الصناعة، أثبتنا أنفسنا كقادة في تصميم وتركيب الأسقف.',
    ourStory: 'قصتنا',
    ourMission: 'مهمتنا',
    ourVision: 'رؤيتنا',
    
    // Services Section
    servicesTitle: 'خدماتنا',
    servicesSubtitle: 'حلول شاملة للأسقف',
    servicesDescription: 'من التصميم إلى التركيب، نقدم مجموعة كاملة من خدمات الأسقف المصممة خصيصاً لاحتياجاتك.',
    viewAllServices: 'عرض جميع الخدمات',
    
    // Services Page Specific
    servicesPageTitle: 'خدماتنا',
    loadingServices: 'جاري تحميل الخدمات...',
    
    // Projects Section
    projectsTitle: 'مشاريعنا',
    projectsSubtitle: 'عرض التميز',
    projectsDescription: 'استكشف محفظة مشاريعنا المكتملة وشاهد جودة عملنا.',
    viewAllProjects: 'عرض جميع المشاريع',
    
    // Gallery Section
    galleryTitle: 'المعرض',
    gallerySubtitle: 'التميز البصري',
    galleryDescription: 'تصفح مجموعتنا من تصاميم وتركيبات الأسقف.',
    
    // Blog Section
    blogTitle: 'آخر الأخبار',
    blogSubtitle: 'ابق على اطلاع',
    blogDescription: 'اقرأ أحدث مقالاتنا حول اتجاهات الأسقف والنصائح ورؤى الصناعة.',
    readMore: 'اقرأ المزيد',
    viewAllBlogs: 'عرض جميع المدونات',
    
    // Blog Page Specific
    blogPageTitle: 'المدونة',
    blogPageSubtitle: 'رؤى ونصائح وإلهام لتصميم الأسقف',
    stayUpdated: 'ابق على اطلاع',
    newsletterDescription: 'اشترك في نشرتنا الإخبارية للحصول على أحدث اتجاهات تصميم الأسقف والنصائح وعروض المشاريع.',
    yourEmailAddress: 'عنوان بريدك الإلكتروني',
    subscribe: 'اشترك',
    
    // Contact Section
    contactTitle: 'اتصل بنا',
    contactSubtitle: 'تواصل معنا',
    contactDescription: 'مستعد لتحويل مساحتك؟ اتصل بنا اليوم للحصول على استشارة.',
    contactInfo: 'معلومات الاتصال',
    location: 'الموقع',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    sendMessage: 'إرسال رسالة',
    yourName: 'اسمك',
    yourEmail: 'بريدك الإلكتروني',
    yourMessage: 'رسالتك',
    
    // Footer
    footerDescription: 'حلول أسقف مهنية لمنزلك وعملك. حول مساحتك بخدمات التصميم والتركيب المتخصصة.',
    quickLinks: 'روابط سريعة',
    contactUs: 'اتصل بنا',
    followUs: 'تابعنا',
    allRightsReserved: 'جميع الحقوق محفوظة.',
    companyName: 'سيلينجز آرت',
    designedBy: 'صمم بواسطة',
    
    // Footer Services
    luxuryCeilingDesign: 'تصميم أسقف فاخرة',
    decorativePatterns: 'أنماط زخرفية',
    modernArchitecture: 'عمارة حديثة',
    traditionalCoffered: 'أسقف تقليدية مجوفة',
    vaultedCeilings: 'أسقف مقببة',
    
    // Gallery Page
    galleryPageTitle: 'المعرض',
    galleryPageSubtitle: 'استكشف محفظة تصاميم الأسقف الاستثنائية',
    readyToTransform: 'مستعد لتحويل مساحتك؟',
    transformDescription: 'دعنا ننشئ تصميم سقف مخصص يعكس أسلوبك ورؤيتك الفريدة.',
    startYourProject: 'ابدأ مشروعك',
    
    // Category Names
    stretchCeiling: 'أسقف مشدودة',
    acoustic: 'عازل للصوت',
    acousticPanels: 'ألواح عازلة للصوت',
    woodWool: 'صوف خشبي',
    fiberOptic: 'ألياف بصرية',
    fiberOpticCeiling: 'سقف ألياف بصرية',
    mirrorStretchCeiling: 'سقف مشدود مرآة',
    glossyStretchCeiling: 'سقف مشدود لامع',
    printedStretchCeiling: 'سقف مشدود مطبوع',
    translucentStretchCeiling: 'سقف مشدود شفاف',
    general: 'عام',
    
    // Admin Panel
    adminLogin: 'تسجيل دخول الإدارة',
    adminDashboard: 'لوحة تحكم الإدارة',
    adminAccess: 'الوصول للإدارة',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    adminEmail: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    dashboard: 'لوحة التحكم',
    blogs: 'المدونات',
    addNew: 'إضافة جديد',
    edit: 'تعديل',
    delete: 'حذف',
    save: 'حفظ',
    cancel: 'إلغاء',
    title: 'العنوان',
    description: 'الوصف',
    content: 'المحتوى',
    excerpt: 'الملخص',
    author: 'المؤلف',
    image: 'الصورة',
    featured: 'مميز',
    yes: 'نعم',
    no: 'لا',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجح',
    confirmDelete: 'تأكيد الحذف',
    deleteConfirmation: 'هل أنت متأكد من أنك تريد حذف هذا العنصر؟',
    maxBlogsReached: 'الحد الأقصى للمدونات',
    maxBlogsMessage: 'تم الوصول للحد الأقصى من 8 مدونات. يرجى حذف مدونة قديمة لإنشاء واحدة جديدة.',
    noBlogPostsAvailable: 'لا توجد مدونات متاحة',
    checkBackLater: 'تحقق مرة أخرى لاحقاً للحصول على محتوى جديد!',
  }
};

export const getTranslation = (language: Language, key: keyof Translations): string => {
  return translations[language][key] || translations.en[key] || key;
};

// Function to translate category names
export const translateCategory = (category: string, language: Language): string => {
  const categoryMap: { [key: string]: keyof Translations } = {
    'Stretch Ceiling': 'stretchCeiling',
    'Acoustic': 'acoustic',
    'Acoustic Panels': 'acousticPanels',
    'Wood Wool': 'woodWool',
    'Fiber Optic': 'fiberOptic',
    'Fiber Optic Ceiling': 'fiberOpticCeiling',
    'Mirror Stretch Ceiling': 'mirrorStretchCeiling',
    'Glossy Stretch Ceiling': 'glossyStretchCeiling',
    'Printed Stretch Ceiling': 'printedStretchCeiling',
    'Translucent Stretch Ceiling': 'translucentStretchCeiling',
    'General': 'general',
  };
  
  const translationKey = categoryMap[category];
  if (translationKey) {
    return getTranslation(language, translationKey);
  }
  
  // If no translation found, return the original category
  return category;
};

