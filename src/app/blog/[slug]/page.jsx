"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import parse from "html-react-parser";
import Breadcrumb from "@/components/Breadcrumb";

export default function SingleBlog({ params }) {
  const { slug } = params;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`/api/blogs/${slug}`);
        setBlog(response.data.data);
      } catch (err) {
        setError("Failed to fetch blog data.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [slug]);

  console.log(blog);

  if (loading) {
    return (
      <section className="py-8">
        <div className="container max-w-[90%] mx-auto text-center">
          <p className="text-xl font-bold text-gray-600">
            Loading blog details...
          </p>
          <div className="mt-4">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8">
        <div className="container max-w-[90%] mx-auto text-center">
          <p className="text-xl font-bold text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-2 bg-[#e6ecfc]">
        <div className="container max-w-[90%] mx-auto">
          <Breadcrumb customLabels={{ blog: "Blog", single: blog.slug }} />
        </div>
      </section>

      <main className="py-10">
        <article className="container max-w-[80%] mx-auto">
          <header className="mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              {blog.title}
            </h1>
            <p className="text-sm text-gray-500">
              By {blog.author || "Unknown Author"} ·{" "}
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </p>
          </header>

          {blog.image && (
            <Image
              src={blog.image}
              height={500}
              width={800}
              alt={blog.title}
              className="rounded-lg shadow-md mx-auto mb-8"
            />
          )}

          <section
            className="
    prose prose-lg max-w-none
    text-gray-800 leading-relaxed
    prose-headings:font-semibold
    prose-h2:mt-8 prose-h2:mb-4
    prose-h3:mt-6 prose-h3:mb-3
    prose-p:my-4
    prose-ul:my-4 prose-ul:pl-6
    prose-li:my-2
  "
          >
            {blog.content ? parse(blog.content) : "No content available."}
          </section>

          {/* <footer className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-500">
            <p>
              Tags: {blog.tags?.join(", ") || "Real Estate, Jaipur, Builders"}
            </p>
          </footer> */}
        </article>
      </main>
    </>
  );
}
