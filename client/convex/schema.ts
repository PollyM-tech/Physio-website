import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  // Doctors linked to Convex auth users
  doctors: defineTable({
    userId: v.id("users"),
    name: v.optional(v.string()),
    email: v.string(),
  }).index("by_userId", ["userId"]),

  // Patient appointment bookings
  appointments: defineTable({
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.string(),
    location: v.string(),
    scheduledAt: v.number(),       // Unix ms timestamp
    message: v.optional(v.string()),
    doctorNotes: v.optional(v.string()),
    status: v.union(
      v.literal("Pending"),
      v.literal("Confirmed"),
      v.literal("Rescheduled")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),

  // Patient records
  patients: defineTable({
    name: v.string(),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    location: v.optional(v.string()),
    dob: v.optional(v.string()),
    medicalNotes: v.optional(v.string()),
  }),
});
