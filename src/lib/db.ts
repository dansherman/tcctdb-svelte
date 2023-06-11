import { createClient } from "@supabase/supabase-js";
// import type { Database } from "./schema";

export const supabase = createClient('https://gjnfygrrxeyxxqgezevn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqbmZ5Z3JyeGV5eHhxZ2V6ZXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQyODkxODQsImV4cCI6MTk5OTg2NTE4NH0.vpbxQND37JzGywFy-7OqtYvwH-A95jeKMbLZlsp_xOw');