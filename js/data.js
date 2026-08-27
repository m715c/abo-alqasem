/* ------------------------------------------------------------------
   data.js — كل محتوى الموقع
   المعلومات الشخصية والخبرات مأخوذة من السيرة الذاتية.
   ما تبقّى مبدئياً: عناوين أعمال الفيديو فقط (عمل ٠١ … عمل ٠٨).
-------------------------------------------------------------------*/

var PROFILE = {
  name:  { en: 'Mohamed Hassan Al-Mousawi', ar: 'محمد حسن الموسوي' },
  role:  { en: 'Marketing Copywriter', ar: 'كاتب محتوى تسويقي' },
  roles: {
    en: 'Marketing Copywriter · Marketing Consultant · Content Strategist',
    ar: 'كاتب محتوى تسويقي · مستشار تسويق · كاتب خطط محتوى'
  },
  city:  { en: 'Baghdad · Iraq', ar: 'بغداد · العراق' },
  area:  { en: 'Al-Shalijiya, Baghdad — Iraq', ar: 'الشالجية، بغداد — العراق' },
  phone: '07732717805',
  phoneIntl: '+9647732717805',
  lede: {
    en: 'I write marketing and creative content that hits its target — and I build the strategy behind it from scratch.',
    ar: 'أكتب المحتوى التسويقي والإبداعي الذي يصيب هدفه — وأبني الاستراتيجية التي تقف خلفه من الصفر.'
  },
  about: {
    en: 'A specialist in marketing and creative content writing with a documented track record in producing professional digital content that meets marketing objectives and strengthens the digital presence of brands. I have worked with leading influencers, major platforms and advertising agencies, and I build content strategies and execute them from the ground up.',
    ar: 'متخصص في كتابة المحتوى التسويقي والمحتوى الإبداعي، أمتلك خبرة عملية موثّقة في إنتاج محتوى رقمي احترافي يحقّق الأهداف التسويقية ويعزّز الحضور الرقمي للعلامات التجارية. عملت مع نخبة من المؤثرين والمنصات الرائدة والشركات الإعلانية، وأتمتّع بقدرة عالية على بناء استراتيجيات المحتوى وتنفيذها من الصفر.'
  }
};

/* المهارات والتخصصات */
var SKILLS = [
  { en: 'Persuasive marketing copywriting', ar: 'كتابة المحتوى التسويقي الإقناعي', tag: 'Copywriting' },
  { en: 'Creative and general content writing', ar: 'كتابة المحتوى الإبداعي والعام', tag: 'Content Writing' },
  { en: 'Marketing consulting & digital identity', ar: 'الاستشارات التسويقية وبناء الهوية الرقمية', tag: '' },
  { en: 'Content strategy planning', ar: 'تخطيط استراتيجيات المحتوى', tag: 'Content Strategy' },
  { en: 'Full marketing plans', ar: 'كتابة الخطط التسويقية الشاملة', tag: '' },
  { en: 'Social media content management', ar: 'إدارة المحتوى عبر منصات التواصل', tag: '' },
  { en: 'Audience analysis & message targeting', ar: 'تحليل الجمهور المستهدف وتوجيه الرسائل', tag: '' },
  { en: 'Monthly & quarterly content plans', ar: 'صياغة خطط المحتوى الشهرية والفصلية', tag: '' }
];

/* الخبرات العملية */
var EXPERIENCE = [
  {
    role:  { en: 'Account Manager', ar: 'أكاونت مانجر' },
    org:   { en: 'Logic Company', ar: 'شركة لوجك' },
    time:  { en: '1 year', ar: 'سنة واحدة' },
    items: [
      { en: 'Following marketing campaigns and overseeing their execution.', ar: 'متابعة الحملات التسويقية والإشراف على سير تنفيذها' },
      { en: 'Supervising the photography operations for each campaign.', ar: 'الإشراف على عمليات التصوير الخاصة بالحملات' },
      { en: 'Supervising the campaign copy.', ar: 'الإشراف على كتابة المحتوى الخاص بالحملات' },
      { en: 'Coordinating between photography, copy and design teams so the output stays coherent.', ar: 'التنسيق بين الفرق المختلفة (التصوير والكتابة والتصميم) لضمان انسجام المخرجات' }
    ]
  },
  {
    role:  { en: 'Advertising Copywriter', ar: 'كاتب محتوى إعلاني' },
    org:   { en: 'Watad Advertising', ar: 'شركة وتد الإعلانية' },
    time:  { en: '', ar: '' },
    items: [
      { en: 'Professional ad copy for campaigns across a range of client sectors.', ar: 'كتابة محتوى إعلاني احترافي للحملات التسويقية لعملاء الشركة من مختلف القطاعات' },
      { en: 'Creative, persuasive copy for print and digital advertising.', ar: 'صياغة نصوص إبداعية وإقناعية للإعلانات المطبوعة والرقمية' },
      { en: 'Working with design and production so the message matches the visual identity.', ar: 'التنسيق مع فريق التصميم والإنتاج لضمان توافق الرسالة الإعلانية مع الهوية البصرية' },
      { en: 'Developing creative concepts and improving campaign performance.', ar: 'المساهمة في تطوير أفكار إبداعية للحملات الإعلانية وتحسين أدائها' }
    ]
  },
  {
    role:  { en: 'Content Writer', ar: 'كاتب محتوى' },
    org:   { en: 'Shabab Plus · Ali Al-Rubaie official page', ar: 'منصة شباب بلص · صفحة علي الربيعي الرسمية' },
    time:  { en: '', ar: '' },
    items: [
      { en: 'Systematic creative and marketing content for the platform and its official channels.', ar: 'إنتاج محتوى إبداعي وتسويقي ممنهج للمنصة والقنوات الرسمية' },
      { en: 'Post copy, scripts and content built to hold a young audience.', ar: 'كتابة نصوص المنشورات والسيناريوهات والمحتوى الجذاب لجمهور الشباب' },
      { en: 'Working with the production team to keep visual identity and content consistent.', ar: 'التنسيق مع فريق الإنتاج لضمان الاتساق في الهوية البصرية والمحتوى' },
      { en: 'Raising engagement rates and organic reach.', ar: 'المساهمة في رفع معدلات التفاعل والوصول العضوي على المنصات الرقمية' }
    ]
  },
  {
    role:  { en: 'Photographer', ar: 'مصوّر فوتوغرافي' },
    org:   { en: 'Freelance', ar: 'عمل حر' },
    time:  { en: '', ar: '' },
    items: [
      { en: 'Product, event and celebration photography for clients across Iraq.', ar: 'تصوير المنتجات والفعاليات والحفلات لصالح عملاء متعددين في العراق' },
      { en: 'Combining photography with copywriting to deliver complete creative packages.', ar: 'الدمج بين مهارات التصوير وكتابة المحتوى لتقديم حزم إبداعية متكاملة للعملاء' }
    ]
  },
  {
    role:  { en: 'Independent Marketing Consultant', ar: 'مستشار تسويق مستقل' },
    org:   { en: 'Freelance', ar: 'عمل حر' },
    time:  { en: '', ar: '' },
    items: [
      { en: 'Marketing consulting for individuals, companies and institutions in Iraq.', ar: 'تقديم الاستشارات التسويقية للأفراد والشركات والمؤسسات في العراق' },
      { en: 'Full marketing plans covering content strategy and the right channels.', ar: 'بناء خطط تسويقية شاملة تتضمن استراتيجية المحتوى والقنوات المناسبة' },
      { en: 'Detailed content plans written to each client’s commercial goals.', ar: 'كتابة وتطوير خطط المحتوى المفصّلة للعملاء وفق أهدافهم التجارية' },
      { en: 'Target market analysis and actionable strategic recommendations.', ar: 'تحليل السوق المستهدف وتقديم توصيات استراتيجية قابلة للتنفيذ' }
    ]
  }
];

/* أمثلة من العملاء */
var CLIENTS = [
  {
    name:   { en: 'Jarayan Al-Omr Complex', ar: 'مجمع جريان العمر' },
    work:   { en: 'Digital presence and marketing content across social platforms.', ar: 'إدارة الحضور الرقمي والمحتوى التسويقي عبر منصات التواصل الاجتماعي' },
    result: { en: '', ar: '' }
  },
  {
    name:   { en: 'Anwar Al-Huda Foundation', ar: 'مؤسسة أنوار الهدى' },
    work:   { en: 'A complete marketing plan built from scratch.', ar: 'بناء خطة تسويقية متكاملة' },
    result: { en: '2,000+ app downloads', ar: 'أكثر من ٢٠٠٠ تحميل واستخدام للتطبيق' }
  }
];

/* الشهادات */
var CERTS = [
  {
    name: { en: 'Creativity & Innovation Certificate', ar: 'شهادة الإبداع والابتكار' },
    by:   { en: 'Issued by IDU', ar: 'الجهة المانحة: منظمة IDU' }
  }
];

/* ------------------------------------------------------------------
   أعمال الفيديو
     ar  : العرض ÷ الارتفاع (0.5625 = عمودي ٩:١٦ · 1.7778 = أفقي ١٦:٩)
     dur : المدة بالثواني   ·   mb : الحجم
   العناوين مبدئية — استبدلها باسم كل عمل والجهة التي أُنتج لها.
-------------------------------------------------------------------*/
var WORKS = [
  { id: 'v01', file: 'v01.mp4', ar: 0.5625, dur: 37,  mb: 4.3,
    title: { en: 'Work 01', ar: 'عمل ٠١' },
    note:  { en: 'Vertical cut for social platforms.', ar: 'مونتاج عمودي لمنصات التواصل.' } },

  { id: 'v03', file: 'v03.mp4', ar: 0.5625, dur: 72,  mb: 7.2,
    title: { en: 'Work 02', ar: 'عمل ٠٢' },
    note:  { en: 'Vertical cut for social platforms.', ar: 'مونتاج عمودي لمنصات التواصل.' } },

  { id: 'v04', file: 'v04.mp4', ar: 0.5625, dur: 69,  mb: 8.0,
    title: { en: 'Work 03', ar: 'عمل ٠٣' },
    note:  { en: 'Vertical cut for social platforms.', ar: 'مونتاج عمودي لمنصات التواصل.' } },

  { id: 'v05', file: 'v05.mp4', ar: 0.5625, dur: 85,  mb: 8.5,
    title: { en: 'Work 04', ar: 'عمل ٠٤' },
    note:  { en: 'Vertical cut for social platforms.', ar: 'مونتاج عمودي لمنصات التواصل.' } },

  { id: 'v06', file: 'v06.mp4', ar: 0.5625, dur: 90,  mb: 9.0,
    title: { en: 'Work 05', ar: 'عمل ٠٥' },
    note:  { en: 'Vertical cut for social platforms.', ar: 'مونتاج عمودي لمنصات التواصل.' } },

  { id: 'v02', file: 'v02.mp4', ar: 1.7931, dur: 28,  mb: 4.5,
    title: { en: 'Work 06', ar: 'عمل ٠٦' },
    note:  { en: 'Widescreen edit.', ar: 'مونتاج بصيغة عريضة.' } },

  { id: 'v07', file: 'v07.mp4', ar: 1.7778, dur: 122, mb: 10.5,
    title: { en: 'Work 07', ar: 'عمل ٠٧' },
    note:  { en: 'Widescreen edit.', ar: 'مونتاج بصيغة عريضة.' } },

  { id: 'v08', file: 'v08.mp4', ar: 1.7778, dur: 135, mb: 11.7,
    title: { en: 'Work 08', ar: 'عمل ٠٨' },
    note:  { en: 'Widescreen edit.', ar: 'مونتاج بصيغة عريضة.' } }
];

for (var i = 0; i < WORKS.length; i++) {
  WORKS[i].src = 'assets/video/' + WORKS[i].file;
}
