// Utility to sanitize and transform various image hosting URLs (Google Drive, Dropbox, OneDrive, GitHub, Imgur, etc.) into direct raw image URLs

export function formatImageUrl(url?: string): string {
  if (!url || typeof url !== 'string') return '';
  let trimmed = url.trim();
  if (!trimmed) return '';

  // Remove wrapping quotes if user copy-pasted with quotes
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    trimmed = trimmed.substring(1, trimmed.length - 1).trim();
  }

  // Data URLs or already direct SVG / blob
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed;
  }

  // Google Drive sharing links
  // Format 1: https://drive.google.com/file/d/1aBcDeF.../view?usp=sharing
  // Format 2: https://drive.google.com/file/u/0/d/1aBcDeF.../view
  // Format 3: https://drive.google.com/open?id=1aBcDeF...
  // Format 4: https://drive.google.com/uc?id=1aBcDeF...
  // Format 5: https://drive.google.com/uc?export=view&id=1aBcDeF...
  // Format 6: https://drive.google.com/thumbnail?id=1aBcDeF...
  // Format 7: https://docs.google.com/uc?id=1aBcDeF...
  if (trimmed.includes('drive.google.com') || trimmed.includes('docs.google.com')) {
    const fileIdMatch =
      trimmed.match(/\/file\/(?:u\/\d+\/)?d\/([a-zA-Z0-9_-]+)/) ||
      trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      // Google UserContent CDN works directly in <img> tags with no CORS/Auth redirect
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }

  // Dropbox share links
  // https://www.dropbox.com/s/xyz/photo.jpg?dl=0 -> ?raw=1
  // https://www.dropbox.com/scl/fi/xyz/photo.jpg?rlkey=...&dl=0 -> &raw=1
  if (trimmed.includes('dropbox.com')) {
    if (trimmed.includes('?dl=0') || trimmed.includes('&dl=0')) {
      return trimmed.replace(/([?&])dl=0/, '$1raw=1');
    }
    if (trimmed.includes('?dl=1') || trimmed.includes('&dl=1')) {
      return trimmed.replace(/([?&])dl=1/, '$1raw=1');
    }
    if (!trimmed.includes('raw=1')) {
      return trimmed.includes('?') ? `${trimmed}&raw=1` : `${trimmed}?raw=1`;
    }
    return trimmed;
  }

  // GitHub blob URLs -> raw.githubusercontent.com
  // https://github.com/user/repo/blob/main/img.jpg -> https://raw.githubusercontent.com/user/repo/main/img.jpg
  if (trimmed.includes('github.com') && trimmed.includes('/blob/')) {
    return trimmed.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
  }

  // OneDrive sharing links
  if (trimmed.includes('1drv.ms') || trimmed.includes('onedrive.live.com')) {
    // If it contains resid and authkey, can append &authkey=...
    if (!trimmed.includes('download=1') && !trimmed.includes('resid=')) {
      return trimmed;
    }
  }

  // Imgur page links -> direct image
  // https://imgur.com/abc -> https://i.imgur.com/abc.jpg (if no extension)
  if (trimmed.includes('imgur.com') && !trimmed.includes('i.imgur.com') && !trimmed.includes('/a/')) {
    const idMatch = trimmed.match(/imgur\.com\/([a-zA-Z0-9]+)/);
    if (idMatch && idMatch[1]) {
      return `https://i.imgur.com/${idMatch[1]}.jpg`;
    }
  }

  return trimmed;
}
