export enum Education {
  Graduate = "Graduate",
  NotGraduate = "NotGraduate",
}

export enum LoanStatus {
  Approved = "Approved",
  Rejected = "Rejected",
}

export class LoanApproval {
  public static parseEducation(education: string): Education {
    // console.log(education.trim().toLowerCase());
    switch (education.trim().toLowerCase()) {
      case "Graduate".toLowerCase(): {
        return Education.Graduate;
      }
      case "Not Graduate".trim().toLowerCase(): {
        return Education.NotGraduate;
      }
      default: {
        throw new Error("Graduate is mismatch from Enum Graduate");
      }
    }
  }

  public static parseYesNoToBoolean(input: string): boolean {
    switch (input.trim().toLowerCase()) {
      case "Yes".toLowerCase(): {
        return true;
      }
      case "No".toLowerCase(): {
        return false;
      }
      default: {
        throw new Error("Input doesn't match for each case");
      }
    }
  }

  public static parseApprovement(approvement: string): LoanStatus {
    switch (approvement.trim().toLowerCase()) {
      case "Approved".toLowerCase(): {
        return LoanStatus.Approved;
      }
      case "Rejected".toLowerCase(): {
        return LoanStatus.Rejected;
      }
      default: {
        throw new Error("Approvement doesn't match for each case");
      }
    }
  }

  private id: string | undefined;
  private noOfDependent: number | undefined;
  private education: Education;
  private selfEmployed: boolean;
  private incomeAnnum: number;
  private loanAmount: number;
  private loanTerm: number;
  private cibilScore: number;
  private residentialAssetsValue: number;
  private commercialAssetsValue: number;
  private laxuryAssetsValue: number;
  private bankAssetValue: number;
  private loanStatus: LoanStatus | undefined;

  // for k-nearest-neighbors
  private rank: number | undefined;
  private spacing: number | undefined;

  public constructor(
    id: string,
    noOfDependent: number,
    education: Education,
    selfEmployed: boolean,
    incomeAnnum: number,
    loanAmount: number,
    loanTerm: number,
    cibilScore: number,
    residentialAssetsValue: number,
    commercialAssetsValue: number,
    laxuryAssetsValue: number,
    bankAssetValue: number,
    loanStatus?: LoanStatus
  ) {
    this.id = id;
    this.noOfDependent = noOfDependent;
    this.education = education;
    this.selfEmployed = selfEmployed;
    this.incomeAnnum = incomeAnnum;
    this.loanAmount = loanAmount;
    this.loanTerm = loanTerm;
    this.cibilScore = cibilScore;
    this.residentialAssetsValue = residentialAssetsValue;
    this.commercialAssetsValue = commercialAssetsValue;
    this.laxuryAssetsValue = laxuryAssetsValue;
    this.bankAssetValue = bankAssetValue;
    if (loanStatus) {
      this.loanStatus = loanStatus;
    }
  }

  public getId(): string | undefined {
    return this.id;
  }

  public getNoOfDependent(): number | undefined {
    return this.noOfDependent;
  }

  public getEducation(): Education {
    return this.education;
  }

  public getSelfEmployed(): boolean {
    return this.selfEmployed;
  }

  public getIncomeAnnum(): number {
    return this.incomeAnnum;
  }

  public getLoanAmount(): number {
    return this.loanAmount;
  }

  public getLoanTerm(): number {
    return this.loanTerm;
  }

  public getCibilScore(): number {
    return this.cibilScore;
  }

  public getResidentialAssetsValue(): number {
    return this.residentialAssetsValue;
  }

  public getCommercialAssetsValue(): number {
    return this.commercialAssetsValue;
  }

  public getLaxuryAssetsValue(): number {
    return this.laxuryAssetsValue;
  }

  public getBankAssetValue(): number {
    return this.bankAssetValue;
  }

  public getLoanStatus(): LoanStatus | undefined {
    return this.loanStatus;
  }

  public setRank(rank: number): this {
    this.rank = rank;
    return this;
  }

  public getRank(): number | undefined {
    return this.rank;
  }

  public getSpacing(): number | undefined {
    return this.spacing;
  }

  public setSpacing(spacing: number): this {
    this.spacing = spacing;
    return this;
  }
}
