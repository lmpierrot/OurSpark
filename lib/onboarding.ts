export type RelationshipStage =
  | "getting-to-know"
  | "dating"
  | "boyfriend-girlfriend"
  | "engaged"
  | "married"
  | "long-distance"
  | "rebuilding"
  | "custom";

export type OnboardingData = {
  language?: "en" | "fr" | "es" | "ht";
  introCompleted?: boolean;
  firstName?: string;
  birthday?: string;
  avatarId?: string;
  profilePhoto?: string;
  themeId?: string;
  relationshipStage?: RelationshipStage;
  partnerCode?: string;
};

const STORAGE_KEY = "oursparks_onboarding";

export function getOnboardingData(): OnboardingData {
  if (typeof window === "undefined") return {};
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as OnboardingData;
  } catch {
    return {};
  }
}

export function saveOnboardingData(partial: Partial<OnboardingData>) {
  if (typeof window === "undefined") return;
  const existing = getOnboardingData();
  const next = { ...existing, ...partial };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function clearOnboardingData() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function generatePartnerCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "SPARK-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
