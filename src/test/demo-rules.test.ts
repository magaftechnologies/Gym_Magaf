import { describe, expect, it } from "vitest";
import { demoEnquiryPolicy, nextGalleryIndex } from "@/lib/demo-rules";
describe("Frontend demo rules", () => {
  it("never transmits enquiry information", () =>
    expect(demoEnquiryPolicy.transmitsPersonalData).toBe(false));
  it("never reserves a class place", () => expect(demoEnquiryPolicy.reservesPlace).toBe(false));
  it("never processes a payment", () => expect(demoEnquiryPolicy.processesPayment).toBe(false));
  it("wraps gallery navigation in both directions", () => {
    expect(nextGalleryIndex(0, -1, 8)).toBe(7);
    expect(nextGalleryIndex(7, 1, 8)).toBe(0);
  });
});
