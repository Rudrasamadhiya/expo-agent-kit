"use client";
import { useState } from "react";

export function CopyButton({ text, label = "Copy", className = "" }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button type="button" onClick={copy} aria-label={copied ? "Copied" : `${label} to clipboard`}
      className={`rounded-md border border-line bg-panel px-2 py-1 text-xs text-muted transition-colors hover:text-text hover:border-accent ${className}`}>
      {copied ? "Copied ✓" : label}
    </button>
  );
}
