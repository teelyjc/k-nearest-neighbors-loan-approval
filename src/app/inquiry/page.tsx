"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { NextPage } from "next";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { resourceLimits } from "worker_threads";
import { z } from "zod";

import { getPredict } from "@/app/inquiry/actions";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { inquirySchema } from "@/domains/Inquiry";
import { Education } from "@/domains/LoanApprovement";
import { capitalize, wait } from "@/libs/utils";

const InquiryPage: NextPage = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState({
    status: "",
    approved: 0,
    rejected: 0,
  });

  const form = useForm<z.infer<typeof inquirySchema>>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      education: Education.Graduate,
      selfEmployed: true,
      incomeAnnum: 0,
      loanAmount: 0,
      loanTerm: 0,
      cibilScore: 0,
      residentialAssetsValue: 0,
      commercialAssetsValue: 0,
      luxuryAssetsValue: 0,
      bankAssetValue: 0,
    },
  });

  async function onInquirySubmit(values: z.infer<typeof inquirySchema>) {
    setSubmitting(true);

    const { approved, rejected, status } = await getPredict(values);
    setResult({ approved, rejected, status });

    await wait(() => {}, 2 * 1000);
    setSubmitting(false);
  }

  return (
    <Fragment>
      <AlertDialog open={result.status !== ""}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Your Prediction is{" "}
              <span
                className={clsx([
                  "font-semibold",
                  result.status === "approved"
                    ? "text-green-500"
                    : "text-red-500",
                ])}
              >
                {capitalize(result.status)}
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Approved rate is {result.approved.toFixed(2)} <br />
              and Rejected rate is {result.rejected.toFixed(2)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() =>
                setResult({ approved: 0, rejected: 0, status: "" })
              }
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex flex-col my-5 max-w-lg mx-auto space-y-5">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Inquiry
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onInquirySubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an education status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Education.Graduate}>
                        Graduated
                      </SelectItem>
                      <SelectItem value={Education.NotGraduate}>
                        Not Graducated
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="selfEmployed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>You are Self-Employed.</FormLabel>
                    <FormDescription>
                      Self-Employment refers to working for oneself rather.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="incomeAnnum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Income</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.currentTarget.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    The amount of money your employer pays you over the course
                    of a year in exchange for the work you perform.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="loanAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.currentTarget.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    The total debt you owe at any given time under the
                    agreement.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="loanTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Term</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.currentTarget.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    The length of the loan, or the length of time it takes for a
                    loan to be paid off completely when the borrower is making
                    regularly scheduled payments
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cibilScore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CIBIL Score</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={300}
                      max={900}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.currentTarget.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    CIBIL stands for Credit Information Bureau India Limited,{" "}
                    <br />A three-digit score between 300 and 900.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="residentialAssetsValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Residential Assets Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.currentTarget.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Non-Income Producing Assets that consist primarily of
                    single-family residential developments (but are not Land
                    Assets, Condominium Assets or multi-family developments).
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commercialAssetsValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commercial Assets Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.currentTarget.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    An Eligible Asset with respect to which the Mortgaged
                    Property consists of office, retail, industrial,
                    self-storage and/or mixed use properties.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="luxuryAssetsValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Luxury Assets Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.currentTarget.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Physical items that hold significant value, such as fine
                    art, classic cars, jewelry, and high-end real estate.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankAssetValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Asset Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.currentTarget.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    The money and property owned by a bank, and the money that
                    is owed to it
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="space-x-2">
              <Button variant={"secondary"} asChild>
                <Link href="/">Go Back 👈</Link>
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Predicting.." : "Predict"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Fragment>
  );
};

export default InquiryPage;
