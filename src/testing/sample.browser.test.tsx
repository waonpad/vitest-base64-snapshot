import { render } from "@testing-library/react";
import { page } from "@vitest/browser/context";
import { describe, expect, test } from "vitest";

describe("検証", () => {
  test("キャンバスを使用、2つのbase64文字列が一致", async () => {
    const width = 100;
    const height = 100;

    const Comp = () => {
      return (
        <div>
          <canvas width={width} height={height} data-testid="canvas1" />
          <canvas width={width} height={height} data-testid="canvas2" />
        </div>
      );
    };

    const { container } = render(<Comp />);

    const canvas1 = container.querySelector(
      "[data-testid=canvas1]"
    ) as HTMLCanvasElement;
    const canvas2 = container.querySelector(
      "[data-testid=canvas2]"
    ) as HTMLCanvasElement;

    const canvas1Context = canvas1.getContext("2d") as CanvasRenderingContext2D;
    const canvas2Context = canvas2.getContext("2d") as CanvasRenderingContext2D;

    canvas1Context.fillStyle = "green";
    canvas1Context.fillRect(0, 0, width, height);

    canvas2Context.fillStyle = "green";
    canvas2Context.fillRect(0, 0, width, height);

    const { base64: base64_1 } = await page.screenshot({
      element: canvas1,
      base64: true,
    });

    const { base64: base64_2 } = await page.screenshot({
      element: canvas2,
      base64: true,
    });

    expect(base64_1).toEqual(base64_2);
  });

  test("キャンバスを使用、1つのbase64文字列がスナップショットと一致", async () => {
    const width = 100;
    const height = 100;

    const Comp = () => {
      return (
        <div>
          <canvas width={width} height={height} data-testid="canvas1" />
        </div>
      );
    };

    const { container } = render(<Comp />);

    const canvas1 = container.querySelector(
      "[data-testid=canvas1]"
    ) as HTMLCanvasElement;

    const canvas1Context = canvas1.getContext("2d") as CanvasRenderingContext2D;

    canvas1Context.fillStyle = "green";
    canvas1Context.fillRect(0, 0, width, height);

    const { base64: base64_1 } = await page.screenshot({
      element: canvas1,
      base64: true,
    });

    expect(base64_1).toMatchInlineSnapshot(
      `"iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAAXNSR0IArs4c6QAAAOZJREFUeJzt0EEJACAAwEA1udGt4F4i3CUYm2MPLq3XAT8xKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArODKLAUi/3QoSAAAAAElFTkSuQmCC"`
    );
  });

  test("divを使用、1つのbase64文字列がスナップショットと一致", async () => {
    const width = 100;
    const height = 100;

    const Comp = () => {
      return (
        <div>
          <div
            style={{ width, height, backgroundColor: "green" }}
            data-testid="div1"
          />
        </div>
      );
    };

    const { container } = render(<Comp />);

    const div1 = container.querySelector(
      "[data-testid=div1]"
    ) as HTMLDivElement;

    const { base64: base64_1 } = await page.screenshot({
      element: div1,
      base64: true,
    });

    expect(base64_1).toMatchInlineSnapshot(`"iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAAXNSR0IArs4c6QAAAOZJREFUeJzt0EEJACAAwEA1udGt4F4i3CUYm2MPLq3XAT8xKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArODKLAUi/3QoSAAAAAElFTkSuQmCC"`);
  });
});
