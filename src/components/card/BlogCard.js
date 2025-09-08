"use client";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Calendar, ArrowRight, Clock } from "lucide-react";

export default function BlogCard({ blog }) {
  return (
    <article className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 max-w-4xl mx-auto">
      <div className="relative h-48 sm:h-60 overflow-hidden">
        <Image
          src={blog.image || "/placeholder.svg"}
          width={500}
          height={300}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
          <span className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <Clock size={12} />
            {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="font-bold text-xl text-gray-900 line-clamp-2 mb-3 transition-colors duration-300">
          {blog.title}
        </h2>

        <div
          className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar size={14} />
            <time dateTime={blog.createdAt}>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>

          <Link
            href={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 group/link"
          >
            Read More
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/5 pointer-events-none" />
    </article>
  );
}
