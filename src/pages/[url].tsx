import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { api } from "../utils/api";

function ShortUrlPage() {
  const router = useRouter();
  const fetchLongUrl = api.example.fetchLongUrl.useQuery(
    {
      shortUrl: router.query.url as string,
    },
    {
      enabled: !!router.query.url,
    }
  );
  useEffect(() => {
    if (!fetchLongUrl.data) return;
    window.location.href = fetchLongUrl.data;
  }, [fetchLongUrl.data]);

  return <div>ShortUrlPage</div>;
}

export default ShortUrlPage;
