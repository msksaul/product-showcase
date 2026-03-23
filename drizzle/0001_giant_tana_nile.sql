ALTER TABLE "products" ADD COLUMN "votes" json DEFAULT '[]'::json;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "vote_count";