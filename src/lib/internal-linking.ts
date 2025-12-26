/**
 * Internal Linking Utilities
 * Intelligently inject internal links into blog content
 */

export interface LinkMapping {
    keyword: string;
    url: string;
    priority: number;
    caseSensitive: boolean;
    maxOccurrences: number;
    isActive: boolean;
    flexibleMatch?: boolean; // Allow matching plurals and variations
}

export interface InternalLinkResult {
    processedContent: string;
    linksApplied: string[];
    linkCount: number;
}

interface GenerateInternalLinksOptions {
    content: string;
    autoLinks: any[]; // Using any to avoid strict model dependency here
    manualLinks: any[];
    useAutoLinks: boolean;
    maxLinksPerPost: number;
}

/**
 * Escapes special regex characters in a string
 */
function escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Check if a position in HTML is inside a tag or existing link
 */
function isInsideTag(html: string, position: number): boolean {
    // Check if we're inside an HTML tag
    let inTag = false;
    let inLink = false;
    let tagDepth = 0;

    for (let i = 0; i < position; i++) {
        if (html[i] === '<') {
            if (html.substring(i, i + 2) === '</') {
                tagDepth--;
                if (html.substring(i, i + 4).toLowerCase() === '</a>') {
                    inLink = false;
                }
            } else if (html.substring(i, i + 2) === '<a') {
                inLink = true;
            }
            inTag = true;
        } else if (html[i] === '>') {
            inTag = false;
        }
    }

    return inTag || inLink;
}

/**
 * Process blog content and inject internal links
 *
 * @param content - The blog post content (can be HTML or plain text)
 * @param linkMappings - Array of link mappings to apply
 * @param maxLinksPerPost - Maximum total internal links to add (default: 5)
 * @returns Processed content with internal links and metadata
 */
export function injectInternalLinks(
    content: string,
    linkMappings: LinkMapping[],
    maxLinksPerPost: number = 5
): InternalLinkResult {
    let processedContent = content;
    const linksApplied: string[] = [];
    let totalLinksAdded = 0;

    // Sort mappings by priority (higher first)
    const sortedMappings = [...linkMappings]
        .filter(mapping => mapping.isActive)
        .sort((a, b) => b.priority - a.priority);

    // Track which keywords have been used and how many times
    const keywordUsage: { [key: string]: number } = {};

    for (const mapping of sortedMappings) {
        // Stop if we've reached the max links per post
        if (totalLinksAdded >= maxLinksPerPost) {
            break;
        }

        // Check if we've already used this keyword the max number of times
        const currentUsage = keywordUsage[mapping.keyword] || 0;
        if (currentUsage >= mapping.maxOccurrences) {
            continue;
        }

        const flags = mapping.caseSensitive ? 'gu' : 'giu';
        let patternString = '';

        // Arabic normalization if flexible match is on
        if (mapping.flexibleMatch !== false && /[\u0600-\u06FF]/.test(mapping.keyword)) {
            // 1. Normalize chars in keyword
            let normalized = mapping.keyword;

            // Escape special regex chars first
            normalized = escapeRegex(normalized);

            // Replace Arabic chars with character classes for flexibility
            // Alif forms: ا أ إ آ
            normalized = normalized.replace(/[اأإآ]/g, '[اأإآ]');
            // Taa Marbuta / Ha: ة ه
            normalized = normalized.replace(/[ةه]/g, '[ةه]');
            // Ya / Alif Maqsura: ي ى
            normalized = normalized.replace(/[يى]/g, '[يى]');

            patternString = normalized;

            // 2. Add optional Al- prefix
            if (!mapping.keyword.startsWith('ال')) {
                patternString = '(?:ال)?' + patternString;
            }
        } else {
            // Standard behavior
            let escapedKeyword = escapeRegex(mapping.keyword);

            // English plural
            if (mapping.flexibleMatch !== false && /^[a-zA-Z]/.test(mapping.keyword)) {
                escapedKeyword = escapedKeyword + 's?';
            }

            patternString = escapedKeyword;
        }

        // For Arabic/Unicode text, \b doesn't work well
        // Match the keyword and verify word boundaries manually
        const pattern = new RegExp(patternString, flags);

        // Helper function to check if a character is a word character (Unicode-aware)
        const isWordChar = (char: string): boolean => {
            if (!char) return false;
            const code = char.charCodeAt(0);
            // Check for Arabic, English letters, numbers, underscore
            return (
                (code >= 0x0600 && code <= 0x06FF) || // Arabic
                (code >= 0x0750 && code <= 0x077F) || // Arabic Supplement
                (code >= 0x08A0 && code <= 0x08FF) || // Arabic Extended-A
                (code >= 0xFB50 && code <= 0xFDFF) || // Arabic Presentation Forms-A
                (code >= 0xFE70 && code <= 0xFEFF) || // Arabic Presentation Forms-B
                (code >= 0x0041 && code <= 0x005A) || // A-Z
                (code >= 0x0061 && code <= 0x007A) || // a-z
                (code >= 0x0030 && code <= 0x0039) || // 0-9
                code === 0x005F // underscore
            );
        };

        // Find all matches
        const matches: { index: number; text: string }[] = [];
        let match;
        const regex = new RegExp(pattern);

        // Clone the content to work with
        let searchContent = processedContent;
        let offset = 0;

        while ((match = regex.exec(searchContent)) !== null) {
            const absoluteIndex = match.index + offset;
            const matchedText = match[0];

            // Check word boundaries manually (Unicode-aware)
            const charBefore = absoluteIndex > 0 ? processedContent[absoluteIndex - 1] : '';
            const charAfter = absoluteIndex + matchedText.length < processedContent.length
                ? processedContent[absoluteIndex + matchedText.length]
                : '';

            // Verify it's at a word boundary (not in the middle of a word)
            const isAtStartBoundary = absoluteIndex === 0 || !isWordChar(charBefore);
            const isAtEndBoundary = absoluteIndex + matchedText.length === processedContent.length || !isWordChar(charAfter);

            if (isAtStartBoundary && isAtEndBoundary) {
                // Check if this match is inside an HTML tag or existing link
                if (!isInsideTag(processedContent, absoluteIndex)) {
                    matches.push({
                        index: absoluteIndex,
                        text: matchedText
                    });
                }
            }

            // Move past this match to find others
            offset = absoluteIndex + matchedText.length;
            searchContent = processedContent.substring(offset);
            regex.lastIndex = 0;
        }

        // Limit the number of replacements for this keyword
        const remainingAllowed = mapping.maxOccurrences - currentUsage;
        const remainingPostSlots = maxLinksPerPost - totalLinksAdded;
        const matchesToReplace = matches.slice(0, Math.min(remainingAllowed, remainingPostSlots));

        // Replace matches from end to start (to preserve indices)
        for (let i = matchesToReplace.length - 1; i >= 0; i--) {
            const matchInfo = matchesToReplace[i];
            const before = processedContent.substring(0, matchInfo.index);
            const after = processedContent.substring(matchInfo.index + matchInfo.text.length);

            // Create the link
            const link = `<a href="${mapping.url}" class="internal-link">${matchInfo.text}</a>`;
            processedContent = before + link + after;

            // Track this application
            if (!linksApplied.includes(mapping.keyword)) {
                linksApplied.push(mapping.keyword);
            }
            keywordUsage[mapping.keyword] = (keywordUsage[mapping.keyword] || 0) + 1;
            totalLinksAdded++;
        }
    }

    return {
        processedContent,
        linksApplied,
        linkCount: totalLinksAdded,
    };
}

/**
 * Remove all internal links from content (for editing purposes)
 */
export function removeInternalLinks(content: string): string {
    return content.replace(
        /<a\s+href="[^"]*"\s+class="internal-link">([^<]+)<\/a>/gi,
        '$1'
    );
}

/**
 * Validate a link mapping
 */
export function validateLinkMapping(mapping: Partial<LinkMapping>): string[] {
    const errors: string[] = [];

    if (!mapping.keyword || mapping.keyword.trim().length === 0) {
        errors.push('Keyword is required');
    }

    if (!mapping.url || mapping.url.trim().length === 0) {
        errors.push('URL is required');
    }

    if (mapping.url && !mapping.url.startsWith('/') && !mapping.url.startsWith('http')) {
        errors.push('URL must be a valid path (starting with /) or full URL');
    }

    if (mapping.maxOccurrences !== undefined && mapping.maxOccurrences < 1) {
        errors.push('Max occurrences must be at least 1');
    }

    if (mapping.priority !== undefined && mapping.priority < 0) {
        errors.push('Priority cannot be negative');
    }

    return errors;
}

/**
 * High-level function to generate internal links combining auto and manual sources
 */
export function generateInternalLinks(options: GenerateInternalLinksOptions): InternalLinkResult {
    const { content, autoLinks, manualLinks, useAutoLinks, maxLinksPerPost } = options;

    // Combine links
    let allMappings: LinkMapping[] = [];

    // Add manual links first (high priority)
    if (manualLinks && manualLinks.length > 0) {
        const manualMappings = manualLinks.map(l => ({
            keyword: l.keyword,
            url: l.url,
            priority: 100, // Very high priority for manual links
            caseSensitive: l.caseSensitive || false,
            maxOccurrences: l.maxOccurrences || 1,
            isActive: true
        }));
        allMappings = [...allMappings, ...manualMappings];
    }

    // Add auto links if enabled
    if (useAutoLinks && autoLinks && autoLinks.length > 0) {
        // Convert Mongoose documents to plain objects if needed
        const plainAutoLinks = Array.isArray(autoLinks) ? autoLinks : [];

        // Add only if not already covered by manual link (pseudo-override)
        // Actually, manual links with high priority will just take precedence in slot filling
        allMappings = [...allMappings, ...plainAutoLinks];
    }

    return injectInternalLinks(content, allMappings, maxLinksPerPost);
}
