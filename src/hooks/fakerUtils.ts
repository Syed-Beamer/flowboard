import { faker } from "@faker-js/faker";

const PLANS = ["free", "trial", "pro", "business", "enterprise"] as const;
const ROLES = ["owner", "admin", "member"] as const;
const INDUSTRIES = [
  "SaaS",
  "Fintech",
  "E-commerce",
  "Edtech",
  "Healthcare",
  "Marketing",
] as const;

export type FakeUser = {
  id: string;
  name: string;
  email: string;
  signed_up_at: string;
  plan: (typeof PLANS)[number];
  role: (typeof ROLES)[number];
  company: string;
  company_url: string;
  company_size: number;
  industry: string;
  trial: boolean;
  trial_ends_at: string | null;
  is_active: boolean;
  last_seen_at: string;
  country: string;
  timezone: string;
};

export function generateFakeUser(): FakeUser {
  const signedUpAt = faker.date.past({ years: 2 });
  const isTrial = faker.datatype.boolean();

  const plan = isTrial
    ? "trial"
    : faker.helpers.arrayElement(PLANS.filter((p) => p !== "trial"));

  const companyName = faker.company.name();
  const companyDomain = faker.internet.domainName();

  return {
    id: faker.string.uuid(),

    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    signed_up_at: signedUpAt.toISOString(),

    plan,
    role: faker.helpers.arrayElement(ROLES),

    company: companyName,
    company_url: `https://${companyDomain}`,
    company_size: faker.number.int({ min: 1, max: 500 }),
    industry: faker.helpers.arrayElement(INDUSTRIES),

    trial: isTrial,
    trial_ends_at: isTrial
      ? faker.date.soon({ days: 14, refDate: signedUpAt }).toISOString()
      : null,

    is_active: faker.datatype.boolean(),
    last_seen_at: faker.date.recent({ days: 7 }).toISOString(),

    country: faker.location.country(),
    timezone: faker.location.timeZone(),
  };
}

const STORAGE_KEY = "fake_user_v1";

export function getOrCreateFakeUser(): FakeUser {
  if (typeof window === "undefined") {
    return generateFakeUser();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as FakeUser;
    }

    const user = generateFakeUser();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  } catch {
    return generateFakeUser();
  }
}

export function resetFakeUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
