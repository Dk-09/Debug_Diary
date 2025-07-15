import { useState } from "react";
import { Tabs, Tab, Card, CardHeader, CardBody, Image } from "@heroui/react";
import { Link } from "react-router-dom";
import { RedTeaming, MalwareDev, WriteUp, BackIcon } from "../Icons/All";
import { blogPosts } from "../data/blogData";
import NavForBlog from "../Components/NavForBlog";

export default function Blog() {
  const [activeTab, setActiveTab] = useState("Malware Development");

  const filteredPosts = blogPosts[activeTab] || [];

  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavForBlog to={"/"}/>

      {/* Tabs */}
      <Tabs
        aria-label="Blog Categories"
        color="primary"
        variant="bordered"
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key)}
        className="justify-center px-10 py-6"
      >
        <Tab key="Malware Development" title={<div className="flex items-center space-x-2 sm:text-xl"><MalwareDev /><span>Malware Development</span></div>} />
        <Tab key="Red Teaming" title={<div className="flex items-center space-x-2 sm:text-xl"><RedTeaming /><span>Red Teaming</span></div>} />        
        <Tab key="Write ups" title={<div className="flex items-center space-x-2 sm:text-xl"><WriteUp /><span>Write ups</span></div>} />
      </Tabs>

      {/* Cards */}
      <div className="w-full flex flex-wrap justify-center gap-6 px-4">
        {filteredPosts.map((post) => (
          <Link to={`/post/${post.id}`} key={post.id}>
            <Card className="w-[300px] h-full cursor-pointer hover:shadow-xl transition-shadow px-2">
              <CardHeader className="py-2">
                <Image
                  alt={post.title}
                  src={post.image}
                  width={270}
                  className="object-cover rounded-xl"
                />
              </CardHeader>
              <CardBody className="pb-0 py-4 flex-col items-start overflow-hidden">
                <h1 className="font-bold text-2xl">{post.title}</h1>
                <small className="text-default-500 text-base">{post.description}</small>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
