import React from "react";
import ContentMain from "./ContentMain";
import ContentHeader from "./ContentHeader";
import ContentFooter from "./ContentFooter";
import ContentDescription from "./ContentDescription";

const Content = () => {
  return (
    <div className="w-screen max-w-[425px]">
      <div className="m-1">
        <ContentHeader />
      </div>
      <ContentMain />
      <ContentFooter />
      <ContentDescription />
    </div>
  );
};

export default Content;
