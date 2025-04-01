import { createServerSupabaseClient } from "./server"
import { Database } from "./types"

type Tables = Database["public"]["Tables"]
type TableName = keyof Tables

export async function getTable<T extends TableName>(
  table: T,
  query?: {
    select?: string
    eq?: { column: keyof Tables[T]["Row"]; value: any }
    order?: { column: keyof Tables[T]["Row"]; ascending?: boolean }
    limit?: number
  }
) {
  const supabase = createServerSupabaseClient()
  let queryBuilder = supabase.from(table).select(query?.select || "*")

  if (query?.eq) {
    queryBuilder = queryBuilder.eq(query.eq.column as string, query.eq.value)
  }

  if (query?.order) {
    queryBuilder = queryBuilder.order(query.order.column as string, {
      ascending: query.order.ascending ?? true,
    })
  }

  if (query?.limit) {
    queryBuilder = queryBuilder.limit(query.limit)
  }

  const { data, error } = await queryBuilder

  if (error) throw error
  return data as Tables[T]["Row"][]
}

export async function insertRow<T extends TableName>(
  table: T,
  row: Tables[T]["Insert"]
) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from(table).insert(row).select().single()

  if (error) throw error
  return data as Tables[T]["Row"]
}

export async function updateRow<T extends TableName>(
  table: T,
  id: string,
  row: Tables[T]["Update"]
) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from(table)
    .update(row)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as Tables[T]["Row"]
}

export async function deleteRow<T extends TableName>(table: T, id: string) {
  const supabase = createServerSupabaseClient()
  const { error } = await supabase.from(table).delete().eq("id", id)

  if (error) throw error
}

export async function getRow<T extends TableName>(
  table: T,
  id: string
) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw error
  return data as Tables[T]["Row"]
}

export async function countRows<T extends TableName>(
  table: T,
  query?: {
    eq?: { column: keyof Tables[T]["Row"]; value: any }
  }
) {
  const supabase = createServerSupabaseClient()
  let queryBuilder = supabase.from(table).select("*", { count: "exact", head: true })

  if (query?.eq) {
    queryBuilder = queryBuilder.eq(query.eq.column as string, query.eq.value)
  }

  const { count, error } = await queryBuilder

  if (error) throw error
  return count || 0
} 