import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          content,
          titleImage,
          author,
      }[0]`;

  const data = await client.fetch(query);
  return data;
}
export default async function blogkArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getData(params.slug);
  return (
    <div className="mt-8">
      <h1>
        <span className="block text-3xl text-center leading-8 font-semibold tracking-tight sm:text-4xl mb-4">
          {data.title}
        </span>
        <span className="ml-6 text-gray-600 font-semibold flex justify-center xl:text-sm">
          author: {data.author}
        </span>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        width={900}
        height={400}
        alt="title image"
        className="rounded-lg mt-5 object-cover md:object-cover"
      />
      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
