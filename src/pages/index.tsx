import React, { useState } from "react";
import { api } from "../utils/api";

const HomePage = () => {
  const [shortUrl, setShortUrl] = useState("");
  const getShortUrl = api.example.shortenUrl.useMutation({
    onSuccess: (data) => {
      console.log("successfully saved in db!");
      setShortUrl(data.shortUrl);
    },
    onError: (error: any) => {
      console.log("failed ", error);
    },
  });

  const [longUrl, setLongUrl] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getShortUrl.mutate({
      longUrl,
    });
  };
  return (
    <div className="flex h-screen w-screen flex-col items-center  bg-gradient-to-br from-white via-gray-100 to-slate-400 p-10">
      <h2 className=" text-3xl font-semibold text-black">
        Enter a long URL to make a NanoURL
      </h2>
      <form
        className=" my-5 flex w-full max-w-md flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full rounded border border-gray-300 p-2 text-gray-600 outline-none focus:border-gray-900"
          type="text"
          name="longUrl"
          id="longUrl"
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button
          type="submit"
          className=" rounded-lg border-2 border-indigo-600 bg-white text-indigo-500 transition duration-300 hover:bg-indigo-600 hover:text-white active:scale-95"
        >
          Make it nano!
        </button>
      </form>
      {shortUrl !== "" && (
        <div className=" rounded-lg border border-indigo-500 p-4">
          <p className=" font-semibold">Congratulations !</p>
          <p>
            Your shorten Url is here:{" "}
            <a
              className=" font-semibold text-indigo-700"
              href={window.location.href + shortUrl}
            >
              {window.location.href + shortUrl}
            </a>
          </p>
        </div>
      )}
      {/* <div className=" my-5 flex flex-col">
        <h3 className=" text-3xl font-semibold text-black/70">
          Here is the list of your urls
        </h3>
        <div className=" flex  border-2 border-indigo-500">
          <div className=" flex w-full flex-col border-r-2 border-gray-700">
            <div className=" border-b-2 border-indigo-500">All long urls</div>
            <div>long urls list</div>
          </div>
          <div className=" flex w-full flex-col">
            <div className=" border-b-2 border-indigo-500">Nano urls</div>
            <div>short urls list</div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;
