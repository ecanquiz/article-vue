import { Http as h } from "@/core/utils/Http";
import { productInit } from "@/core/utils/Http/init";
import type { Presentation } from "../types/Presentation";

const Http = new h( productInit );

export const getPresentations = (productId: string) => {  
  return Http.get(`/api/presentations/${productId}`);
}

export const insertPresentation = (payload: Presentation) => {   
  return Http.post(`/api/presentations`, payload);
}

export const updatePresentation = (payload: Presentation, presentationId: string) => {   
  return Http.put(`/api/presentations/${presentationId}`, payload);
}

export const deletePresentation = (presentationId: string) => { 
  return Http.delete(`/api/presentations/${presentationId}`);
}

export const uploadFilePresentation = (payload: any, presentationId: string) => { 
  return Http.post(`/api/presentation-fileupload/${presentationId}`, payload);
}

export const getPresentationSearch = (query: string) => {
  return Http.get(`/api/presentation-search?${query}`);
}

export const getPublicFile = (filePath: string) => {
  return Http.get(`api/public-file/${filePath}`, "blob");
}

export default {
  getPresentations,
  insertPresentation,
  updatePresentation,
  deletePresentation,
  uploadFilePresentation,
  getPresentationSearch,
  getPublicFile
}
