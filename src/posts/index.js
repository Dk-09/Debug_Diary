const modules = import.meta.glob('./*.mdx', { eager: true });

const posts = {};
for (const path in modules) {
  const name = path.split('/').pop().replace('.mdx', '');
  posts[name] = modules[path].default;
}

export default posts;