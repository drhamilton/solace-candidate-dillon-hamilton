import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { or, sql } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("search");

  // If no search term, return all advocates
  if (!searchTerm) {
    const data = await db.select().from(advocates);
    return Response.json({ data });
  }

  // Perform backend search with the search term
  const searchPattern = `%${searchTerm}%`;

  try {
    const data = await db
      .select()
      .from(advocates)
      .where(
        or(
          // Use composite index for text fields (firstName, lastName, city, degree)
          sql`(${advocates.firstName} || ' ' || ${advocates.lastName} || ' ' || ${advocates.city} || ' ' || ${advocates.degree}) ILIKE ${searchPattern}`,
          // Search in specialties JSONB array
          sql`${advocates.specialties}::text ILIKE ${searchPattern}`,
          // Search in years of experience
          sql`${advocates.yearsOfExperience}::text ILIKE ${searchPattern}`
        )
      );

    return Response.json({ data });
  } catch (error) {
    console.error("Database search error:", error);
    return Response.json({ data: [], error: "Search failed" }, { status: 500 });
  }
}
