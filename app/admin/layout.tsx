import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Logo from "@/components/Logo";
import SignOutButton from "@/components/admin/SignOutButton";
import styles from "./admin.module.css";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

const navItems = [
  { label: "Overzicht", href: "/admin" },
  { label: "E-mail inzendingen", href: "/admin/inzendingen" },
  { label: "Projecten", href: "/admin/projecten" },
  { label: "Reviews", href: "/admin/reviews" },
  { label: "Veelgestelde vragen", href: "/admin/faq" },
  { label: "Blog", href: "/admin/blog" },
  { label: "Afbeeldingen", href: "/admin/media" },
  { label: "Instellingen", href: "/admin/instellingen" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/admin" className={styles.brand} aria-label="Dashboard">
          <Logo className={styles.brandLogo} />
          <span className={styles.brandTag}>Dashboard</span>
        </Link>

        <nav className={styles.nav}>
          {navItems.map((n) => (
            <Link key={n.href} href={n.href} className={styles.navLink}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className={styles.foot}>
          <span className={styles.user}>{user.email}</span>
          <SignOutButton className={styles.signout} />
        </div>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
