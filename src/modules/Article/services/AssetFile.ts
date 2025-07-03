import { Http as h } from "@/core/utils/Http";
import { staticInit } from "@/core/utils/Http/init";

const Http = new h( staticInit );

export const getPublicFile = (urlPath: string) => {
  return Http.get(urlPath, "blob");
} 

export default { getPublicFile }