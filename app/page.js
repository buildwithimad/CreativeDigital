import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/ar"); // redirect to English as main language
  return null;
}