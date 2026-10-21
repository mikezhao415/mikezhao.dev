export const project = {
  root: "/projects/adventureworks-analytics",
  dashboard: "https://adventureworks-analytics-flax.vercel.app/",
  source: "https://github.com/mikezhao415/adventureworks-analytics",
  disclosure: "This independent project uses Microsoft's fictional AdventureWorks 2022 sample data. Results do not represent actual commercial activity. Microsoft is not affiliated with or endorsing this project.",
};
export const architecture = [
  { title: "Transactional source", detail: "AdventureWorks 2022 · SQL Server" },
  { title: "Repeatable extraction", detail: "Read-only Python extraction · Parquet snapshots" },
  { title: "Analytical modeling", detail: "DuckDB · dbt staging, dimensions, facts and marts" },
  { title: "Quality gates", detail: "Independent reconciliation · automated tests" },
  { title: "Publication", detail: "Reviewed aggregate artifact · Next.js dashboard" },
];
