import { useEffect } from "react";
import userflow from "userflow.js";
import { getOrCreateFakeUser } from "./fakerUtils";

export function useInitUserflow() {
  const user = getOrCreateFakeUser();

  useEffect(() => {
    userflow.init("ct_us1_ouxvbpelrzcefkxzgrbuklw7xe"); // Your token for Production
    userflow.identify(user.id, {
      name: user.name,
      email: user.email,
      signed_up_at: user.signed_up_at,

      plan: user.plan,
      role: user.role,

      company: user.company,
      company_url: user.company_url,
      company_size: user.company_size,
      industry: user.industry,

      trial: user.trial,
      trial_ends_at: user.trial_ends_at,
      is_active: user.is_active,
      last_seen_at: user.last_seen_at,

      country: user.country,
      timezone: user.timezone,
    });
  }, []);
}
