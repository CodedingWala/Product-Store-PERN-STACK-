import { relations } from "drizzle-orm"
import {pgTable,text,uuid,timestamp} from "drizzle-orm/pg-core"

export const users=pgTable("user",{
    id:text("id").primaryKey(),
    email:text("email").notNull().unique(),
    name:text("name"),
    imageUrl:text("Image_url"),
    createdAt:timestamp("created_at",{mode:"date"}).defaultNow(),
    updatedAt:timestamp("updated_at",{mode:"date"}).defaultNow()
})

export const products=pgTable("product",{
    id:uuid("id").defaultRandom().primaryKey(),
    title:text("title").notNull(),
    description:text("description").notNull(),
    image:text("image_url").notNull(),
    userId:text("userId").notNull().references(()=> users.id,{onDelete:"cascade"}),
    createdAt:timestamp("created_at",{mode:"date"}).defaultNow(),
    updatedAt:timestamp("updated_at",{mode:"date"}).defaultNow()
})


export const comments=pgTable("comments",{
    id:uuid("id").defaultRandom().primaryKey(),
    content:text("content").notNull(),
    userId:text("userId").notNull().references(()=>users.id,{onDelete:"cascade"}),
    productId:uuid("productId").notNull().references(()=>products.id,{onDelete:"cascade"}),
    createdAt:timestamp("created_at",{mode:"date"}).defaultNow()
})

// user relation 
export const userRelation=relations(users,({many})=>({
    product:many(products),
    comments:many(comments)
}))


export const productRelation=relations(products,({one ,many})=>({
    user:one(users,{fields:[products.userId],references:[users.id]}),
    comments:many(comments)
}))

export const commentRelation=relations(comments,({one})=>({
    product:one(products,{fields:[comments.productId],references:[products.id]}),
    user:one(users,{fields:[comments.userId],references:[users.id]})
}))


export type user=typeof users.$inferSelect
export type newUser = typeof users.$inferInsert


export type product = typeof products.$inferSelect
export type newProduct= typeof products.$inferInsert

export type comment= typeof comments.$inferSelect
export type newComment=typeof comments.$inferInsert