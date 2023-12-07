import { ChipProps } from "@nextui-org/react";

export enum BugSeverity {
  BLOCKER,
  CRITICAL,
  MAJOR,
  MINOR
}

export enum BugStatus {
  NEW,
  ASSIGNED,
  IN_PROGRESS,
  FIXED,
  PENDING_RETEST,
  IN_RETEST,
  REOPEN,
  VERIFIED,
  CLOSED,
  DUPLICATE,
  REJECTED,
  DEFERRED,
  NOT_A_BUG
}

export enum BugPriority {
  HIGH,
  MEDIUM,
  LOW
}


export enum UserRole {
  ROLE_MANAGER = 1,
  ROLE_PROJECT_LEAD = 2,
  ROLE_TEAM_LEAD = 3,
  ROLE_DEVELOPER = 4,
  ROLE_TESTER = 5,
}


export const statusColorMap: Record<string, ChipProps["color"]> = {
  NEW: "danger",
  ASSIGNED: "primary",
  IN_PROGRESS: "default",
  FIXED: "success",
  PENDING_RETEST: "success",
  IN_RETEST: "success",
  REOPEN: "primary",
  VERIFIED: "secondary",
  CLOSED: "warning",
  DUPLICATE: "warning",
  REJECTED: "warning",
  DEFERRED: "warning",
  NOT_A_BUG: "warning",
};

export const severityColorMap: Record<string, ChipProps["color"]> = {
  BLOCKER: "danger",
  CRITICAL: "warning",
  MAJOR: "secondary",
  MINOR: "primary",
};

export const priorityColorMap: Record<string, ChipProps["color"]> = {
  HIGH: "danger",
  MEDIUM: "warning",
  LOW: "primary",
};


export const BugStatusData = [
  {
    "id": "reopen",
    "label": "reopen",
    "value": 3,
    "color": "hsl(102, 70%, 50%)"
  },
  {
    "id": "fixed",
    "label": "fixed",
    "value": 38,
    "color": "hsl(124, 70%, 50%)"
  },
  {
    "id": "closed",
    "label": "closed",
    "value": 52,
    "color": "hsl(224, 70%, 50%)"
  },
  {
    "id": "in progress",
    "label": "in progress",
    "value": 33,
    "color": "hsl(301, 70%, 50%)"
  },
  {
    "id": "open",
    "label": "open",
    "value": 36,
    "color": "hsl(291, 70%, 50%)"
  }
];

export const BugSeverityData = [
  {
    "country": "AD",
    "hot dog": 180,
    "hot dogColor": "hsl(18, 70%, 50%)",
    "burger": 167,
    "burgerColor": "hsl(216, 70%, 50%)",
    "sandwich": 58,
    "sandwichColor": "hsl(167, 70%, 50%)",
    "kebab": 37,
    "kebabColor": "hsl(47, 70%, 50%)",
    "fries": 118,
    "friesColor": "hsl(9, 70%, 50%)",
    "donut": 25,
    "donutColor": "hsl(299, 70%, 50%)"
  },
  {
    "country": "AE",
    "hot dog": 37,
    "hot dogColor": "hsl(208, 70%, 50%)",
    "burger": 120,
    "burgerColor": "hsl(121, 70%, 50%)",
    "sandwich": 179,
    "sandwichColor": "hsl(159, 70%, 50%)",
    "kebab": 181,
    "kebabColor": "hsl(127, 70%, 50%)",
    "fries": 148,
    "friesColor": "hsl(332, 70%, 50%)",
    "donut": 102,
    "donutColor": "hsl(262, 70%, 50%)"
  },
  {
    "country": "AF",
    "hot dog": 101,
    "hot dogColor": "hsl(183, 70%, 50%)",
    "burger": 95,
    "burgerColor": "hsl(306, 70%, 50%)",
    "sandwich": 139,
    "sandwichColor": "hsl(257, 70%, 50%)",
    "kebab": 5,
    "kebabColor": "hsl(186, 70%, 50%)",
    "fries": 89,
    "friesColor": "hsl(120, 70%, 50%)",
    "donut": 67,
    "donutColor": "hsl(304, 70%, 50%)"
  },
];

export const BugTrendOverTimeData = [
  {
    "id": "Serie 1",
    "data": [
      {
        "x": 2000,
        "y": 6
      },
      {
        "x": 2001,
        "y": 7
      },
      {
        "x": 2002,
        "y": 7
      },
      {
        "x": 2003,
        "y": 12
      },
      {
        "x": 2004,
        "y": 11
      }
    ]
  },
  {
    "id": "Serie 2",
    "data": [
      {
        "x": 2000,
        "y": 12
      },
      {
        "x": 2001,
        "y": 5
      },
      {
        "x": 2002,
        "y": 11
      },
      {
        "x": 2003,
        "y": 1
      },
      {
        "x": 2004,
        "y": 7
      }
    ]
  },
  {
    "id": "Serie 3",
    "data": [
      {
        "x": 2000,
        "y": 8
      },
      {
        "x": 2001,
        "y": 4
      },
      {
        "x": 2002,
        "y": 6
      },
      {
        "x": 2003,
        "y": 2
      },
      {
        "x": 2004,
        "y": 2
      }
    ]
  },
  {
    "id": "Serie 4",
    "data": [
      {
        "x": 2000,
        "y": 3
      },
      {
        "x": 2001,
        "y": 2
      },
      {
        "x": 2002,
        "y": 4
      },
      {
        "x": 2003,
        "y": 5
      },
      {
        "x": 2004,
        "y": 10
      }
    ]
  },
  {
    "id": "Serie 5",
    "data": [
      {
        "x": 2000,
        "y": 9
      },
      {
        "x": 2001,
        "y": 12
      },
      {
        "x": 2002,
        "y": 9
      },
      {
        "x": 2003,
        "y": 4
      },
      {
        "x": 2004,
        "y": 8
      }
    ]
  },
  {
    "id": "Serie 6",
    "data": [
      {
        "x": 2000,
        "y": 1
      },
      {
        "x": 2001,
        "y": 6
      },
      {
        "x": 2002,
        "y": 1
      },
      {
        "x": 2003,
        "y": 11
      },
      {
        "x": 2004,
        "y": 5
      }
    ]
  },
  {
    "id": "Serie 7",
    "data": [
      {
        "x": 2000,
        "y": 4
      },
      {
        "x": 2001,
        "y": 9
      },
      {
        "x": 2002,
        "y": 3
      },
      {
        "x": 2003,
        "y": 9
      },
      {
        "x": 2004,
        "y": 1
      }
    ]
  },
  {
    "id": "Serie 8",
    "data": [
      {
        "x": 2000,
        "y": 10
      },
      {
        "x": 2001,
        "y": 8
      },
      {
        "x": 2002,
        "y": 8
      },
      {
        "x": 2003,
        "y": 10
      },
      {
        "x": 2004,
        "y": 6
      }
    ]
  },
  {
    "id": "Serie 9",
    "data": [
      {
        "x": 2000,
        "y": 5
      },
      {
        "x": 2001,
        "y": 10
      },
      {
        "x": 2002,
        "y": 5
      },
      {
        "x": 2003,
        "y": 7
      },
      {
        "x": 2004,
        "y": 12
      }
    ]
  },
  {
    "id": "Serie 10",
    "data": [
      {
        "x": 2000,
        "y": 7
      },
      {
        "x": 2001,
        "y": 1
      },
      {
        "x": 2002,
        "y": 12
      },
      {
        "x": 2003,
        "y": 8
      },
      {
        "x": 2004,
        "y": 4
      }
    ]
  },
  {
    "id": "Serie 11",
    "data": [
      {
        "x": 2000,
        "y": 11
      },
      {
        "x": 2001,
        "y": 11
      },
      {
        "x": 2002,
        "y": 2
      },
      {
        "x": 2003,
        "y": 6
      },
      {
        "x": 2004,
        "y": 9
      }
    ]
  },
  {
    "id": "Serie 12",
    "data": [
      {
        "x": 2000,
        "y": 2
      },
      {
        "x": 2001,
        "y": 3
      },
      {
        "x": 2002,
        "y": 10
      },
      {
        "x": 2003,
        "y": 3
      },
      {
        "x": 2004,
        "y": 3
      }
    ]
  }
];

export const UserPerformance = [
  {
    "value": 152,
    "day": "2023-06-20"
  },
  {
    "value": 359,
    "day": "2023-05-21"
  },
  {
    "value": 322,
    "day": "2023-06-15"
  },
  {
    "value": 352,
    "day": "2023-04-09"
  },
  {
    "value": 225,
    "day": "2023-04-21"
  },
  {
    "value": 162,
    "day": "2023-06-03"
  },
  {
    "value": 329,
    "day": "2023-05-13"
  },
  {
    "value": 281,
    "day": "2023-04-19"
  },
  {
    "value": 242,
    "day": "2023-04-16"
  },
  {
    "value": 120,
    "day": "2023-07-16"
  },
  {
    "value": 343,
    "day": "2023-04-02"
  },
  {
    "value": 28,
    "day": "2023-07-27"
  },
  {
    "value": 9,
    "day": "2023-06-19"
  },
  {
    "value": 335,
    "day": "2023-07-29"
  },
  {
    "value": 214,
    "day": "2023-07-09"
  },
  {
    "value": 215,
    "day": "2023-05-29"
  },
  {
    "value": 103,
    "day": "2023-07-01"
  },
  {
    "value": 231,
    "day": "2023-05-04"
  },
  {
    "value": 124,
    "day": "2023-05-05"
  },
  {
    "value": 331,
    "day": "2023-07-07"
  },
  {
    "value": 63,
    "day": "2023-06-01"
  },
  {
    "value": 356,
    "day": "2023-05-12"
  },
  {
    "value": 1,
    "day": "2023-05-09"
  },
  {
    "value": 251,
    "day": "2023-07-22"
  },
  {
    "value": 302,
    "day": "2023-05-08"
  },
  {
    "value": 234,
    "day": "2023-08-05"
  },
  {
    "value": 124,
    "day": "2023-04-28"
  },
  {
    "value": 199,
    "day": "2023-08-03"
  },
  {
    "value": 29,
    "day": "2023-06-22"
  },
  {
    "value": 261,
    "day": "2023-08-04"
  },
  {
    "value": 130,
    "day": "2023-06-11"
  },
  {
    "value": 264,
    "day": "2023-07-18"
  },
  {
    "value": 141,
    "day": "2023-05-01"
  },
  {
    "value": 268,
    "day": "2023-05-22"
  },
  {
    "value": 283,
    "day": "2023-08-09"
  },
  {
    "value": 391,
    "day": "2023-05-25"
  },
  {
    "value": 158,
    "day": "2023-05-31"
  },
  {
    "value": 337,
    "day": "2023-05-26"
  },
  {
    "value": 67,
    "day": "2023-04-30"
  },
  {
    "value": 142,
    "day": "2023-06-21"
  },
  {
    "value": 110,
    "day": "2023-05-30"
  },
  {
    "value": 287,
    "day": "2023-07-30"
  },
  {
    "value": 109,
    "day": "2023-06-23"
  },
  {
    "value": 89,
    "day": "2023-06-24"
  },
  {
    "value": 104,
    "day": "2023-06-27"
  },
  {
    "value": 48,
    "day": "2023-07-23"
  },
  {
    "value": 265,
    "day": "2023-07-12"
  },
  {
    "value": 344,
    "day": "2023-04-03"
  },
  {
    "value": 41,
    "day": "2023-07-20"
  },
  {
    "value": 161,
    "day": "2023-06-25"
  },
  {
    "value": 145,
    "day": "2023-06-12"
  },
  {
    "value": 202,
    "day": "2023-08-06"
  },
  {
    "value": 153,
    "day": "2023-07-14"
  },
  {
    "value": 73,
    "day": "2023-04-29"
  },
  {
    "value": 122,
    "day": "2023-05-27"
  },
  {
    "value": 227,
    "day": "2023-05-18"
  },
  {
    "value": 225,
    "day": "2023-07-19"
  },
  {
    "value": 40,
    "day": "2023-05-19"
  },
  {
    "value": 58,
    "day": "2023-05-15"
  },
  {
    "value": 108,
    "day": "2023-04-25"
  },
  {
    "value": 204,
    "day": "2023-04-20"
  },
  {
    "value": 98,
    "day": "2023-05-02"
  },
  {
    "value": 252,
    "day": "2023-06-16"
  },
  {
    "value": 323,
    "day": "2023-04-24"
  },
  {
    "value": 158,
    "day": "2023-06-17"
  },
  {
    "value": 398,
    "day": "2023-07-17"
  },
  {
    "value": 7,
    "day": "2023-07-21"
  },
  {
    "value": 400,
    "day": "2023-04-05"
  },
  {
    "value": 400,
    "day": "2023-07-10"
  },
  {
    "value": 385,
    "day": "2023-06-08"
  },
  {
    "value": 395,
    "day": "2023-06-29"
  },
  {
    "value": 349,
    "day": "2023-04-26"
  },
  {
    "value": 78,
    "day": "2023-05-17"
  },
  {
    "value": 374,
    "day": "2023-06-02"
  },
  {
    "value": 377,
    "day": "2023-04-10"
  },
  {
    "value": 335,
    "day": "2023-06-14"
  },
  {
    "value": 263,
    "day": "2023-06-04"
  },
  {
    "value": 212,
    "day": "2023-05-23"
  },
  {
    "value": 190,
    "day": "2023-05-03"
  },
  {
    "value": 246,
    "day": "2023-06-10"
  },
  {
    "value": 123,
    "day": "2023-08-07"
  },
  {
    "value": 213,
    "day": "2023-06-05"
  }
];