import { useState, useMemo } from "react";
import { Tabs, Tab, Card, CardHeader, CardBody, Image, Chip } from "@heroui/react";
import { Link } from "react-router-dom";
import { RedTeaming, MalwareDev, WriteUp } from "../Icons/All";
import { blogPosts } from "../data/blogData";
import NavForBlog from "../Components/NavForBlog";

export default function Blog() {
  const [activeTab, setActiveTab] = useState("Malware Development");

  const filteredPosts = blogPosts[activeTab] || [];

  const latestMalwarePostId = useMemo(() => {
  const malwarePosts = blogPosts["Malware Development"];
  if (!malwarePosts || !malwarePosts.length) return null;

  const latest = malwarePosts.reduce((a, b) => {
    const da = new Date(a.date), db = new Date(b.date);
    console.log(`Comparing ${a.date} vs ${b.date}: ${da > db ? a.id : b.id} is later`);
    if (isNaN(da)) return b;
    if (isNaN(db)) return a;
    return da > db ? a : b;
  });

  console.log(`Latest post: ID=${latest.id}, Date=${latest.date}`);
  return latest.id;
}, [blogPosts]);


  return (
    <div className="h-screen w-full flex flex-col">
      <NavForBlog to={"/"} />

      <Tabs
          aria-label="Blog Categories"
          color="primary"
          variant="bordered"
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key)}
          className="justify-center px-10 py-6"
      >
        <Tab
          key="Malware Development"
          title={
            <div className="flex items-center space-x-2 sm:text-xl">
              <MalwareDev />
              <span>Malware Development</span>
            </div>
          }
        />
        {/* <Tab
          key="Red Teaming"
          title={
            <div className="flex items-center space-x-2 sm:text-xl">
              <RedTeaming />
              <span>Red Teaming</span>
            </div>
          }
        /> */}
        {/* <Tab
          key="Write ups"
          title={
            <div className="flex items-center space-x-2 sm:text-xl">
              <WriteUp />
              <span>Write ups</span>
            </div>
          }
        /> */}
      </Tabs>

      {/* Cards */}
      <div className="w-full flex flex-wrap justify-center gap-6 px-4 pb-8">
        {filteredPosts.map((post) => (
          <Link to={`/post/${post.id}`} key={post.id}>
            <Card className="w-[300px] h-full cursor-pointer hover:shadow-xl transition-shadow px-2">
              <CardHeader className="pt-4">
                <Image
                  alt={post.title}
                  src={post.image}
                  width={270}
                  className="object-cover rounded-xl"
                />
              </CardHeader>
              <CardBody className="pb-0 pb-4 flex-col items-start overflow-hidden">
                <small className="text-default-300 text-base">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </small>
                <h1 className="font-bold text-2xl">{post.title}</h1>
                <small className="text-default-500 text-base">{post.description}</small>
                <div className="flex my-2 gap-2 flex-wrap">
                  {post.tag?.map((tag, index) => (
                  <Chip key={index} className="" color="warning" variant="dot">
                    {tag}
                  </Chip>
                  ))}
                </div>
                

                {/* Show New only if it's the latest Malware Dev post */}
                {activeTab === "Malware Development" && post.id === latestMalwarePostId && (
                  <Chip
                    classNames={{
                      base: "bg-gradient-to-br from-indigo-500 to-pink-500 text-white border border-white/30 shadow-lg shadow-pink-500/30",
                      content: "text-white font-semibold",
                    }}
                    variant="shadow"
                  >
                    New
                  </Chip>
                )}
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
