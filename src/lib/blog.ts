import type { CollectionEntry } from 'astro:content';
import type { LocationId } from '../data/locations';
import { getAllLocationIds } from '../data/locations';

/**
 * Known location mappings and aliases for tag/text matching.
 */
const LOCATION_KEYWORDS: Record<LocationId, string[]> = {
  bridgeport: ['bridgeport', 'seaside park', 'black rock'],
  danbury: ['danbury', 'candlewood', 'kenosia', 'still river', 'i-84', 'route 7'],
  watertown: ['watertown', 'oakville', 'steele brook'],
};

interface PostLocationInput {
  id?: string;
  data: {
    tags?: string[];
    location?: string;
    areaServed?: Array<{ name: string }>;
  };
}

/**
 * Returns all LocationIds associated with a blog post, checked via:
 * 1. Explicit `location` field in frontmatter
 * 2. Tags containing location keywords
 * 3. `areaServed` cities matching a branch office city
 * 4. Post slug/id containing a branch location identifier
 */
export function getPostLocations(post: PostLocationInput): LocationId[] {
  const matched = new Set<LocationId>();
  const allIds = getAllLocationIds();

  // 1. Check explicit frontmatter location
  if (post.data.location) {
    const locLower = post.data.location.trim().toLowerCase();
    for (const id of allIds) {
      if (locLower === id || LOCATION_KEYWORDS[id].some((kw) => locLower.includes(kw))) {
        matched.add(id);
      }
    }
  }

  // 2. Check tags
  const tags = post.data.tags || [];
  for (const tag of tags) {
    const tagLower = tag.toLowerCase();
    for (const id of allIds) {
      if (LOCATION_KEYWORDS[id].some((kw) => tagLower.includes(kw))) {
        matched.add(id);
      }
    }
  }

  // 3. Check areaServed frontmatter if present
  const areaServed = post.data.areaServed || [];
  for (const place of areaServed) {
    if (!place?.name) continue;
    const placeLower = place.name.trim().toLowerCase();
    for (const id of allIds) {
      if (placeLower === id || LOCATION_KEYWORDS[id].some((kw) => placeLower.includes(kw))) {
        matched.add(id);
      }
    }
  }

  // 4. Check post slug/id if present
  if (post.id) {
    const slugLower = post.id.toLowerCase();
    for (const id of allIds) {
      if (slugLower.includes(id)) {
        matched.add(id);
      }
    }
  }

  return Array.from(matched);
}

/**
 * Checks if a blog post matches a given location filter.
 * Passing 'all' returns true for every post.
 */
export function postMatchesLocation(
  post: PostLocationInput,
  locationId: string
): boolean {
  if (!locationId || locationId === 'all') {
    return true;
  }
  const postLocations = getPostLocations(post);
  return postLocations.includes(locationId.toLowerCase() as LocationId);
}

/**
 * Builds the canonical relative URL for a blog post based on its language and ID.
 */
export function getPostUrl(post: { id: string }, lang: string = 'en'): string {
  const cleanId = post.id.replace(/^(en|es|pt|tr)\//, '');
  if (lang === 'en') {
    return `/blog/${cleanId}`;
  }
  return `/${lang}/blog/${cleanId}`;
}
