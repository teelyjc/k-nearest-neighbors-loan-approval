import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { getLoanLength } from "@/app/actions";
import { Button } from "@/components/common/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomePage: NextPage = async () => {
  const loneLength = await getLoanLength();
  return (
    <Fragment>
      <div className="flex flex-col my-5 max-w-lg mx-auto text-center space-y-5">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Loan Approvement 💵
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-4">
          A prediction your <b>loan approval</b> with <b>K-Nearest Neighbors</b>
          .
          <br />
          <br />
          Regarding your result, accuracy is dependent on the data.
          <br />
          Your result accuracy may{" "}
          <b>
            <span className="text-red-500">not be 100 percent</span>
          </b>
          .
        </p>
        <Image
          src="/images/bg.png"
          width={600}
          height={367}
          alt="background"
          className="max-w-xs mx-auto"
        />
        <div className="flex mx-auto space-x-5">
          <Button variant={"default"} className="w-full" asChild>
            <Link href="/inquiry">Starting your Prediction</Link>
          </Button>
          <Button variant={"secondary"} className="w-full" asChild>
            <Link href="/explore">Explore</Link>
          </Button>
        </div>

        <div className="flex flex-row mx-auto space-x-4">
          <Card className="hover:scale-110 duration-150 ease-in-out">
            <CardHeader>
              <CardTitle>Approved</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Quantity of approved
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-green-500 font-semibold text-2xl">
                {Intl.NumberFormat().format(loneLength.approved)}
              </p>
            </CardContent>
          </Card>
          <Card className="hover:scale-110 duration-150 ease-in-out">
            <CardHeader>
              <CardTitle>Rejected</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Quantity of rejected
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-red-500 font-semibold text-2xl">
                {Intl.NumberFormat().format(loneLength.rejected)}
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="hover:scale-110 duration-150 ease-in-out">
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Quantity of all included approved, rejected
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-2xl">
              {Intl.NumberFormat().format(loneLength.all)}
            </p>
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
};

export default HomePage;
