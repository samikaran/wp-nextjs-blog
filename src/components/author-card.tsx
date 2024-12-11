import Image from "next/image";
import { Author } from "@/types/post";

interface Props {
  author: Author;
}

export default function AuthorCard({ author }: Props) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mt-8">
      <div className="flex items-center gap-4">
        {author.avatar && (
          <Image
            src={author.avatar.url}
            alt={author.name}
            width={60}
            height={60}
            className="rounded-full"
          />
        )}
        <div>
          <h3 className="text-xl font-semibold">{author.name}</h3>
          {author.description && (
            <p className="text-gray-600 mt-2">{author.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
