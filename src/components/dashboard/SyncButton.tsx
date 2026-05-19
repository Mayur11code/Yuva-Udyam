'use client'

import { masterDeepSync } from '@/src/app/actions/jobs/SyncGrid';
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function SyncButton() {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    const toastId = toast.loading("Scanning national grid for new listings...");
    const result = await masterDeepSync();
    if (result.success) {
      toast.success(
        (result.count ?? 0) > 0
          ? `${result.count} new jobs added to your feed.`
          : "Feed is up to date.",
        { id: toastId }
      );
    } else {
      toast.error("Sync failed. Check API configuration.", { id: toastId });
    }
    setIsSyncing(false);
  };

  return (
    <button
      onClick={handleSync}
      disabled={isSyncing}
      className={cn(
        "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-mono transition-all",
        "border-white/8 text-white/30 hover:text-cyan-400 hover:border-cyan-500/25 hover:bg-cyan-500/5",
        isSyncing && "opacity-60 pointer-events-none"
      )}
    >
      <RefreshCw className={cn("w-3 h-3", isSyncing && "animate-spin")} />
      {isSyncing ? "Syncing..." : "Deep Sync"}
    </button>
  );
}
