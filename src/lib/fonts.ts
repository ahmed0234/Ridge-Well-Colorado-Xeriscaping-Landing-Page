import localFont from "next/font/local";

export const clashDisplay = localFont({
  src: [
    {
      path: "../fonts/clashdisplay/ClashDisplay-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/clashdisplay/ClashDisplay-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/clashdisplay/ClashDisplay-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/clashdisplay/ClashDisplay-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash",
});

export const satoshi = localFont({
  src: [
    {
      path: "../fonts/satoshi/Satoshi-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/satoshi/Satoshi-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/satoshi/Satoshi-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});
