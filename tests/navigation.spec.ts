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
      for (const [label, href] of [["Work", "#work"], ["Journey", "#journey"], ["Capabilities", "#capabilities"], ["Get in touch", "#contact"]]) {
        await expect(header.getByRole("link", { name: label, exact: true })).toHaveAttribute("href", href);
      }
      await expect(page.getByRole("link", { name: "My experience" })).toHaveAttribute("href", "#journey");
    }
    // Follow every same-site link's destination, including local fragment targets.
    const internal = await page.locator('a[href^="/"], a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute("href")!));
    for (const href of new Set(internal)) {
      if (href.startsWith("#")) await expect(page.locator(href)).toHaveCount(1);
      else if (href.startsWith("/images/adventureworks/")) {
        const response = await page.request.get(href);
        expect(response.ok()).toBeTruthy();
        expect(response.headers()["content-type"]).toContain("image/webp");
      } else expect(routes).toContain(href);
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
  for (const width of [320, 375, 480, 640, 700, 701, 1440]) {
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
        const buttonAfter = (await toggle.boundingBox())!;
        const containingBlock = await nav.evaluate(el => {
          const parent = (el as HTMLElement).offsetParent as HTMLElement;
          const rect = parent.getBoundingClientRect();
          return { className: parent.className, x: rect.x, y: rect.y, width: rect.width, height: rect.height, position: getComputedStyle(el).position };
        });
        expect(containingBlock.className).toBe("header-navigation");
        expect(containingBlock.position).toBe("absolute");
        expect(containingBlock.x + containingBlock.width).toBeCloseTo(buttonAfter.x + buttonAfter.width, 0);
        expect(containingBlock.y + containingBlock.height).toBeCloseTo(buttonAfter.y + buttonAfter.height, 0);
        expect(Math.abs(menuBox.x + menuBox.width - buttonAfter.x - buttonAfter.width)).toBeLessThan(1);
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
    await expect(section.locator(".project-card, .tech-list, .capability-index")).toHaveCount(0);
    await expect(page.locator("section#practice")).toHaveCount(0);
    await expect(section.getByRole("heading", { name: "Engineering practice" })).toBeVisible();
    await expect(section.locator(".capability-principles")).toContainText("reusable metrics");
    await expect(page.getByText("Current site stack", { exact: true })).toHaveCount(0);
    for (const [index, [title, skills]] of groups.entries()) {
      const row = section.locator(".capability-group").nth(index);
      await expect(row.getByRole("heading", { level: 3 })).toHaveText(title);
      await expect(row.locator(".capability-skills li")).toHaveText([...skills]);
      const headingBox = (await row.locator("h3").boundingBox())!;
      const skillsBox = (await row.locator("ul").boundingBox())!;
      if (width <= 700) expect(skillsBox.y).toBeGreaterThan(headingBox.y + headingBox.height);
      else expect(skillsBox.x).toBeGreaterThan(headingBox.x + headingBox.width);
    }
  }
});


test("external-page icons remain decorative and preserve accessible link names", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Mike Zhao on GitHub", exact: true })).toBeVisible();
  for (const route of ["/", root]) {
    await page.goto(route);
    for (const icon of await page.locator('a[target="_blank"] .external-page-icon').all()) {
      await expect(icon).toHaveAttribute("aria-hidden", "true");
      await expect(icon).toHaveAttribute("focusable", "false");
      await expect(icon).toHaveAttribute("stroke-width", "1.8");
    }
  }
});

test("AdventureWorks actions and lineage evidence remain accessible at desktop and mobile widths", async ({ page }) => {
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const card = page.getByRole("article").filter({ has: page.getByRole("heading", { name: "AdventureWorks Analytics", exact: true }) });
    const study = card.getByRole("link", { name: "Explore the case study", exact: true });
    const dashboard = card.getByRole("link", { name: "Explore the dashboard", exact: true });
    await expect(card.getByRole("link")).toHaveCount(2);
    await expect(study).toHaveAttribute("href", root);
    await expect(dashboard).toHaveAttribute("href", "https://adventureworks.mikezhao.dev/");
    await expect(dashboard).toHaveAttribute("target", "_blank");
    await expect(dashboard).toHaveAttribute("rel", "noopener noreferrer");
    await expect(dashboard.locator("svg")).toHaveAttribute("aria-hidden", "true");
    await study.focus();
    await page.keyboard.press("Tab");
    await expect(dashboard).toBeFocused();
    expect(await dashboard.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe("none");
    const separated = await card.locator(".project-actions").evaluate(el => {
      const [first, second] = [...el.querySelectorAll("a")].map(link => link.getBoundingClientRect());
      return first.bottom <= second.top + 1 || first.right <= second.left + 1;
    });
    expect(separated).toBeTruthy();
    await study.click();
    await expect(page).toHaveURL(new RegExp(`${root}$`));
    for (const route of routes.slice(1)) {
      await page.goto(route);
      if (route.endsWith("/business")) {
        const finalSection = page.locator(".case-section").last();
        await expect(finalSection.getByRole("link")).toHaveCount(2);
        await expect(finalSection.getByRole("link", { name: /Read the technical perspective/ })).toHaveAttribute("href", `${root}/technical`);
        await expect(finalSection.getByRole("link", { name: "Explore the dashboard" })).toHaveAttribute("href", "https://adventureworks.mikezhao.dev/");
        await expect(page.getByText("A foundation for further evaluation")).toHaveCount(0);
      } else {
        await expect(page.locator('a[href="https://adventureworks.mikezhao.dev/lineage"]').first()).toBeVisible();
        await expect(page.locator('a[href$="/docs/custom-dbt-lineage.md"]').first()).toBeVisible();
      }
      await expect(page.locator("h1")).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    }
  }
});

test("current dashboard screenshots load with full-size alternatives and responsive proportions", async ({ page }) => {
  const captures = [
    ["Sales Overview", "sales-overview", 1600, 1036],
    ["Sales Trends", "sales-trends", 1600, 1004],
    ["Data Lineage", "data-lineage", 1600, 2297],
  ] as const;
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [root, `${root}/technical`]) {
      await page.goto(route);
      const expected = route === root ? captures : [captures[1]];
      await expect(page.locator(".case-dashboard-figure")).toHaveCount(expected.length);
      for (const [title, file, imageWidth, imageHeight] of expected) {
        const figure = page.locator(".case-dashboard-figure").filter({ has: page.getByRole("link", { name: `View full-size ${title} screenshot`, exact: true }) });
        const image = figure.getByRole("img");
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveAttribute("width", `${imageWidth}`);
        await expect(image).toHaveAttribute("height", `${imageHeight}`);
        await image.evaluate(async el => { await (el as HTMLImageElement).decode(); });
        expect(await image.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        const box = (await image.boundingBox())!;
        expect(box.width / box.height).toBeCloseTo(imageWidth / imageHeight, 2);
        const link = figure.getByRole("link");
        await expect(link).toHaveAttribute("href", `/images/adventureworks/adventureworks-${file}.webp`);
        await link.focus();
        await expect(link).toBeFocused();
        expect(await link.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe("none");
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    }
  }
  await page.goto(root);
  await page.getByRole("link", { name: "View full-size Data Lineage screenshot", exact: true }).click();
  await expect(page).toHaveURL(/\/images\/adventureworks\/adventureworks-data-lineage\.webp$/);
});


test("business reporting comparison keeps readable flows at mobile and desktop widths", async ({ page }) => {
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${root}/business`);
    const cards = page.locator(".case-compare-card");
    await expect(cards).toHaveCount(2);
    await expect(cards.nth(0).getByRole("heading", { name: "Direct transactional reporting" })).toBeVisible();
    await expect(cards.nth(1).getByRole("heading", { name: "Analytical-layer approach" })).toBeVisible();
    for (const card of await cards.all()) {
      await expect(card.locator(".case-compare-flow li")).toHaveCount(3);
      await expect(card.locator(".case-compare-takeaways p")).toHaveCount(2);
      const cardBox = await card.boundingBox();
      expect(cardBox).not.toBeNull();
      expect(cardBox!.x).toBeGreaterThanOrEqual(0);
      expect(cardBox!.x + cardBox!.width).toBeLessThanOrEqual(width + 1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
});
