import React from "react";
import { render, fireEvent, waitForElementToBeRemoved, getByLabelText } from "@testing-library/react";
import App from "./App";
import mockPosts from "./__mocks__/mockPosts.json";

jest.mock('./api');

const weekdays = [
  // "Sunday",
  "Monday",
  // "Tuesday",
  // "Wednesday",
  // "Thursday",
  // "Friday",
  // "Saturday",
];

function getPostDay({ createdAt }) {
  return new Date(createdAt).getDay();
}

// sort posts by weekday (Sunday to Saturday)
mockPosts.sort((a, b) => getPostDay(a) - getPostDay(b));

test.each(weekdays)(
  "shows table containing correct posts for %s",
  async (weekday) => {
    const { getByText, getByRole, getAllByRole, getByLabelText, debug } = render(<App />);

    // const weekdayButton = getByText(weekday);
    // fireEvent.click(weekdayButton);

    const select = getByLabelText(/Selected weekday/);
    fireEvent.change(select, { target: { value: weekday } });

    const day = weekdays.indexOf(weekday);
    const postIndex = mockPosts.findIndex((post) => getPostDay(post) === day);

    await waitForElementToBeRemoved(() => getByText(/Loading/));

    getByRole("table");
    const rows = getAllByRole("row");
    // debug(rows);

    for (let i = 0; i < rows.length - 1; i += 1) {
      const post = mockPosts[postIndex + i];
      getByText(post.author);
      getByText(post.title);
      getByText(post.score.toString());
    }
  }
);
