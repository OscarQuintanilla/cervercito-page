import { supabase } from "../../supabase/client";

export async function queryGetCategories() {
  const response = await supabase.from("categories").select();
  return response;
}

export async function queryCreateMod(mod_object) {
  const response = await supabase.from("mods").insert([mod_object]);
  return response;
}

export async function queryUpdateMod(mod_object) {
  const { id } = mod_object;
  const response = await supabase.from("mods").update(mod_object).match({ id });
  return response;
}

export async function querygetTagsByMod(mod_id) {
  const response = await supabase.from("mod_tag").select().eq("mod_id", mod_id);
  return response;
}

export async function queryGetModByName(name) {
  const response = await supabase.from("mods").select().eq("name", name);
  return response;
}

export async function queryGetModById(id) {
  const response = await supabase.from("mods").select().eq("id", id);
  return response;
}

export async function queryGetTags() {
  const response = await supabase.from("tags").select();
  return response;
}

export async function queryCreateTag(tag_array) {
  const response = await supabase.from("tags").insert(tag_array);
  return response;
}

// Creates Relations between the new mod and the tags
export async function queryCreateModTagsRelation(relationsArray) {
  const response = await supabase.from("mod_tag").insert(relationsArray);
  return response;
}
