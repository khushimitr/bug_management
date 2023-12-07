import { useAppSelector } from "@/hooks/StoreHooks.ts";
import { useEffect, useState } from "react";
import { getUser } from "@/features";

export const useGetUser = () => {
  const currUser = useAppSelector(state => state.user);
  const [user, setUser] = useState(currUser.entities);
  useEffect(() => {
    (async function () {
      const newUser = await getUser();
      if (newUser.data) {
        setUser(newUser.data);
      }
    })();
  }, []);
  return user;
};