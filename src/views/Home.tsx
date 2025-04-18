/** @format */

import { useEffect } from "react";
import { Card } from "../components/browser/Card";
import { Button } from "../components/Buttons";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logOut } from "../services/auth";

// this is the default view that is shown if user IS logged in.

interface DefaultPopupI {
  msg: string;
}

interface HomeI {
  error: string;
  word: string;
}

function DefaultPopup({ msg }: DefaultPopupI) {
  return (
    <div className="flex flex-col gap-4 px-6 py-4 text-primary rounded-lg border-accent border w-96 h-auto bg-white">
      <div className="flex flex-col gap-1 pb-2 border-secondary border-b">
        <div className="font-title text-3xl italic">Welcome to Vessle.</div>
        <div className="text-md">Expand your vocabulary as you browse. </div>
      </div>
      <div>{msg}</div>
      <div className="flex flex-col gap-2 pr-10">
        <div className="flex w-full justify-between ">
          <Button
            text="Collection"
            link={true}
            onClick={() => {
              chrome.tabs.create({
                url: "https://vessle.vercel.app"
              })
            }}
          />
          <Button text="Log Out" onClick={() => logOut()} type="secondary" />
        </div>
      </div>
    </div>
  );
}

function Home({ error, word }: HomeI) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  console.log("word", word);
  console.log("error", error);

  if (error || !word || !user) {
    // if there is an error or if no word is selected, display default popup view
    return <DefaultPopup msg={error} />;
  } else {
    // otherwise, display the word card !
    return <Card word={word} user={user} />;
  }
}

export default Home;
