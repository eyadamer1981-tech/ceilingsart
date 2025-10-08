/**
 * Modular Internal Links Generator
 * Supports both automatic (from database) and manual (per-post) link mappings
 */

import { LinkMapping, InternalLinkResult, injectInternalLinks } from './internal-linking';

export interface ManualLinkMapping {
  keyword: string;
  url: string;
  caseSensitive?: boolean;
  maxOccurrences?: number;
}

export interface GenerateLinksOptions {
  content: string;
  autoLinks: LinkMapping[];
  manualLinks: ManualLinkMapping[];
  useAutoLinks: boolean;
  maxLinksPerPost: number;
}

/**
 * Generate internal links with support for both auto and manual modes
 *
 * @param options - Configuration for link generation
 * @returns Processed content with links and metadata
 */
export function generateInternalLinks(options: GenerateLinksOptions): InternalLinkResult {
  const {
    content,
    autoLinks,
    manualLinks,
    useAutoLinks,
    maxLinksPerPost,
  } = options;

  // Convert manual links to LinkMapping format
  const manualMappings: LinkMapping[] = manualLinks.map((link, index) => ({
    keyword: link.keyword,
    url: link.url,
    priority: 1000 + index, // Give manual links higher priority
    caseSensitive: link.caseSensitive || false,
    maxOccurrences: link.maxOccurrences || 1,
    isActive: true,
  }));

  let combinedMappings: LinkMapping[] = [];

  if (useAutoLinks) {
    // Merge manual + auto (manual has higher priority due to priority numbers)
    combinedMappings = [...manualMappings, ...autoLinks];
  } else {
    // Use only manual links
    combinedMappings = manualMappings;
  }

  // If no links to apply, return original content
  if (combinedMappings.length === 0) {
    return {
      processedContent: content,
      linksApplied: [],
      linkCount: 0,
    };
  }

  // Apply internal links
  return injectInternalLinks(content, combinedMappings, maxLinksPerPost);
}

/**
 * Merge manual and automatic link mappings with priority handling
 */
export function mergeLinkMappings(
  autoMappings: LinkMapping[],
  manualMappings: ManualLinkMapping[],
  useAuto: boolean
): LinkMapping[] {
  if (!useAuto) {
    // Return only manual mappings
    return manualMappings.map((link, index) => ({
      keyword: link.keyword,
      url: link.url,
      priority: 1000 + index,
      caseSensitive: link.caseSensitive || false,
      maxOccurrences: link.maxOccurrences || 1,
      isActive: true,
    }));
  }

  // Merge both with manual having higher priority
  const manualConverted: LinkMapping[] = manualMappings.map((link, index) => ({
    keyword: link.keyword,
    url: link.url,
    priority: 1000 + index,
    caseSensitive: link.caseSensitive || false,
    maxOccurrences: link.maxOccurrences || 1,
    isActive: true,
  }));

  // Create a map to avoid duplicate keywords (manual overrides auto)
  const keywordMap = new Map<string, LinkMapping>();

  // First add auto mappings
  autoMappings.forEach(mapping => {
    const key = mapping.caseSensitive ? mapping.keyword : mapping.keyword.toLowerCase();
    keywordMap.set(key, mapping);
  });

  // Then add manual mappings (they'll override auto if same keyword)
  manualConverted.forEach(mapping => {
    const key = mapping.caseSensitive ? mapping.keyword : mapping.keyword.toLowerCase();
    keywordMap.set(key, mapping);
  });

  return Array.from(keywordMap.values());
}
