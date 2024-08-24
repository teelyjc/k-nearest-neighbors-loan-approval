import { z } from "zod";

import { Education } from "@/domains/LoanApprovement";

export const inquirySchema = z.object({
  education: z.nativeEnum(Education),
  selfEmployed: z.boolean(),
  incomeAnnum: z.number().positive(),
  loanAmount: z.number().positive(),
  loanTerm: z.number().positive(),
  cibilScore: z.number().positive().min(300).max(900),
  residentialAssetsValue: z.number().positive(),
  commercialAssetsValue: z.number().positive(),
  luxuryAssetsValue: z.number().positive(),
  bankAssetValue: z.number().positive(),
});
