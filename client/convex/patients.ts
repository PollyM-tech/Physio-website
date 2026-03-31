import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// ─── Doctor: get patient by ID (auth required) ──────────────────────────────
export const getPatient = query({
  args: { id: v.id("patients") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Unauthorized");
    return ctx.db.get(id);
  },
});

// ─── Doctor: update patient notes (auth required) ───────────────────────────
export const updatePatient = mutation({
  args: {
    id: v.id("patients"),
    medicalNotes: v.optional(v.string()),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    location: v.optional(v.string()),
    dob: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...updates }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Unauthorized");
    const existing = await ctx.db.get(id);
    if (!existing) throw new ConvexError("Patient not found");
    const patch: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(updates)) {
      if (v !== undefined) patch[k] = v;
    }
    await ctx.db.patch(id, patch as any);
    return ctx.db.get(id);
  },
});
