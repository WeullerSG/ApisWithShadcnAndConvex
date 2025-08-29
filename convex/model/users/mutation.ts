import {v} from "convex/values"
import { mutation } from "../../_generated/server";


export const create = mutation ({
    args: {
        name: v.string(),
        userName: v.string()
    },
    handler: async(ctx, args) => {
        return await ctx.db.insert("users",{
            name: args.name,
            userName: args.userName,
        });
    }
})

export const remove = mutation({
    args: {id: v.id("users")},
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    }
})

