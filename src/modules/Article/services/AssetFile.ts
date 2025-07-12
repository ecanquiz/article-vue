import { Http as h } from "@/core/utils/Http";
import { staticInit } from "@/core/utils/Http/init";

const Http = new h( staticInit );

export const getPublicFile = (articleId: string|number, imageName: string) => {
  return Http.get(`/api/public-file/${articleId.toString()}/${imageName}`, "blob");
} 

export default { getPublicFile }
