"use server";
import { z } from "zod";

import { inquirySchema } from "@/domains/Inquiry";
import { Education, LoanApproval, LoanStatus } from "@/domains/LoanApprovement";
import { getDifference, getEuclidean } from "@/libs/k-nearest-neighbors";
import { getDataStack, getFromDataset } from "@/libs/serializer";

export async function getPredict(values: z.infer<typeof inquirySchema>) {
  const approvements = new Array<LoanApproval>();
  const userApprovement = new LoanApproval(
    "",
    0,
    values.education,
    values.selfEmployed,
    values.incomeAnnum,
    values.loanAmount,
    values.loanTerm,
    values.cibilScore,
    values.residentialAssetsValue,
    values.commercialAssetsValue,
    values.luxuryAssetsValue,
    values.bankAssetValue,
    undefined
  );

  const out = getFromDataset("public/loan-approval-dataset.csv");
  const dataStack = getDataStack(out);

  dataStack.forEach((row) =>
    approvements.push(
      new LoanApproval(
        row[0],
        parseFloat(row[1]),
        LoanApproval.parseEducation(row[2]),
        LoanApproval.parseYesNoToBoolean(row[3]),
        parseFloat(row[4]),
        parseFloat(row[5]),
        parseFloat(row[6]),
        parseFloat(row[7]),
        parseFloat(row[8]),
        parseFloat(row[9]),
        parseFloat(row[10]),
        parseFloat(row[11]),
        LoanApproval.parseApprovement(row[12])
      )
    )
  );

  approvements.forEach((appr) => {
    const userGraduate: number =
      userApprovement.getEducation() === Education.Graduate ? 1 : 0;
    const dataGraduate: number =
      appr.getEducation() === Education.Graduate ? 1 : 0;

    const userSelfEmployed: number = userApprovement.getSelfEmployed() ? 1 : 0;
    const dataSelfEmployed: number = appr.getSelfEmployed() ? 1 : 0;

    appr.setSpacing(
      getEuclidean([
        getDifference(userGraduate, dataGraduate),
        getDifference(userSelfEmployed, dataSelfEmployed),
        getDifference(userApprovement.getIncomeAnnum(), appr.getIncomeAnnum()),
        getDifference(userApprovement.getLoanAmount(), appr.getLoanAmount()),
        getDifference(userApprovement.getLoanTerm(), appr.getLoanTerm()),
        getDifference(userApprovement.getCibilScore(), appr.getCibilScore()),
        getDifference(
          userApprovement.getResidentialAssetsValue(),
          appr.getResidentialAssetsValue()
        ),
        getDifference(
          userApprovement.getCommercialAssetsValue(),
          appr.getCommercialAssetsValue()
        ),
        getDifference(
          userApprovement.getLaxuryAssetsValue(),
          appr.getLaxuryAssetsValue()
        ),
        getDifference(
          userApprovement.getBankAssetValue(),
          appr.getBankAssetValue()
        ),
      ])
    );
  });

  let approved = 0;
  let rejected = 0;

  approvements
    .sort((a, b) => {
      return a.getSpacing()! - b.getSpacing()!;
    })
    .slice(0, 3)
    .forEach((appr) => {
      if (appr.getLoanStatus() === LoanStatus.Approved) {
        approved += appr.getSpacing()!;
      }

      if (appr.getLoanStatus() === LoanStatus.Rejected) {
        rejected += appr.getSpacing()!;
      }
    });

  return {
    approved,
    rejected,
    status: approved > rejected ? "approved" : "rejected",
  };
}
