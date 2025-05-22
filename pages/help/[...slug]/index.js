import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";

// Allowed help pages
const helpContent = {
  "": "Welcome to the Help Center. Choose a section: FAQs, Contact, or Privacy.",
  faqs: "Frequently Asked Questions: Here are some common queries and answers.",
  contact: "Contact Us: You can reach us at help@example.com.",
  privacy: "Privacy Policy: We value your data and protect your privacy.",
};

export default function HelpPage() {
  const router = useRouter();
  const { slug } = router.query;
  const pageKey = slug ? slug[0] : "";

  // Redirect to /404 if invalid slug
  useEffect(() => {
    if (router.isReady && !Object.keys(helpContent).includes(pageKey)) {
      router.replace("/404");
    }
  }, [router.isReady, pageKey]);

  // Prevent rendering during redirect
  if (!Object.keys(helpContent).includes(pageKey)) return null;

  const content = helpContent[pageKey];

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Help Center</h1>

      <p className="mb-6 text-gray-800">{content}</p>

      <div className="space-x-4">
        <Link href="/help">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Home</button>
        </Link>
        <Link href="/help/faqs">
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">FAQs</button>
        </Link>
        <Link href="/help/contact">
          <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Contact</button>
        </Link>
        <Link href="/help/privacy">
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Privacy</button>
        </Link>
      </div>
    </div>
  );
}
