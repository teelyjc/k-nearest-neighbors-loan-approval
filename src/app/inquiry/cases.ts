import { Education } from "@/domains/LoanApprovement";

export const ApprovedCases = [
  {
    education: Education.Graduate,
    selfEmployed: true,
    incomeAnnum: 10000000,
    loanAmount: 500000,
    loanTerm: 36,
    cibilScore: 900,
    residentialAssetsValue: 50000000,
    commercialAssetsValue: 50000000,
    luxuryAssetsValue: 2000000,
    bankAssetValue: 16000000,
  },
  {
    education: Education.Graduate,
    selfEmployed: false,
    incomeAnnum: 500000,
    loanAmount: 10000000,
    loanTerm: 36,
    cibilScore: 489,
    residentialAssetsValue: 50000000,
    commercialAssetsValue: 50000000,
    luxuryAssetsValue: 150000,
    bankAssetValue: 700000,
  },
];

export const RejectedCases = [
  {
    education: Education.Graduate,
    selfEmployed: false,
    incomeAnnum: 500000,
    loanAmount: 240000,
    loanTerm: 12,
    cibilScore: 300,
    residentialAssetsValue: 50000,
    commercialAssetsValue: 4500000,
    luxuryAssetsValue: 750000,
    bankAssetValue: 20000,
  },
  {
    education: Education.NotGraduate,
    selfEmployed: true,
    incomeAnnum: 120000,
    loanAmount: 5000000,
    loanTerm: 48,
    cibilScore: 300,
    residentialAssetsValue: 520000,
    commercialAssetsValue: 15000,
    luxuryAssetsValue: 70000,
    bankAssetValue: 80000,
  },
];
