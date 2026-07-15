import { users, products, comments, type newUser, type newProduct, type newComment } from "./schema.ts"
import { db } from "./index.ts"
import { eq } from "drizzle-orm"


// user product

export const createUser = async (data: newUser) => {
    const [user] = await db.insert(users).values(data).returning()
    return user
}

export const getUserById = async (id: string) => {
    return db.query.users.findFirst({ where: eq(users.id, id) })
}

export const updateUser = async (id: string, data: Partial<newUser>) => {
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning()
    return user
}

export const upsertUser = async (data: newUser) => {
    const existingUser = await db.query.users.findFirst({ where: eq(users.id, data.id) })
    if (existingUser) {
        return updateUser(data.id, data)
    }
    return createUser(data)
}

// product querries

export const createProduct = async (data: newProduct) => {
    const [product] = await db.insert(products).values(data).returning()
    return product
}

export const getAllProducts = async () => {
    const allProducts = await db.query.products.findMany({
        with: {
            user: true
        },
        orderBy: (product, { desc }) => [desc(product.createdAt)]
    })

    return allProducts
}


export const getProductById = async (id: string) => {
    const product = await db.query.products.findFirst({
        where: eq(products.id, id),
        with: {
            user: true,
            comments: {
                with: { user: true },
                orderBy: (comment, { desc }) => [desc(comment.createdAt)]
            }
        },
    })

    return product

}

export const getProductByuserId = async (userId: string) => {
    const allProduct = await db.query.products.findMany({
        where: eq(products.userId, userId),
        with: {
            user: true
        },
        orderBy: (product, { desc }) => [desc(product.createdAt)]
    })
    return allProduct
}


export const updateProduct = async (id: string, data: Partial<newProduct>) => {
    const [updatedProduct] = await db.update(products).set(data).where(eq(products.id, id)).returning()
    return updatedProduct
}

export const deleteProductById = async (id: string) => {
    const [deletedProduct] = await db.delete(products).where(eq(products.id, id)).returning()
    return deletedProduct
}

// comment querry

export const createComment = async (comment: newComment) => {
    const [newCommnet] = await db.insert(comments).values(comment).returning()
    return newCommnet
}

export const deleteComment = async (id: string) => {
    const [deletedComment] = await db.delete(comments).where(eq(comments.id, id)).returning()
    return deletedComment
}

export const getCommentById = async (id: string) => {
    const comment = await db.query.comments.findFirst({
        where: eq(comments.id, id),
        with: { user: true }
    })
    return comment
}