const posts = [
  {
    id: 1,
    title: 'Boost your financial growth',
    href: '#',
    description:
      'Discover strategies to maximize your wealth, manage risks, and make informed investment decisions for long-term success.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Finance', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Financial Analyst',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Boost your financial growth',
    href: '#',
    description:
      'Discover strategies to maximize your wealth, manage risks, and make informed investment decisions for long-term success.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Finance', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Financial Analyst',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Boost your financial growth',
    href: '#',
    description:
      'Discover strategies to maximize your wealth, manage risks, and make informed investment decisions for long-term success.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Finance', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Financial Analyst',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  // More posts...
];

export default function Example() {
  return (
    <div className="bg-black py-24 sm:py-32 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-100 sm:text-5xl">
            Financial Insights
          </h2>
          <p className="mt-2 text-lg text-gray-400">
            Learn how to grow your wealth with expert financial strategies.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="flex items-center gap-x-4 text-xs text-gray-400">
                <time dateTime={post.datetime}>{post.date}</time>
                <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-gray-700 px-3 py-1.5 font-medium text-gray-300 hover:bg-gray-600"
                >
                  {post.category.title}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold text-gray-100 group-hover:text-gray-300">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm text-gray-400">{post.description}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img alt="" src={post.author.imageUrl} className="size-10 rounded-full bg-gray-700" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-100">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-gray-400">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
