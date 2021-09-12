import { render, screen, fireEvent } from "@testing-library/react";
import { addEvent } from "../api/events";
import { EventForm } from "../event/EventForm";

describe("<EventForm> tests", () => {
  it("should set firstName corretly", async () => {
    render(<EventForm />);
    const firstNameInput = (await screen.findByLabelText(
      /First name/i
    )) as HTMLInputElement;
    fireEvent.change(firstNameInput, { target: { value: "bartek" } });
    expect(firstNameInput.value).toBe("bartek");
  });

  it("should set lastName corretly", async () => {
    render(<EventForm />);
    const firstNameInput = (await screen.findByLabelText(
      /Last name/i
    )) as HTMLInputElement;
    fireEvent.change(firstNameInput, { target: { value: "sniezek" } });
    expect(firstNameInput.value).toBe("sniezek");
  });

  it("should set emailAddress corretly", async () => {
    render(<EventForm />);
    const firstNameInput = (await screen.findByLabelText(
      /Email address/i
    )) as HTMLInputElement;
    fireEvent.change(firstNameInput, {
      target: { value: "example@domain.com" },
    });
    expect(firstNameInput.value).toBe("example@domain.com");
  });

  it("should set eventDate corretly", async () => {
    render(<EventForm />);
    const firstNameInput = (await screen.findByLabelText(
      /Event date/i
    )) as HTMLInputElement;
    fireEvent.change(firstNameInput, { target: { value: "2020-10-10" } });
    expect(firstNameInput.value).toBe("2020-10-10");
  });

  it("should show error when firstName is cleared after providing some input", async () => {
    render(<EventForm />);
    const firstNameInput = (await screen.findByLabelText(
      /First name/i
    )) as HTMLInputElement;
    fireEvent.change(firstNameInput, { target: { value: "bartek" } });
    fireEvent.change(firstNameInput, { target: { value: "" } });

    const eventError = await screen.findByText(/First name can't be empty/i);
    expect(eventError).not.toBe(null);
  });

  it("should show error when lastName is cleared after providing some input", async () => {
    render(<EventForm />);
    const lastNameInput = (await screen.findByLabelText(
      /Last name/i
    )) as HTMLInputElement;
    fireEvent.change(lastNameInput, { target: { value: "sniezek" } });
    fireEvent.change(lastNameInput, { target: { value: "" } });

    const eventError = await screen.findByText(/Last name can't be empty/i);
    expect(eventError).not.toBe(null);
  });

  it("should show error when Email address is cleared after providing some input", async () => {
    render(<EventForm />);
    const input = (await screen.findByLabelText(
      /Email address/i
    )) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "example@domain.com" } });
    fireEvent.change(input, { target: { value: "" } });

    const eventError = await screen.findByText(/Email address can't be empty/i);
    expect(eventError).not.toBe(null);
  });

  it("should show error when Email address is invalid", async () => {
    render(<EventForm />);
    const input = (await screen.findByLabelText(
      /Email address/i
    )) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "example" } });

    const eventError = await screen.findByText(/Invalid email address/i);
    expect(eventError).not.toBe(null);
  });

  it("should disable button when all inputs are empty", async () => {
    render(<EventForm />);
    const input = (await screen.findByDisplayValue(/Add/i)) as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it("should enable button when all inputs are provided and valid", async () => {
    render(<EventForm />);
    const firstNameInput = (await screen.findByLabelText(
      /First name/i
    )) as HTMLInputElement;
    fireEvent.change(firstNameInput, { target: { value: "bartek" } });
    const lastNameInput = (await screen.findByLabelText(
      /Last name/i
    )) as HTMLInputElement;
    fireEvent.change(lastNameInput, { target: { value: "sniezek" } });
    const emailAddressInput = (await screen.findByLabelText(
      /Email address/i
    )) as HTMLInputElement;
    fireEvent.change(emailAddressInput, {
      target: { value: "example@domain.com" },
    });
    const eventDateInput = (await screen.findByLabelText(
      /Event date/i
    )) as HTMLInputElement;
    fireEvent.change(eventDateInput, { target: { value: "2020-10-10" } });

    const button = (await screen.findByDisplayValue(
      /Add/i
    )) as HTMLInputElement;
    expect(button.disabled).toBe(false);
  });
});
