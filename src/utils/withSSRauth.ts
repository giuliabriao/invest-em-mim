import {
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthError } from "../services/errors/AuthError";

export function withSSRauth(fn: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const cookies = parseCookies(ctx);

    if (!cookies["invest.token"]) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthError) {
        destroyCookie(undefined, "invest.token");
        destroyCookie(undefined, "me");

        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }
  };
}
