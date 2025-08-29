// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    userName: v.string(),
    zipCode: v.optional(v.string()),
    street: v.optional(v.string()),
    num: v.optional(v.string()),
    city: v.optional(v.string()),
    uf: v.optional(v.string()),
    
  })
    .index("by_name", ["name"])
    .index("by_userName", ["userName"])
    .index("by_zipCode", ["zipCode"])
    .index("by_street", ["street"])
    .index("by_num", ["num"])
    .index("by_city", ["city"])
    .index("by_uf", ["uf"])
});
