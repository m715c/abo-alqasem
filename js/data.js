/* ------------------------------------------------------------------
   data.js — كل محتوى الموقع
   المعلومات الشخصية والخبرات مأخوذة من السيرة الذاتية.
   ما تبقّى مبدئياً: عناوين أعمال الفيديو فقط (عمل ٠١ … عمل ٠٨).
-------------------------------------------------------------------*/

var PROFILE = {
  name:  { en: 'Mohamed Hassan Al-Mousawi', ar: 'محمد حسن الموسوي' },
  role:  { en: 'Account Manager · Content Writer', ar: 'أكاونت مانجر · كاتب محتوى' },
  roles: {
    en: 'Account Manager & Content Writer',
    ar: 'أكاونت مانجر وكاتب محتوى'
  },
  city:  { en: 'Baghdad · Iraq', ar: 'بغداد · العراق' },
  area:  { en: 'Al-Shalijiya, Baghdad — Iraq', ar: 'الشالجية، بغداد — العراق' },
  phone: '07732717805',
  phoneIntl: '+9647732717805',
  lede: {
    en: 'I run campaigns end to end and write the content that carries them.',
    ar: 'أدير الحملات من أولها إلى آخرها، وأكتب المحتوى الذي يحملها.'
  },
  about: {
    en: 'Account manager and content writer with hands-on experience in marketing. I have run company openings and full advertising campaigns for clients across different sectors, including education. I believe any project succeeds the moment you truly understand the client and build trust that lasts.',
    ar: 'أكاونت مانجر وكاتب محتوى بخبرة عملية في قطاع التسويق. نفّذت افتتاحيات شركات وأدرت حملات إعلانية متكاملة لعملاء من مجالات مختلفة، منها قطاع التعليم. وأؤمن أن نجاح أي مشروع يبدأ من فهم العميل فهماً حقيقياً وبناء ثقة تدوم.'
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
  { en: 'Monthly & quarterly content plans', ar: 'صياغة خطط المحتوى الشهرية والفصلية', tag: '' },
  { en: 'Negotiation', ar: 'التفاوض', tag: '' },
  { en: 'Problem solving', ar: 'حل المشكلات', tag: '' },
  { en: 'Organisation & coordination', ar: 'التنظيم والتنسيق', tag: '' }
];

/* الخبرات العملية */
var EXPERIENCE = [
  {
    role:  { en: 'Account Manager', ar: 'أكاونت مانجر' },
    org:   { en: 'Logic Company', ar: 'شركة لوجك' },
    time:  { en: '1 year', ar: 'سنة واحدة' },
    items: [
      { en: 'Company opening events, executed end to end.', ar: 'تنفيذ افتتاحيات الشركات من أولها إلى آخرها' },
      { en: 'Full advertising campaigns for clients across sectors, including education.', ar: 'إدارة حملات إعلانية متكاملة لعملاء من مجالات مختلفة، منها قطاع التعليم (المدارس)' },
      { en: 'Honouring ceremonies for top students, built on ideas nobody had used before.', ar: 'تنظيم حفلات تكريم للأوائل بأفكار مبتكرة ومختلفة' },
      { en: 'A creative solution shaped to each client — which is what turned them into repeat clients.', ar: 'حلول إبداعية تُفصَّل لكل عميل على حدة، وهو ما حوّله إلى عميل دائم' },
      { en: 'Coordinating photography, copy and design so the output stays coherent.', ar: 'التنسيق بين فرق التصوير والكتابة والتصميم لضمان انسجام المخرجات' }
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
    role:  { en: 'Photography', ar: 'التصوير' },
    org:   { en: 'Within campaigns and events', ar: 'ضمن الحملات والفعاليات' },
    time:  { en: 'Working experience, not a specialisation', ar: 'خبرة عملية لا تخصّص' },
    items: [
      { en: 'Shooting products and events within client campaigns.', ar: 'تصوير المنتجات والفعاليات ضمن حملات العملاء' },
      { en: 'Combining shooting with copywriting to deliver a complete package.', ar: 'الدمج بين التصوير وكتابة المحتوى لتقديم حزمة متكاملة' }
    ]
  },
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
,

  { id: 'v09', file: 'v09.mp4', ar: 0.5625, dur: 30, mb: 3.7,
    title: { en: 'Work 09', ar: 'عمل ٠٩' },
    note:  { en: 'Vertical cut for social platforms.', ar: 'مونتاج عمودي لمنصات التواصل.' } },

  { id: 'v10', file: 'v10.mp4', ar: 0.5625, dur: 50, mb: 5.5,
    title: { en: 'Work 10', ar: 'عمل ١٠' },
    note:  { en: 'Vertical cut for social platforms.', ar: 'مونتاج عمودي لمنصات التواصل.' } },

  { id: 'v11', file: 'v11.mp4', ar: 0.5625, dur: 42, mb: 3.8,
    title: { en: 'Work 11', ar: 'عمل ١١' },
    note:  { en: 'Vertical cut for social platforms.', ar: 'مونتاج عمودي لمنصات التواصل.' } },

  { id: 'v12', file: 'v12.mp4', ar: 0.5625, dur: 28, mb: 2.7,
    title: { en: 'Work 12', ar: 'عمل ١٢' },
    note:  { en: 'Vertical cut for social platforms.', ar: 'مونتاج عمودي لمنصات التواصل.' } },

  { id: 'v13', file: 'v13.mp4', ar: 0.5625, dur: 56, mb: 12.5,
    title: { en: 'Work 13', ar: 'عمل ١٣' },
    note:  { en: 'Vertical cut for social platforms.', ar: 'مونتاج عمودي لمنصات التواصل.' } },

  { id: 'v14', file: 'v14.mp4', ar: 0.5625, dur: 123, mb: 11.0,
    title: { en: 'Work 14', ar: 'عمل ١٤' },
    note:  { en: 'Vertical cut for social platforms.', ar: 'مونتاج عمودي لمنصات التواصل.' } },

  { id: 'v15', file: 'v15.mp4', ar: 1.7778, dur: 39, mb: 6.7,
    title: { en: 'Work 15', ar: 'عمل ١٥' },
    note:  { en: 'Widescreen edit.', ar: 'مونتاج بصيغة عريضة.' } },
];

/* ------------------------------------------------------------------
   الكواليس — مقاطع من وراء الكاميرا.
   كلها بلا صوت في كل مكان: في الشريط وفي المشغّل على السواء.
-------------------------------------------------------------------*/
var BTS = [
  { id: 'b01', file: 'b01.mp4', ar: 0.5500, dur: 12, mb: 1.1 },
  { id: 'b02', file: 'b02.mp4', ar: 0.5500, dur: 12, mb: 1.1 },
  { id: 'b03', file: 'b03.mp4', ar: 0.5641, dur: 35, mb: 3.1 },
  { id: 'b04', file: 'b04.mp4', ar: 0.5641, dur: 6,  mb: 0.6 },
  { id: 'b05', file: 'b05.mp4', ar: 0.5641, dur: 14, mb: 1.2 },
  { id: 'b06', file: 'b06.mp4', ar: 0.5641, dur: 12, mb: 1.0 },
  { id: 'b07', file: 'b07.mp4', ar: 0.5641, dur: 32, mb: 2.8 },
  { id: 'b08', file: 'b08.mp4', ar: 0.5500, dur: 32, mb: 2.8 }
];

for (var bi = 0; bi < BTS.length; bi++) {
  BTS[bi].src   = 'assets/bts/' + BTS[bi].file;
  BTS[bi].mute  = true;                       /* لا صوت أبداً */
  BTS[bi].title = { en: 'Behind the scenes ' + (bi + 1 < 10 ? '0' + (bi + 1) : bi + 1),
                    ar: 'كواليس ' + (bi + 1 < 10 ? '٠' + '١٢٣٤٥٦٧٨٩'[bi] : '') };
  BTS[bi].note  = { en: 'From behind the camera.', ar: 'من وراء الكاميرا.' };
}

for (var i = 0; i < WORKS.length; i++) {
  WORKS[i].src = 'assets/video/' + WORKS[i].file;
}
