import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// ─── Public: patient books an appointment ───────────────────────────────────
export const createAppointment = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    location: v.string(),
    scheduledAt: v.number(),
    email: v.optional(v.string()),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const id = await ctx.db.insert("appointments", {
      ...args,
      status: "Pending",
      createdAt: now,
      updatedAt: now,
    });
    return id;
  },
});

// ─── Doctor: list all appointments (auth required) ──────────────────────────
export const listAppointments = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Unauthorized");
    return ctx.db
      .query("appointments")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

// ─── Doctor: get single appointment by ID (auth required) ───────────────────
export const getAppointment = query({
  args: { id: v.id("appointments") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Unauthorized");
    return ctx.db.get(id);
  },
});

// ─── Doctor: update status / reschedule / notes (auth required) ─────────────
export const updateAppointment = mutation({
  args: {
    id: v.id("appointments"),
    status: v.optional(
      v.union(
        v.literal("Pending"),
        v.literal("Confirmed"),
        v.literal("Rescheduled")
      )
    ),
    scheduledAt: v.optional(v.number()),
    doctorNotes: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...updates }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Unauthorized");
    const existing = await ctx.db.get(id);
    if (!existing) throw new ConvexError("Appointment not found");
    // Remove undefined fields so we don't overwrite with undefined
    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    if (updates.status !== undefined) patch.status = updates.status;
    if (updates.scheduledAt !== undefined) patch.scheduledAt = updates.scheduledAt;
    if (updates.doctorNotes !== undefined) patch.doctorNotes = updates.doctorNotes;
    await ctx.db.patch(id, patch as any);
    return ctx.db.get(id);
  },
});
