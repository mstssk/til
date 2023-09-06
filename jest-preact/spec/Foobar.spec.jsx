import { Foobar } from "../src/Foobar";
import { render } from "@testing-library/preact";
import { h } from 'preact';

describe(Foobar,()=> {
  it("test",()=> {
    const {container} =  render(<Foobar />);
    expect(container).toBeDefined();
  })
});
