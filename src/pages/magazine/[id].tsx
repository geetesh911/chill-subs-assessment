import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout";
import { SubCalls } from "@/components/sub-calls";
import { Call } from "@/interfaces/call.interface";

const fetchMagazineCalls = async (id: string): Promise<Call[]> => {
  const response = await fetch(`/api/magazine/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = useQuery({
    initialData: [],
    queryKey: ["magazineCalls", id],
    queryFn: () => fetchMagazineCalls(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return <Layout>Loading...</Layout>;
  }

  if (error) {
    return <Layout>Error: {error.message}</Layout>;
  }

  return (
    <Layout>
      <h1 className="text-2xl md:text-3xl my-6">Sub Calls</h1>
      <SubCalls calls={data} />
    </Layout>
  );
}
