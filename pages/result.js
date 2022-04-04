import { useRouter } from "next/router";

export default function Result() {
  const router = useRouter();
  const { order, email, status } = router.query;

  if (status === "success")
    return (
      <div>
        <h1> YES! il tuo ordine è</h1>
        <span>{order}</span>
        <span>e la tua mail è</span>
        <span>{email}</span>
      </div>
    );

  return (
    <div>
      <h1></h1>
    </div>
  );
}
