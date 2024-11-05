"use server";
import { z } from "zod";

import { inquirySchema } from "@/domains/Inquiry";
import { Education, LoanApproval, LoanStatus } from "@/domains/LoanApprovement";
import { getDifference, getEuclidean } from "@/libs/k-nearest-neighbors";
import { getDataStack, getFromDataset } from "@/libs/serializer";

export async function getPredict(values: z.infer<typeof inquirySchema>) {
  const {
    cibilScore,
    luxuryAssetsValue,
    loanAmount,
    incomeAnnum,
    loanTerm,
    residentialAssetsValue,
    commercialAssetsValue,
    bankAssetValue,
    selfEmployed,
    education,
  } = values;

  if (luxuryAssetsValue < 7150000) {
    if (loanTerm < 5) {
      if (residentialAssetsValue < 750000) {
        if (loanAmount < 850000) {
          if (residentialAssetsValue < 550000) {
            if (cibilScore < 484.5)
              return {
                status: LoanStatus.Rejected,
              };
            else
              return {
                status: LoanStatus.Approved,
              };
          } else
            return {
              status: LoanStatus.Rejected,
            };
        } else {
          if (cibilScore < 559) {
            if (incomeAnnum < 450000)
              return {
                status: LoanStatus.Approved,
              };
            else {
              if (cibilScore < 427)
                return {
                  status: LoanStatus.Rejected,
                };
              else {
                if (incomeAnnum < 1500000) {
                  if (loanAmount < 1450000)
                    return {
                      status: LoanStatus.Rejected,
                    };
                  else
                    return {
                      status: LoanStatus.Approved,
                    };
                } else
                  return {
                    status: LoanStatus.Rejected,
                  };
              }
            }
          } else {
            if (commercialAssetsValue < 150000) {
              if (incomeAnnum < 750000)
                return {
                  status: LoanStatus.Approved,
                };
              else {
                if (loanTerm < 3)
                  return {
                    status: LoanStatus.Approved,
                  };
                else
                  return {
                    status: LoanStatus.Rejected,
                  };
              }
            } else
              return {
                status: LoanStatus.Approved,
              };
          }
        }
      } else {
        if (cibilScore < 547) {
          if (cibilScore < 493) {
            if (bankAssetValue < 4050000) {
              if (bankAssetValue < 2450000) {
                if (bankAssetValue < 2350000) {
                  if (commercialAssetsValue < 550000) {
                    if (cibilScore < 356)
                      return {
                        status: LoanStatus.Approved,
                      };
                    else {
                      if (bankAssetValue < 2250000)
                        return {
                          status: LoanStatus.Rejected,
                        };
                      else
                        return {
                          status: LoanStatus.Approved,
                        };
                    }
                  } else {
                    if (incomeAnnum < 1700000) {
                      if (loanAmount < 1850000) {
                        if (cibilScore < 413.5)
                          return {
                            status: LoanStatus.Rejected,
                          };
                        else
                          return {
                            status: LoanStatus.Approved,
                          };
                      } else
                        return {
                          status: LoanStatus.Approved,
                        };
                    } else {
                      if (bankAssetValue < 1550000) {
                        if (commercialAssetsValue < 850000)
                          return {
                            status: LoanStatus.Approved,
                          };
                        else
                          return {
                            status: LoanStatus.Rejected,
                          };
                      } else
                        return {
                          status: LoanStatus.Approved,
                        };
                    }
                  }
                } else
                  return {
                    status: LoanStatus.Rejected,
                  };
              } else
                return {
                  status: LoanStatus.Approved,
                };
            } else
              return {
                status: LoanStatus.Rejected,
              };
          } else {
            if (residentialAssetsValue < 2600000) {
              if (loanAmount < 1750000)
                return {
                  status: LoanStatus.Rejected,
                };
              else {
                if (selfEmployed === false)
                  return {
                    status: LoanStatus.Approved,
                  };
                else {
                  if (education === "Graduate")
                    return {
                      status: LoanStatus.Rejected,
                    };
                  else
                    return {
                      status: LoanStatus.Approved,
                    };
                }
              }
            } else
              return {
                status: LoanStatus.Rejected,
              };
          }
        } else
          return {
            status: LoanStatus.Approved,
          };
      }
    } else {
      if (cibilScore < 549.5)
        return {
          status: LoanStatus.Rejected,
        };
      else {
        if (bankAssetValue < 250000) {
          if (luxuryAssetsValue < 750000) {
            if (commercialAssetsValue < 150000) {
              if (cibilScore < 605.5)
                return {
                  status: LoanStatus.Rejected,
                };
              else {
                if (incomeAnnum < 250000) {
                  if (residentialAssetsValue < 100000) {
                    if (loanAmount < 600000)
                      return {
                        status: LoanStatus.Rejected,
                      };
                    else
                      return {
                        status: LoanStatus.Approved,
                      };
                  } else
                    return {
                      status: LoanStatus.Approved,
                    };
                } else
                  return {
                    status: LoanStatus.Rejected,
                  };
              }
            } else
              return {
                status: LoanStatus.Approved,
              };
          } else
            return {
              status: LoanStatus.Approved,
            };
        } else {
          if (residentialAssetsValue < 950000) {
            if (incomeAnnum < 1750000) {
              if (loanAmount < 3150000)
                return {
                  status: LoanStatus.Approved,
                };
              else {
                if (loanAmount < 3250000) {
                  if (education === "Graduate")
                    return {
                      status: LoanStatus.Rejected,
                    };
                  else
                    return {
                      status: LoanStatus.Approved,
                    };
                } else
                  return {
                    status: LoanStatus.Approved,
                  };
              }
            } else {
              if (commercialAssetsValue < 1750000) {
                if (loanAmount < 6800000)
                  return {
                    status: LoanStatus.Approved,
                  };
                else
                  return {
                    status: LoanStatus.Rejected,
                  };
              } else
                return {
                  status: LoanStatus.Approved,
                };
            }
          } else
            return {
              status: LoanStatus.Approved,
            };
        }
      }
    }
  } else {
    if (loanTerm < 5) {
      if (bankAssetValue < 12950000) {
        if (incomeAnnum < 2450000) {
          if (commercialAssetsValue < 150000)
            return {
              status: LoanStatus.Rejected,
            };
          else {
            if (selfEmployed === false) {
              if (luxuryAssetsValue < 8400000) {
                if (education === "Graduate")
                  return {
                    status: LoanStatus.Rejected,
                  };
                else {
                  if (incomeAnnum < 2150000) {
                    if (incomeAnnum < 2050000)
                      return {
                        status: LoanStatus.Approved,
                      };
                    else
                      return {
                        status: LoanStatus.Rejected,
                      };
                  } else
                    return {
                      status: LoanStatus.Approved,
                    };
                }
              } else
                return {
                  status: LoanStatus.Rejected,
                };
            } else
              return {
                status: LoanStatus.Approved,
              };
          }
        }
      }
    }
  }
}
