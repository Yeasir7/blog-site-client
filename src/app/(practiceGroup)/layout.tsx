import Link from "next/link";

export default function PracticeLayout({
  children,
  markatingslot,
  salesSlot,
}: {
  children: React.ReactNode;
  markatingslot: React.ReactNode;
  salesSlot: React.ReactNode;
}) {
  return (
    <div>
      <nav className="flex gap-10 m-8">
        <Link className="hover:underline" href="/development">
          Development
        </Link>
        <Link className="hover:underline" href="/testing">
          Testing
        </Link>
        <Link className="hover:underline" href="/markating">
          Markating
        </Link>
        <Link className="hover:underline" href="/markating/setting">
          Setting
        </Link>
        <Link className="hover:underline" href="/sales">
          Sales
        </Link>
      </nav>
      <div className="flex">
        {markatingslot}
        {salesSlot}
      </div>

      {children}
    </div>
  );
}
