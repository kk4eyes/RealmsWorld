/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { paths } from "@reservoir0x/reservoir-sdk";
import { getUser } from "@/lib/reservoir/getUser";
import { useQuery } from "@tanstack/react-query";

export const useUserTokens = ({ address }: { address: string }) => {
  const { data /* error, isLoading */ } = useQuery({
    queryKey: ["userTokens" + address],
    queryFn: async () =>
      await fetch(`/api/reservoir?address=${address}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          return res as paths["/users/{user}/tokens/v10"]["get"]["responses"]["200"]["schema"];
        }),
    enabled: !!address,
  });

  return { tokens: data };
};
