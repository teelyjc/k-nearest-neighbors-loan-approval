import { LoanApproval, LoanStatus } from "@/domains/LoanApprovement";
import { getDataStack, getFromDataset } from "@/libs/serializer";

export async function getLoanLength() {
  const approvements = new Array<LoanApproval>();

  let approved = 0;
  let rejected = 0;

  const out = getFromDataset("/public", "/loan-approval-dataset.csv");
  const dataStack = getDataStack(out);

  dataStack.forEach((row) => {
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
    );
  });

  approvements.forEach((approvement) => {
    switch (approvement.getLoanStatus()) {
      case LoanStatus.Approved: {
        approved++;
        break;
      }
      case LoanStatus.Rejected: {
        rejected++;
        break;
      }
      default: {
        throw new Error("Dataset doesn't match to the specified");
      }
    }
  });

  return {
    all: approvements.length,
    approved,
    rejected,
  };
}
