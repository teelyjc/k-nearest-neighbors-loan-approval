import { NextPage } from "next";
import Link from "next/link";
import { Fragment } from "react";

import { Button } from "@/components/common/button";

const ExplorePage: NextPage = () => {
  return (
    <Fragment>
      <div className="flex flex-col my-5 max-w-lg text-center mx-auto">
        <Button asChild>
          <Link href="/">Go Back 👈</Link>
        </Button>
      </div>
    </Fragment>
  );
};

export default ExplorePage;
