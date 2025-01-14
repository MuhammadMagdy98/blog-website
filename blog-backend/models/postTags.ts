// src/models/postTags.ts
import { pgTable, integer, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { posts } from './posts';
import { tags } from './tags';

export const postTags = pgTable('post_tags', {
  postId: integer('post_id').notNull(),
  tagId: integer('tag_id').notNull(),
}, (table) => ({
  pk: primaryKey(table.postId, table.tagId),
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  }),
}));
