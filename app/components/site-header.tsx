"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { project } from "../../content/adventureworks";

const navigation = {
  portfolio: [
    { label: "Work", href: "#work" },
    { label: "Journey", href: "#journey" },
    { label: "Practice", href: "#practice" },
    { label: "Get in touch", href: "#contact" },
  ],
  adventureworks: [
    { label: "Overview", href: project.root },
    { label: "Business", href: `${project.root}/business` },
    { label: "Technical", href: `${project.root}/technical` },
  ],
};

export function SiteHeader({ variant = "portfolio" }: { variant?: keyof typeof navigation }) {
  const pathname = usePathname();
  return <HeaderContent key={pathname} variant={variant} pathname={pathname} />;
}

function HeaderContent({ variant, pathname }: { variant: keyof typeof navigation; pathname: string }) {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const isProject = variant === "adventureworks";
  const title = isProject ? "AdventureWorks Analytics" : "Mike Zhao";

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 701px)");
    const close = () => setOpen(false);
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <header ref={header} id="page-top" tabIndex={-1} className="site-header shared-header"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}>
      <div className="header-brand">
        <Link href="/" className="wordmark-logo" aria-label="Mike Zhao, portfolio home" onClick={() => setOpen(false)}>
          <span className="wordmark-mark" aria-hidden="true">M</span>
        </Link>
        <Link className="wordmark-title" href={isProject ? project.root : "/"} onClick={() => setOpen(false)}>{title}</Link>
      </div>
      <button ref={toggle} type="button" className="nav-toggle" aria-label="Navigation menu"
        aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
          <path d={open ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
      <nav id="primary-navigation" className="site-nav shared-nav" data-open={open}
        aria-label={isProject ? "Project navigation" : "Main navigation"}>
        {navigation[variant].map(({ label, href }) => (
          <Link key={href} href={href} aria-current={isProject && pathname === href ? "page" : undefined}
            className={href === "#contact" ? "nav-contact" : undefined} onClick={() => setOpen(false)}>{label}</Link>
        ))}
      </nav>
      <noscript><style>{`.shared-header .nav-toggle{display:none}.shared-header .shared-nav{display:flex}`}</style></noscript>
    </header>
  );
}
