import { v } from "convex/values";
import { mutation } from "../../_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
    userName: v.string(),
    zipCode:v.optional(v.string()),
    street:v.optional(v.string()),
    num: v.optional(v.string()),
    city:v.optional(v.string()),
    uf:v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      name: args.name,
      userName: args.userName,
      zipCode: args.zipCode,
      street: args.street,
      num: args.num,
      city: args.city,
      uf: args.uf,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
