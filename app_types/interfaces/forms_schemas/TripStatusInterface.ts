export interface TripStatusInterface {
  status: "pending" | "loading" | "in_way" | "completed" | "rejected";
  rejection_reason?: string; // Optional field for rejection reason
  confirm_image?: File | null;
}
