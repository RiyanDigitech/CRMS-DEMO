import React, { useState, useMemo } from "react";
import {
  Button,
  Modal,
  Card,
  Divider,
  Space,
  Typography,
  Drawer,
  theme,
} from "antd";
import { Edit, Calendar as CalendarIcon, Clock, PlusIcon } from "lucide-react";
import { Calendar, View } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./calendar.css";
import moment from "moment";
import { momentLocalizer, Views } from "react-big-calendar";
import AddMeetingForm from "./add-meeting";
import MeetingService from "@/services/meetings/meetings.service";
import { meetingType } from "@/lib/types/meeting";
import { BaseButton } from "@/components/ui/base-button";

const { Title, Text } = Typography;
const localizer = momentLocalizer(moment);

interface CalendarEvent
  extends Omit<meetingType, "date" | "startTime" | "endTime"> {
  title: string;
  start: Date;
  end: Date;
  description: string;
  notes: string;
  subject: string;
}

const MeetingsCalendar: React.FC = () => {
  const [view, setView] = useState<View>(Views.DAY);
  const [date, setDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const [editingMeetingId, setEditingMeetingId] = useState<number | null>(null);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const { useFetchAllMeetings } = MeetingService();
  const { data: meetingData, refetch: refetchMeetings } = useFetchAllMeetings();

  const meetingEvents = useMemo<CalendarEvent[]>(() => {
    return (
      meetingData?.data.map((meeting: meetingType) => {
        const startDateTime = moment(
          `${meeting.date} ${meeting.startTime}`,
          "YYYY-MM-DD h:mm A"
        ).toDate();
        const endDateTime = moment(
          `${meeting.date} ${meeting.endTime}`,
          "YYYY-MM-DD h:mm A"
        ).toDate();
        console.log(`Start date ${startDateTime}, End date ${endDateTime}`);

        return {
          id: meeting.id,
          title: meeting.subject,
          start: startDateTime,
          end: endDateTime,
          description: meeting.notes,
          activityType: meeting.eventType || meeting.activityType,
          customerId: meeting.customerIds,
          salesRepId: meeting.salesRepId,
          // reminder: meeting.reminder,
        };
      }) || []
    );
  }, [meetingData]);

  const handleNavigate = (newDate: Date) => setDate(newDate);
  const handleViewChange = (newView: View) => setView(newView);
  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const handleAddMeeting = (newMeeting: meetingType) => {
    console.log("New meeting:", newMeeting);
    setIsDrawerVisible(false);
    refetchMeetings();
  };

  const handleEditMeeting = () => {
    setEditingMeetingId(selectedEvent?.id ?? null);
    setIsModalVisible(false);
    setIsDrawerVisible(true);
  };

  const handleUpdateMeeting = (updatedMeeting: meetingType) => {
    console.log("Updated meeting:", updatedMeeting);
    setIsDrawerVisible(false);
    setEditingMeetingId(null);
    refetchMeetings();
  };
  console.log("meetingEvents", meetingEvents);
  return (
    <div className="container relative">
      <BaseButton
        onClick={() => {
          setEditingMeetingId(null);
          setIsDrawerVisible(true);
        }}
        style={{
          position: "absolute",
          top: "1rem",
          right: "0.1rem",
          zIndex: 10,
        }}
        size={"xl"}
        className="flex gap-2 items-center"
      >
        <PlusIcon />
        Schedule Meeting
      </BaseButton>

      <div className="relative pt-16 sm:pt-20">
        <Calendar
          localizer={localizer}
          events={meetingEvents}
          eventPropGetter={(event: CalendarEvent) => ({
            style: {
              padding: "3px",
              margin: "5px",
              borderRadius: "5px",
              backgroundColor:
                event.activityType === "Meeting" ? "#ff8548" : colorPrimary,
            },
          })}
          style={{ height: "calc(100vh - 150px)", width: "100%" }}
          date={date}
          onNavigate={handleNavigate}
          view={view}
          onView={handleViewChange}
          onSelectEvent={handleSelectEvent}
        />
      </div>
      <Modal
        title={
          <Title level={4} style={{ margin: 0 }}>
            {selectedEvent?.title}
          </Title>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Card bordered={false}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Space size="large" align="start">
              <Space align="start">
                <CalendarIcon size={20} color={colorPrimary} />
                <div>
                  <Text type="secondary">Date and Time</Text>
                  <div>
                    {moment(selectedEvent?.start).format(
                      "MMMM Do YYYY, h:mm a"
                    )}{" "}
                    - {moment(selectedEvent?.end).format("h:mm a")}
                  </div>
                </div>
              </Space>
              <Space align="start">
                <Clock size={20} color={colorPrimary} />
                <div>
                  <Text type="secondary">Duration</Text>
                  <div>
                    {moment
                      .duration(
                        moment(selectedEvent?.end).diff(
                          moment(selectedEvent?.start)
                        )
                      )
                      .asHours()
                      .toFixed(2)}{" "}
                    hours
                  </div>
                </div>
              </Space>
            </Space>

            <Space align="start">
              <CalendarIcon size={20} color={colorPrimary} />
              <div>
                <Text type="secondary">Activity Type</Text>
                <div>{selectedEvent?.activityType}</div>
              </div>
            </Space>

            {/* {selectedEvent?.reminder && (
              <Space align="start">
                <Clock size={20} color={colorPrimary} />
                <div>
                  <Text type="secondary">Reminder</Text>
                  <div>Enabled</div>
                </div>
              </Space>
            )} */}

            <Divider style={{ margin: "12px 0" }} />

            <div>
              <Title level={5}>Description</Title>
              <Text>{selectedEvent?.description}</Text>
            </div>
          </Space>
        </Card>
        <div style={{ marginTop: 24, textAlign: "right" }}>
          <Space>
            <BaseButton
              variant={"outline"}
              size={"sm"}
              onClick={() => setIsModalVisible(false)}
            >
              Close
            </BaseButton>
            <BaseButton
              variant={"default"}
              size={"sm"}
              onClick={handleEditMeeting}
              icon={<Edit />}
            >
              Edit Meeting
            </BaseButton>
          </Space>
        </div>
      </Modal>

      <Drawer
        title={editingMeetingId ? "Edit Meeting" : "Add Meeting"}
        placement="left"
        width={600}
        open={isDrawerVisible}
        onClose={() => {
          setIsDrawerVisible(false);
          setEditingMeetingId(null);
        }}
      >
        <AddMeetingForm
          onSubmit={editingMeetingId ? handleUpdateMeeting : handleAddMeeting}
          meetingId={editingMeetingId ? editingMeetingId.toString() : null}
          onCloseDrawer={() => setIsDrawerVisible(false)}
        />
      </Drawer>
    </div>
  );
};

export default MeetingsCalendar;
