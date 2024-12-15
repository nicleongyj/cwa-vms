import { Request, Response } from "express";

export const login = async function (req: Request, res: Response) {
  /**
   * Verifies the Authorization Code sent by Azure Service Providers
   * 
   * Route: /.auth/login/microsoftaccount
   */

  const authCode = req.body.authentication_token
  const user = req.body.user // some user information

  // Return the user to an error page with some instructions
  res.redirect(303, "http:localhost:5173/auth/auth-code-error");
};
