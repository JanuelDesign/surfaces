import { ProductColor } from '../types';

export function getSwatchBackground(color: ProductColor): { background: string; backgroundSize?: string } {
  const c1 = color.hexColor || '#d6c09b';
  const c2 = color.secondaryHex || '#b4a07d';

  if (color.patternType === 'marble') {
    return {
      background: `radial-gradient(ellipse at 20% 30%, ${c1} 0%, ${c1} 60%, ${c2} 90%), 
                   linear-gradient(45deg, transparent 40%, rgba(202, 162, 102, 0.4) 45%, transparent 50%),
                   linear-gradient(-35deg, transparent 60%, rgba(140, 140, 140, 0.25) 65%, transparent 70%)`,
    };
  }

  if (color.patternType === 'slat') {
    return {
      background: `repeating-linear-gradient(
        90deg,
        ${c1},
        ${c1} 14px,
        #18181b 14px,
        #18181b 20px
      )`,
    };
  }

  if (color.patternType === 'solid') {
    return {
      background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
    };
  }

  // Default: Wood plank grain
  return {
    background: `linear-gradient(90deg, 
      ${c1} 0%, 
      ${c2} 15%, 
      ${c1} 30%, 
      ${c2} 55%, 
      ${c1} 75%, 
      ${c2} 90%, 
      ${c1} 100%
    )`,
  };
}

export function formatSqftBoxes(sqftNumber: number, sqftPerBox: number | string | undefined): { boxes: number; exactSqft: number } {
  if (!sqftPerBox || typeof sqftPerBox !== 'number') {
    return { boxes: Math.ceil(sqftNumber / 20), exactSqft: sqftNumber };
  }
  const boxes = Math.ceil(sqftNumber / sqftPerBox);
  const exactSqft = Math.round(boxes * sqftPerBox * 100) / 100;
  return { boxes, exactSqft };
}
