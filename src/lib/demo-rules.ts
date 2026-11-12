export function nextGalleryIndex(current: number, direction: number, length: number) {
  return length > 0 ? (current + direction + length) % length : 0;
}

export const demoEnquiryPolicy = {
  transmitsPersonalData: false,
  reservesPlace: false,
  processesPayment: false,
} as const;
