import { Foobar } from "../src/Foobar";
import { render } from "@testing-library/preact";

describe(Foobar, () => {
  it("test", () => {
    const { container } = render(<Foobar />);
    expect(container).toBeDefined();
  });
});
