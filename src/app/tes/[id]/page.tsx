// import Content from "@/components/myComponents/content/Content";
// import StraightContentInfinityScroll from "@/components/myComponents/content/StraightContentInfinityScroll";
// import { exploreChainingContent, getContentById } from "@/lib/actions/content";
// import { ChevronLeft } from "lucide-react";
// import { Metadata } from "next";
// import Link from "next/link";
// import React from "react";

// export const metadata: Metadata = {
//   title: "Explore | Connect Verse",
//   description: "Welcome to the Connect Verse Explore page",
//   keywords:"connect, verse, social media",
//   authors: [{name: "Connect Verse team"}],
//   openGraph: {
//     title: "Explore | Connect Verse",
//     description: "Welcome to the Connect Verse Explore page",
//     url: "https://ConnectVerse.com/group",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Explore | Connect Verse",
//     description: "Welcome to the Connect Verse Explore page",
//   },
// };

// const page = async ({ params }: { params: { id: string } }) => {
//   const { data, error } = await getContentById({ id: +params.id });

//   if (!data) {
//     return <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-2 flex flex-col items-center justify-center">{error}</div>;
//   }

//   return (
//     <>
//       <div className="pt-12 mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4">
//         <div className="w-screen h-12 flex items-center fixed top-0 left-0 bg-secondary sm:pl-14 md:pl-16 lg:pl-56 gap-4 pr-6 z-10">
//           <Link href="/explore">
//             <ChevronLeft size={35} />
//           </Link>
//           <h1 className="text-lg font-medium">Explore</h1>
//         </div>
//         <div className="flex flex-col gap-4 items-center">
//           <Content uploader={data.uploader.username} caption={data.caption} url={data.url} contentId={data.id} profilePicture={data.uploader.profileUrl} id={data.id}/>
//           <StraightContentInfinityScroll contentFuction={exploreChainingContent} id={+params.id} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default page;
