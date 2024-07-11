import React from "react";
import { Layout, Skeleton, Empty } from "antd";
import { NotificationCard } from "../NotificationCard";

// components
import PageTitle from "../PageTitle";

// styled components
import * as Styled from "./Announcements.styled";

const { Content } = Layout;

export const Announcements: React.FC = () => {
  const dummyData = {
    announcements: {
      data: [
        {
          _id: "1",
          title: "Important Announcement 1",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          _id: "2",
          title: "Important Announcement 2",
          content:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          _id: "3",
          title: "Important Announcement 3",
          content:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
      ],
      totalPages: 1,
    },
    isLoading: false,
    isFetching: false,
    currentPage: 1,
    setCurrentPage: () => {},
  };

  const { announcements, isLoading, isFetching, currentPage, setCurrentPage } =
    dummyData;

  return (
    <>
      <PageTitle title="Announcements" />
      <Content className="announcement-content">
        {(isLoading || isFetching) && (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        )}
        {announcements &&
          announcements?.data
            .slice(0, 2)
            .map((announcement) => (
              <NotificationCard
                cardItem={announcement}
                key={announcement._id}
                variant="announcements"
              />
            ))}
        {announcements?.data.length === 0 && (
          <Empty
            description={"No notifications found"}
            style={{
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "100px",
            }}
          />
        )}
        <Styled.LoadMoreButtonContainer>
          {announcements?.totalPages > currentPage && (
            <Styled.LoadMoreButton
              onClick={() => {
                setCurrentPage((prev) => prev + 1);
              }}
            >
              Load More
            </Styled.LoadMoreButton>
          )}
          {announcements?.totalPages === currentPage && currentPage !== 1 && (
            <Styled.NoMoreData>No more announcements to load</Styled.NoMoreData>
          )}
        </Styled.LoadMoreButtonContainer>
      </Content>
    </>
  );
};
