import lb_ig_1 from '../assets/automation/little_books/ig/quote_1.jpg';
import lb_ig_2 from '../assets/automation/little_books/ig/quote_2.jpg';
import lb_ig_3 from '../assets/automation/little_books/ig/quote_3.jpg';
import lb_ig_4 from '../assets/automation/little_books/ig/quote_4.jpg';
import lb_ig_5 from '../assets/automation/little_books/ig/quote_5.jpg';
import lb_ig_book from '../assets/automation/little_books/ig/book.jpg';
import lb_ig_author from '../assets/automation/little_books/ig/author.jpg';
import lb_logo from '../assets/automation/little_books/ig/littlebooks_logo.png';
import lb_tiktokVideo from '../assets/automation/little_books/tiktok/tiktok_video.mp4';

const lb_ig_images = [lb_ig_book, lb_ig_1, lb_ig_2, lb_ig_3, lb_ig_4, lb_ig_5, lb_ig_author];

const automations = [
  {
    id: 1,
    title: 'littlebooks',
    description:
      'Automated pipeline that collects data about authors and their books, extracts quotes, and generates ready-to-post Instagram images and TikTok videos',
    category: 'Books',
    logo: lb_logo,
    ig: "@rod.littlebooks",
    ig_url: "https://www.instagram.com/rod.littlebooks/",
    ig_reel: lb_ig_images,
    tiktok: "@rod.littlebooks",
    tiktok_URL: "https://www.tiktok.com/@rod.littlebooks",
    tiktok_video: lb_tiktokVideo,
    caption: `📖 "The Devil and Miss Prym"
      ✍️ Paulo Coelho • 2000

      ⭐ 4.0/5 ⭐ (6 ratings)

      #Fiction #Suspense #GoodAndEvil #TranslationsIntoEnglish

      👤 Paulo Coelho — Brazilian lyricist and novelist (born 1947)
      https://en.wikipedia.org/wiki/Paulo_Coelho`,
    automation_logic: `Developed an automated content generation pipeline for Instagram and TikTok using Python and multiple book-related APIs to extract quotes, metadata, ratings, and author information. The system processes and transforms the collected data before storing it in a MySQL database. Using Docker containers deployed on a DigitalOcean virtual machine, I configured scheduled cron jobs to automatically generate images, captions, and videos once per day and publish them directly to connected Instagram and TikTok accounts.`,
    external_APIs: ["goodreads API", "googlebooks API", "openlibrary API", "pexels API", "wikipedia API"],
    tools: ['python', 'Django', 'mySQL', 'Docker', 'IG API', "TikTok API", "Digital Ocean"],
    status: 'production',
    impact: '☕📖  "Keeping stories alive, one quote at a time..."',
    featured: true,
  },
];

export default automations;
