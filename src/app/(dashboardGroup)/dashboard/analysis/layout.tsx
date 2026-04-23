import Link from "next/link";

export default function analysisLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
        <button>
            <Link href="/dashboard/analysis/weekly">weekly</Link>
        </button>
        <button>
            <Link href="/dashboard/analysis/monthly">monthly</Link>
        </button>
      {children}
    </div>
  );
}
