import type { GenericObject } from "@/core/utils/Types"
import type { AxiosResponse } from "axios";

export interface Init {  
  baseURL?: string;
  withCredentials?: boolean;
  withXSRFToken?: boolean;
  customHeaders?: GenericObject;
  customParams?: GenericObject | URLSearchParams;
  handleSuccess?: (value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>;
  handleError?: ((error: any) => any) | undefined;
}
