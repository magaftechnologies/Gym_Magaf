import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { enquirySchema } from "./enquiry-schema";
import type { Database } from "@/integrations/supabase/types";

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    const url = process.env["SUPABASE_URL"];
    if (!key || !url) return { ok: false, reference: "" };
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`)
            headers.delete("Authorization");
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });
    const { error } = await client.from("gym_enquiries").insert(data);
    return { ok: !error, reference: error ? "" : data.reference };
  });
