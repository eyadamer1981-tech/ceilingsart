import { ImageWithFallback } from './figma/ImageWithFallback';

export function BlogPage() {
  const blogPosts = [
    {
      title: "The Art of Coffered Ceilings: A Timeless Design Element",
      excerpt: "Discover how coffered ceilings can add depth, elegance, and architectural interest to any space. Learn about the history and modern applications of this classic design technique.",
      image: "https://images.unsplash.com/photo-1731752750546-f3ad83f6de00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZXJlZCUyMGNlaWxpbmclMjBkZXNpZ258ZW58MXx8fHwxNzU4NTg1OTY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "December 15, 2024",
      category: "Design Tips"
    },
    {
      title: "Integrating LED Lighting in Modern Ceiling Designs",
      excerpt: "Explore the latest trends in LED ceiling lighting integration. From cove lighting to dramatic accent features, learn how to illuminate your space effectively.",
      image: "https://images.unsplash.com/photo-1663082353116-73bdf70050be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjZWlsaW5nJTIwZGVzaWduJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzU4NTg1OTUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "December 8, 2024",
      category: "Technology"
    },
    {
      title: "Choosing the Right Materials for Your Ceiling Project",
      excerpt: "A comprehensive guide to selecting materials for ceiling installations. Compare wood, metal, gypsum, and composite options for your next project.",
      image: "https://images.unsplash.com/photo-1704120103311-4a5245e44ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwY2VpbGluZyUyMHBhdHRlcm5zfGVufDF8fHx8MTc1ODU4NTk2NHww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "November 28, 2024",
      category: "Materials"
    },
    {
      title: "Vaulted Ceilings: Creating Drama and Space",
      excerpt: "Learn how vaulted ceilings can transform small spaces and create stunning focal points. Discover design principles and construction considerations.",
      image: "https://images.unsplash.com/photo-1755617091017-ebfa3591b3ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YXVsdGVkJTIwY2VpbGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NTg1ODU5NzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "November 15, 2024",
      category: "Architecture"
    },
    {
      title: "Maintenance Tips for Decorative Ceilings",
      excerpt: "Keep your decorative ceilings looking pristine with these professional maintenance tips. Learn about cleaning techniques and preservation methods.",
      image: "https://images.unsplash.com/photo-1683928427301-bf1806f080ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwY2VpbGluZyUyMGRldGFpbHN8ZW58MXx8fHwxNzU4NTg1OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "November 2, 2024",
      category: "Maintenance"
    },
    {
      title: "Acoustic Considerations in Ceiling Design",
      excerpt: "Discover how ceiling design can impact room acoustics. Learn about sound absorption, reflection, and creating optimal acoustic environments.",
      image: "https://images.unsplash.com/photo-1662261896102-1971998b76c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjZWlsaW5nJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzU4NTg1OTU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "October 20, 2024",
      category: "Acoustics"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      {/* Header Section */}
      <div className="relative py-20 text-center">
        {/* Decorative wave at top */}
        <div className="absolute top-0 left-0 w-full opacity-30">
          <svg
            viewBox="0 0 1200 60"
            fill="none"
            className="w-full h-auto"
          >
            <path
              d="M0,30C150,20 300,40 600,30C900,20 1050,40 1200,30L1200,60L0,60Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide mb-4">
            BLOG
          </h1>
          <p className="text-xl text-gray-300 tracking-wide">
            Insights, tips, and inspiration for ceiling design
          </p>
        </div>

        {/* Decorative wave at bottom */}
        <div className="absolute bottom-0 left-0 w-full opacity-30">
          <svg
            viewBox="0 0 1200 60"
            fill="none"
            className="w-full h-auto"
          >
            <path
              d="M0,30C150,40 300,20 600,30C900,40 1050,20 1200,30L1200,0L0,0Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  
                  <h2 className="text-xl font-medium text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors duration-300">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <button className="mt-4 text-orange-500 font-medium hover:text-orange-600 transition-colors duration-300">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-wide">
              Stay Updated
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest ceiling design trends, tips, and project showcases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-8 py-3 rounded-full hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium tracking-wide">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}