import { ScanSearch } from 'lucide-react';

export default function ManualReviewBanner({ count, variant = 'record' }) {
  if (variant === 'record' && !count) return null;
  return (
    <div role="status" className="flex items-start gap-4 rounded-[22px] border border-honey/25 bg-honey-tint p-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white"><ScanSearch className="h-5 w-5 text-honey" aria-hidden /></span>
      <div>
        <p className="font-display text-lg font-bold text-honey">
          {variant === 'upload' ? 'A person needs to check this report' : `${count} ${count === 1 ? 'report needs' : 'reports need'} a manual check`}
        </p>
        <p className="text-ink-soft">
          {variant === 'upload'
            ? 'Some values were too unclear to read with confidence, so none were flagged or cleared. Please review the original.'
            : 'Unclear values were left unflagged on purpose. Open the original files marked below to check them.'}
        </p>
      </div>
    </div>
  );
}
