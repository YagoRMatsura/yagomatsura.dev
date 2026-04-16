import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const isProd = import.meta.env.PROD;
  const posts = (await getCollection('blog'))
    .filter((p) => !isProd || !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Yago Matsura',
    description:
      'Ensaios sobre direito, tecnologia e legal tech. Essays on law, tech, and the intersection.',
    site: context.site!,
    items: posts.map((p) => {
      const isEn = p.data.lang === 'en';
      const slug = isEn ? p.id.replace(/^en\//, '') : p.id;
      const link = isEn ? `/en/blog/${slug}/` : `/blog/${slug}/`;
      return {
        title: p.data.title,
        pubDate: p.data.date,
        description: p.data.excerpt,
        link,
        categories: p.data.tags,
      };
    }),
    customData: '<language>pt-BR</language>',
  });
}
