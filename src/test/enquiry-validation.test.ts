import { describe, expect, it } from "vitest";
import { enquirySchema } from "@/lib/enquiry-schema";
const valid = {
  reference: "12345678-1234-4234-8234-123456789012",
  name: "Test Visitor",
  contact: "visitor@example.com",
  program: "strength",
  context: "Trial",
  preferred_date: null,
  method: "Email",
  message: "",
  consent: true,
};
describe("Enquiry safety", () => {
  it("accepts a valid enquiry", () => {
    expect(enquirySchema.safeParse(valid).success).toBe(true);
  });
  it("rejects an enquiry without contact consent", () => {
    expect(enquirySchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });
  it("rejects invalid contact details", () => {
    expect(enquirySchema.safeParse({ ...valid, contact: "not-an-email" }).success).toBe(false);
  });
  it("rejects a message exceeding 2000 characters", () => {
    expect(enquirySchema.safeParse({ ...valid, message: "x".repeat(2001) }).success).toBe(false);
  });
});
