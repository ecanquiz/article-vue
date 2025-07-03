import { Http as h } from "@/core/utils/Http";
import { staticInit } from "@/core/utils/Http/init";

const Http = new h( staticInit );

export const getPublicFile = (imageName: string) => {
  return Http.get(`/api/public-file/${imageName}`, "blob");
} 

export default { getPublicFile }
