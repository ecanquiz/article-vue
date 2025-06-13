import {test, vi, expect} from "vitest"
import Http from "@/core/utils/Http";
import {getAuthUser, registerUser} from "../index";

test("should fetch login-auth-user via http-auth-service", () => {
    const payload = [{
      name: "John Doe",
      email: "user@email.ext",
      password: "password",
      password_confirmation: "password"
    }];
    const respRegister = "";
    const respAuth = {
      id: 1,
      name: "John Doe",
      email: "user@email.ext",
      isAdmin:	false,
      role_id:	2,
      emailVerified: null      
    };
  
    Http.get = vi.fn().mockResolvedValue(null);
    Http.post = vi.fn().mockResolvedValue(respRegister);  
    registerUser(payload).then(
      (data) => expect(data).toEqual(respRegister)
    );

    Http.get = vi.fn().mockResolvedValue(respAuth);
    getAuthUser().then(
      (data) => expect(data).toEqual(respAuth)
    );
});

