import { client, projectId } from "./client";
import {
  projectsQuery,
  servicesQuery,
  siteSettingsQuery,
} from "./queries";
import {
  fallbackProjects,
  fallbackServices,
  fallbackSiteSettings,
} from "./fallback";
import type { Project, Service, SiteSettings } from "./types";

const isSanityConfigured = Boolean(projectId) && projectId !== "your-project-id";

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return fallbackSiteSettings;
  try {
    const data = await client.fetch<SiteSettings | null>(
      siteSettingsQuery,
      {},
      { next: { revalidate: 60 } }
    );
    if (!data) return fallbackSiteSettings;
    return { ...fallbackSiteSettings, ...stripEmpty(data) };
  } catch {
    return fallbackSiteSettings;
  }
}

export async function getServices(): Promise<Service[]> {
  if (!isSanityConfigured) return fallbackServices;
  try {
    const data = await client.fetch<Service[]>(
      servicesQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return data && data.length > 0 ? data : fallbackServices;
  } catch {
    return fallbackServices;
  }
}

export async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return fallbackProjects;
  try {
    const data = await client.fetch<Project[]>(
      projectsQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return data && data.length > 0 ? data : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

function stripEmpty<T extends object>(obj: T): Partial<T> {
  const out: Partial<T> = {};
  (Object.keys(obj) as (keyof T)[]).forEach((key) => {
    const value = obj[key];
    if (value !== null && value !== undefined && value !== "") {
      out[key] = value;
    }
  });
  return out;
}
