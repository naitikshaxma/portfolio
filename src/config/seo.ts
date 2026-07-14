import { siteConfig } from './site'

export const seoConfig = {
  defaultTitle: siteConfig.title,
  titleTemplate: `%s | ${siteConfig.name}`,
  defaultDescription: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    handle: '@kronos_operator',
    site: '@kronos_operator',
    cardType: 'summary_large_image',
  },
}

export function generateJSONLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author,
    url: siteConfig.url,
    jobTitle: 'Principal Software Architect',
    knowsAbout: [
      'React 19',
      'Three.js',
      'WebGL Shaders',
      'Framer Motion',
      'TypeScript',
      'System Architecture',
      'GSAP Animations',
    ],
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin
    ]
  }
}
