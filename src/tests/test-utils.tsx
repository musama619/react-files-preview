import React, { ReactElement, ReactNode } from "react";
import { cleanup, render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import matchers from "@testing-library/jest-dom/matchers";
import { afterEach, expect, vi } from "vitest";

interface WrapperProps {
	children: ReactNode;
}

expect.extend(matchers);
afterEach(() => {
  cleanup();
  vi.restoreAllMocks()
});

global.fetch = vi.fn();
global.URL.createObjectURL = vi.fn();
const Wrapper = ({ children }: WrapperProps): ReactElement => (
	<Provider store={store}>{children}</Provider>
);

const customRender = (ui: ReactElement, options?: RenderOptions) =>
	render(ui, { wrapper: Wrapper, ...options });

// Re-export everything from "@testing-library/react"
export * from "@testing-library/react";
// Override render method with customRender
export { customRender as render };
