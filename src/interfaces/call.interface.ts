export interface Call {
    _id: {
      $oid: string;
    };
    type: string;
    title: string;
    description: string;
    genreStyle: string;
    subGenre: string[];
    status: string;
    contestId: {
      $oid: string;
    };
    medium: {
      print: boolean;
      online: boolean;
    };
    genre: {
      fiction: boolean;
      nonfiction: boolean;
      poetry: boolean;
      hybrid: boolean;
      multimedia: boolean;
    };
    theme: {
      isThemedCall: boolean;
      title: string;
      description: string;
    };
    length: Record<string, unknown>;
    readingPeriod: {
      callPeriod: {
        alwaysOpen: boolean;
        limited: boolean;
        recurring: boolean;
      };
      rollingDeadlines: boolean;
      interval: {
        monthly: boolean;
        yearly: boolean;
      };
      subWindows: {
        openDate: string | null;
        closeDate: string | null;
      }[];
      submissionCap: {
        hasThis: boolean;
        amount: number;
      };
    };
    payment: {
      pays: boolean;
      type: {
        flatRate: boolean;
        perPiece: boolean;
        perWord: boolean;
        perPage: boolean;
      };
      amount: {
        exact: boolean;
        lower: number;
        upper: number;
      };
      currency: string;
      paymentAfterPublication: boolean;
    };
    fee: {
      charges: boolean;
      amount: number;
      currency: string;
      feeFreeCategories: {
        value: boolean;
        categories: {
          bipoc: boolean;
          accessbility: boolean;
          lowIncome: boolean;
          firstComeFirstServe: boolean;
          other: boolean;
        };
      };
      paidFastResponses: {
        hasThis: boolean;
        price: {
          amount: number;
          currency: string;
        };
      };
      tipJarOption: {
        hasThis: boolean;
        price: {
          amount: number;
          currency: string;
        };
      };
    };
  }