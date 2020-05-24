import React from "react";
import { render, waitForElementToBeRemoved, within, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import App from "./App";
import mockPosts from "./__mocks__/mockPosts.json";

jest.mock('./api');

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getPostDay({ createdAt }) {
  return new Date(createdAt).getDay();
}

// sort posts by weekday (Sunday to Saturday)
mockPosts.sort((a, b) => getPostDay(a) - getPostDay(b));

test.each(weekdays)(
  "shows table containing correct posts for %s",
  async (weekday) => {
    render(<App />);

    const select = screen.getByLabelText(/Selected weekday/);
    userEvent.selectOptions(select, weekday);

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/));
    const day = weekdays.indexOf(weekday);

    const postsForWeekday = mockPosts.filter((post) => getPostDay(post) === day);
    screen.getByRole("table");
    const rows = screen.getAllByRole("row");
    // screen.debug(rows);

    postsForWeekday.forEach((post, index) => {
      const row = rows[index + 1]
      within(row).getByText(post.author);
      within(row).getByText(post.title);
      within(row).getByText(post.score.toString());
    })

  }
);
