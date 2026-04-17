import { config, fields } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },

  ui: {
    brand: { name: 'yagomatsura.dev' },
    navigation: {
      Blog: ['blogPt', 'blogEn'],
      Work: ['projects'],
    },
  },

  collections: {
    blogPt: {
      label: 'Blog (PT)',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            validation: { length: { min: 1 } },
          },
          slug: {
            label: 'Slug',
            description: 'Filename and URL path for this post.',
          },
        }),
        date: fields.date({
          label: 'Date',
          validation: { isRequired: true },
        }),
        lang: fields.select({
          label: 'Language',
          options: [
            { label: 'Português', value: 'pt' },
            { label: 'English', value: 'en' },
          ],
          defaultValue: 'pt',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: false,
        }),
        translationOf: fields.relationship({
          label: 'English translation',
          collection: 'blogEn',
          description: 'Link to the English version of this post.',
        }),
        ogImage: fields.image({
          label: 'OG image',
          directory: 'public/og',
          publicPath: '/og/',
        }),
        content: fields.mdx({
          label: 'Content',
        }),
      },
    },

    blogEn: {
      label: 'Blog (EN)',
      slugField: 'title',
      path: 'src/content/blog/en/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            validation: { length: { min: 1 } },
          },
          slug: {
            label: 'Slug',
            description: 'Filename and URL path for this post.',
          },
        }),
        date: fields.date({
          label: 'Date',
          validation: { isRequired: true },
        }),
        lang: fields.select({
          label: 'Language',
          options: [
            { label: 'Português', value: 'pt' },
            { label: 'English', value: 'en' },
          ],
          defaultValue: 'en',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: false,
        }),
        translationOf: fields.relationship({
          label: 'Portuguese translation',
          collection: 'blogPt',
          description: 'Link to the Portuguese version of this post.',
        }),
        ogImage: fields.image({
          label: 'OG image',
          directory: 'public/og',
          publicPath: '/og/',
        }),
        content: fields.mdx({
          label: 'Content',
        }),
      },
    },

    projects: {
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            validation: { length: { min: 1 } },
          },
          slug: {
            label: 'Slug',
          },
        }),
        description: fields.object(
          {
            pt: fields.text({
              label: 'Descrição (PT)',
              multiline: true,
              validation: { length: { min: 1 } },
            }),
            en: fields.text({
              label: 'Description (EN)',
              multiline: true,
              validation: { length: { min: 1 } },
            }),
          },
          { label: 'Description' }
        ),
        stack: fields.array(fields.text({ label: 'Tech' }), {
          label: 'Stack',
          itemLabel: (props) => props.value,
        }),
        githubUrl: fields.url({ label: 'GitHub URL' }),
        demoUrl: fields.url({ label: 'Demo URL' }),
        featured: fields.checkbox({
          label: 'Featured',
          defaultValue: false,
        }),
        order: fields.integer({
          label: 'Order',
          defaultValue: 0,
        }),
        content: fields.mdx({
          label: 'Content',
        }),
      },
    },
  },
});
