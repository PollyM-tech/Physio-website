import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { query } from "./_generated/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
  callbacks: {
    // Automatically create a doctor profile when a new user registers
    async afterUserCreatedOrUpdated(ctx, args) {
      if (args.existingUserId) return; // only on first sign-up
      const user = await ctx.db.get(args.userId);
      await ctx.db.insert("doctors", {
        userId: args.userId,
        email: (user as any)?.email ?? "",
        name: "Dr. David",
      });
    },
  },
});

// Returns the currently logged-in doctor's profile
export const currentDoctor = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return ctx.db
      .query("doctors")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();
  },
});
