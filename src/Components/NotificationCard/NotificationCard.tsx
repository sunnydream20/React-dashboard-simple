import { NOTIFICATION_TYPES } from "../Notifications/constanst";
import { ANNOUNCEMENT_TYPES } from "../Announcements/constants";
import * as Styled from "./NotificationCard.styled";
import dayjs from "dayjs";
import {
  AlertTwoTone,
  BellTwoTone,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

export const NotificationCard = ({ cardItem, variant }) => {
  const icon =
    variant === "notification" ? (
      cardItem.type === NOTIFICATION_TYPES.GENERAL ? (
        <BellTwoTone twoToneColor="blue" />
      ) : cardItem.type === NOTIFICATION_TYPES.IMPORTANT ? (
        <AlertTwoTone twoToneColor="#f00000" />
      ) : (
        <InfoCircleOutlined className="color-gray" />
      )
    ) : variant === "announcements" ? (
      cardItem.type === ANNOUNCEMENT_TYPES.GENERAL ? (
        <BellTwoTone twoToneColor="blue" />
      ) : cardItem.type === ANNOUNCEMENT_TYPES.IMPORTANT ? (
        <AlertTwoTone twoToneColor="#f00000" />
      ) : cardItem.type === ANNOUNCEMENT_TYPES.UPDATES ? (
        <InfoCircleOutlined className="color-green" />
      ) : cardItem.type === ANNOUNCEMENT_TYPES.URGENT ? (
        <AlertTwoTone twoToneColor="#f00000" />
      ) : cardItem.type === ANNOUNCEMENT_TYPES.WARNING ? (
        <WarningOutlined className="color-orange" />
      ) : (
        <InfoCircleOutlined className="color-gray" />
      )
    ) : null;

  console.log(cardItem.type, ANNOUNCEMENT_TYPES.IMPORTANT);
  return (
    <Styled.NotificationCardContainer $type={cardItem.type}>
      {variant === "notification"
        ? !cardItem.isRead && <Styled.UnreadDot />
        : null}
      <Styled.NotificationIcon $variant={variant}>
        {icon}
      </Styled.NotificationIcon>
      <Styled.NotificationBody>
        <Styled.NotificationContent>
          {variant === "announcements" ? (
            <Styled.Title $type={cardItem.$type}>{cardItem.title}</Styled.Title>
          ) : null}
          {variant === "announcements" ? (
            cardItem.description && (
              <Styled.Message>{cardItem.description}</Styled.Message>
            )
          ) : (
            <Styled.Message>{cardItem.message}</Styled.Message>
          )}
        </Styled.NotificationContent>
        <Styled.Time $variant={variant}>
          <span>{dayjs(cardItem?.createdAt).format("DD-MM-YYYY hh:mm A")}</span>
        </Styled.Time>
      </Styled.NotificationBody>
    </Styled.NotificationCardContainer>
  );
};
