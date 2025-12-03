import { useEffect } from "react";
import userflow from "userflow.js";

export function useInitUserflow() {
  useEffect(() => {
    userflow.init("ct_us1_ouxvbpelrzcefkxzgrbuklw7xe"); // Your token for Production
    userflow.identify("USER_ID", {
      name: "USER_NAME",
      email: "USER_EMAIL",
      signed_up_at: "USER_SIGNED_UP_AT",
    });
  }, []);
}
