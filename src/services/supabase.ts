import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://uwmqpdwvuvdazfnbzuir.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bXFwZHd2dXZkYXpmbmJ6dWlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3NjUxMzcsImV4cCI6MjA0MjM0MTEzN30.ARaEgHgK8aC1ZfZNpMjX6GsBOmcG6ARwrJXV0wYAxFs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
