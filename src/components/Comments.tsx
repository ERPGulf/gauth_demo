import { getFeedback } from "@/utils/api/product/API-getFeedback";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Comments = () => {
  const [comments, setComments] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedback = await getFeedback();
        const firstFeedback = feedback.data.message[0]; // Assuming you want the first feedback item
        setComments(firstFeedback.description);
        setName(firstFeedback.name);
      } catch (error) {
        console.error("Error getting feedback", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mr-20 pb-10 pt-20">
      <h4 className="text-blue-400">Join the community</h4>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Supported by thousands of <br />
        <span className="text-blue-400">developers and designers</span>
      </h2>
      <div className="mt-5 block rounded-md border ">
        <div className="mx-2 flex justify-center gap-20  border-b py-3">
          <div className="gap-10 sm:flex">
            <div>
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-blue-400 lg:text-4xl">
                5.8M <br />
              </h1>
              <p className="text-gray-400">Weekly downloads on npm</p>
            </div>
            <div>
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-blue-400 lg:text-4xl">
                90.5k <br />
              </h1>
              <p className="text-gray-400">Stars on GitHub</p>
            </div>
          </div>
          <div className="gap-10 sm:flex">
            <div>
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-blue-400 lg:text-4xl">
                2.9k <br />
              </h1>
              <p className="text-gray-400">Open-source contributors</p>
            </div>
            <div>
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-blue-400 lg:text-4xl">
                18.9k <br />
              </h1>
              <p className="text-gray-400">Followers on X</p>
            </div>
          </div>
        </div>
        <div className="justify-center sm:block lg:flex">
          <div className=" block p-5 lg:border-r">
            <p>{comments}</p>
            <p className="border-b pb-6 font-bold">-{name}</p>
          </div>
          <div className="p-5">
            <p>{comments}</p>
            <p className="border-b pb-6 font-bold">-{name}</p>
          </div>
        </div>
        <div className="sm:block lg:flex">
          <div className=" block p-5 lg:border-r">
            <p>{comments}</p>
            <p className="border-b pb-6 font-bold lg:border-none">-{name}</p>
          </div>
          <div className="p-5">
            <p>{comments}</p>
            <p className="font-bold">-{name}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-40 ">
        <div className="block text-center">
          <h6 className="text-md font-bold text-blue-400">Start now</h6>
          <h1 className="text-3xl font-bold">
            Ship your next project <span className="text-blue-400">faster</span>
          </h1>
          <p className="text-gray-400">
            Find out why MUI's tools are trusted by thousands of open-source
            <br /> developers and teams around the world.
          </p>
          <Button className="mt-2">Discover the Core Libraries</Button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
