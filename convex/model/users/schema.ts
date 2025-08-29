// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    userName: v.string(),
  })
    .index("by_name", ["name"])
    .index("by_userName", ["userName"]),
});
