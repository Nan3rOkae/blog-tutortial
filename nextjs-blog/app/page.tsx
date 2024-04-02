import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  const query = `
    *[_type=='blog'] | order(_createdAt desc) {
      title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage,
      author
    }
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();
  // console.log(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
      {data.map((post, index) => (
        <Card key={index}>
          <Image
            src={urlFor(post.titleImage).url()}
            alt="image"
            width={800}
            height={600}
            className="rounded-t-md h-[200px] object-cover md:object-cover"
          />
          <CardContent className="mt-5">
            <h3 className="line-clamp-2 font-semibold">{post.title}</h3>
            <p className="line-clamp-2 text-gray-500 text-sm mt-2 dark:text-gray-300">
              {post.smallDescription}
            </p>
            <p className="text-gray-500 text-sm mt-2 dark:text-gray-300">
              {post.author}
            </p>
            <Button className="w-full mt-7">
              <Link href={`/blog/${post.currentSlug}`} className="w-full">
                Read More
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
