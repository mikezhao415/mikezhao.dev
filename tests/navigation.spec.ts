import { expect, test } from "@playwright/test";

const root = "/projects/adventureworks-analytics";
const routes = ["/", root, `${root}/business`, `${root}/technical`];

test("contextual brands, exact active pages, and navigation destinations", async ({ page }) => {
  for (const [index, route] of routes.entries()) {
    await page.goto(route);
    const header = page.locator("header");
    await expect(header.getByRole("link", { name: "Mike Zhao, portfolio home", exact: true })).toHaveAttribute("href", "/");
    const title = index ? "AdventureWorks Analytics" : "Mike Zhao";
    await expect(header.getByRole("link", { name: title, exact: true })).toHaveAttribute("href", index ? root : "/");
    await expect(header).toHaveCSS("position", "static");
    if (index) {
      await expect(header.locator('[aria-current="page"]')).toHaveCount(1);
      await expect(header.locator('[aria-current="page"]')).toHaveText(["Overview", "Business", "Technical"][index - 1]);
      for (const [label, href] of [["Overview", root], ["Business", `${root}/business`], ["Technical", `${root}/technical`]]) {
        await expect(header.getByRole("link", { name: label, exact: true })).toHaveAttribute("href", href);
      }
    } else {
      for (const [label, href] of [["Work", "#work"], ["Journey", "#journey"], ["Practice", "#practice"], ["Get in touch", "#contact"]]) {
        await expect(header.getByRole("link", { name: label, exact: true })).toHaveAttribute("href", href);
      }
      await expect(page.getByRole("link", { name: "My experience" })).toHaveAttribute("href", "#journey");
    }
    // Follow every same-site link's destination, including local fragment targets.
    const internal = await page.locator('a[href^="/"], a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute("href")!));
    for (const href of new Set(internal)) {
      if (href.startsWith("#")) await expect(page.locator(href)).toHaveCount(1);
      else expect(routes).toContain(href);
    }
  }
});

test("mobile disclosure supports keyboard, outside interaction, selection, and resize", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto(root);
  const toggle = page.getByRole("button", { name: "Navigation menu" });
  const nav = page.getByRole("navigation", { name: "Project navigation" });
  await expect(nav).toBeHidden();
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(nav.getByRole("link", { name: "Overview", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(nav).toBeHidden();
  await toggle.click();
  await page.getByRole("heading", { level: 1 }).click();
  await expect(nav).toBeHidden();
  await toggle.click();
  await nav.getByRole("link", { name: "Technical", exact: true }).click();
  await expect(page).toHaveURL(`${root}/technical`);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(nav).toBeHidden();
  await toggle.click();
  await page.setViewportSize({ width: 1000, height: 720 });
  await expect(nav).toBeVisible();
  await page.setViewportSize({ width: 320, height: 720 });
  await expect(nav).toBeHidden();
  await page.goto("/");
  await toggle.click();
  await page.getByRole("navigation").getByRole("link", { name: "Journey", exact: true }).click();
  await expect(page).toHaveURL(/#journey$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

for (const reducedMotion of ["reduce", "no-preference"] as const) {
  test(`back to top restores position and focus (${reducedMotion})`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion });
    await page.setViewportSize({ width: 320, height: 720 });
    for (const route of routes) {
      await page.goto(route);
      const button = page.getByRole("button", { name: "Back to top", exact: true });
      await expect(button).toBeHidden();
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
      await expect(button).toBeVisible();
      const overlaps = await button.evaluate(button => {
        const box = button.getBoundingClientRect();
        return [...document.querySelectorAll("footer a")].some(link => {
          const rect = link.getBoundingClientRect();
          return box.left < rect.right && box.right > rect.left && box.top < rect.bottom && box.bottom > rect.top;
        });
      });
      expect(overlaps).toBe(false);
      await button.focus();
      await page.keyboard.press("Enter");
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
      await expect(page.locator("#page-top")).toBeFocused();
      await expect(button).toBeHidden();
    }
  });
}

test("all routes reflow at mobile, desktop, and a 200% zoom equivalent width", async ({ page }) => {
  for (const width of [320, 640, 700, 701, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const header = page.locator("header");
      const title = header.locator(".wordmark-title");
      await expect(title).toBeVisible();
      if (width <= 700) {
        const toggle = page.getByRole("button", { name: "Navigation menu" });
        await expect(toggle).toBeVisible();
        const titleBox = (await title.boundingBox())!;
        const toggleBox = (await toggle.boundingBox())!;
        expect(titleBox.x + titleBox.width).toBeLessThanOrEqual(toggleBox.x);
        const heroBefore = await page.locator("main").boundingBox();
        const headerBefore = await header.boundingBox();
        await toggle.click();
        const nav = page.getByRole("navigation");
        await expect(nav).toBeVisible();
        const menuBox = (await nav.boundingBox())!;
        expect(Math.abs(menuBox.x + menuBox.width - toggleBox.x - toggleBox.width)).toBeLessThan(1);
        expect(menuBox.y - toggleBox.y - toggleBox.height).toBeCloseTo(8, 0);
        expect(menuBox.width).toBeGreaterThanOrEqual(190);
        expect(menuBox.width).toBeLessThanOrEqual(220);
        expect(menuBox.x).toBeGreaterThanOrEqual(0);
        expect(menuBox.x + menuBox.width).toBeLessThanOrEqual(width);
        expect(await page.locator("main").boundingBox()).toEqual(heroBefore);
        expect(await header.boundingBox()).toEqual(headerBefore);
      }
    }
  }
});

test("navigation remains available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 720 } });
  const page = await context.newPage();
  for (const route of ["/", root]) {
    await page.goto(`http://127.0.0.1:3100${route}`);
    await expect(page.getByRole("navigation")).toBeVisible();
    await expect(page.getByRole("button", { name: "Navigation menu" })).toBeHidden();
  }
  await context.close();
});


test("capabilities retain the complete ordered inventory in editorial rows", async ({ page }) => {
  const groups = [
    ["Data & Analytics", ["Python", "Oracle SQL", "Power BI", "Tableau", "Excel & VBA", "Query optimization"]],
    ["Analytics Engineering", ["dbt", "DuckDB", "Dimensional modeling", "SQL transformations", "Data quality & reconciliation", "Data pipelines", "Reporting architecture", "Technical documentation"]],
    ["Software Development", ["Next.js & React", "TypeScript", "Tailwind CSS", "Git", "Automated testing", "GitHub Actions & CI/CD", "AI-assisted development"]],
    ["Delivery & Leadership", ["Project management", "Stakeholder collaboration", "Process improvement", "Technical ownership", "Team training", "Knowledge transfer"]],
  ] as const;
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const section = page.locator("#capabilities");
    await expect(section.locator(".capability-group")).toHaveCount(4);
    await expect(section.locator(".project-card, .tech-list, p:not(.eyebrow)")).toHaveCount(0);
    for (const [index, [title, skills]] of groups.entries()) {
      const row = section.locator(".capability-group").nth(index);
      await expect(row.getByRole("heading", { level: 3 })).toHaveText(`${String(index + 1).padStart(2, "0")} / ${title}`);
      await expect(row.locator(".capability-skills li")).toHaveText([...skills]);
      const headingBox = (await row.locator("h3").boundingBox())!;
      const skillsBox = (await row.locator("ul").boundingBox())!;
      if (width <= 700) expect(skillsBox.y).toBeGreaterThan(headingBox.y + headingBox.height);
      else expect(skillsBox.x).toBeGreaterThan(headingBox.x + headingBox.width);
    }
  }
});
