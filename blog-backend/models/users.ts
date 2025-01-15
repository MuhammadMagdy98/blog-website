import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { posts } from './posts'
import { categories } from './categories'
import { comments } from './comments'
import { tags } from './tags'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).unique('usernamme').notNull(),
  email: varchar('email', { length: 100 }).unique('email').notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  categories: many(categories),
  posts: many(posts),
  comments: many(comments),
  tags: many(tags),
}))
