import Page from "@/app/page";
import HomeLayout from "@/app/layout";
import { render } from "@testing-library/react";

describe("Home Page", () => {
  it("should render", () => {
    const session = {
      user: {
        id: 1,
        username: "mike",
        email: "mike@gmail.com",
        role: "member",
      },
      expires: "2024-07-21T10:33:41.693Z",
    };

    const page = render(<HomeLayout session={session}>
        <Page />
      </HomeLayout>
    );

    expect(page).toMatchSnapshot();
  });
});
